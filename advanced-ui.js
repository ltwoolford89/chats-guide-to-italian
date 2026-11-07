/* Chat's Guide to Italian v3 · additional practice, tutoring and opt-in services. */
'use strict';
const PLUS = (() => {
  const people = ['io','tu','lui / lei','noi','voi','loro'];
  const plus = () => state.plus || (state.plus = {grammarDone:0,listeningDone:0,verbDone:0,tutorTurns:0,mistakes:{},sync:{enabled:false,code:''},push:false});
  const apiURL = () => String(state.settings.serverUrl || '').trim().replace(/\/+$/,'');
  const safeUrl = url => /^https:\/\/[a-z0-9.\-]+(?::\d+)?(?:\/[^?#]*)?$/i.test(url) && !url.includes('@');
  const formatDate = date => date ? new Date(date).toLocaleDateString('en-AU',{day:'numeric',month:'short'}) : 'Not scheduled';
  const currentCourse = () => LESSONS.filter(l=>isUnlocked(l));
  const renderAnswer = (right,correct,extra='')=>`<div class="answer-feedback ${right?'success':'needs-work'}"><strong>${right?'Benissimo! Correct.':'Good effort—keep practising.'}</strong><span>${right?'':`Correct answer: ${esc(correct)}. `}${esc(extra)}</span></div>`;
  const page = (title,subtitle,body,back='practice')=>`<div class="page plus-page narrow">${sectionHeader(title,subtitle,back)}${body}</div>`;

  function startListening(){
    const lessons=shuffled(currentCourse()).slice(0,8);
    ui.plusListening={questions:lessons.map(l=>{
      const wrong=shuffled(LESSONS.filter(x=>x.id!==l.id).map(x=>x.grammar.en)).slice(0,3);
      return {it:l.grammar.example,en:l.grammar.en,options:shuffled([...wrong,l.grammar.en]),id:l.id};
    }),index:0,answered:null,correct:0};ui.page='listening-drills';render(true);
  }
  function listeningView(){const t=ui.plusListening;if(!t)return page('Listening studio','Listen to real Italian sentences.',`<button class="btn btn-primary" data-action="plus-start-listening">Start listening</button>`);
    if(t.index>=t.questions.length)return page('Listening complete','You finished your listening practice.',`<div class="end-activity"><span>🎧</span><h2>${t.correct} of ${t.questions.length} correct</h2><p>Play a new set to practise different sentences.</p><button class="btn btn-primary btn-wide" data-action="plus-start-listening">Listen again</button></div>`);
    const q=t.questions[t.index];return page('Listening studio',`Sentence ${t.index+1} of ${t.questions.length} · Listen before you choose.`,`${progressBar(t.index,t.questions.length)}<section class="panel plus-task"><span class="eyebrow muted">LISTEN AND UNDERSTAND</span><h2>What does this sentence mean?</h2><div class="plus-listen-centre">${audioButton(q.it,'Play Italian audio')}<button class="btn btn-outline" data-action="plus-slow-listening">Play slowly</button></div>${t.answered===null?`<div class="plus-options">${q.options.map((o,i)=>`<button class="reply-choice" data-action="plus-answer-listening" data-index="${i}">${esc(o)}</button>`).join('')}</div>`:`${renderAnswer(t.answered===q.en,q.en)}<p class="plus-transcript">Italian: <strong>${esc(q.it)}</strong></p>${audioButton(q.it,'Listen again')}<button class="btn btn-primary btn-wide" data-action="plus-next-listening">${t.index+1===t.questions.length?'Finish':'Next sentence'}</button>`}</section>`);
  }
  function startGrammar(){
    ui.plusGrammar={questions:shuffled(currentCourse()).slice(0,10).map(l=>({lesson:l.title,...l.grammarQ,explain:l.grammar.body})),index:0,answered:null,correct:0};ui.page='grammar-drills';render(true);
  }
  function grammarView(){const t=ui.plusGrammar;if(!t)return page('Grammar workout','Practice grammar using examples from your lessons.',`<button class="btn btn-primary" data-action="plus-start-grammar">Start grammar quiz</button>`);
    if(t.index>=t.questions.length)return page('Grammar complete','Good practice!',`<div class="end-activity"><span>🧩</span><h2>${t.correct}/${t.questions.length} correct</h2><button class="btn btn-primary btn-wide" data-action="plus-start-grammar">Practise again</button></div>`);
    const q=t.questions[t.index];return page('Grammar workout',`${t.index+1} of ${t.questions.length} · ${esc(q.lesson)}`,`${progressBar(t.index,t.questions.length)}<section class="panel plus-task"><span class="eyebrow muted">GRAMMAR CHECK</span><h2>${esc(q.prompt)}</h2>${t.answered===null?`<div class="plus-options">${q.options.map((o,i)=>`<button class="reply-choice" data-action="plus-answer-grammar" data-index="${i}">${esc(o)}</button>`).join('')}</div>`:`${renderAnswer(t.answered===q.answer,q.answer,q.explain)}<button class="btn btn-primary btn-wide" data-action="plus-next-grammar">${t.index+1===t.questions.length?'Finish':'Next question'}</button>`}</section>`);
  }
  function nextVerb(){const t=ui.plusVerb; const verb=ADV_VERBS[Math.floor(Math.random()*ADV_VERBS.length)];const person=Math.floor(Math.random()*6);
    t.current={verb,person,answer:verb[t.tense][person]};t.feedback=null;t.input='';
  }
  function startVerb(tense='present') {ui.plusVerb={tense:tense==='future'?'future':'present',index:0,correct:0,total:7,feedback:null};nextVerb();ui.page='verb-trainer';render(true);}
  function verbView(){const t=ui.plusVerb;if(!t)return page('Verb trainer','Choose a tense and conjugate Italian verbs.',`<button class="btn btn-primary" data-action="plus-start-verb" data-tense="present">Present tense</button><button class="btn btn-outline" data-action="plus-start-verb" data-tense="future">Future tense</button>`);
    if(t.index>=t.total)return page('Verb session complete','You are building useful patterns.',`<div class="end-activity"><span>✏️</span><h2>${t.correct} / ${t.total} correct</h2><button class="btn btn-primary btn-wide" data-action="plus-start-verb" data-tense="${t.tense}">Another session</button><button class="btn btn-outline btn-wide" data-action="navigate" data-page="practice">Back to practice</button></div>`);
    const {verb,person,answer}=t.current;
    return page('Verb trainer',`${t.tense==='present'?'Present':'Future'} tense · ${t.index+1} of ${t.total}`,`${progressBar(t.index,t.total)}<section class="panel plus-task"><span class="eyebrow muted">CONJUGATE THE VERB</span><h2>${esc(verb.inf)} <small class="muted">(${esc(verb.en)})</small></h2><p>Write the <strong>${esc(people[person])}</strong> form.</p>${t.feedback?`${renderAnswer(t.feedback.right,answer,t.feedback.right?'Excellent verb form.':'Check the ending and any accent marks.')}<button class="btn btn-primary btn-wide" data-action="plus-next-verb">Next verb</button>`:`<form id="plus-verb-form" class="plus-answer-form"><input name="verb" class="plus-input" required autocapitalize="none" autocomplete="off" spellcheck="false" placeholder="Type the Italian form" aria-label="Italian verb form"><button class="btn btn-primary" type="submit">Check answer</button></form><button class="text-button" data-action="plus-verb-hint">Hear a hint ${icon('volume',15)}</button>`}</section>`);
  }
  function answerVerb(raw){const t=ui.plusVerb;if(!t||t.feedback)return;const right=norm(raw)===norm(t.current.answer);t.feedback={right};markAnswer(right);if(right){t.correct++;earned(5);}
    const p=plus();p.verbDone++;const k=`${t.current.verb.inf}-${t.tense}-${t.current.person}`;p.mistakes[k]=(p.mistakes[k]||0)+(right?0:1);save();render();
  }
  function tutorStart(id){const scenario=ADV_TUTOR_SCENARIOS.find(s=>s.id===id)||ADV_TUTOR_SCENARIOS[0];ui.plusTutor={scenario,messages:[{role:'assistant',text:scenario.opening,tip:'Listen to the Italian, then reply. Use the hint if you need help.'}],busy:false,hints:false};ui.page='ai-tutor';render(true);}
  function tutorView(){const t=ui.plusTutor;
    if(!t)return page('Conversation studio','Choose a scenario and practise a conversation.',`<div class="plus-scenario-grid">${ADV_TUTOR_SCENARIOS.map(s=>`<button class="activity-card" data-action="plus-tutor-start" data-id="${s.id}"><span class="activity-emoji">${s.emoji}</span><strong>${esc(s.title)}</strong><span>${esc(s.system)}</span></button>`).join('')}</div>`,'speak');
    const online=Boolean(apiURL());
    return page(t.scenario.title,online?'Online AI tutor (requires your configured backend)':'Offline conversation coach · No AI service connected',`<div class="plus-chat-banner"><span>${online?'✨ Secure AI tutor':'📖 Guided offline coach'}</span><p>${online?'Messages are sent to your configured server for a reply. Avoid personal details.':'Practise freely with a local conversation coach. To enable real AI responses, configure a secure backend in Settings.'}</p></div><div class="plus-chat" role="log" aria-live="polite">${t.messages.map(m=>`<div class="plus-chat-line ${m.role==='user'?'mine':'theirs'}"><span>${m.role==='user'?'You':'Italian guide'}</span><p>${esc(m.text)}</p>${m.tip?`<small>${esc(m.tip)}</small>`:''}${m.role==='assistant'?audioButton(m.text,'Listen'):''}</div>`).join('')}${t.busy?'<div class="plus-chat-line theirs"><p>Preparing a reply…</p></div>':''}</div><form id="plus-tutor-form" class="plus-chat-form"><label class="sr-only" for="plus-tutor-input">Your Italian reply</label><input id="plus-tutor-input" class="plus-input" name="message" maxlength="400" placeholder="Scrivi in italiano…" autocomplete="off" required ${t.busy?'disabled':''}><button class="btn btn-primary" type="submit" ${t.busy?'disabled':''}>Send</button></form><div class="plus-chat-tools"><button class="btn btn-outline" data-action="plus-tutor-hint">Show a hint</button><button class="btn btn-outline" data-action="plus-tutor-mic">🎙️ Dictate</button><button class="btn btn-ghost" data-action="plus-tutor-reset">Restart</button></div>${t.hints?`<div class="tip-box">${esc(t.scenario.help)}</div>`:''}<p class="small-note muted">This tutor is for language learning, not emergency or personal advice. You can practise without sharing identifying details.</p>`,'speak');
  }
  const offlinePhrases = [
   {test:/\b(ciao|buongiorno|buonasera|salve)\b/i,reply:'Ciao! Come stai oggi?',tip:'How are you today?'},
   {test:/\b(chiamo|nome)\b/i,reply:'Piacere di conoscerti! Di dove sei?',tip:'Nice to meet you! Where are you from?'},
   {test:/\b(bene|così così|male)\b/i,reply:'Capisco! Che cosa ti piace fare nel tempo libero?',tip:'What do you like doing in your free time?'},
   {test:/\b(vorrei|pizza|pasta|caffè|acqua)\b/i,reply:'Certamente! Desideri anche qualcosa da bere?',tip:'Would you also like something to drink?'},
   {test:/\b(quanto|costa|prezzo)\b/i,reply:'Costa cinque euro. Vuoi comprarlo?',tip:'It costs five euros. Would you like to buy it?'},
   {test:/\b(stazione|treno|biglietto|roma)\b/i,reply:'Il treno parte alle dieci. Vuoi un biglietto?',tip:'The train leaves at ten. Do you want a ticket?'},
   {test:/\b(scuola|studio|matematica)\b/i,reply:'Interessante! Quale materia ti piace di più?',tip:'Which subject do you like most?'},
   {test:/\b(grazie)\b/i,reply:'Prego! Hai un’altra domanda?',tip:'You’re welcome! Do you have another question?'},
   {test:/\b(non capisco|ripetere|aiuto)\b/i,reply:'Certo! Parliamo piano. Come ti chiami?',tip:'Of course. Let’s speak slowly. What is your name?'},
  ];
  function offlineAnswer(message,t){const s=offlinePhrases.find(p=>p.test.test(message));if(s)return {reply:s.reply,tip:s.tip};
    const fallback={restaurant:['Va bene! Che cosa vuoi mangiare?','Would you like to eat something?'],station:['Dove vuoi andare oggi?','Where would you like to go?'],shopping:['Cerchi qualcosa in particolare?','Are you looking for anything in particular?'],school:['Cosa studi oggi?','What are you studying today?'],travel:['Ti piace visitare le città italiane?','Do you like visiting Italian cities?'],everyday:['Che cosa fai oggi?','What are you doing today?']}; const v=fallback[t.scenario.id]||fallback.everyday;
    return {reply:v[0],tip:v[1]+' Try a short sentence, or ask for a hint.'};
  }
  async function sendTutor(raw){const t=ui.plusTutor;if(!t||t.busy)return;const message=String(raw||'').trim().slice(0,400);if(!message)return;
    t.messages.push({role:'user',text:message});t.busy=true;render();let data;
    if(apiURL()){
      try{const recent=t.messages.slice(-9).map(m=>({role:m.role,content:m.text}));
        const response=await api('/api/chat',{method:'POST',headers:{'X-Italian-Access-Code':sessionStorage.getItem('italian-ai-access')||''},body:JSON.stringify({scenario:t.scenario.id,level:courseLevel(),messages:recent})});
        if(!response.reply || typeof response.reply!=='string')throw new Error('Invalid tutor reply');
        data={reply:response.reply.slice(0,750),tip:String(response.tip||'').slice(0,250)};
      }catch(e){data={reply:offlineAnswer(message,t).reply,tip:`Online tutor unavailable (${String(e.message).slice(0,90)}). Continuing with offline practice.`};}
    }else data=offlineAnswer(message,t);
    if(ui.plusTutor!==t)return;t.messages.push({role:'assistant',text:data.reply,tip:data.tip});t.busy=false;plus().tutorTurns++;earned(2);render();
    const log=document.querySelector('.plus-chat');if(log)log.scrollTop=log.scrollHeight;
  }
  function tutorMic(){const C=window.SpeechRecognition||window.webkitSpeechRecognition;if(!C){toast('Microphone transcription is not supported here. Type your reply instead.');return;}
    const r=new C();r.lang='it-IT';r.interimResults=false;r.onresult=e=>{const i=document.querySelector('#plus-tutor-input');if(i){i.value=e.results[0][0].transcript;i.focus();}};
    r.onerror=e=>toast('Microphone: '+(e.error||'unavailable'));try{r.start();toast('Listening for your Italian reply…');}catch{toast('Microphone not available.');}
  }
  function courseLevel(){const n=nextLesson().unit;return n<9?'A1':ADV_UNITS[n-4]?.cefr||'A1';}
  function practiceTiles(){return `<div class="panel-heading heading-outside"><div><h2>More ways to learn</h2><p>Listening, grammar and verbs tied to your lessons</p></div></div><div class="practice-grid plus-tiles">${[['plus-start-listening','🎧','Listening studio','Hear Italian and choose the meaning'],['plus-start-grammar','🧩','Grammar workout','Test what you know about sentences'],['plus-start-verb','✏️','Verb trainer','Practise present and future tense'],['plus-tutor-home','💬','Conversation coach','Have a real Italian exchange']].map(([action,emoji,title,desc])=>`<button class="activity-card" data-action="${action}"><span class="activity-emoji">${emoji}</span><strong>${title}</strong><span>${desc}</span><div class="activity-link">Start ${icon('arrow-right',16)}</div></button>`).join('')}</div>`;}
  function speakTiles(){return `<div class="panel-heading heading-outside"><div><h2>Conversation studio</h2><p>Choose your situation — practise by typing or using your microphone</p></div></div><div class="convo-grid">${ADV_TUTOR_SCENARIOS.map(s=>`<button class="conversation-card" data-action="plus-tutor-start" data-id="${s.id}"><span>${s.emoji}</span><div><strong>${esc(s.title)}</strong><small>${esc(s.system)}</small></div>${icon('chevron-right',17)}</button>`).join('')}</div><div class="tip-box">${icon('help',19)} <span>Works offline with guided replies. Connect an AI backend in Settings to enable flexible AI-powered conversations.</span></div>`;}
  function homeTile(){const n=plus();return `<div class="panel plus-daily"><div class="panel-heading"><div><h2>Your learning mix</h2><p>A little speaking, listening and review</p></div><span class="pill subtle">${courseLevel()}</span></div><div class="plus-daily-actions"><button class="chip" data-action="plus-start-listening">🎧 Listening</button><button class="chip" data-action="plus-start-grammar">🧩 Grammar</button><button class="chip" data-action="plus-tutor-home">💬 Conversation</button></div><p class="small-note muted">${n.listeningDone||0} listening checks · ${n.grammarDone||0} grammar checks · ${n.tutorTurns||0} conversation replies</p></div>`;}
  function statsTile(){const p=plus();const words=learnedWords();const strong=words.filter(w=>(state.reviews[w.id]?.reps||0)>=3 && (state.reviews[w.id]?.ease||2.5)>=2.4).length;
    const difficult=Object.entries(p.mistakes||{}).filter(([,n])=>n>=2).length;
    return `<section class="panel plus-stats"><div class="panel-heading"><div><h2>Study skills</h2><p>Beyond XP — watch your understanding grow</p></div></div><div class="plus-stat-grid"><div><strong>${p.listeningDone||0}</strong><small>Listening answers</small></div><div><strong>${p.grammarDone||0}</strong><small>Grammar answers</small></div><div><strong>${p.verbDone||0}</strong><small>Verb forms practised</small></div><div><strong>${strong}</strong><small>Well-reviewed words</small></div></div><p class="small-note muted">${difficult?`${difficult} verb forms to revisit.`:'Build your accuracy through short practice sessions.'}</p></section>`;}
  function networkTile(){const p=plus(),endpoint=apiURL();return `<section class="panel settings-panel"><h2>Advanced learning services · Stage 3</h2><p>All lessons and offline practice remain free. Optional online AI, encrypted sync and background notifications require your own secure server; never paste an API key here.</p><form id="plus-api-form" class="plus-stack"><label for="plus-endpoint">Your secure backend URL (Cloudflare Worker or compatible HTTPS API)</label><input class="plus-input" name="endpoint" id="plus-endpoint" type="url" placeholder="https://your-worker.workers.dev" value="${esc(endpoint)}" autocomplete="url"><button class="btn btn-outline" type="submit">Save backend address</button></form><div class="plus-service-status">${endpoint?'🟡 Backend address set; connection not verified':'⚪ Offline-only (no server configured)'}</div><div class="plus-divider"></div><label for="plus-access">AI access code (set by you on your server; stays in this tab)</label><div class="plus-api-code"><input class="plus-input" id="plus-access" type="password" autocomplete="off" placeholder="Enter your private access code"><button class="btn btn-outline" data-action="plus-save-ai-code">Use for this session</button></div><p class="small-note muted">AI access codes are stored only in this tab's session storage, not in this public GitHub repository. Real AI works only after you deploy and configure the optional backend.</p><button class="btn btn-outline" data-action="plus-tutor-home">Open conversation studio</button></section>
    <section class="panel settings-panel"><h2>Encrypted cloud progress sync</h2><p>Create a private recovery code, then enter the same code on another device. Your progress is encrypted on your device before upload. Keep the code private and backed up; losing it means you cannot restore the cloud copy.</p><div class="plus-stack"><button class="btn btn-outline" data-action="plus-generate-sync">Generate sync code</button><label for="plus-sync-code">Existing / new sync code</label><input class="plus-input" id="plus-sync-code" type="password" placeholder="Paste your sync code" value="${esc(p.sync?.code||'')}" autocomplete="off"><div class="settings-buttons"><button class="btn btn-outline" data-action="plus-save-sync">Save code</button><button class="btn btn-outline" data-action="plus-copy-sync">Copy code</button></div><div class="settings-buttons"><button class="btn btn-primary" data-action="plus-sync-now">Sync now</button><button class="btn btn-outline" data-action="plus-load-sync">Restore/merge cloud progress</button></div><small class="muted">${p.sync?.lastAt?'Last synced: '+esc(new Date(p.sync.lastAt).toLocaleString('en-AU')):'Not synced yet'}</small></div></section>
    <section class="panel settings-panel"><h2>Phone reminders (optional)</h2><p>On iPhone, install the app to your Home Screen first. Scheduled notifications require a configured push backend, service worker, and your permission.</p><div class="settings-row"><label for="plus-notify-hour">Reminder time</label><select id="plus-notify-hour" data-setting="notifyHour">${[8,10,12,15,17,18,19,20].map(h=>`<option value="${h}" ${Number(state.settings.notifyHour||18)===h?'selected':''}>${h>12?h-12:h}:00 ${h>=12?'PM':'AM'}</option>`).join('')}</select></div><div class="settings-buttons"><button class="btn btn-outline" data-action="plus-enable-push">Enable phone notifications</button><button class="btn btn-ghost" data-action="plus-disable-push">Turn off</button></div><p class="small-note muted">${p.push?'Phone notifications enabled for this device.':'Phone notifications are not enabled.'} An in-app reminder still appears even without push support.</p></section>`;}
  async function api(path,opts={}){const url=apiURL();if(!safeUrl(url))throw Error('Add a valid HTTPS backend address in Settings');
    const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),12000);
    try{const r=await fetch(url+path,{...opts,headers:{'Content-Type':'application/json',...(opts.headers||{})},signal:ctrl.signal,mode:'cors'});const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(data.error||`Server returned ${r.status}`);return data;}finally{clearTimeout(timer);}}
  const bytesToURL=bytes=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const urlToBytes=text=>Uint8Array.from(atob(text.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-text.length%4)%4)),c=>c.charCodeAt(0));
  async function syncKey(){const code=plus().sync?.code;
    if(!code || !/^[a-zA-Z0-9_-]{43}$/.test(code))throw Error('Generate or enter a valid 43-character sync code');
    const bytes=urlToBytes(code);const key=await crypto.subtle.importKey('raw',bytes,{name:'AES-GCM'},false,['encrypt','decrypt']);
    const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',bytes));return {key,id:Array.from(digest).map(n=>n.toString(16).padStart(2,'0')).join('')};
  }
  async function encryptState(){const {key,id}=await syncKey(),iv=crypto.getRandomValues(new Uint8Array(12));
    const copy=JSON.parse(JSON.stringify(state));copy.settings.serverUrl='';if(copy.plus?.sync)copy.plus.sync={enabled:false,code:'',lastAt:0};copy.plus.push=false;
    const plain=new TextEncoder().encode(JSON.stringify(copy));const encrypted=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,plain));
    return {id,record:{iv:bytesToURL(iv),ciphertext:bytesToURL(encrypted)}};
  }
  async function mergeRemote(backup){if(!backup || backup.version!==1||!Array.isArray(backup.completed)||!backup.activity||!backup.reviews)throw Error('Cloud data is not a valid app backup');
    state.completed=[...new Set([...state.completed,...backup.completed])].filter(id=>LESSONS.some(l=>l.id===id));
    state.xp=Math.max(state.xp,Number(backup.xp)||0);state.correct=Math.max(state.correct,Number(backup.correct)||0);state.attempts=Math.max(state.attempts,Number(backup.attempts)||0);
    for(const [d,v] of Object.entries(backup.activity)){if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||typeof v!=='object')continue;const old=state.activity[d]||{};state.activity[d]={xp:Math.max(old.xp||0,v.xp||0),lessons:Math.max(old.lessons||0,v.lessons||0),reviewed:Math.max(old.reviewed||0,v.reviewed||0),spoken:Math.max(old.spoken||0,v.spoken||0)};}
    for(const [id,v] of Object.entries(backup.reviews)){if(!ALL_WORDS.some(w=>w.id===id)||typeof v!=='object')continue;const old=state.reviews[id];if(!old||Number(v.lastAt||v.dueAt||0)>Number(old.lastAt||old.dueAt||0))state.reviews[id]=v;}
    for(const [k,v] of Object.entries(backup.flags||{}))if(v===true)state.flags[k]=true;
    for(const k of ['grammarDone','listeningDone','verbDone','tutorTurns'])plus()[k]=Math.max(plus()[k]||0,backup.plus?.[k]||0);
    save();
  }
  async function uploadSync(){const {id,record}=await encryptState();await api('/api/sync/'+id,{method:'PUT',body:JSON.stringify(record)});plus().sync.lastAt=Date.now();save();toast('Your encrypted progress was synced.');}
  async function downloadSync(){const {key,id}=await syncKey();const data=await api('/api/sync/'+id);const iv=urlToBytes(data.iv),cipher=urlToBytes(data.ciphertext);const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,cipher);const parsed=JSON.parse(new TextDecoder().decode(plain));await mergeRemote(parsed);plus().sync.lastAt=Date.now();save();toast('Cloud progress merged successfully.');render();}
  function generateCode(){if(!crypto?.subtle||!crypto.getRandomValues){toast('Secure sync requires HTTPS.');return;}if(plus().sync?.code&&!window.confirm('Replace your current sync code? Old cloud backups will use the previous code.'))return;
    plus().sync={enabled:false,code:bytesToURL(crypto.getRandomValues(new Uint8Array(32))),lastAt:0};save();render();toast('Sync code generated. Copy and keep it somewhere private.');}
  async function pushEnable(){if(!('serviceWorker' in navigator)&&!('PushManager' in window)){toast('This browser does not support push notifications.');return;}
    if(!('PushManager' in window)){toast('Push notifications are unavailable on this browser.');return;}
    if(!apiURL()){toast('Configure your backend first.');return;}
    try{const publicKey=await api('/api/push/public-key');if(!publicKey.publicKey)throw Error('Push is not enabled on this backend');
      const permission=await Notification.requestPermission();if(permission!=='granted')throw Error('Notification permission was not granted');
      const reg=await navigator.serviceWorker.ready;const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlToBytes(publicKey.publicKey)});
      await api('/api/push/subscribe',{method:'POST',body:JSON.stringify({subscription:sub.toJSON(),hour:Number(state.settings.notifyHour||18),offset:new Date().getTimezoneOffset()})});plus().push=true;save();render();toast('Phone reminders enabled.');
    }catch(e){toast('Could not enable phone reminders: '+e.message);}
  }
  async function pushDisable(){try{const reg=await navigator.serviceWorker.ready;const sub=await reg.pushManager.getSubscription();if(sub){if(apiURL())await api('/api/push/unsubscribe',{method:'POST',body:JSON.stringify({endpoint:sub.endpoint})}).catch(()=>{});await sub.unsubscribe();}plus().push=false;save();render();toast('Phone reminders disabled.');}catch(e){toast('Could not disable: '+e.message);}}
  async function handleAction(a,btn){
    if(a==='plus-start-listening'){startListening();return true;}
    if(a==='plus-slow-listening'){const old=state.settings.speed;state.settings.speed=0.65;speakItalian(ui.plusListening.questions[ui.plusListening.index].it);state.settings.speed=old;return true;}
    if(a==='plus-answer-listening'){const t=ui.plusListening;if(t.answered!==null)return true;const q=t.questions[t.index];t.answered=q.options[Number(btn.dataset.index)];const correct=t.answered===q.en;t.correct+=Number(correct);plus().listeningDone++;markAnswer(correct);if(correct)earned(5);else save();render();return true;}
    if(a==='plus-next-listening'){ui.plusListening.index++;ui.plusListening.answered=null;render();return true;}
    if(a==='plus-start-grammar'){startGrammar();return true;}
    if(a==='plus-answer-grammar'){const t=ui.plusGrammar;if(t.answered!==null)return true;const q=t.questions[t.index];t.answered=q.options[Number(btn.dataset.index)];const right=t.answered===q.answer;t.correct+=Number(right);plus().grammarDone++;markAnswer(right);if(right)earned(5);else save();render();return true;}
    if(a==='plus-next-grammar'){ui.plusGrammar.index++;ui.plusGrammar.answered=null;render();return true;}
    if(a==='plus-start-verb'){startVerb(btn.dataset.tense);return true;}
    if(a==='plus-next-verb'){ui.plusVerb.index++;if(ui.plusVerb.index<ui.plusVerb.total)nextVerb();render();return true;}
    if(a==='plus-verb-hint'){speakItalian(ui.plusVerb.current.answer);return true;}
    if(a==='plus-tutor-home'){ui.plusTutor=null;ui.page='ai-tutor';render(true);return true;}
    if(a==='plus-tutor-start'){tutorStart(btn.dataset.id);return true;}
    if(a==='plus-tutor-hint'){ui.plusTutor.hints=!ui.plusTutor.hints;render();return true;}
    if(a==='plus-tutor-mic'){tutorMic();return true;}
    if(a==='plus-tutor-reset'){tutorStart(ui.plusTutor.scenario.id);return true;}
    if(a==='plus-save-ai-code'){sessionStorage.setItem('italian-ai-access',document.querySelector('#plus-access')?.value||'');toast('AI access code stored for this browser tab only.');return true;}
    if(a==='plus-generate-sync'){generateCode();return true;}
    if(a==='plus-save-sync'){const code=(document.querySelector('#plus-sync-code')?.value||'').trim();if(!/^[a-zA-Z0-9_-]{43}$/.test(code)){toast('Enter a valid 43-character code.');return true;}plus().sync={enabled:true,code,lastAt:plus().sync?.lastAt||0};save();toast('Sync code saved to this device.');return true;}
    if(a==='plus-copy-sync'){const code=plus().sync?.code;if(!code){toast('Generate a sync code first.');return true;}try{await navigator.clipboard.writeText(code);toast('Sync code copied. Keep it private.');}catch{toast('Use the code field to copy it manually.');}return true;}
    if(a==='plus-sync-now'){try{await uploadSync();render();}catch(e){toast('Sync failed: '+e.message);}return true;}
    if(a==='plus-load-sync'){try{await downloadSync();}catch(e){toast('Restore failed: '+e.message);}return true;}
    if(a==='plus-enable-push'){await pushEnable();return true;}
    if(a==='plus-disable-push'){await pushDisable();return true;}
    return false;
  }
  async function handleForm(form){if(form.id==='plus-verb-form'){answerVerb(new FormData(form).get('verb')||'');return true;}
    if(form.id==='plus-tutor-form'){const input=form.querySelector('input[name="message"]');const value=input?.value||'';if(input)input.value='';await sendTutor(value);return true;}
    if(form.id==='plus-api-form'){const raw=String(new FormData(form).get('endpoint')||'').trim().replace(/\/+$/,'');if(raw && !safeUrl(raw)){toast('Use an HTTPS URL without an embedded username or password.');return true;}state.settings.serverUrl=raw;save();render();toast(raw?'Backend address saved.':'Backend disconnected.');return true;}
    return false;
  }
  return {view:p=>({ 'listening-drills':listeningView,'grammar-drills':grammarView,'verb-trainer':verbView,'ai-tutor':tutorView}[p]||(()=>''))(),handleAction,handleForm,practiceTiles,speakTiles,homeTile,statsTile,networkTile,courseLevel,plus};
})();