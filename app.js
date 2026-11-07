/* Chat's Guide to Italian v1.0 · self-contained offline learning experience */
'use strict';

const LESSONS = [
  {id:'hello',unit:0,number:1,title:'Hello, Italian!',subtitle:'Greet someone with confidence',emoji:'👋',mins:5,
   words:[['Ciao','Hello / bye'],['Buongiorno','Good morning'],['Buonasera','Good evening'],['Arrivederci','Goodbye'],['Grazie','Thank you'],['Per favore','Please'],['Sì','Yes'],['No','No']],
   grammar:{title:'Formal or informal?',body:'Use ciao with friends. Buongiorno works for polite greetings during the day; arrivederci is a polite goodbye.',example:'Buongiorno! Grazie!',en:'Good morning! Thank you!'},
   fill:{before:'___! Come stai?',after:'',answer:'Ciao',en:'Hello! How are you?',hint:'A casual way to say hello'},
   grammarQ:{prompt:'Which greeting is a polite way to say “good morning”?',answer:'Buongiorno',options:['Ciao','Buongiorno','Arrivederci','Buonasera']}},
  {id:'introductions',unit:0,number:2,title:'Nice to meet you',subtitle:'Introduce yourself naturally',emoji:'🤝',mins:6,
   words:[['Mi chiamo…','My name is…'],['Come ti chiami?','What is your name?'],['Piacere','Nice to meet you'],['Come stai?','How are you?'],['Sto bene','I am well'],['E tu?','And you?'],['Scusa','Sorry / excuse me']],
   grammar:{title:'Introducing yourself',body:'Mi chiamo literally means “I call myself”. Ask Come ti chiami? when talking to someone informally.',example:'Ciao, mi chiamo Luca. Piacere!',en:'Hi, my name is Luca. Nice to meet you!'},
   fill:{before:'Mi ___ Marco.',after:'',answer:'chiamo',en:'My name is Marco.',hint:'Complete mi chiamo'},
   grammarQ:{prompt:'How do you ask a friend for their name?',answer:'Come ti chiami?',options:['Come stai?','E tu?','Come ti chiami?','Arrivederci']}},
  {id:'articles',unit:0,number:3,title:'People & things',subtitle:'Meet Italian nouns and articles',emoji:'📘',mins:6,
   words:[['Un libro','A book'],['Una casa','A house'],['Il ragazzo','The boy'],['La ragazza','The girl'],['La scuola','The school'],['Lo zaino','The backpack'],["L'amico",'The (male) friend']],
   grammar:{title:'Articles change with the noun',body:'Italian nouns have grammatical gender. Common singular definite articles include il (masculine) and la (feminine); lo and l’ are used in other cases.',example:'Il ragazzo ha un libro.',en:'The boy has a book.'},
   fill:{before:'___ ragazza',after:'',answer:'La',en:'The girl',hint:'The feminine singular definite article'},
   grammarQ:{prompt:'Choose the correct phrase for “the girl”.',answer:'La ragazza',options:['Il ragazzo','La ragazza','Lo zaino','Una casa']}},
  {id:'numbers',unit:1,number:4,title:'Numbers that count',subtitle:'Count and talk about quantities',emoji:'🔢',mins:5,
   words:[['Uno','One'],['Due','Two'],['Tre','Three'],['Quattro','Four'],['Cinque','Five'],['Dieci','Ten'],['Venti','Twenty']],
   grammar:{title:'Counting in Italian',body:'Numbers from one to five are uno, due, tre, quattro, cinque. Most numbers keep their form when counting.',example:'Ho due libri.',en:'I have two books.'},
   fill:{before:'Uno, due, ___',after:'',answer:'tre',en:'One, two, three',hint:'The number after two'},
   grammarQ:{prompt:'Which word means “ten”?',answer:'Dieci',options:['Venti','Cinque','Dieci','Due']}},
  {id:'family',unit:1,number:5,title:'Meet the family',subtitle:'Talk about the people in your life',emoji:'🏠',mins:6,
   words:[['La madre','The mother'],['Il padre','The father'],['Il fratello','The brother'],['La sorella','The sister'],['La famiglia','The family'],['I genitori','The parents']],
   grammar:{title:'Using la, il and i',body:'La usually introduces a feminine singular noun, il a masculine singular noun and i many masculine plural nouns.',example:'La mia famiglia è grande.',en:'My family is big.'},
   fill:{before:'La ___',after:'',answer:'famiglia',en:'The family',hint:'The Italian word for family'},
   grammarQ:{prompt:'Which phrase means “the parents”?',answer:'I genitori',options:['Il padre','I genitori','La sorella','La madre']}},
  {id:'food',unit:1,number:6,title:'At the café',subtitle:'Learn deliciously useful words',emoji:'☕',mins:7,
   words:[['Acqua','Water'],['Il pane','The bread'],['Il caffè','The coffee'],['La pizza','The pizza'],['Il gelato','The ice cream'],['Il conto','The bill'],['Il ristorante','The restaurant']],
   grammar:{title:'Ordering politely',body:'Vorrei means “I would like”. In a café you can say Vorrei un caffè, per favore. Ask for the bill with Il conto, per favore.',example:'Vorrei un caffè, per favore.',en:'I would like a coffee, please.'},
   fill:{before:'Il ___, per favore.',after:'',answer:'conto',en:'The bill, please.',hint:'What you ask for at the end of a meal'},
   grammarQ:{prompt:'What would you ask for when you want to pay?',answer:'Il conto',options:['La pizza','Il pane','Il conto','Acqua']}},
  {id:'school',unit:2,number:7,title:'School & learning',subtitle:'Words for your everyday routine',emoji:'🎒',mins:6,
   words:[['La lezione','The lesson'],["L'insegnante",'The teacher'],['Lo studente','The student'],['Il quaderno','The notebook'],['La penna','The pen'],['I compiti','The homework']],
   grammar:{title:'Using everyday nouns',body:'Italian often uses an article with nouns. For example, la penna is “the pen” and il quaderno is “the notebook”.',example:'Ho una penna e un quaderno.',en:'I have a pen and a notebook.'},
   fill:{before:'La ___',after:'',answer:'penna',en:'The pen',hint:'Something you write with'},
   grammarQ:{prompt:'Which word means “the homework”?',answer:'I compiti',options:['La lezione','I compiti','La penna','Il quaderno']}},
  {id:'essere',unit:2,number:8,title:'I am, you are',subtitle:'Master two essential verbs',emoji:'💬',mins:7,
   words:[['Io sono','I am'],['Tu sei','You are'],['Lui è','He is'],['Io ho','I have'],['Tu hai','You have'],['Noi siamo','We are']],
   grammar:{title:'Essere & avere',body:'Essere means “to be”: io sono, tu sei, lui/lei è, noi siamo. Avere means “to have”: io ho, tu hai. Pronouns are often omitted.',example:'Sono felice. Ho un libro.',en:'I am happy. I have a book.'},
   fill:{before:'Io ___ felice.',after:'',answer:'sono',en:'I am happy.',hint:'The io form of essere'},
   grammarQ:{prompt:'Which form means “you have” (informal)?',answer:'Tu hai',options:['Tu sei','Io ho','Tu hai','Noi siamo']}},
  {id:'travel',unit:2,number:9,title:'Getting around',subtitle:'Find your way through Italy',emoji:'🚆',mins:7,
   words:[['Il treno','The train'],['La stazione','The station'],['Il biglietto','The ticket'],["L'aeroporto",'The airport'],["Dov'è?",'Where is it?'],['A destra','To the right'],['A sinistra','To the left']],
   grammar:{title:'Asking for directions',body:'Dov’è comes from dove + è, meaning “where is”. Add a place: Dov’è la stazione? Listen for a destra (right) or a sinistra (left).',example:'Scusa, dov’è la stazione?',en:'Excuse me, where is the station?'},
   fill:{before:'A ___',after:'',answer:'destra',en:'To the right',hint:'Opposite of left'},
   grammarQ:{prompt:'How do you say “to the left”?',answer:'A sinistra',options:['A destra','Dov’è?','A sinistra','La stazione']}},
  {id:'shopping',unit:3,number:10,title:'Shopping in Italian',subtitle:'Ask for prices and buy what you need',emoji:'🛍️',mins:7,
   words:[['Quanto costa?','How much does it cost?'],['Il negozio','The shop'],['I soldi','The money'],['Caro','Expensive'],['Economico','Inexpensive'],['Vorrei','I would like'],['Questo','This']],
   grammar:{title:'Simple shopping questions',body:'Quanto costa? asks how much something costs. Vorrei (I would like) is polite when asking to buy an item.',example:'Quanto costa questo? Vorrei comprarlo.',en:'How much does this cost? I would like to buy it.'},
   fill:{before:'Quanto ___?',after:'',answer:'costa',en:'How much does it cost?',hint:'A question about price'},
   grammarQ:{prompt:'Which phrase politely begins an order?',answer:'Vorrei',options:['Caro','Questo','Vorrei','I soldi']}},
  {id:'sport',unit:3,number:11,title:'Let’s play!',subtitle:'Talk about sport and activities',emoji:'⚽',mins:6,
   words:[['Il calcio','Football / soccer'],['La corsa','Running'],['Giocare','To play'],['La squadra','The team'],['La partita','The match'],['Vincere','To win']],
   grammar:{title:'Talking about what you like',body:'Mi piace means “I like” and works with one activity or an infinitive verb. For instance: Mi piace giocare a calcio.',example:'Mi piace giocare a calcio.',en:'I like playing football.'},
   fill:{before:'Mi piace ___ a calcio.',after:'',answer:'giocare',en:'I like playing football.',hint:'The Italian infinitive for “to play”'},
   grammarQ:{prompt:'Which word means “the team”?',answer:'La squadra',options:['La partita','La corsa','La squadra','Vincere']}},
  {id:'essentials',unit:3,number:12,title:'Speak with confidence',subtitle:'Useful phrases for real conversations',emoji:'✨',mins:8,
   words:[['Non capisco',"I don't understand"],['Può ripetere?', 'Could you repeat? (formal)'],['Parli inglese?', 'Do you speak English? (formal)'],["Parlo un po’ d’italiano",'I speak a little Italian'],['Ho bisogno di aiuto','I need help'],["Dov'è il bagno?",'Where is the bathroom?']],
   grammar:{title:'Polite questions',body:'Use può and parli for formal address. Add per favore to make a request sound more polite. It is fine to ask someone to repeat themselves.',example:'Scusi, può ripetere, per favore?',en:'Excuse me, could you repeat, please?'},
   fill:{before:'Non ___',after:'',answer:'capisco',en:"I don't understand",hint:'The Italian word for “understand” in this phrase'},
   grammarQ:{prompt:'How would you politely ask someone to repeat?',answer:'Può ripetere?',options:['Parli inglese?','Può ripetere?','Non capisco',"Dov'è il bagno?"]}}
];
const UNITS = [
  {name:'First steps',subtitle:'Make your first Italian connections',emoji:'🌱',color:'green'},
  {name:'Everyday Italian',subtitle:'Numbers, family and café essentials',emoji:'🌞',color:'amber'},
  {name:'Your everyday world',subtitle:'School, verbs and finding your way',emoji:'🧭',color:'blue'},
  {name:'Feel at home',subtitle:'Shopping, sport and better conversations',emoji:'🏡',color:'purple'}
];
const PHRASES = [
  ['Buongiorno!','Good morning!','Greetings'],['Come stai?','How are you?','Greetings'],['Mi chiamo…','My name is…','Greetings'],['Piacere di conoscerti.','Nice to meet you.','Greetings'],
  ['Vorrei un tavolo per due.','I would like a table for two.','Dining'],['Il menù, per favore.','The menu, please.','Dining'],['Vorrei una pizza, per favore.','I would like a pizza, please.','Dining'],['Il conto, per favore.','The bill, please.','Dining'],
  ["Dov'è la stazione?",'Where is the station?','Travel'],['Un biglietto, per favore.','One ticket, please.','Travel'],['A destra.','To the right.','Travel'],['A sinistra.','To the left.','Travel'],
  ['Quanto costa?','How much does it cost?','Shopping'],['Posso pagare con la carta?','Can I pay by card?','Shopping'],['Sto solo guardando.','I am just looking.','Shopping'],
  ['Non capisco.','I do not understand.','Help'],['Può parlare più lentamente?','Can you speak more slowly?','Help'],['Parla inglese?','Do you speak English? (formal)','Help'],['Ho bisogno di aiuto.','I need help.','Help']
];
const CULTURE = [
  {emoji:'☕',title:'Coffee, Italian-style',tag:'Food & drink',text:'In Italy, un caffè usually means an espresso. Cappuccino is commonly associated with breakfast, but there is no rule stopping you ordering one later.',tip:'Try saying: «Un caffè, per favore.»'},
  {emoji:'👋',title:'A greeting changes everything',tag:'Daily life',text:'It is common to greet staff when entering a small shop. Buongiorno during the day and buonasera later in the day are polite choices.',tip:'Start with a friendly «Buongiorno!»'},
  {emoji:'🍝',title:'Food from many regions',tag:'Cuisine',text:'Italian cooking varies enormously by region. Risotto is closely associated with northern Italy, while many famous pasta dishes are associated with particular cities and regions.',tip:'Different places have different specialties.'},
  {emoji:'🏛️',title:'A country of many cities',tag:'Places',text:'Rome is Italy’s capital, but places such as Florence, Naples, Bologna, Venice and Palermo have distinct traditions and histories.',tip:'Roma = Rome; Firenze = Florence; Venezia = Venice.'},
  {emoji:'⚽',title:'Football is calcio',tag:'Sport',text:'Association football is called calcio in Italian. Clubs, local rivalries and national-team matches are major parts of the country’s sporting culture.',tip:'«Mi piace il calcio.» means «I like football.»'},
  {emoji:'🎭',title:'A language with a melody',tag:'Language',text:'Italian spelling is comparatively regular, and stress matters. Double consonants can change meanings, so listen carefully to how long a consonant is held.',tip:'Compare pala (shovel) with palla (ball).'}
];
const CONVERSATIONS = [
  {id:'meet',emoji:'👋',title:'Meet someone',subtitle:'Say hello and introduce yourself',steps:[
    {bot:'Ciao! Come ti chiami?',en:'Hi! What is your name?',options:[['Mi chiamo Alex.','My name is Alex.'],['Il conto, per favore.','The bill, please.'],['A sinistra.','To the left.']],correct:0},
    {bot:'Piacere! Come stai?',en:'Nice to meet you! How are you?',options:[['Sto bene, grazie.','I am well, thanks.'],['Un biglietto, per favore.','A ticket, please.'],['Quanto costa?','How much?']],correct:0},
    {bot:'Bene! Parli italiano?',en:'Great! Do you speak Italian?',options:[['Parlo un po’ d’italiano.','I speak a little Italian.'],['La stazione è a destra.','The station is on the right.'],['Il menù, per favore.','The menu, please.']],correct:0}]},
  {id:'cafe',emoji:'☕',title:'At the café',subtitle:'Order a drink and ask to pay',steps:[
    {bot:'Buongiorno! Che cosa desidera?',en:'Good morning! What would you like?',options:[['Vorrei un caffè, per favore.','I would like a coffee, please.'],['Dov’è il treno?','Where is the train?'],['Mi chiamo Luca.','My name is Luca.']],correct:0},
    {bot:'Certamente! Desidera altro?',en:'Certainly! Anything else?',options:[['No, grazie.','No, thank you.'],['Sono un insegnante.','I am a teacher.'],['La mia squadra vince.','My team wins.']],correct:0},
    {bot:'Ecco il suo caffè!',en:'Here is your coffee!',options:[['Il conto, per favore.','The bill, please.'],['Come ti chiami?','What is your name?'],['Dov’è la scuola?','Where is the school?']],correct:0}]},
  {id:'travel',emoji:'🚆',title:'At the station',subtitle:'Ask for directions and buy a ticket',steps:[
    {bot:'Buongiorno! Posso aiutarla?',en:'Good morning! Can I help you?',options:[['Dov’è la stazione?','Where is the station?'],['Vorrei una pizza.','I would like a pizza.'],['Sono felice.','I am happy.']],correct:0},
    {bot:'È qui vicino. Desidera un biglietto?',en:'It is nearby. Would you like a ticket?',options:[['Un biglietto, per favore.','One ticket, please.'],['Un gelato, per favore.','One ice cream, please.'],['Gioco a calcio.','I play football.']],correct:0},
    {bot:'Perfetto. Buon viaggio!',en:'Perfect. Have a good journey!',options:[['Grazie! Arrivederci!','Thank you! Goodbye!'],['Quanto costa la pizza?','How much is the pizza?'],['La sorella è qui.','The sister is here.']],correct:0}]}
];
const FILL_PRACTICE = [
  {unit:0,before:'___, mi chiamo Sara.',after:'',answer:'Ciao',translation:'Hi, my name is Sara.',hint:'A casual greeting'},
  {unit:0,before:'___!',after:'',answer:'Grazie',translation:'Thank you!',hint:'The Italian word for thank you'},
  {unit:0,before:'___ ti chiami?',after:'',answer:'Come',translation:'What is your name?',hint:'The first word of the question'},
  {unit:0,before:'Sto ___, grazie.',after:'',answer:'bene',translation:'I am well, thank you.',hint:'The word for well'},
  {unit:1,before:'Uno, ___, tre.',after:'',answer:'due',translation:'One, two, three.',hint:'The number two'},
  {unit:1,before:'La mia ___ è grande.',after:'',answer:'famiglia',translation:'My family is big.',hint:'The word for family'},
  {unit:1,before:'Il ___, per favore.',after:'',answer:'conto',translation:'The bill, please.',hint:'Ask for it when paying'},
  {unit:2,before:'Io ___ uno studente.',after:'',answer:'sono',translation:'I am a student.',hint:'The io form of essere'},
  {unit:2,before:'___ la stazione?',after:'',answer:'Dov’è',translation:'Where is the station?',hint:'Where is'},
  {unit:2,before:'A ___',after:'',answer:'sinistra',translation:'To the left',hint:'Opposite of right'},
  {unit:3,before:'Quanto ___?',after:'',answer:'costa',translation:'How much does it cost?',hint:'Talking about prices'},
  {unit:3,before:'Mi piace ___ a calcio.',after:'',answer:'giocare',translation:'I like playing football.',hint:'To play'},
  {unit:3,before:'Non ___',after:'',answer:'capisco',translation:'I do not understand.',hint:'Understand in Italian'}
];
const WRITING_PRACTICE = [
 {unit:0,en:'Hello!',it:'Ciao!',accept:['ciao']},
 {unit:0,en:'Thank you.',it:'Grazie.',accept:['grazie']},
 {unit:0,en:'Good morning.',it:'Buongiorno.',accept:['buongiorno']},
 {unit:0,en:'My name is Marco.',it:'Mi chiamo Marco.',accept:['mi chiamo marco']},
 {unit:0,en:'How are you?',it:'Come stai?',accept:['come stai']},
 {unit:1,en:'One, two, three.',it:'Uno, due, tre.',accept:['uno due tre']},
 {unit:1,en:'The family.',it:'La famiglia.',accept:['la famiglia']},
 {unit:1,en:'The bill, please.',it:'Il conto, per favore.',accept:['il conto per favore']},
 {unit:2,en:'I am well.',it:'Sto bene.',accept:['sto bene']},
 {unit:2,en:'Where is the station?',it:'Dov’è la stazione?',accept:['dove è la stazione','dovè la stazione','dov e la stazione']},
 {unit:2,en:'To the left.',it:'A sinistra.',accept:['a sinistra']},
 {unit:3,en:'How much does it cost?',it:'Quanto costa?',accept:['quanto costa']},
 {unit:3,en:'I do not understand.',it:'Non capisco.',accept:['non capisco']},
 {unit:3,en:'I would like a coffee, please.',it:'Vorrei un caffè, per favore.',accept:['vorrei un caffe per favore']}
];

