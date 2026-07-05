const DEFAULT_DATA = {
  kuyov: "Diyor",
  kelin: "Sevinch",
  siteTitle: "Elektron nikoh taklifnomasi",
  siteDescription: "Online elektron to‘y taklifnomasi",
  loaderSmall: "TO‘Y TAKLIFNOMASI",
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
  guestsText: "Hurmatli mehmonimiz! Sizni va oila a’zolaringizni nikoh to‘yi munosabati bilan yoziladigan tantanali dasturxonimizning qadrli mehmoni bo‘lishga lutfan taklif qilamiz.",
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
  poemText: "Muhabbat — ikki yurakning bir urishi,\nBir-biriga abadiy bog‘lanib qolishi.\nBahor gullari kabi ochilgan sevgi —\nIkki yosh uchun boqiy yorug‘lik!",
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
const isConfigured =
  cfg.SUPABASE_URL &&
  cfg.SUPABASE_ANON_KEY &&
  !cfg.SUPABASE_URL.includes("PASTE_") &&
  !cfg.SUPABASE_ANON_KEY.includes("PASTE_");

const client =
  isConfigured && window.supabase
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : null;

let currentInvitation = null;
let currentData = DEFAULT_DATA;
let timerHandle = null;

function deepMerge(target, source) {
  const output = { ...target };

  if (!source || typeof source !== "object") return output;

  Object.keys(source).forEach((key) => {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      output[key] = deepMerge(output[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  });

  return output;
}

function $(id) {
  return document.getElementById(id);
}

function hide(el) {
  if (el) el.classList.add("hide");
}

function show(el) {
  if (el) el.classList.remove("hide");
}

function setStatus(title, text, admin = false) {
  const statusTitle = $("statusTitle");
  const statusText = $("statusText");
  const adminLink = $("adminLink");
  const statusScreen = $("statusScreen");

  if (statusTitle) statusTitle.textContent = title;
  if (statusText) statusText.textContent = text;
  if (adminLink) adminLink.classList.toggle("hidden", !admin);
  show(statusScreen);
}

function getSlug() {
  const q = new URLSearchParams(location.search).get("slug");
  if (q) return cleanSlug(q);

  const path = decodeURIComponent(location.pathname || "/").replace(
    /^\/+|\/+$/g,
    ""
  );

  if (
    !path ||
    path === "index.html" ||
    path === "admin" ||
    path === "admin.html"
  ) {
    return "";
  }

  return cleanSlug(path.split("/")[0]);
}

function cleanSlug(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function autoDateParts(data) {
  if (!data.dateISO) return data;

  const d = new Date(data.dateISO);
  if (Number.isNaN(d.getTime())) return data;

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr"
  ];

  return {
    ...data,
    day: data.day || String(d.getDate()).padStart(2, "0"),
    month: data.month || months[d.getMonth()],
    year: data.year || String(d.getFullYear())
  };
}

async function loadInvitation() {
  const slug = getSlug();

  if (!slug) {
    setStatus(
      "Taklifnoma linki tanlanmagan",
      "Sizga berilgan maxsus linkni oching. Masalan: sayt-nomi.netlify.app/diyor-sevinch",
      true
    );
    return;
  }

  if (!client) {
    setStatus(
      "Supabase sozlanmagan",
      "config.js ichiga Supabase URL va anon key kiritilishi kerak.",
      true
    );
    return;
  }

  const { data, error } = await client
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    setStatus(
      "Taklifnoma topilmadi",
      "Link noto‘g‘ri, o‘chirilgan yoki hali aktiv qilinmagan bo‘lishi mumkin.",
      false
    );
    return;
  }

  currentInvitation = data;
  currentData = autoDateParts(deepMerge(DEFAULT_DATA, data.data || {}));

  renderData(currentData);
  hide($("statusScreen"));

  const loader = $("loader");
  if (loader && !loader.classList.contains("hide")) show(loader);
}

function renderData(DATA) {
  document.title =
    DATA.siteTitle || `${DATA.kuyov || ""} & ${DATA.kelin || ""} — Taklifnoma`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", DATA.siteDescription || "Elektron taklifnoma");

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (DATA[key] !== undefined) el.textContent = DATA[key] || "";
  });

  const music = $("weddingMusic");
  if (music && DATA.musicUrl && music.getAttribute("src") !== DATA.musicUrl) {
    music.src = DATA.musicUrl;
  }

  const mini = $("miniCards");
  if (mini) {
    mini.innerHTML = "";
    (DATA.miniCards || []).forEach((item) => {
      const div = document.createElement("div");
      const strong = document.createElement("strong");
      const span = document.createElement("span");

      strong.textContent = item.title || "";
      span.textContent = item.text || "";

      div.append(strong, span);
      mini.appendChild(div);
    });
  }

  const timeline = $("timeline");
  if (timeline) {
    timeline.innerHTML = "";
    (DATA.timeline || []).forEach((item) => {
      const article = document.createElement("article");
      const time = document.createElement("time");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      time.textContent = item.time || "";
      h3.textContent = item.title || "";
      p.textContent = item.text || "";

      article.append(time, h3, p);
      timeline.appendChild(article);
    });
  }

  const gallery = $("galleryGrid");
  const gallerySection = $("gallerySection");
  if (gallery) {
    gallery.innerHTML = "";
    const items = DATA.galleryItems || [];

    if (gallerySection) gallerySection.style.display = items.length ? "" : "none";

    items.forEach((item) => {
      const obj = typeof item === "string" ? { text: item, image: "" } : item;
      const div = document.createElement("div");

      if (obj.image) div.style.backgroundImage = `url('${obj.image}')`;

      const span = document.createElement("span");
      span.textContent = obj.text || "";

      div.appendChild(span);
      gallery.appendChild(div);
    });
  }

  const poem = $("poemText");
  if (poem) {
    poem.innerHTML = "";

    String(DATA.poemText || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line, idx) => {
        if (idx) poem.appendChild(document.createElement("br"));
        poem.appendChild(document.createTextNode(line));
      });
  }

  const google = $("googleMapBtn");
  if (google) google.href = DATA.googleMapsUrl || "#";

  const yandex = $("yandexMapBtn");
  if (yandex) yandex.href = DATA.yandexMapsUrl || "#";

  renderWishes(DATA);
  resetCountdown(DATA.dateISO);
}

