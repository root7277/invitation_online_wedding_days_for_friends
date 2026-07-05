const DEFAULT_DATA = {
  kuyov: "Diyor",
  kelin: "Sevinch",
  siteTitle: "Diyor & Sevinch — Nikoh to‘yi taklifnomasi",
  siteDescription: "Online elektron to‘y taklifnomasi",
  loaderSmall: "DIYOR VA SEVINCH",
  loaderTitle: "To‘yiga xush kelibsiz",
  loaderButton: "Taklifnomani ochish",
  loaderHint: "Musiqa tugmani bosganingizdan keyin yangraydi",
  navGuests: "Aziz mehmonlar",
  navWhere: "Qachon & Qayerda",
  navStory: "Sayohatimiz",
  navRsvp: "Javob",
  badge: "Nikoh tantanasi taklifnomasi",
  welcome: "DIYOR VA SEVINCH TO‘YIGA XUSH KELIBSIZ",
  quote: "Alloh ularning qalblarini sevgi ila birlashtirdi",
  dateISO: "2026-07-17T18:00:00+05:00",
  day: "17",
  month: "Iyul",
  year: "2026",
  venueLine: "“Versal” to‘yxonasi · Toshkent",
  mapButtonText: "Manzilni ko‘rish",
  rsvpButtonText: "Tadbirga javob",
  guestsEyebrow: "Aziz mehmonlar",
  guestsTitle: "Sizni baxt oqshomimizga chorlaymiz",
  guestsText: "Hurmatli mehmonimiz! Sizni va oila a’zolaringizni Diyor va Sevinchning nikoh to‘yi munosabati bilan yoziladigan tantanali dasturxonimizning qadrli mehmoni bo‘lishga lutfan taklif qilamiz.",
  miniCards: [
    { title: "Baxtli sana", text: "17-iyul, 2026-yil" },
    { title: "Boshlanish vaqti", text: "18:00 da" },
    { title: "Manzil", text: "“Versal” to‘yxonasi" }
  ],
  countdownEyebrow: "To‘ygacha qolgan vaqt",
  countdownTitle: "Muqaddas tantanaga sanoq boshlandi",
  whereEyebrow: "Qachon & Qayerda",
  whereTitle: "To‘yxona manzili",
  dateDetail: "17 · 07 · 2026",
  timeDetail: "18:00 da boshlanadi",
  placeDetail: "“Versal” tantanalar koshonasi",
  addressDetail: "Toshkent shahri, Yunusobod tumani, Bog‘ishamol ko‘chasi, 24-uy",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Versal%20to'yxonasi%20Toshkent",
  yandexMapsUrl: "https://yandex.com/maps/?text=Versal%20to'yxonasi%20Toshkent",
  mapCardTitle: "Versal",
  mapCardSubtitle: "Tantanalar koshonasi",
  mapCardNote: "O‘z vaqtida kelishingizni so‘raymiz",
  storyEyebrow: "Bizning sayohatimiz",
  storyTitle: "Sevgi yo‘limiz",
  timeline: [
    { time: "2023-yil", title: "Ilk lahzalar", text: "Samimiy suhbatlardan boshlangan tanishuv ikki qalbning bir-biriga yaqinlashishiga sabab bo‘ldi." },
    { time: "2024-yil", title: "Muhabbat uchquni", text: "Har bir iliq so‘z va tabassum kelajakdagi baxtli kunlarning poydevoriga aylandi." },
    { time: "2026-yil", title: "Baxt to‘yi", text: "Ushbu go‘zal kunni siz aziz insonlar bilan birga baham ko‘rishdan behad mamnunmiz." }
  ],
  galleryEyebrow: "Shirin lahzalarimiz",
  galleryTitle: "Muhabbat albomi",
  galleryItems: [
    { text: "Sevgi sarguzashtimiz", image: "" },
    { text: "Baxtli tabassum", image: "" },
    { text: "Qalblar bog‘lanishi", image: "" },
    { text: "Umidbaxsh hayot", image: "" }
  ],
  poemEyebrow: "Muhabbat satrlari",
  poemTitle: "Go‘zal tilak",
  poemText: "Muhabbat — ikki yurakning bir urishi,\nBir-biriga abadiy bog‘lanib qolishi.\nBahor gullari kabi ochilgan sevgi —\nDiyor va Sevinch uchun boqiy yorug‘lik!",
  rsvpEyebrow: "Tadbirga javob",
  rsvpTitle: "Kelishingizni belgilang",
  rsvpText: "Javobingiz tashkilotchiga yuboriladi.",
  guestbookTitle: "Mehmonlar kitobi",
  defaultWishes: [
    { name: "Baxt rishtasi", text: "Ilohim hayotingiz hamisha quvonch va mehrga to‘lsin!" },
    { name: "Umr yo‘li", text: "Oila nomli baxt koshonasi sizlarga muborak bo‘lsin!" }
  ],
  footerMain: "Diyor & Sevinch — 17.07.2026 — Baxt oqshomi",
  footerSub: "Niyatimiz pok, yo‘limiz yorug‘",
  musicUrl: "assets/music.mp3"
};