const STORE_KEY='chats-guide-italian-v1';
const DEFAULT_QUICK=['learn','flashcards','speak','dictionary'];
const sectionNames={learn:'Lessons',flashcards:'Flashcards',speak:'Speaking',dictionary:'Dictionary',matching:'Matching',writing:'Writing',fill:'Fill in the blank',phrasebook:'Phrasebook'};
const sectionIcons={learn:'book-open',flashcards:'layers',speak:'mic',dictionary:'search',matching:'grid',writing:'pen',fill:'edit',phrasebook:'map'};
function blankState(){return {version:1,xp:0,completed:[],attempts:0,correct:0,activity:{},reviews:{},settings:{theme:'system',speed:0.85,dailyXP:30,weeklyLessons:3,reminders:true,quick:DEFAULT_QUICK.slice()},flags:{},started:Date.now()};}
function loadState(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORE_KEY));
    if(!saved||saved.version!==1||typeof saved!=='object') return blankState();
    const d=blankState();return {...d,...saved,completed:Array.isArray(saved.completed)?saved.completed.filter(id=>LESSONS.some(l=>l.id===id)):[],activity:saved.activity&&typeof saved.activity==='object'?saved.activity:{},reviews:saved.reviews&&typeof saved.reviews==='object'?saved.reviews:{},flags:saved.flags&&typeof saved.flags==='object'?saved.flags:{},settings:{...d.settings,...saved.settings,quick:Array.isArray(saved.settings?.quick)?saved.settings.quick.filter(k=>sectionNames[k]):DEFAULT_QUICK.slice()}};
  }catch{return blankState();}
}
let state=loadState();
const ui={page:'home',lessonId:null,lessonIndex:0,phase:'preview',quiz:[],answerFeedback:null,cardFlipped:false,flashDeck:[],flashIndex:0,flashFlipped:false,match:null,practice:null,practiceFeedback:null,conv:null,convIndex:0,convFeedback:null,search:'',phraseFilter:'All',expandedCulture:null,importOpen:false};
const app=document.querySelector('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g,' ').replace(/\s+/g,' ').trim();
const normLoose=s=>norm(s).replace(/'/g,'').replace(/\s/g,'');
const shuffled=a=>[...a].sort(()=>Math.random()-0.5);
const pad=n=>String(n).padStart(2,'0');
function dayKey(d=new Date()){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;}
function pastDay(days){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-days);return dayKey(d);}
function weekKey(){const d=new Date();d.setHours(12,0,0,0);const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return dayKey(d);}
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch{toast('Unable to save progress. Check available device storage.');}}
function statsToday(){return state.activity[dayKey()]||{xp:0,lessons:0,reviewed:0,spoken:0};}
function earned(n,field,flag){
  const k=dayKey(),a=state.activity[k]||{xp:0,lessons:0,reviewed:0,spoken:0};a.xp+=n;
  if(field)a[field]=(a[field]||0)+1;
  state.activity[k]=a;state.xp+=n;
  if(flag)state.flags[flag]=true;
  if(getStreak()>=7)state.flags.sevenDay=true;
  save();
}
function markAnswer(right){state.attempts++;if(right)state.correct++;save();}
function getStreak(){let count=0,offset=(state.activity[dayKey()]?.xp||0)>0?0:1;while((state.activity[pastDay(offset)]?.xp||0)>0){count++;offset++;}return count;}
function weekLessons(){const monday=weekKey();return Object.entries(state.activity).filter(([day])=>day>=monday).reduce((sum,[,a])=>sum+(a.lessons||0),0);}
function level(){return Math.floor(state.xp/150)+1;}
function levelPercent(){return Math.round((state.xp%150)/150*100);}
function learnedWords(){const ids=new Set(state.completed);const available=LESSONS.filter(l=>ids.has(l.id));return available.flatMap(l=>l.words.map(([it,en],i)=>({id:`${l.id}-${i}`,it,en,lesson:l})));}
function accessibleWords(){const next=LESSONS.find(l=>!state.completed.includes(l.id))||LESSONS[LESSONS.length-1];const ids=new Set([...state.completed,next.id]);return LESSONS.filter(l=>ids.has(l.id)).flatMap(l=>l.words.map(([it,en],i)=>({id:`${l.id}-${i}`,it,en,lesson:l})));}
const ALL_WORDS=LESSONS.flatMap(l=>l.words.map(([it,en],i)=>({id:`${l.id}-${i}`,it,en,lesson:l})));
function nextLesson(){return LESSONS.find(l=>!state.completed.includes(l.id))||LESSONS[LESSONS.length-1];}
function dueWords(){const now=Date.now();return learnedWords().filter(w=>!state.reviews[w.id] || Number(state.reviews[w.id].dueAt)<=now);}
function todayWord(){const seed=Number(dayKey().replace(/-/g,''));return ALL_WORDS[seed%ALL_WORDS.length];}
function accuracy(){return state.attempts?Math.round(state.correct/state.attempts*100):0;}
function isUnlocked(l){return l.number===1||state.completed.includes(LESSONS[l.number-2].id);}
function toast(message){const existing=document.querySelector('.toast');if(existing)existing.remove();const d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=message;document.body.appendChild(d);setTimeout(()=>d.remove(),3200);}
function hasRecognition(){return Boolean(window.SpeechRecognition||window.webkitSpeechRecognition);}
function speakItalian(text){
 if(!('speechSynthesis' in window)){toast('Audio playback is not supported in this browser.');return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.replace(/…/g,' '));u.lang='it-IT';u.rate=Number(state.settings.speed)||0.85;u.pitch=1;
 const voices=window.speechSynthesis.getVoices();const italian=voices.find(v=>v.lang.toLowerCase()==='it-it')||voices.find(v=>v.lang.toLowerCase().startsWith('it'));if(italian)u.voice=italian;
 window.speechSynthesis.speak(u);
}
const ICONS={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
'book-open':'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h2c2 0 4 1 5 3 1-2 3-3 5-3h2a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2h-2c-2 0-4 1-5 3-1-2-3-3-5-3H5a2 2 0 0 0-2 2z"/>',
'check':'<path d="m4 12 5 5L20 6"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.08.08-2.83 2.83-.08-.08A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.56V21H10v-.04A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.08.08-2.83-2.83.08-.08A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3v-4h.04A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.08-.08 2.83-2.83.08.08A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.04V3h4v.04A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.08-.08 2.83 2.83-.08.08A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1H21v4h-.04A1.7 1.7 0 0 0 19.4 15z"/>',
'chart':'<rect x="3" y="11" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/>',
'headphones':'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h3v6H4a1 1 0 0 1-1-1zm18 0h-3v6h2a1 1 0 0 0 1-1z"/>',
'mic':'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8"/>',
'play':'<path d="m8 5 11 7-11 7z"/>',
'volume':'<path d="M3 9v6h4l5 4V5L7 9zm13-2a7 7 0 0 1 0 10m2-13a11 11 0 0 1 0 16"/>',
'arrow-right':'<path d="M4 12h16m-7-7 7 7-7 7"/>',
'arrow-left':'<path d="M20 12H4m7-7-7 7 7 7"/>',
'chevron-right':'<path d="m9 18 6-6-6-6"/>',
'lock':'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
'flame':'<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 3-2 4-3 4 1-4-1-7-4-10 0 4-3 6-3 12 0 5 3 8 7 8z"/>',
'award':'<circle cx="12" cy="8" r="6"/><path d="m8.2 13-1 9 4.8-3 4.8 3-1-9"/>',
'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
'layers':'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M6 20h12M6 1h12"/>',
'grid':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
'pen':'<path d="m4 20 4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20zm10-12 3 3"/>',
'edit':'<path d="M4 4h16v16H4zM8 8h8m-8 4h8m-8 4h4"/>',
'map':'<path d="M3 5 9 3l6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16"/>',
'compass':'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.4 1.4m11.34 11.34 1.4 1.4M2 12h2m16 0h2M4.93 19.07l1.4-1.4M17.67 6.33l1.4-1.4"/>',
'moon':'<path d="M21 13a9 9 0 0 1-10-10A9 9 0 1 0 21 13z"/>',
'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
'help':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.8 2.8 0 0 1 5 1.7c0 1.6-2.5 2-2.5 3M12 17h.01"/>',
'download':'<path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/>',
'upload':'<path d="M12 21V8m-5 5 5-5 5 5M4 6V3h16v3"/>',
'rotate':'<path d="M3 11a9 9 0 0 1 16-5l2 2m0-6v6h-6M21 13a9 9 0 0 1-16 5l-2-2m0 6v-6h6"/>',
'up':'<path d="m6 15 6-6 6 6"/>',
'down':'<path d="m6 9 6 6 6-6"/>'};
const icon=(name,size=19)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.home}</svg>`;
function percent(v,max){return Math.max(0,Math.min(100,Math.round((v/(max||1))*100)));}
function progressBar(value,max,colour='green'){return `<div class="progress-track"><div class="progress-fill ${colour}" style="width:${percent(value,max)}%"></div></div>`;}
function circleProgress(n){const p=percent(n,LESSONS.length),c=2*Math.PI*39;return `<div class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="39" class="ring-base"/><circle cx="50" cy="50" r="39" class="ring-actual" stroke-dasharray="${c}" stroke-dashoffset="${c*(100-p)/100}" /></svg><div class="ring-label"><strong>${p}%</strong><small>complete</small></div></div>`;}
function smallButton(action,label,icn,extra=''){return `<button type="button" class="icon-button ${extra}" data-action="${action}" aria-label="${esc(label)}" title="${esc(label)}">${icon(icn)}</button>`;}
function audioButton(text,label='Listen'){return `<button type="button" class="audio-button" data-action="audio" data-text="${esc(text)}" aria-label="${esc(label)}">${icon('volume',16)}<span>${esc(label)}</span></button>`;}
function header(){return `<header class="topbar"><button class="brand" data-action="navigate" data-page="home" aria-label="Home"><span class="brand-mark">Ci<span>.</span></span><span class="brand-text">Chat's Guide <em>to Italian</em></span></button><div class="top-actions"><span class="level-pill">✦ Level ${level()}</span>${smallButton('stats','Statistics','chart')}${smallButton('settings','Settings','settings')}</div></header>`;}
function navigation(){const tabs=[['home','Home','home'],['learn','Learn','book-open'],['practice','Practice','layers'],['speak','Speak','mic'],['explore','Explore','compass']];const active=['lesson'].includes(ui.page)?'learn':['flashcards','matching','fill','writing'].includes(ui.page)?'practice':['dictionary','phrasebook','culture'].includes(ui.page)?'explore':['conversation'].includes(ui.page)?'speak':ui.page;return `<nav class="navigation" aria-label="Main navigation"><div class="nav-inner">${tabs.map(([key,name,sym])=>`<button class="nav-item ${active===key?'active':''}" data-action="navigate" data-page="${key}" ${active===key?'aria-current="page"':''}>${icon(sym,21)}<span>${name}</span></button>`).join('')}</div></nav>`;}
function sectionHeader(title,subtitle='',back=null){return `<div class="section-top">${back?`<button class="back-link" data-action="navigate" data-page="${back}">${icon('arrow-left',17)} Back</button>`:''}<div><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div></div>`;}
function home(){const next=nextLesson(),completed=state.completed.length,today=statsToday(),due=dueWords().length,word=todayWord(),last=state.activity[pastDay(1)]?.xp||0;
 const recentReminder=state.settings.reminders && !today.xp && Object.keys(state.activity).length>0 && new Date().getHours()>=15;
 return `<div class="page home">
  <div class="hero"><div class="hero-copy"><span class="eyebrow">IL TUO ITALIANO, OGNI GIORNO 🇮🇹</span><h1>${new Date().getHours()<12?'Buongiorno!':new Date().getHours()<18?'Buon pomeriggio!':'Buonasera!'}</h1><p>One small lesson today. A little more Italian tomorrow.</p><button class="btn btn-light" data-action="open-lesson" data-id="${next.id}">${icon('play',18)} ${completed===LESSONS.length?'Review a lesson':'Continue learning'} ${icon('arrow-right',18)}</button></div><div class="hero-deco" aria-hidden="true"><div class="hero-orbit orbit-a"></div><div class="hero-orbit orbit-b"></div><span class="hero-hello">Ciao!</span><span class="hero-star one">✦</span><span class="hero-star two">✳</span></div></div>
  ${recentReminder?`<div class="notice">${icon('calendar',18)} <span>Make a little time for Italian today—your daily goal is ready.</span></div>`:''}
  <div class="stats-mini"><div class="mini-stat"><span class="mini-icon orange">${icon('flame')}</span><div><strong>${getStreak()} <span>days</span></strong><small>Learning streak</small></div></div><div class="mini-stat"><span class="mini-icon violet">${icon('award')}</span><div><strong>${state.xp} <span>XP</span></strong><small>Total earned</small></div></div><div class="mini-stat"><span class="mini-icon blue">${icon('book-open')}</span><div><strong>${completed}<span> / ${LESSONS.length}</span></strong><small>Lessons finished</small></div></div></div>
  <div class="home-columns"><section class="panel today-panel"><div class="panel-heading"><div><h2>Today's goal</h2><p>Every little bit counts</p></div><span class="pill subtle">${percent(today.xp,state.settings.dailyXP)}%</span></div><div class="goal-main"><strong>${today.xp} <small>/ ${state.settings.dailyXP} XP</small></strong>${progressBar(today.xp,state.settings.dailyXP)}</div><div class="goal-row"><span>Weekly lessons</span><strong>${weekLessons()} / ${state.settings.weeklyLessons}</strong></div>${progressBar(weekLessons(),state.settings.weeklyLessons,'blue')}<button class="text-button" data-action="settings">Edit my goals ${icon('chevron-right',15)}</button></section>
  <section class="panel current-panel"><div class="panel-heading"><div><h2>Your learning path</h2><p>Keep your momentum going</p></div>${circleProgress(completed)}</div><div class="current-lesson"><div class="lesson-emoji">${next.emoji}</div><div class="grow"><span class="eyebrow muted">LESSON ${next.number} · ${next.mins} MIN</span><h3>${esc(next.title)}</h3><p>${esc(next.subtitle)}</p></div></div><button class="btn btn-primary btn-wide" data-action="open-lesson" data-id="${next.id}">Start lesson ${icon('arrow-right',18)}</button></section></div>
  <div class="panel-heading heading-outside"><div><h2>Jump back in</h2><p>Your favourite ways to practise</p></div><button class="text-button" data-action="settings">Customise ${icon('chevron-right',15)}</button></div>
  <div class="quick-grid">${state.settings.quick.map((key,i)=>`<button class="quick-card" data-action="open-quick" data-key="${key}"><span class="quick-icon quick-${i%4}">${icon(sectionIcons[key]||'book-open',23)}</span><strong>${esc(sectionNames[key]||key)}</strong><span>Open ${icon('chevron-right',14)}</span></button>`).join('')||'<div class="empty-note">Add quick links in Settings.</div>'}</div>
  <div class="home-columns bottom-home"><section class="panel word-card"><div class="panel-heading"><div><h2>Word of the day</h2><p>A tiny piece of Italian</p></div><span class="word-spark">✳</span></div><div class="big-italian">${esc(word.it)}</div><div class="word-translation">${esc(word.en)}</div>${audioButton(word.it,'Hear it')}</section>
  <section class="panel"><div class="panel-heading"><div><h2>Time to review?</h2><p>Words you’re ready to revisit</p></div><span class="due-number">${due}</span></div><p class="review-desc">${due?`${due} vocabulary ${due===1?'card is':'cards are'} due for smart review.`:'Finish a lesson to unlock vocabulary reviews.'}</p><button class="btn btn-outline btn-wide" data-action="start-flashcards">${icon('layers',18)} Review flashcards</button></section></div>
  </div>`;
}
function learn(){return `<div class="page">${sectionHeader('Your learning path','Build your Italian one lesson at a time.')}
 <div class="path-overview"><div><span class="eyebrow muted">STARTER COURSE · A1</span><h2>From your first “ciao” to conversations</h2><p>${state.completed.length} of ${LESSONS.length} lessons finished</p></div>${circleProgress(state.completed.length)}</div>
 <div class="unit-list">${UNITS.map((unit,i)=>`<section class="unit-block"><div class="unit-heading"><span class="unit-emoji unit-${unit.color}">${unit.emoji}</span><div><span class="eyebrow muted">UNIT ${i+1}</span><h2>${unit.name}</h2><p>${unit.subtitle}</p></div><span class="unit-count">${LESSONS.filter(l=>l.unit===i&&state.completed.includes(l.id)).length}/3</span></div><div class="lesson-list">${LESSONS.filter(l=>l.unit===i).map(l=>{const done=state.completed.includes(l.id),unlocked=isUnlocked(l);return `<button class="lesson-row ${done?'done':''} ${unlocked?'':'locked'}" data-action="open-lesson" data-id="${l.id}" ${unlocked?'':'disabled'}><span class="lesson-medal">${done?icon('check',23):unlocked?l.emoji:icon('lock',19)}</span><span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(l.subtitle)}</small></span><span class="lesson-right">${done?'<span class="complete-mark">Complete</span>':unlocked?`<span>${l.mins} min</span>`:'<span>Locked</span>'}${icon('chevron-right',18)}</span></button>`;}).join('')}</div></section>`).join('')}</div>
 <div class="info-strip">${icon('help',18)} More beginner and intermediate units can be added after this first A1 course.</div></div>`;}