const loader = $("loader");
const openBtn = $("openInvite");
const music = $("weddingMusic");
const musicToggle = $("musicToggle");

function setMusicState() {
  if (!musicToggle || !music) return;

  musicToggle.classList.toggle("playing", !music.paused);
  musicToggle.textContent = music.paused ? "♪" : "Ⅱ";
}

async function playMusic() {
  if (!music) return;

  try {
    await music.play();
    setMusicState();
  } catch (e) {
    setMusicState();
  }
}

if (openBtn) {
  openBtn.addEventListener("click", () => {
    hide(loader);
    playMusic();
  });
}

if (musicToggle) {
  musicToggle.addEventListener("click", () =>
    music.paused ? playMusic() : (music.pause(), setMusicState())
  );
}

if (music) {
  music.addEventListener("play", setMusicState);
  music.addEventListener("pause", setMusicState);
}

let weddingDate = new Date(DEFAULT_DATA.dateISO);

function resetCountdown(dateISO) {
  weddingDate = new Date(dateISO || DEFAULT_DATA.dateISO);
  tick();
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const daysEl = $("days");
  const hoursEl = $("hours");
  const minutesEl = $("minutes");
  const secondsEl = $("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const diff = weddingDate - new Date();

  if (diff <= 0 || Number.isNaN(diff)) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  daysEl.textContent = pad(d);
  hoursEl.textContent = pad(h);
  minutesEl.textContent = pad(m);
  secondsEl.textContent = pad(s);
}

setInterval(tick, 1000);

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.13 }
  );

  revealItems.forEach((el) => observer.observe(el));
}

setupReveal();

function renderWishes(DATA) {
  const wishes = $("wishes");
  if (!wishes) return;

  wishes.innerHTML = "";
  loadGuestWishes(DATA);
}

function appendWish(name, text, answer) {
  const wishes = $("wishes");
  if (!wishes) return;

  const p = document.createElement("p");

  const b = document.createElement("b");
  b.textContent = `${name || "Mehmon"}:`;
  p.appendChild(b);

  p.appendChild(document.createTextNode(` ${text || ""}`));

  if (answer) {
    const small = document.createElement("small");
    small.textContent = ` · ${answer}`;
    small.style.opacity = ".75";
    small.style.marginLeft = "6px";
    p.appendChild(small);
  }

  wishes.appendChild(p);
}

async function loadGuestWishes(DATA = currentData) {
  const wishes = $("wishes");
  if (!wishes) return;

  if (!client || !currentInvitation) {
    wishes.innerHTML = "";
    (DATA.defaultWishes || []).forEach((item) => {
      appendWish(item.name || "Tilak", item.text || "", "");
    });
    return;
  }

  const { data, error } = await client
    .from("rsvp")
    .select("guest_name, answer, wish, created_at")
    .eq("invitation_id", currentInvitation.id)
    .not("wish", "is", null)
    .neq("wish", "")
    .order("created_at", { ascending: false })
    .limit(80);

  wishes.innerHTML = "";

  if (error || !data || !data.length) {
    (DATA.defaultWishes || []).forEach((item) => {
      appendWish(item.name || "Tilak", item.text || "", "");
    });
    return;
  }

  data.forEach((item) => {
    appendWish(item.guest_name, item.wish, item.answer);
  });
}

const form = $("rsvpForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const msg = $("rsvpMsg");

    if (!currentInvitation || !client) {
      if (msg) msg.textContent = "Taklifnoma yuklanmagan.";
      return;
    }

    const name = $("guestName").value.trim();
    const answer = $("guestAnswer").value;
    const wish = $("guestWish").value.trim();

    if (!name || !answer) return;

    if (msg) msg.textContent = "Yuborilmoqda...";

    const { error } = await client.from("rsvp").insert({
      invitation_id: currentInvitation.id,
      guest_name: name,
      answer,
      wish
    });

    if (error) {
      if (msg) msg.textContent = "Xatolik: javob yuborilmadi.";
    } else {
      if (msg) msg.textContent = "Rahmat! Javobingiz qabul qilindi.";
      form.reset();
      await loadGuestWishes(currentData);
    }
  });
}

(async function init() {
  await loadInvitation();

  const seconds = Number(cfg.POLL_SECONDS || 30);

  if (client && seconds > 0) {
    timerHandle = setInterval(loadInvitation, seconds * 1000);
  }
})();