const cfg = window.APP_CONFIG || {};
const isConfigured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('PASTE_') && !cfg.SUPABASE_ANON_KEY.includes('PASTE_');
const client = isConfigured && window.supabase ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
let session = null;
let invitations = [];
let selected = null;
let currentData = {...DEFAULT_DATA};

function $(id){return document.getElementById(id)}
function qs(sel){return document.querySelector(sel)}
function qsa(sel){return [...document.querySelectorAll(sel)]}
function show(el){el && el.classList.remove('hidden')}
function hide(el){el && el.classList.add('hidden')}
function msg(id,text){$(id).textContent = text || ''}
function cleanSlug(str){return String(str || '').toLowerCase().trim().replace(/['’`]/g,'').replace(/[^a-z0-9-]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')}
function slugifyName(){
  const k = qs('[name="kuyov"]').value || 'kuyov';
  const kel = qs('[name="kelin"]').value || 'kelin';
  return cleanSlug(`${k}-${kel}`);
}
function toDatetimeLocal(value){
  if(!value) return '';
  const d = new Date(value);
  if(Number.isNaN(d.getTime())) return String(value).slice(0,16);
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromDatetimeLocal(value){
  if(!value) return '';
  return value.length === 16 ? `${value}:00+05:00` : value;
}
function dateParts(value){
  const d = new Date(value);
  const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
  if(Number.isNaN(d.getTime())) return {day:'',month:'',year:''};
  return {day:String(d.getDate()).padStart(2,'0'), month: months[d.getMonth()], year: String(d.getFullYear()), dateDetail: `${String(d.getDate()).padStart(2,'0')} · ${String(d.getMonth()+1).padStart(2,'0')} · ${d.getFullYear()}`};
}
function arrToLines(arr, keys){
  return (arr || []).map(item => keys.map(k => item?.[k] || '').join(' | ')).join('\n');
}
function linesToArr(text, keys){
  return String(text || '').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{
    const parts = line.split('|').map(p=>p.trim());
    const obj = {};
    keys.forEach((k,i)=>obj[k]=parts[i] || '');
    return obj;
  });
}
function updateLink(){
  const slug = cleanSlug($('slug').value);
  const link = slug ? `${location.origin}/${slug}` : '';
  $('publicLink').value = link;
  $('openPublicBtn').href = link || '#';
}
function fillForm(data, record){
  currentData = {...DEFAULT_DATA, ...(data || {})};
  selected = record || null;
  $('is_active').checked = record ? !!record.is_active : true;
  $('slug').value = record?.slug || cleanSlug(`${currentData.kuyov}-${currentData.kelin}`);
  const simpleFields = ['kuyov','kelin','siteTitle','badge','welcome','quote','venueLine','timeDetail','placeDetail','addressDetail','googleMapsUrl','yandexMapsUrl','guestsText','poemText','mapCardTitle','mapCardSubtitle','footerMain','musicUrl'];
  simpleFields.forEach(name => {
    const el = qs(`[name="${name}"]`);
    if(el) el.value = currentData[name] || '';
  });
  qs('[name="dateISO"]').value = toDatetimeLocal(currentData.dateISO);
  $('miniCardsText').value = arrToLines(currentData.miniCards, ['title','text']);
  $('timelineText').value = arrToLines(currentData.timeline, ['time','title','text']);
  $('wishesText').value = arrToLines(currentData.defaultWishes, ['name','text']);
  $('galleryText').value = arrToLines(currentData.galleryItems, ['text','image']);
  updateLink();
  msg('saveMsg','');
}
function collectForm(){
  const fd = new FormData($('inviteForm'));
  const data = {...DEFAULT_DATA, ...currentData};
  ['kuyov','kelin','siteTitle','badge','welcome','quote','venueLine','timeDetail','placeDetail','addressDetail','googleMapsUrl','yandexMapsUrl','guestsText','poemText','mapCardTitle','mapCardSubtitle','footerMain','musicUrl'].forEach(k => data[k] = fd.get(k) || '');
  data.dateISO = fromDatetimeLocal(fd.get('dateISO'));
  const parts = dateParts(data.dateISO);
  data.day = parts.day || data.day;
  data.month = parts.month || data.month;
  data.year = parts.year || data.year;
  data.dateDetail = parts.dateDetail || data.dateDetail;
  data.loaderSmall = `${data.kuyov} VA ${data.kelin}`.toUpperCase();
  data.welcome = data.welcome || `${data.kuyov} VA ${data.kelin} TO‘YIGA XUSH KELIBSIZ`.toUpperCase();
  data.siteTitle = data.siteTitle || `${data.kuyov} & ${data.kelin} — Nikoh to‘yi taklifnomasi`;
  data.footerMain = data.footerMain || `${data.kuyov} & ${data.kelin} — ${data.dateDetail.replaceAll(' · ', '.')} — Baxt oqshomi`;
  data.mapCardTitle = data.mapCardTitle || data.placeDetail || 'To‘yxona';
  data.mapCardSubtitle = data.mapCardSubtitle || 'Tantanalar koshonasi';
  data.miniCards = linesToArr($('miniCardsText').value, ['title','text']);
  data.timeline = linesToArr($('timelineText').value, ['time','title','text']);
  data.defaultWishes = linesToArr($('wishesText').value, ['name','text']);
  data.galleryItems = linesToArr($('galleryText').value, ['text','image']);
  return data;
}
function setActiveTab(id){
  qsa('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab === id));
  qsa('.tab-page').forEach(p=>p.classList.toggle('active', p.id === id));
}
async function initAuth(){
  if(!client){ show($('setupBox')); hide($('loginPanel')); return; }
  const res = await client.auth.getSession();
  session = res.data.session;
  if(session) showDashboard(); else showLogin();
  client.auth.onAuthStateChange((_event, s)=>{ session=s; session ? showDashboard() : showLogin(); });
}
function showLogin(){show($('loginPanel')); hide($('dashboard')); hide($('logoutBtn'));}
async function showDashboard(){hide($('loginPanel')); show($('dashboard')); show($('logoutBtn')); await loadInvitations(); if(!selected) newInvite();}
async function loadInvitations(){
  if(!client) return;
  msg('listMsg','Yuklanmoqda...');
  const {data,error} = await client.from('invitations').select('id,slug,is_active,data,created_at,updated_at').order('updated_at',{ascending:false});
  if(error){ msg('listMsg','Xatolik: ' + error.message); return; }
  invitations = data || [];
  renderList();
  msg('listMsg', invitations.length ? `${invitations.length} ta taklifnoma` : 'Hali taklifnoma yo‘q');
}
function renderList(){
  const box = $('inviteList'); box.innerHTML = '';
  invitations.forEach(item => {
    const div = document.createElement('div');
    div.className = 'invite-item' + (selected?.id === item.id ? ' active' : '');
    const data = item.data || {};
    div.innerHTML = `<strong>${data.kuyov || ''} & ${data.kelin || ''}</strong><span>/${item.slug} · ${item.is_active ? 'aktiv' : 'yopiq'}</span>`;
    div.addEventListener('click',()=>{fillForm(data,item); renderList(); loadRsvp();});
    box.appendChild(div);
  });
}
function newInvite(){
  const data = {...DEFAULT_DATA};
  selected = null;
  fillForm(data, null);
  $('slug').value = cleanSlug(`${data.kuyov}-${data.kelin}`);
  updateLink();
  renderList();
  $('rsvpBody').innerHTML = '';
}
async function saveInvite(e){
  e.preventDefault();
  if(!client) return;
  const data = collectForm();
  let slug = cleanSlug($('slug').value || slugifyName());
  if(!slug){ msg('saveMsg','Slug bo‘sh bo‘lmasin.'); return; }
  $('slug').value = slug;
  const payload = { slug, is_active: $('is_active').checked, data, updated_at: new Date().toISOString() };
  msg('saveMsg','Saqlanmoqda...');
  let res;
  if(selected?.id){
    res = await client.from('invitations').update(payload).eq('id', selected.id).select().single();
  }else{
    res = await client.from('invitations').insert(payload).select().single();
  }
  if(res.error){ msg('saveMsg','Xatolik: ' + res.error.message); return; }
  selected = res.data;
  currentData = res.data.data;
  msg('saveMsg','Saqlandi. Online sayt ham yangilanadi.');
  updateLink();
  await loadInvitations();
}
async function deleteInvite(){
  if(!selected?.id){ msg('saveMsg','O‘chirish uchun avval taklifnomani tanlang.'); return; }
  if(!confirm('Rostdan ham shu taklifnomani o‘chirasizmi?')) return;
  const {error} = await client.from('invitations').delete().eq('id', selected.id);
  if(error){ msg('saveMsg','Xatolik: ' + error.message); return; }
  msg('saveMsg','O‘chirildi.');
  selected = null;
  await loadInvitations();
  newInvite();
}
function cloneInvite(){
  const data = collectForm();
  selected = null;
  fillForm(data, null);
  $('slug').value = cleanSlug($('slug').value + '-copy');
  updateLink();
  msg('saveMsg','Nusxa tayyor. Slugni o‘zgartirib Saqlash tugmasini bosing.');
  renderList();
}
async function uploadFile(inputId, targetName, appendGallery=false){
  if(!selected && !$('slug').value){ msg('saveMsg','Avval slug kiriting.'); return; }
  const input = $(inputId);
  const file = input.files?.[0];
  if(!file){ msg('saveMsg','Fayl tanlanmagan.'); return; }
  const slug = cleanSlug($('slug').value || slugifyName());
  const ext = file.name.split('.').pop() || 'file';
  const safeName = `${slug}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  msg('saveMsg','Fayl yuklanmoqda...');
  const {error} = await client.storage.from(cfg.ASSET_BUCKET || 'taklifnoma-assets').upload(safeName,file,{upsert:false});
  if(error){ msg('saveMsg','Yuklash xatoligi: ' + error.message); return; }
  const {data} = client.storage.from(cfg.ASSET_BUCKET || 'taklifnoma-assets').getPublicUrl(safeName);
  if(appendGallery){
    const current = $('galleryText').value.trim();
    $('galleryText').value = (current ? current + '\n' : '') + `Rasm | ${data.publicUrl}`;
  }else{
    qs(`[name="${targetName}"]`).value = data.publicUrl;
  }
  msg('saveMsg','Fayl yuklandi. Endi Saqlash tugmasini bosing.');
}
async function loadRsvp(){
  if(!selected?.id){ msg('rsvpMsg','Avval taklifnomani tanlang.'); return; }
  msg('rsvpMsg','Yuklanmoqda...');
  const {data,error} = await client.from('rsvp').select('*').eq('invitation_id', selected.id).order('created_at',{ascending:false});
  const body = $('rsvpBody'); body.innerHTML = '';
  if(error){ msg('rsvpMsg','Xatolik: ' + error.message); return; }
  (data || []).forEach(row => {
    const tr = document.createElement('tr');
    const when = row.created_at ? new Date(row.created_at).toLocaleString('uz-UZ') : '';
    tr.innerHTML = `<td>${escapeHtml(row.guest_name || '')}</td><td><span class="badge-soft">${escapeHtml(row.answer || '')}</span></td><td>${escapeHtml(row.wish || '')}</td><td>${escapeHtml(when)}</td>`;
    body.appendChild(tr);
  });
  msg('rsvpMsg', data?.length ? `${data.length} ta javob` : 'Hali javob kelmagan');
}
function escapeHtml(str){return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

$('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  msg('loginMsg','Tekshirilmoqda...');
  const {error} = await client.auth.signInWithPassword({email:$('loginEmail').value.trim(), password:$('loginPassword').value});
  msg('loginMsg', error ? 'Xatolik: ' + error.message : 'Kirish muvaffaqiyatli.');
});
$('logoutBtn').addEventListener('click',()=>client.auth.signOut());
$('newBtn').addEventListener('click',newInvite);
$('refreshBtn').addEventListener('click',loadInvitations);
$('inviteForm').addEventListener('submit',saveInvite);
$('deleteBtn').addEventListener('click',deleteInvite);
$('cloneBtn').addEventListener('click',cloneInvite);
$('copyLinkBtn').addEventListener('click',async()=>{updateLink(); if($('publicLink').value) await navigator.clipboard.writeText($('publicLink').value); msg('saveMsg','Link nusxalandi.');});
$('slug').addEventListener('input',()=>{$('slug').value=cleanSlug($('slug').value); updateLink();});
qsa('[name="kuyov"],[name="kelin"]').forEach(el => el.addEventListener('blur',()=>{if(!selected && !$('slug').value) {$('slug').value=slugifyName(); updateLink();}}));
qsa('.tab').forEach(btn=>btn.addEventListener('click',()=>setActiveTab(btn.dataset.tab)));
$('uploadMusicBtn').addEventListener('click',()=>uploadFile('musicFile','musicUrl',false));
$('uploadImageBtn').addEventListener('click',()=>uploadFile('imageFile','',true));
$('loadRsvpBtn').addEventListener('click',loadRsvp);

initAuth();