function buildQuiz(l){let entries=l.words.map(([it,en])=>({it,en}));const selected=shuffled(entries).slice(0,5);const questions=selected.map((v,i)=>{
 const isItToEn=i<3;const correct=isItToEn?v.en:v.it;const wrong=shuffled(entries.filter(w=>w.it!==v.it).map(w=>isItToEn?w.en:w.it)).slice(0,3);
 return {type:'choice',prompt:isItToEn?`What does “${v.it}” mean?`:`Choose the Italian for “${v.en}”.`,answer:correct,options:shuffled([...wrong,correct]),note:isItToEn?`${v.it} = ${v.en}`:`${v.en} = ${v.it}`};});
 questions.push({type:'input',prompt:`Complete the phrase: ${l.fill.before} ${l.fill.after}`,answer:l.fill.answer,translation:l.fill.en,note:`${l.fill.hint}. ${l.fill.en}`});
 questions.push({type:'choice',prompt:l.grammarQ.prompt,answer:l.grammarQ.answer,options:l.grammarQ.options,note:l.grammar.body});return questions;
}
function openLesson(id){const l=LESSONS.find(x=>x.id===id);if(!l||!isUnlocked(l)){toast('Complete the previous lesson to unlock this one.');return;}ui.lessonId=id;ui.lessonIndex=0;ui.phase='preview';ui.quiz=buildQuiz(l);ui.answerFeedback=null;ui.page='lesson';render(true);}
function lessonView(){const l=LESSONS.find(x=>x.id===ui.lessonId)||nextLesson();const len=l.words.length;const preview=ui.phase==='preview',step=ui.lessonIndex,percentDone=preview?percent(step,len+1):percent(step,ui.quiz.length);
 let content='';
 if(preview){
  if(step<len){const [it,en]=l.words[step];content=`<div class="flash-preview"><span class="eyebrow muted">NEW WORD ${step+1} OF ${len}</span><div class="lesson-big-word">${esc(it)}</div><div class="lesson-meaning">${esc(en)}</div>${audioButton(it,'Hear pronunciation')}<p class="muted small-note">Listen to the word, then continue.</p></div>`;
  }else{content=`<div class="grammar-preview"><span class="eyebrow muted">MINI GRAMMAR</span><div class="grammar-emoji">📖</div><h2>${esc(l.grammar.title)}</h2><p>${esc(l.grammar.body)}</p><div class="example"><strong>${esc(l.grammar.example)}</strong><span>${esc(l.grammar.en)}</span>${audioButton(l.grammar.example,'Listen')}</div></div>`;}
 }else if(ui.phase==='quiz'){
   const q=ui.quiz[step];if(!q){finishLesson();return '';}const feedback=ui.answerFeedback;
   content=`<div class="quiz-area"><span class="eyebrow muted">CHECKPOINT ${step+1} OF ${ui.quiz.length}</span><h2>${esc(q.prompt)}</h2>${q.type==='choice'?`<div class="option-list">${q.options.map(opt=>`<button class="answer-option ${feedback?(normLoose(opt)===normLoose(q.answer)?'correct-choice':normLoose(opt)===normLoose(feedback.selected)?'wrong-choice':''):''}" data-action="quiz-choice" data-value="${esc(opt)}" ${feedback?'disabled':''}>${esc(opt)}${feedback&&normLoose(opt)===normLoose(q.answer)?icon('check',18):''}</button>`).join('')}</div>`:`<form id="quiz-form" class="text-answer-form"><label for="quiz-answer">Your answer in Italian</label><input id="quiz-answer" name="answer" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Type the missing word…" ${feedback?'disabled':''} required><button type="submit" class="btn btn-primary" ${feedback?'disabled':''}>Check answer</button></form>`}
   ${feedback?`<div class="answer-feedback ${feedback.right?'success':'needs-work'}"><strong>${feedback.right?'Correct! Benissimo!':'Good try!'} </strong><span>${feedback.right?esc(q.note):`Correct answer: ${esc(q.answer)}. ${esc(q.note)}`}</span></div>`:''}</div>`;
 }else{
   content=`<div class="lesson-done"><div class="celebration">🎉</div><span class="eyebrow muted">LESSON COMPLETE</span><h2>Fantastico!</h2><p>You finished <strong>${esc(l.title)}</strong>.</p><div class="finish-cards"><div><strong>${ui.lessonScore||0}/${ui.quiz.length}</strong><span>Correct answers</span></div><div><strong>+${ui.lastEarned||0}</strong><span>XP earned</span></div></div><button class="btn btn-primary btn-wide" data-action="navigate" data-page="learn">Continue your journey ${icon('arrow-right')}</button><button class="btn btn-ghost btn-wide" data-action="open-lesson" data-id="${l.id}">Practise this lesson again</button></div>`;
 }
 return `<div class="page lesson-page"><div class="lesson-top"><button class="icon-button" data-action="navigate" data-page="learn" aria-label="Close lesson">✕</button><div class="lesson-track">${progressBar(percentDone,100)}</div><span class="lesson-counter">${preview?'Learn':'Quiz'}</span></div><div class="lesson-heading"><span class="eyebrow muted">LESSON ${l.number}</span><h1>${esc(l.title)}</h1><p>${esc(l.subtitle)}</p></div><div class="lesson-content">${content}</div>${preview?`<button class="btn btn-primary btn-wide lesson-next" data-action="lesson-preview-next">${step<len?'Next word':'Start checkpoint'} ${icon('arrow-right',19)}</button>`:ui.phase==='quiz'&&ui.answerFeedback?`<button class="btn btn-primary btn-wide lesson-next" data-action="lesson-quiz-next">${step===ui.quiz.length-1?'Finish lesson':'Next question'} ${icon('arrow-right',19)}</button>`:''}</div>`;
}
function finishLesson(){const l=LESSONS.find(x=>x.id===ui.lessonId);if(!l)return;const old=state.completed.includes(l.id);if(!old)state.completed.push(l.id);const gained=old?10:20+(ui.lessonScore||0)*8;earned(gained,'lessons','firstLesson');if((ui.lessonScore||0)===ui.quiz.length)state.flags.perfectLesson=true;save();ui.phase='done';ui.lastEarned=gained;render(true);}
function practiceHome(){const due=dueWords().length;return `<div class="page">${sectionHeader('Practice makes progress','Different ways to turn new words into real skills.')}
  <div class="practice-feature"><div><span class="eyebrow">SMART REVIEW</span><h2>Make it stick.</h2><p>Review words at the right time so they stay in your memory.</p><button class="btn btn-light" data-action="start-flashcards">Review ${due||'some'} cards ${icon('arrow-right',17)}</button></div><span aria-hidden="true">🧠</span></div>
  <div class="practice-grid">${[
    ['flashcards','🗂️','Vocabulary flashcards','Flip, recall and review words'],['matching','🧩','Word matching','Connect Italian with English'],['fill','✍️','Fill in the blanks','Complete useful sentences'],['writing','📝','Writing practice','Translate sentences into Italian']
  ].map(([id,emoji,title,desc])=>`<button class="activity-card" data-action="open-quick" data-key="${id}"><span class="activity-emoji">${emoji}</span><strong>${title}</strong><span>${desc}</span><div class="activity-link">Start activity ${icon('arrow-right',16)}</div></button>`).join('')}</div>
  <div class="tip-box">${icon('help',19)} <span>Practice uses vocabulary from lessons you've completed, plus your current lesson.</span></div></div>`;}
function startFlashcards(){const pool=accessibleWords();if(!pool.length)return;const due=pool.filter(w=>!state.reviews[w.id]||state.reviews[w.id].dueAt<=Date.now());ui.flashDeck=(due.length?due:shuffled(pool).slice(0,10)).sort((a,b)=>(state.reviews[a.id]?.dueAt||0)-(state.reviews[b.id]?.dueAt||0));ui.flashIndex=0;ui.flashFlipped=false;ui.page='flashcards';render(true);}
function flashcardsView(){const deck=ui.flashDeck;if(ui.flashIndex>=deck.length){return `<div class="page narrow">${sectionHeader('Session complete','Your practice matters.','practice')}<div class="end-activity"><span>🌟</span><h2>Ottimo lavoro!</h2><p>You reviewed ${deck.length} words today.</p><button class="btn btn-primary btn-wide" data-action="start-flashcards">Review again</button><button class="btn btn-ghost btn-wide" data-action="navigate" data-page="practice">Back to practice</button></div></div>`;}
 const word=deck[ui.flashIndex];return `<div class="page narrow">${sectionHeader('Flashcards',`${ui.flashIndex+1} of ${deck.length} · Think of the translation before flipping.`,'practice')}${progressBar(ui.flashIndex,deck.length)}<button class="flashcard ${ui.flashFlipped?'flipped':''}" data-action="flip-flashcard" aria-label="Flip flashcard"><span class="eyebrow muted">${ui.flashFlipped?'ENGLISH':'ITALIAN'}</span><span class="flash-main">${esc(ui.flashFlipped?word.en:word.it)}</span><span class="flash-hint">${ui.flashFlipped?'Tap to see Italian':'Tap the card to reveal the meaning'}</span></button><div class="card-audio">${audioButton(word.it,'Listen in Italian')}</div>${ui.flashFlipped?`<p class="rate-title">How well did you remember?</p><div class="rate-buttons"><button class="rate again" data-action="rate-flash" data-rate="again">Again <small>Try soon</small></button><button class="rate good" data-action="rate-flash" data-rate="good">Good <small>Remembered</small></button><button class="rate easy" data-action="rate-flash" data-rate="easy">Easy <small>Too simple</small></button></div>`:'<p class="muted centered">Recall first, flip second.</p>'}</div>`;}
function reviewCard(rate){const w=ui.flashDeck[ui.flashIndex];if(!w)return;const old=state.reviews[w.id]||{interval:0,reps:0};let interval=rate==='again'?0:rate==='easy'?Math.max(3,Math.round((old.interval||1)*2.4)):old.interval===0?1:Math.ceil(old.interval*2.1);
 const dueAt=rate==='again'?Date.now()+10*60*1000:Date.now()+interval*86400000;
 state.reviews[w.id]={interval,reps:(old.reps||0)+1,dueAt,lastRate:rate};earned(rate==='again'?1:3,'reviewed');ui.flashIndex++;ui.flashFlipped=false;render();}
function startMatch(){const pool=accessibleWords();const words=shuffled(pool).slice(0,Math.min(5,pool.length));ui.match={words,left:shuffled(words),right:shuffled(words),selected:null,solved:[],busy:false};ui.page='matching';render(true);}
function matchView(){const m=ui.match;if(!m)return practiceHome();const done=m.solved.length===m.words.length;return `<div class="page narrow">${sectionHeader('Word matching','Match each Italian phrase to its English meaning.','practice')}${progressBar(m.solved.length,m.words.length)}${done?`<div class="end-activity"><span>🧩</span><h2>Perfetto!</h2><p>All ${m.words.length} pairs matched. +15 XP earned.</p><button class="btn btn-primary btn-wide" data-action="start-matching">Play again</button></div>`:`<div class="match-columns"><div>${m.left.map(w=>`<button class="match-tile ${m.solved.includes(w.id)?'matched':''} ${m.selected?.id===w.id?'selected':''}" data-action="match-select" data-side="it" data-id="${w.id}" ${m.solved.includes(w.id)||m.busy?'disabled':''}>${esc(w.it)}</button>`).join('')}</div><div>${m.right.map(w=>`<button class="match-tile ${m.solved.includes(w.id)?'matched':''} ${m.selected?.id===w.id?'selected':''}" data-action="match-select" data-side="en" data-id="${w.id}" ${m.solved.includes(w.id)||m.busy?'disabled':''}>${esc(w.en)}</button>`).join('')}</div></div><p class="centered muted">${m.solved.length} of ${m.words.length} pairs found</p>`}</div>`;}
function matchSelect(side,id){const m=ui.match;if(!m||m.busy||m.solved.includes(id))return;const selected=m.selected;if(!selected||selected.side===side){m.selected={side,id};render();return;}
 const good=selected.id===id;markAnswer(good);if(good){m.solved.push(id);m.selected=null;if(m.solved.length===m.words.length)earned(15);render();}else{m.selected=null;m.busy=true;render();toast('Not quite—try a different match.');setTimeout(()=>{if(ui.match===m){m.busy=false;render();}},650);}}
function unlockedUnit(){return nextLesson().unit;}
function startPractice(type){const bank=type==='fill'?FILL_PRACTICE:WRITING_PRACTICE;const available=bank.filter(q=>q.unit<=unlockedUnit());ui.practice={type,questions:shuffled(available).slice(0,Math.min(5,available.length)),index:0,score:0,done:false};ui.practiceFeedback=null;ui.page=type;render(true);}
function practiceExercise(){const p=ui.practice;if(!p)return practiceHome();const isFill=p.type==='fill';if(p.done)return `<div class="page narrow">${sectionHeader(isFill?'Fill in the blanks':'Writing practice','Session finished.','practice')}<div class="end-activity"><span>🎉</span><h2>Bravissimo!</h2><p>You got ${p.score} out of ${p.questions.length} right. +${p.earned||0} XP.</p><button class="btn btn-primary btn-wide" data-action="start-${p.type}">Practise again</button><button class="btn btn-ghost btn-wide" data-action="navigate" data-page="practice">Back to practice</button></div></div>`;
 const q=p.questions[p.index];return `<div class="page narrow">${sectionHeader(isFill?'Fill in the blanks':'Writing practice',`${p.index+1} of ${p.questions.length} questions`,'practice')}${progressBar(p.index,p.questions.length)}<div class="exercise-card"><span class="eyebrow muted">${isFill?'COMPLETE THE ITALIAN':'WRITE IN ITALIAN'}</span><h2>${isFill?`${esc(q.before)} <span class="missing-word">______</span> ${esc(q.after)}`:esc(q.en)}</h2>${isFill?`<p class="translation">${esc(q.translation)}</p><p class="hint">Hint: ${esc(q.hint)}</p>`:''}</div>${ui.practiceFeedback?`<div class="answer-feedback ${ui.practiceFeedback.right?'success':'needs-work'}"><strong>${ui.practiceFeedback.right?'Correct! Benissimo!':'Keep practising!'}</strong><span>${ui.practiceFeedback.right?'Great answer.':`A correct answer is: ${esc(isFill?q.answer:q.it)}`}</span></div><button class="btn btn-primary btn-wide exercise-next" data-action="exercise-next">${p.index===p.questions.length-1?'Finish':'Next question'} ${icon('arrow-right',18)}</button>`:`<form id="practice-form" class="text-answer-form"><label for="practice-answer">Your answer</label><input id="practice-answer" name="answer" required autocomplete="off" spellcheck="false" placeholder="Type your Italian answer…"><button class="btn btn-primary btn-wide" type="submit">Check answer ${icon('check',18)}</button></form>`}</div>`;}
function finishPracticeAnswer(text){const p=ui.practice;if(!p||ui.practiceFeedback)return;const q=p.questions[p.index],target=p.type==='fill'?q.answer:q.it;const options=p.type==='fill'?[target]:[target,...(q.accept||[])];const good=options.some(v=>normLoose(v)===normLoose(text));ui.practiceFeedback={right:good};if(good)p.score++;markAnswer(good);render();}
function nextPracticeQ(){const p=ui.practice;if(!p)return;p.index++;ui.practiceFeedback=null;if(p.index>=p.questions.length){p.done=true;p.earned=p.score*5+5;earned(p.earned);}render();}
function speakHome(){const starter=CONVERSATIONS[0],words=accessibleWords(),sample=words[Math.min(1,words.length-1)];return `<div class="page">${sectionHeader('Speak Italian','Learn to say it, not just recognise it.')}
 <div class="speaking-hero"><div class="speaking-hero-icon">${icon('mic',35)}</div><div><span class="eyebrow muted">SPEAKING STUDIO</span><h2>Find your Italian voice</h2><p>Listen, repeat, and check your pronunciation where your browser supports speech recognition.</p></div></div>
 <div class="speak-block"><div class="panel-heading"><div><h2>Pronunciation practice</h2><p>Listen first. Then try speaking the phrase.</p></div><span class="pill subtle">Beginner</span></div><div class="prompt-area"><span>YOUR PHRASE</span><h3 id="speech-target">${esc(ui.speechTarget||sample?.it||'Ciao')}</h3><p>${esc(ALL_WORDS.find(w=>w.it===(ui.speechTarget||sample?.it))?.en||'Say this in Italian')}</p></div><div class="pronounce-controls">${audioButton(ui.speechTarget||sample?.it||'Ciao','Listen')}<button class="btn btn-primary" data-action="listen-mic">${icon('mic',18)} Start speaking</button><button class="btn btn-outline" data-action="new-speech-word">Another word</button></div><div id="speech-feedback" class="speech-feedback">${hasRecognition()?'Allow microphone access if your browser asks. Speech recognition gives approximate word-match feedback, not accent scoring.':'Speech recognition is not available in this browser. You can still hear Italian and practise speaking aloud.'}</div></div>
 <div class="panel-heading heading-outside"><div><h2>Guided conversations</h2><p>Practise useful situations with offline dialogues</p></div></div><div class="convo-grid">${CONVERSATIONS.map(c=>`<button class="conversation-card" data-action="open-convo" data-id="${c.id}"><span>${c.emoji}</span><div><strong>${c.title}</strong><small>${c.subtitle}</small></div>${icon('chevron-right',17)}</button>`).join('')}</div>
 <div class="tip-box">${icon('help',19)} <span>These conversations are guided, not AI-generated. A live AI conversation tutor can be added with a secure backend in a later version.</span></div></div>`;}
function newSpeechTarget(){const a=accessibleWords();let s=shuffled(a)[0];if(a.length>1&&s.it===ui.speechTarget)s=a.find(x=>x.it!==ui.speechTarget)||s;ui.speechTarget=s.it;render();}
function speechScore(transcript,target){const a=normLoose(transcript),b=normLoose(target);if(a===b)return 100;const dp=Array(b.length+1).fill(0).map((_,i)=>i);for(let i=1;i<=a.length;i++){let prev=dp[0];dp[0]=i;for(let j=1;j<=b.length;j++){const temp=dp[j];dp[j]=Math.min(dp[j]+1,dp[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=temp;}}return Math.max(0,Math.round(100*(1-dp[b.length]/Math.max(a.length,b.length,1))));}
function startListening(){
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 const element=document.querySelector('#speech-feedback');if(!Recognition){toast('Your browser does not support speech recognition.');return;}
 if(!element)return;const target=ui.speechTarget||document.querySelector('#speech-target')?.textContent||'Ciao';
 const r=new Recognition();r.lang='it-IT';r.interimResults=false;r.maxAlternatives=1;
 element.innerHTML=`<div class="recording-dot"></div> Listening… speak now.`;
 r.onresult=(event)=>{const said=event.results[0][0].transcript,score=speechScore(said,target),great=score>=83;
  if(great)earned(5,'spoken','firstSpeech');else save();
  const el=document.querySelector('#speech-feedback');if(el)el.innerHTML=`<div class="speech-result ${great?'positive':''}"><strong>${great?'Benissimo! Good match.': 'Nice try—give it another go.'}</strong><span>You said: “${esc(said)}”</span><span>Target: “${esc(target)}”</span><small>Approximate wording match: ${score}% · This does not measure your accent.</small></div>`;};
 r.onerror=(event)=>{const el=document.querySelector('#speech-feedback');if(el)el.textContent=`Could not check your speech (${event.error||'unavailable'}). Check your microphone permission or try another browser.`;};
 r.onnomatch=()=>{const el=document.querySelector('#speech-feedback');if(el)el.textContent='No phrase recognised. Try again in a quieter place.';};
 try{r.start();}catch{element.textContent='Microphone access could not start in this browser.';}
}
function startConversation(id){const c=CONVERSATIONS.find(x=>x.id===id);if(!c)return;ui.conv=c;ui.convIndex=0;ui.convFeedback=null;ui.page='conversation';render(true);}
function conversationView(){const c=ui.conv;if(!c)return speakHome();const done=ui.convIndex>=c.steps.length;const q=c.steps[Math.min(ui.convIndex,c.steps.length-1)];return `<div class="page narrow">${sectionHeader(c.title,c.subtitle,'speak')}${progressBar(ui.convIndex,c.steps.length)}${done?`<div class="end-activity"><span>💬</span><h2>Conversazione completa!</h2><p>You finished the ${c.title.toLowerCase()} conversation. +20 XP.</p><button class="btn btn-primary btn-wide" data-action="open-convo" data-id="${c.id}">Try again</button></div>`:`<div class="conversation-scene"><span class="eyebrow muted">STEP ${ui.convIndex+1} / ${c.steps.length}</span><div class="bot-message"><div class="bot-avatar">🇮🇹</div><div><span class="speaker-label">Your Italian guide</span><p>${esc(q.bot)}</p><small>${esc(q.en)}</small>${audioButton(q.bot,'Listen')}</div></div><div class="your-reply"><span class="eyebrow muted">YOUR REPLY — CHOOSE AN ANSWER</span>${q.options.map((o,i)=>({o,i})).map(({o,i})=>`<button class="reply-choice ${ui.convFeedback?(i===q.correct?'correct-choice':i===ui.convFeedback.index?'wrong-choice':''):''}" data-action="conv-answer" data-index="${i}" ${ui.convFeedback?'disabled':''}><strong>${esc(o[0])}</strong><small>${esc(o[1])}</small></button>`).join('')}</div>${ui.convFeedback?`<div class="answer-feedback ${ui.convFeedback.right?'success':'needs-work'}"><strong>${ui.convFeedback.right?'Ottimo! That works.':'Try the most natural response.'}</strong><span>${ui.convFeedback.right?'You understood the conversation.':`A good reply is “${esc(q.options[q.correct][0])}”`}</span></div><button class="btn btn-primary btn-wide" data-action="conv-next">Next ${icon('arrow-right',18)}</button>`:''}</div>`}</div>`;}
function answerConversation(index){const q=ui.conv.steps[ui.convIndex];if(ui.convFeedback)return;const right=index===q.correct;ui.convFeedback={index,right};markAnswer(right);render();}
function nextConversation(){ui.convIndex++;ui.convFeedback=null;if(ui.convIndex===ui.conv.steps.length)earned(20,null,'conversation');render();}
function exploreHome(){return `<div class="page">${sectionHeader('Explore Italian','Beyond the lessons: useful words, phrases and culture.')}
 <div class="explore-grid">${[
 ['dictionary','🔎','Italian dictionary','Search your growing collection of Italian words'],
 ['phrasebook','🧳','Travel phrasebook','Everyday phrases for life in Italy'],
 ['culture','🏛️','Discover Italy','Culture, traditions and everyday life']
 ].map(([key,emoji,title,desc])=>`<button class="explore-tile" data-action="navigate" data-page="${key}"><span class="explore-emoji">${emoji}</span><div><h2>${title}</h2><p>${desc}</p></div>${icon('arrow-right',19)}</button>`).join('')}</div><section class="panel discovery"><span class="eyebrow muted">DID YOU KNOW?</span><h2>“Ciao” works both ways.</h2><p>Depending on the context, ciao can mean hello or goodbye. It’s informal, so use buongiorno or arrivederci for more formal situations.</p>${audioButton('Ciao','Hear “ciao”')}</section></div>`;}
function dictionaryResults(){const s=normLoose(ui.search);const results=s?ALL_WORDS.filter(w=>normLoose(w.it).includes(s)||normLoose(w.en).includes(s)):ALL_WORDS;return `<div class="dict-count">${results.length} ${results.length===1?'entry':'entries'}${s?' found':' in your starter dictionary'}</div><div class="dict-list">${results.map(w=>`<div class="dict-row"><div><strong>${esc(w.it)}</strong><span>${esc(w.en)}</span><small>${esc(w.lesson.title)} · ${esc(w.lesson.grammar.example)}</small></div>${audioButton(w.it,'')}</div>`).join('')||'<div class="empty-note">No matches yet. Try another Italian or English word.</div>'}</div>`;}
function dictionaryView(){return `<div class="page">${sectionHeader('Italian dictionary','Search Italian words and their English meanings.','explore')}<div class="search-field">${icon('search',19)}<input id="dict-search" type="search" aria-label="Search Italian dictionary" placeholder="Search e.g. ciao, water, school" value="${esc(ui.search)}" autocomplete="off"></div><div id="dictionary-results">${dictionaryResults()}</div></div>`;}
function phrasebookView(){const filters=['All',...new Set(PHRASES.map(p=>p[2]))];return `<div class="page">${sectionHeader('Travel phrasebook','Useful phrases for real conversations.','explore')}<div class="filter-row">${filters.map(f=>`<button data-action="phrase-filter" data-filter="${f}" class="chip ${ui.phraseFilter===f?'active':''}">${f}</button>`).join('')}</div><div class="phrase-list">${PHRASES.filter(p=>ui.phraseFilter==='All'||p[2]===ui.phraseFilter).map(([it,en,tag])=>`<div class="phrase-item"><div><small>${tag.toUpperCase()}</small><h3>${esc(it)}</h3><p>${esc(en)}</p></div>${audioButton(it,'')}</div>`).join('')}</div></div>`;}
function cultureView(){return `<div class="page">${sectionHeader('Discover Italy','Little cultural insights that make language useful.','explore')}<div class="culture-grid">${CULTURE.map((c,i)=>`<article class="culture-card"><div class="culture-top"><span>${c.emoji}</span><small>${c.tag}</small></div><h2>${c.title}</h2><p>${c.text}</p><div class="culture-tip">${c.tip}</div></article>`).join('')}</div></div>`;}
const ACHIEVEMENTS=[
 {emoji:'🌱',name:'First steps',desc:'Complete your first lesson',hit:()=>state.completed.length>=1},
 {emoji:'💯',name:'Centurione',desc:'Earn 100 XP',hit:()=>state.xp>=100},
 {emoji:'📚',name:'Bookworm',desc:'Finish six lessons',hit:()=>state.completed.length>=6},
 {emoji:'🏆',name:'Course champion',desc:'Finish all 12 starter lessons',hit:()=>state.completed.length===12},
 {emoji:'🔥',name:'A week of Italian',desc:'Reach a 7-day learning streak',hit:()=>Boolean(state.flags.sevenDay)||getStreak()>=7},
 {emoji:'🧠',name:'Word collector',desc:'Review 20 different vocabulary cards',hit:()=>Object.keys(state.reviews).length>=20},
 {emoji:'🎙️',name:'Speak up!',desc:'Pass one pronunciation check',hit:()=>Boolean(state.flags.firstSpeech)},
 {emoji:'⭐',name:'Perfect lesson',desc:'Get every checkpoint question right',hit:()=>Boolean(state.flags.perfectLesson)},
 {emoji:'💬',name:'Conversationalist',desc:'Finish a guided conversation',hit:()=>Boolean(state.flags.conversation)}
];
function statsView(){const hits=ACHIEVEMENTS.filter(a=>a.hit()).length;const completed=state.completed.length,reviewed=Object.keys(state.reviews).length;
 const data=Array.from({length:7},(_,i)=>{const day=pastDay(6-i);return {day,short:new Date(day+'T12:00:00').toLocaleDateString('en-AU',{weekday:'short'}),xp:state.activity[day]?.xp||0};}),max=Math.max(30,...data.map(x=>x.xp));
 return `<div class="page">${sectionHeader('Your progress','Every small win adds up.')}
 <div class="metric-grid">${[[state.xp,'Total XP','✦'],[completed,'Lessons done','📚'],[learnedWords().length,'Words learned','🧠'],[accuracy()+'%','Answer accuracy','🎯'],[getStreak(),'Day streak','🔥'],[reviewed,'Words reviewed','🔁']].map(([v,label,em])=>`<div class="metric"><span>${em}</span><strong>${v}</strong><small>${label}</small></div>`).join('')}</div>
 <div class="panel"><div class="panel-heading"><div><h2>Last 7 days</h2><p>XP earned each day</p></div><span class="pill subtle">This week</span></div><div class="bars">${data.map(x=>`<div class="bar-col"><span class="bar-value">${x.xp||''}</span><div class="bar-holder"><div class="bar-shape" style="height:${x.xp?Math.max(6,percent(x.xp,max)):3}%"></div></div><small>${x.short}</small></div>`).join('')}</div></div>
 <div class="panel progress-panel"><div class="panel-heading"><div><h2>Level ${level()}</h2><p>${150-state.xp%150} XP until level ${level()+1}</p></div><span class="level-emblem">✦</span></div>${progressBar(state.xp%150,150)}<div class="goal-row"><span>Daily XP goal</span><strong>${statsToday().xp}/${state.settings.dailyXP}</strong></div>${progressBar(statsToday().xp,state.settings.dailyXP)}<div class="goal-row"><span>Weekly lesson goal</span><strong>${weekLessons()}/${state.settings.weeklyLessons}</strong></div>${progressBar(weekLessons(),state.settings.weeklyLessons,'blue')}</div>
 <div class="panel-heading heading-outside"><div><h2>Achievements</h2><p>${hits} of ${ACHIEVEMENTS.length} unlocked</p></div></div><div class="achievement-grid">${ACHIEVEMENTS.map(a=>`<div class="achievement ${a.hit()?'unlocked':'locked-achievement'}"><span>${a.hit()?a.emoji:'🔒'}</span><strong>${a.name}</strong><small>${a.desc}</small></div>`).join('')}</div></div>`;}
function settingsView(){const s=state.settings;return `<div class="page settings-page">${sectionHeader('Settings','Make your Italian journey your own.')}
  <section class="panel settings-panel"><h2>Appearance</h2><p>Choose the theme that suits you.</p><div class="segmented">${[['system','Use device'],['light','Light'],['dark','Dark']].map(([value,label])=>`<button data-action="set-theme" data-value="${value}" class="${s.theme===value?'on':''}">${label}</button>`).join('')}</div></section>
  <section class="panel settings-panel"><h2>Learning goals</h2><div class="settings-row"><label for="daily-goal">Daily XP target</label><select id="daily-goal" data-setting="dailyXP">${[15,30,50,75,100].map(v=>`<option value="${v}" ${s.dailyXP===v?'selected':''}>${v} XP / day</option>`).join('')}</select></div><div class="settings-row"><label for="weekly-goal">Weekly lesson target</label><select id="weekly-goal" data-setting="weeklyLessons">${[1,2,3,4,5,7].map(v=>`<option value="${v}" ${s.weeklyLessons===v?'selected':''}>${v} lessons</option>`).join('')}</select></div></section>
  <section class="panel settings-panel"><h2>Speaking & reminders</h2><div class="settings-row"><label for="voice-speed">Italian audio speed</label><select id="voice-speed" data-setting="speed"><option value="0.65" ${Number(s.speed)===0.65?'selected':''}>Slow · 0.65×</option><option value="0.85" ${Number(s.speed)===0.85?'selected':''}>Learning · 0.85×</option><option value="1" ${Number(s.speed)===1?'selected':''}>Normal · 1.0×</option><option value="1.15" ${Number(s.speed)===1.15?'selected':''}>Fast · 1.15×</option></select></div><div class="settings-row"><div><strong>In-app reminder</strong><small>Show a gentle prompt on your dashboard on days you haven't practised.</small></div><label class="switch" aria-label="In-app reminders"><input id="reminder-switch" type="checkbox" ${s.reminders?'checked':''}><span class="slider-switch"></span></label></div><p class="small-note muted">Scheduled phone notifications require a separate push service and aren't included in this offline version.</p></section>
  <section class="panel settings-panel"><h2>Dashboard shortcuts</h2><p>Choose and reorder your four quick links.</p><div class="shortcut-list">${s.quick.map((key,i)=>`<div class="shortcut-row"><span>${icon(sectionIcons[key],18)} ${sectionNames[key]}</span><div><button class="icon-button mini" aria-label="Move ${sectionNames[key]} up" data-action="move-shortcut" data-index="${i}" data-dir="-1" ${i===0?'disabled':''}>${icon('up',17)}</button><button class="icon-button mini" aria-label="Move ${sectionNames[key]} down" data-action="move-shortcut" data-index="${i}" data-dir="1" ${i===s.quick.length-1?'disabled':''}>${icon('down',17)}</button><button class="remove-shortcut" data-action="remove-shortcut" data-key="${key}" title="Remove shortcut" aria-label="Remove ${sectionNames[key]}">×</button></div></div>`).join('')}</div><div class="add-shortcut">${Object.keys(sectionNames).filter(k=>!s.quick.includes(k)).map(k=>`<button class="chip" data-action="add-shortcut" data-key="${k}" ${s.quick.length>=4?'disabled':''}>+ ${sectionNames[k]}</button>`).join('')}</div></section>
  <section class="panel settings-panel"><h2>Your progress</h2><p>Progress lives on this device. Export a backup before clearing website data or switching phones.</p><div class="settings-buttons"><button class="btn btn-outline" data-action="export-progress">${icon('download',17)} Export backup</button><label class="btn btn-outline upload-label" for="import-file">${icon('upload',17)} Import backup</label><input type="file" id="import-file" accept="application/json,.json" hidden></div><button class="danger-link" data-action="reset-progress">Reset all progress</button></section>
  <div class="app-version">Chat's Guide to Italian · v1.0<br>Free, offline-first, made for your phone 🇮🇹</div></div>`;}
function setTheme(){const choice=state.settings.theme;const dark=choice==='dark'||(choice==='system'&&window.matchMedia?.('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';document.querySelector('meta[name="theme-color"]').content=dark?'#101918':'#f5f7f7';}
function setPage(page){ui.page=page;ui.answerFeedback=null;if(page==='dictionary')ui.search='';render(true);}
function render(scroll=false){setTheme();let content='';switch(ui.page){case 'home':content=home();break;case 'learn':content=learn();break;case 'lesson':content=lessonView();break;case 'practice':content=practiceHome();break;case 'flashcards':content=flashcardsView();break;case 'matching':content=matchView();break;case 'fill':case 'writing':content=practiceExercise();break;case 'speak':content=speakHome();break;case 'conversation':content=conversationView();break;case 'explore':content=exploreHome();break;case 'dictionary':content=dictionaryView();break;case 'phrasebook':content=phrasebookView();break;case 'culture':content=cultureView();break;case 'stats':content=statsView();break;case 'settings':content=settingsView();break;default:ui.page='home';content=home();}
 app.innerHTML=`<div class="app-shell">${header()}<div class="body-shell">${navigation()}<main id="main" tabindex="-1">${content}<footer class="footnote">Fatto con curiosità · Keep learning a little every day 🇮🇹</footer></main></div></div>`;
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
}
function openQuick(key){switch(key){case 'learn':setPage('learn');break;case 'flashcards':startFlashcards();break;case 'speak':setPage('speak');break;case 'dictionary':setPage('dictionary');break;case 'matching':startMatch();break;case 'fill':case 'writing':startPractice(key);break;case 'phrasebook':setPage('phrasebook');break;default:setPage('home');}}
app.addEventListener('click',event=>{
 const btn=event.target.closest('[data-action]');if(!btn||btn.disabled)return;
 const action=btn.dataset.action;
 if(action==='navigate'){setPage(btn.dataset.page);return;}
 if(action==='settings'){setPage('settings');return;}
 if(action==='stats'){setPage('stats');return;}
 if(action==='audio'){speakItalian(btn.dataset.text||'');return;}
 if(action==='open-lesson'){openLesson(btn.dataset.id);return;}
 if(action==='lesson-preview-next'){ui.lessonIndex++;const l=LESSONS.find(x=>x.id===ui.lessonId);if(ui.lessonIndex>l.words.length){ui.phase='quiz';ui.lessonIndex=0;ui.lessonScore=0;}render();return;}
 if(action==='quiz-choice'){checkQuiz(btn.dataset.value);return;}
 if(action==='lesson-quiz-next'){ui.lessonIndex++;ui.answerFeedback=null;if(ui.lessonIndex>=ui.quiz.length)finishLesson();else render();return;}
 if(action==='open-quick'){openQuick(btn.dataset.key);return;}
 if(action==='start-flashcards'){startFlashcards();return;}
 if(action==='flip-flashcard'){ui.flashFlipped=!ui.flashFlipped;render();return;}
 if(action==='rate-flash'){reviewCard(btn.dataset.rate);return;}
 if(action==='start-matching'){startMatch();return;}
 if(action==='match-select'){matchSelect(btn.dataset.side,btn.dataset.id);return;}
 if(action==='start-fill'){startPractice('fill');return;}
 if(action==='start-writing'){startPractice('writing');return;}
 if(action==='exercise-next'){nextPracticeQ();return;}
 if(action==='listen-mic'){startListening();return;}
 if(action==='new-speech-word'){newSpeechTarget();return;}
 if(action==='open-convo'){startConversation(btn.dataset.id);return;}
 if(action==='conv-answer'){answerConversation(Number(btn.dataset.index));return;}
 if(action==='conv-next'){nextConversation();return;}
 if(action==='phrase-filter'){ui.phraseFilter=btn.dataset.filter;render();return;}
 if(action==='set-theme'){state.settings.theme=btn.dataset.value;save();render();return;}
 if(action==='add-shortcut'){if(state.settings.quick.length<4&&!state.settings.quick.includes(btn.dataset.key)){state.settings.quick.push(btn.dataset.key);save();render();}return;}
 if(action==='remove-shortcut'){state.settings.quick=state.settings.quick.filter(k=>k!==btn.dataset.key);save();render();return;}
 if(action==='move-shortcut'){const i=Number(btn.dataset.index),j=i+Number(btn.dataset.dir),a=state.settings.quick;if(j>=0&&j<a.length){[a[i],a[j]]=[a[j],a[i]];save();render();}return;}
 if(action==='export-progress'){const blob=new Blob([JSON.stringify({app:'ChatsGuideToItalian',exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});const link=document.createElement('a');const url=URL.createObjectURL(blob);link.href=url;link.download='chats-italian-progress.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('Backup file created.');return;}
 if(action==='reset-progress'){if(window.confirm('Reset every lesson, review, XP and setting on this device? This cannot be undone unless you have a backup.')){state=blankState();save();ui.page='home';render(true);toast('Your local progress has been reset.');}return;}
});
function checkQuiz(response){if(ui.answerFeedback||ui.phase!=='quiz')return;const q=ui.quiz[ui.lessonIndex];if(!q)return;const right=normLoose(response)===normLoose(q.answer);ui.answerFeedback={right,selected:response};if(right)ui.lessonScore++;markAnswer(right);render();}
app.addEventListener('submit',event=>{event.preventDefault();if(event.target.id==='quiz-form'){const form=new FormData(event.target);const answer=form.get('answer')||'';if(String(answer).trim())checkQuiz(answer);}if(event.target.id==='practice-form'){const answer=new FormData(event.target).get('answer')||'';if(String(answer).trim())finishPracticeAnswer(answer);}});
app.addEventListener('input',event=>{if(event.target.id==='dict-search'){const input=event.target;ui.search=input.value;const container=document.querySelector('#dictionary-results');if(container)container.innerHTML=dictionaryResults();}});
app.addEventListener('change',event=>{
 const t=event.target;
 if(t.dataset.setting){state.settings[t.dataset.setting]=Number(t.value);save();render();}
 if(t.id==='reminder-switch'){state.settings.reminders=t.checked;save();render();}
 if(t.id==='import-file'&&t.files?.length){const file=t.files[0];if(file.size>1000000){toast('The backup is too large.');return;}const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.app!=='ChatsGuideToItalian'||!data.state||data.state.version!==1)throw new Error('Invalid backup');if(!window.confirm('Replace the progress on this device with the selected backup?'))return;localStorage.setItem(STORE_KEY,JSON.stringify(data.state));state=loadState();ui.page='home';render(true);toast('Progress backup imported.');}catch{toast('That is not a valid Chat’s Italian backup.');}};reader.readAsText(file);}
});
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.settings.theme==='system')setTheme();});
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
render();