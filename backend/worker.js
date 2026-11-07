/**
 * Optional companion API for Chat's Guide to Italian.
 * Deploy separately to Cloudflare Workers. GitHub Pages is still fully offline-capable.
 * Required binding: ITALIAN_DATA (Workers KV).
 * Optional secrets: OPENAI_API_KEY, AI_ACCESS_CODE, VAPID_PRIVATE_JWK.
 * Optional vars: ALLOWED_ORIGIN, AI_MODEL, VAPID_PUBLIC_KEY, VAPID_SUBJECT.
 */
const encoder=new TextEncoder();
const b64url=bytes=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const fromB64=text=>Uint8Array.from(atob(text.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-text.length%4)%4)),c=>c.charCodeAt(0));
const join=(...arrays)=>{const len=arrays.reduce((n,a)=>n+a.length,0),buf=new Uint8Array(len);let o=0;for(const a of arrays){buf.set(a,o);o+=a.length;}return buf;};
const parseJSON=async(req,max=120000)=>{const text=await req.text();if(text.length>max)throw new Error('Request too large');return JSON.parse(text);};
const json=(v,status=200,headers={})=>new Response(JSON.stringify(v),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
const fixedOrigin=(req,env)=>env.ALLOWED_ORIGIN||'https://ltwoolford89.github.io';
const cors=(req,env)=>({'Access-Control-Allow-Origin':fixedOrigin(req,env),'Vary':'Origin','Access-Control-Allow-Headers':'Content-Type, X-Italian-Access-Code','Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS','Access-Control-Max-Age':'86400'});
const bad=(msg,status=400)=>json({error:msg},status);
const today=()=>new Date().toISOString().slice(0,10);
async function rateLimit(env,req,prefix,max){
 const address=req.headers.get('CF-Connecting-IP')||'unknown';
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(address)))).map(c=>c.toString(16).padStart(2,'0')).join('').slice(0,20);
 const key=`rate:${prefix}:${today()}:${digest}`;const count=Number(await env.ITALIAN_DATA.get(key)||'0');
 if(count>=max)return false;
 await env.ITALIAN_DATA.put(key,String(count+1),{expirationTtl:86400});return true;
}
const scenarios={everyday:'everyday greetings and introductions',restaurant:'ordering at a restaurant',station:'buying a train ticket',shopping:'shopping and asking about prices',school:'talking with classmates',travel:'visiting Italian cities'};
async function chat(req,env){
 if(!env.OPENAI_API_KEY||!env.AI_ACCESS_CODE)return bad('AI tutor is not configured on this backend',503);
 const access=req.headers.get('X-Italian-Access-Code')||'';
 // A shared access code is required even for a publicly deployed personal site.
 if(access.length<12 || access!==env.AI_ACCESS_CODE)return bad('AI access code is missing or incorrect',401);
 if(!await rateLimit(env,req,'ai',20))return bad('Daily AI practice limit reached. Try offline conversations.',429);
 let data;try{data=await parseJSON(req,7000);}catch{return bad('Invalid tutor request');}
 const messages=Array.isArray(data.messages)?data.messages.slice(-9).filter(m=>['assistant','user'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,400)})):[];
 if(!messages.length || messages.at(-1).role!=='user')return bad('Send an Italian message to start');
 const scenario=scenarios[data.scenario]||scenarios.everyday;
 const level=['A1','A2','B1','B2','C1','C2'].includes(data.level)?data.level:'A1';
 const rules=`You are a patient, encouraging Italian LANGUAGE tutor for a teenager. The learner is ${level}. Role-play ${scenario}. Always respond mostly in Italian in 1-3 concise sentences. Ask one natural follow-up question. Include one short tip in English to explain vocabulary or gently correct ONE important mistake. Keep responses age-appropriate, avoid asking for personal identifiers, contact details or precise location. If the conversation changes to unsafe or personal-advice topics, redirect to Italian language practice. Reply with ONLY a JSON object with string keys "reply" and "tip", and nothing else.`;
 let out;
 try{const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:env.AI_MODEL||'gpt-4.1-mini',instructions:rules,input:messages.map(m=>({role:m.role,content:m.content})),max_output_tokens:260,store:false})});out=await r.json();if(!r.ok)throw Error('Provider refused the request');}
 catch{return bad('AI tutor is unavailable. Offline conversation practice still works.',502);}
 const content=(out.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('')||out.output_text||'';
 try{const parsed=JSON.parse(content);return json({reply:String(parsed.reply||'').slice(0,750),tip:String(parsed.tip||'').slice(0,250)});}
 catch{return json({reply:content.slice(0,750)||'Ciao! Come stai?',tip:'Try replying with a short Italian sentence.'});}
}
async function sync(req,env,id){
 if(!/^[a-f0-9]{64}$/.test(id))return bad('Invalid sync identifier');
 const key='sync:'+id;
 if(req.method==='GET'){const record=await env.ITALIAN_DATA.get(key,'json');return record?json(record):bad('No cloud backup found for this code',404);}
 if(req.method!=='PUT')return bad('Method not allowed',405);
 if(!await rateLimit(env,req,'sync',120))return bad('Too many sync attempts',429);
 let payload;try{payload=await parseJSON(req,250000);}catch{return bad('Invalid sync request');}
 if(!/^[a-zA-Z0-9_-]{16}$/.test(payload.iv||'')||!(/^[a-zA-Z0-9_-]{10,240000}$/.test(payload.ciphertext||'')))return bad('Invalid encrypted record');
 await env.ITALIAN_DATA.put(key,JSON.stringify({iv:payload.iv,ciphertext:payload.ciphertext}));return json({ok:true});
}
async function endpointKey(endpoint){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(endpoint)))).map(n=>n.toString(16).padStart(2,'0')).join('');}
function validEndpoint(endpoint){try{const u=new URL(endpoint);return u.protocol==='https:' && (/^(.*\.)?push\.apple\.com$/.test(u.hostname)||/^(.*\.)?web\.push\.apple\.com$/.test(u.hostname)||u.hostname==='fcm.googleapis.com'||u.hostname==='updates.push.services.mozilla.com'||u.hostname==='android.googleapis.com');}catch{return false;}}
async function subscriptions(req,env,path){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_JWK)return bad('Push reminders not configured',503);
 if(path==='/api/push/public-key'&&req.method==='GET')return json({publicKey:env.VAPID_PUBLIC_KEY});
 if(!['/api/push/subscribe','/api/push/unsubscribe'].includes(path)||req.method!=='POST')return bad('Unknown push operation',404);
 if(!await rateLimit(env,req,'push',25))return bad('Too many subscription attempts',429);
 let body;try{body=await parseJSON(req,7000);}catch{return bad('Invalid subscription');}
 if(path.endsWith('unsubscribe')){const endpoint=body.endpoint;if(!validEndpoint(endpoint))return bad('Invalid endpoint');await env.ITALIAN_DATA.delete('push:'+await endpointKey(endpoint));return json({ok:true});}
 const sub=body.subscription;
 if(!sub||!validEndpoint(sub.endpoint)||!sub.keys||!/^[-_a-zA-Z0-9]{80,100}$/.test(sub.keys.p256dh||'')||!/^[-_a-zA-Z0-9]{18,40}$/.test(sub.keys.auth||''))return bad('Invalid subscription details');
 const hour=Number(body.hour),offset=Number(body.offset);
 if(!Number.isInteger(hour)||hour<7||hour>21||!Number.isInteger(offset)||Math.abs(offset)>840)return bad('Invalid reminder time');
 const k='push:'+await endpointKey(sub.endpoint);
 await env.ITALIAN_DATA.put(k,JSON.stringify({subscription:sub,hour,offset,lastDay:''}));return json({ok:true});
}
async function hkdf(input,salt,info,length){const key=await crypto.subtle.importKey('raw',input,'HKDF',false,['deriveBits']);return new Uint8Array(await crypto.subtle.deriveBits({name:'HKDF',hash:'SHA-256',salt,info},key,length));}
async function sealPush(sub,payload){
 const clientPub=fromB64(sub.keys.p256dh),auth=fromB64(sub.keys.auth);
 const ephemeral=await crypto.subtle.generateKey({name:'ECDH',namedCurve:'P-256'},true,['deriveBits']);
 const ephemeralPub=new Uint8Array(await crypto.subtle.exportKey('raw',ephemeral.publicKey));
 const clientKey=await crypto.subtle.importKey('raw',clientPub,{name:'ECDH',namedCurve:'P-256'},false,[]);
 const shared=new Uint8Array(await crypto.subtle.deriveBits({name:'ECDH',public:clientKey},ephemeral.privateKey,256));
 const info=join(encoder.encode('WebPush: info\0'),clientPub,ephemeralPub);
 const ikm=await hkdf(shared,auth,info,256),salt=crypto.getRandomValues(new Uint8Array(16));
 const cek=await hkdf(ikm,salt,encoder.encode('Content-Encoding: aes128gcm\0'),128);
 const nonce=await hkdf(ikm,salt,encoder.encode('Content-Encoding: nonce\0'),96);
 const aes=await crypto.subtle.importKey('raw',cek,'AES-GCM',false,['encrypt']);
 const ciphertext=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:nonce},aes,join(encoder.encode(JSON.stringify(payload)),new Uint8Array([2]))));
 const recordSize=new Uint8Array([0,0,16,0,ephemeralPub.length]);
 return join(salt,recordSize,ephemeralPub,ciphertext);
}
async function vapidJwt(env,url){
 const header=b64url(encoder.encode(JSON.stringify({typ:'JWT',alg:'ES256'})));
 const payload=b64url(encoder.encode(JSON.stringify({aud:new URL(url).origin,exp:Math.floor(Date.now()/1000)+3600,sub:env.VAPID_SUBJECT||'mailto:admin@example.com'})));
 const input=header+'.'+payload;
 const jwk=JSON.parse(env.VAPID_PRIVATE_JWK);
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
 const sig=new Uint8Array(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,encoder.encode(input)));
 return input+'.'+b64url(sig);
}
async function sendPush(env,subscription){
 const body=await sealPush(subscription,{title:"Italian practice 🇮🇹",body:'Ready for a little Italian today? Your next lesson is waiting.'});
 const jwt=await vapidJwt(env,subscription.endpoint);
 return fetch(subscription.endpoint,{method:'POST',headers:{Authorization:`vapid t=${jwt}, k=${env.VAPID_PUBLIC_KEY}`,'Content-Type':'application/octet-stream','Content-Encoding':'aes128gcm',TTL:'3600'},body});
}
async function scheduled(env){
 if(!env.ITALIAN_DATA||!env.VAPID_PRIVATE_JWK||!env.VAPID_PUBLIC_KEY)return;
 let cursor;do{const page=await env.ITALIAN_DATA.list({prefix:'push:',cursor});cursor=page.list_complete?null:page.cursor;
  for(const item of page.keys){try{const data=await env.ITALIAN_DATA.get(item.name,'json');if(!data?.subscription)continue;
    const local=new Date(Date.now()-data.offset*60000),day=local.toISOString().slice(0,10);
    if(local.getUTCHours()!==data.hour||data.lastDay===day)continue;
    const res=await sendPush(env,data.subscription);
    if(res.ok){data.lastDay=day;await env.ITALIAN_DATA.put(item.name,JSON.stringify(data));}
    else if([404,410].includes(res.status))await env.ITALIAN_DATA.delete(item.name);
  }catch{/* Ignore failed individual subscriptions so others still receive reminders. */}}
 }while(cursor);
}
export default {
 async fetch(req,env){
  const origin=req.headers.get('Origin');const headers=cors(req,env);
  if(origin!==fixedOrigin(req,env))return json({error:'This site is not allowed to use the API'},403,headers);
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(!env.ITALIAN_DATA)return json({error:'KV binding ITALIAN_DATA is missing'},503,headers);
  try{const url=new URL(req.url),p=url.pathname;let r;
   if(p==='/api/health'&&req.method==='GET')r=json({ok:true,ai:Boolean(env.OPENAI_API_KEY&&env.AI_ACCESS_CODE),push:Boolean(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_JWK)});
   else if(p==='/api/chat'&&req.method==='POST')r=await chat(req,env);
   else if(p.startsWith('/api/sync/'))r=await sync(req,env,p.slice('/api/sync/'.length));
   else if(p.startsWith('/api/push/'))r=await subscriptions(req,env,p);
   else r=bad('Route not found',404);
   const outHeaders=new Headers(r.headers);for(const [k,v] of Object.entries(headers))outHeaders.set(k,v);
   return new Response(r.body,{status:r.status,headers:outHeaders});
  }catch(e){return json({error:'Service error. Try again later.'},500,headers);}
 },
 async scheduled(event,env,ctx){ctx.waitUntil(scheduled(env));}
};