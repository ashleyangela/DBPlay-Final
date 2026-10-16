/* ===== DB PLAY — about.js (DonBelle edition) =====
   Built the same way as gallery.js: ALL the page content lives in the
   data below, and the script draws the page from it.
   To change a name, date, poster or fact, edit the data. No HTML to touch.

   Needs gallery.css + about.css. Do NOT load Main.js on this page.
   If a picture file is missing, a placeholder is shown (like the gallery). */

/* ---------- DATA: people ---------- */
const people = {
  belle: {
    img: "PHOTO/BELLE.png",
    name: "BELLE MARIANO",
    role: "Actress | Singer | Model",
    alt: "Belle Mariano",
    info: [
      ["Birth Name", "Belinda Angelito Mariano"],
      ["Birthdate", "June 10, 2002"],
      ["Birthplace", "Pasig, Metro Manila, Philippines"],
      ["Nationality", "Filipino"],
      ["Zodiac Sign", "Gemini"],
    ],
    childhood: {
      img: "PHOTO/Belle_childhood.jpg",
      alt: "Belle Mariano as a child",
      text: "Belle began her entertainment career at a young age, taking on early acting and modeling work before landing supporting roles and eventually growing into leading acting roles.",
    },
  },
  donny: {
    img: "PHOTO/Donny.png",
    name: "DONNY PANGILINAN",
    role: "Actor | Singer | Host | Model",
    alt: "Donny Pangilinan",
    info: [
      ["Birth Name", "Donato Antonio Laxa Pangilinan"],
      ["Birthdate", "February 10, 1998"],
      ["Birthplace", "Manila, Philippines"],
      ["Nationality", "Filipino"],
      ["Zodiac Sign", "Aquarius"],
    ],
    childhood: {
      img: "PHOTO/Donny_childhood.jpg",
      alt: "Donny Pangilinan as a child",
      text: "Donny grew up in a family with ties to the entertainment industry. He was raised valuing education and discipline, later working as an on-air personality before moving into acting.",
    },
  },
};

/* ---------- DATA: page text ---------- */
const intro = {
  title: "DONBELLE",
  subtitle: "Donny Pangilinan & Belle Mariano",
  desc: "A popular Filipino love team known for their strong on-screen chemistry and successful projects together. They have captured the hearts of many fans through their natural connection and memorable performances.",
  duoImg: "PHOTO/DB.jpg",
  duoAlt: "Donny and Belle",
};

const about = {
  heading: "ABOUT DONBELLE",
  text: "DonBelle is the love-team name of Donny Pangilinan and Belle Mariano. Their partnership became widely recognized through He's Into Her and continued through several films and television projects, including Love Is Color Blind, An Inconvenient Love, and Can't Buy Me Love.",
};

const timeline = [
  {
    icon: "🎬",
    year: "2021",
    title: "He's Into Her",
    desc: "Their first major project together, where they played Deib and Max.",
  },
  {
    icon: "👥",
    year: "2021",
    title: "Love Is Color Blind",
    desc: "They starred together in their first full-length film as Ino and Cara.",
  },
  {
    icon: "📺",
    year: "2023",
    title: "Can't Buy Me Love",
    desc: "They reunited as lead stars in Bingo and Caroline in their first primetime teleserye together.",
  },
  {
    icon: "♡",
    year: "2026",
    title: "Tayo Sa Wakas",
    desc: "They returned to the big screen as Cisco and Checka, marking another major chapter in their partnership.",
  },
];

const posters = [
  {
    src: "PHOTOS/HIH.jpg",
    title: "He's Into Her",
    place: "TV Series",
    tagline: "2021–2022",
    caption:
      "Their first major project together, where they played Deib and Max. The story that made so many fall for Donny and Belle as a love team.",
  },
  {
    src: "PHOTOS/LICB.jpg",
    title: "Love Is Color Blind",
    place: "Film",
    tagline: "2021",
    caption:
      "Their first full-length film together, where they played Ino and Cara.",
  },
  {
    src: "PHOTOS/AIL.jpg",
    title: "An Inconvenient Love",
    place: "Film",
    tagline: "2022",
    caption:
      "Another film that kept the DonBelle partnership going on the big screen.",
  },
  {
    src: "PHOTOS/CBML.jpg",
    title: "Can't Buy Me Love",
    place: "Series",
    tagline: "2024",
    caption:
      "They reunited as lead stars, Bingo and Caroline, in their first primetime teleserye together.",
  },
  {
    src: "PHOTOS/TSW.jpg",
    title: "Tayo Sa Wakas",
    place: "Film",
    tagline: "2026",
    caption:
      "They returned to the big screen as Cisco and Checka, marking another major chapter in their partnership.",
  },
];

const achievements = [
  "Became one of the prominent young love teams in Philippine entertainment.",
  "Gained popularity through He's Into Her.",
  "Starred in successful films and television projects together.",
  "Can't Buy Me Love became their first primetime teleserye together.",
  "Continued their partnership with How to Spot a Red Flag and Tayo Sa Wakas.",
];

const funFacts = [
  "Donny started in entertainment through hosting and MYX.",
  "Donny made his acting film debut in Walwal (2018).",
  "Belle started her showbiz career at a young age.",
  "Belle became part of Goin' Bulilit.",
  "DonBelle is the love-team name of Donny and Belle.",
  "DonBelle has starred together in films and TV shows, including Can't Buy Me Love.",
];

const quote =
  "\u201CDifferent backgrounds, same dreams, one journey. That\u2019s DonBelle.\u201D";

/* ---------- helpers ---------- */
const icon = (path, size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" ` +
  `stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ` +
  `stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const N = posters.length;
const pad = (n) => String(n).padStart(2, "0");
const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------- placeholder art (used if a picture file is missing) ---------- */
function placeholder(i, w, h) {
  const hue = (i * 37 + 190) % 360;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue},65%,58%)"/>` +
    `<stop offset=".65" stop-color="hsl(${(hue + 35) % 360},55%,70%)"/></linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#s)"/>` +
    `<circle cx="${w * 0.3}" cy="${h * 0.23}" r="${w * 0.09}" fill="rgba(255,255,255,.55)"/>` +
    `<path d="M0 ${h * 0.68} L${w * 0.21} ${h * 0.46} L${w * 0.38} ${h * 0.6} L${w * 0.59} ${h * 0.38} L${w * 0.8} ${h * 0.58} L${w} ${h * 0.48} V${h} H0Z" fill="hsl(${hue},35%,32%)"/>` +
    `<path d="M0 ${h * 0.8} L${w * 0.3} ${h * 0.64} L${w * 0.55} ${h * 0.76} L${w} ${h * 0.7} V${h} H0Z" fill="hsl(${hue},30%,18%)"/>` +
    `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* an <img> that swaps itself for the placeholder if the file is missing */
let phSeed = 0;
function imgTag(src, alt, cls, w, h) {
  phSeed += 1;
  return (
    `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" ` +
    `data-ph="${phSeed},${w},${h}" draggable="false" />`
  );
}

function armFallback(img) {
  const [seed, w, h] = img.dataset.ph.split(",").map(Number);
  const swap = () => {
    img.removeEventListener("error", swap);
    img.src = placeholder(seed, w, h);
  };
  img.addEventListener("error", swap);
  if (img.complete && img.naturalWidth === 0) swap();
}

/* ---------- draw the page ---------- */
const card = $("aboutCard");

function side(p) {
  return (
    `<div class="top-side">` +
    imgTag(p.img, p.alt, "avatar", 800, 800) +
    `<h2>${esc(p.name)}</h2><div class="role">${esc(p.role)}</div></div>`
  );
}

function infobox(p) {
  const rows = p.info
    .map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v)}`)
    .join("<br />");
  return `<div class="infobox-col"><div class="infobox">${rows}</div></div>`;
}

function divider(text) {
  return `<div class="section-divider"><h3 class="divider-title">${esc(text)}</h3></div>`;
}

function childText(p) {
  return (
    `<div class="childhood-text"><h4>${esc(p.name)}</h4>` +
    `<p>${esc(p.childhood.text)}</p></div>`
  );
}

function drawPage() {
  const b = people.belle;
  const d = people.donny;

  card.innerHTML =
    /* top row */
    `<div class="top-row">` +
    side(b) +
    `<div class="title-block"><h1 class="title">${esc(intro.title)}</h1>` +
    `<p class="subtitle-script">${esc(intro.subtitle)}</p>` +
    `<p class="desc">${esc(intro.desc)}</p></div>` +
    side(d) +
    `</div>` +
    /* bottom row */
    `<div class="bottom-row">` +
    infobox(b) +
    `<div class="middle">` +
    imgTag(intro.duoImg, intro.duoAlt, "duo-photo", 800, 1067) +
    `</div>` +
    infobox(d) +
    `</div>` +
    /* about */
    `<div class="about"><h3>${esc(about.heading)}</h3><p>${esc(about.text)}</p></div>` +
    /* early life */
    divider("Early Life / Childhood") +
    `<div class="childhood-row">` +
    imgTag(b.childhood.img, b.childhood.alt, "childhood-photo", 800, 984) +
    childText(b) +
    childText(d) +
    imgTag(d.childhood.img, d.childhood.alt, "childhood-photo", 800, 984) +
    `</div>` +
    /* career */
    divider("Career Journey Together") +
    `<div class="timeline-row">` +
    timeline
      .map(
        (t) =>
          `<div class="timeline-item"><div class="timeline-icon">${t.icon}</div>` +
          `<div class="timeline-year">${esc(t.year)}</div>` +
          `<div class="timeline-title">${esc(t.title)}</div>` +
          `<div class="timeline-desc">${esc(t.desc)}</div></div>`,
      )
      .join("") +
    `</div>` +
    `<section class="carousel" id="carousel" aria-roledescription="carousel" aria-label="DonBelle projects">` +
    `<button class="nav-btn prev" id="prevBtn" type="button" aria-label="Previous project">` +
    icon('<path d="M15 4 7 12l8 8" />', 24) +
    `</button><div class="slides" id="slides"></div>` +
    `<button class="nav-btn next" id="nextBtn" type="button" aria-label="Next project">` +
    icon('<path d="m9 4 8 8-8 8" />', 24) +
    `</button></section>` +
    `<div class="carousel-foot"><span class="counter" id="counter" aria-live="polite"></span>` +
    `<div class="dots" id="dots" role="tablist" aria-label="Choose project"></div></div>` +
    /* achievements + fun facts */
    divider("Achievements & Fun Facts") +
    `<div class="facts-row">` +
    `<div class="facts-box"><h3>Achievements</h3><ul>` +
    achievements.map((t) => `<li>${esc(t)}</li>`).join("") +
    `</ul></div>` +
    `<div class="facts-box"><h3>Fun Facts</h3><ul>` +
    funFacts.map((t) => `<li>${esc(t)}</li>`).join("") +
    `</ul></div></div>` +
    /* quote */
    `<div class="quote-wrap"><p class="quote-text">${esc(quote)}</p></div>`;

  card.querySelectorAll("img[data-ph]").forEach(armFallback);
}

if (card) drawPage();

/* ---------- fade-in on scroll ---------- */
if (card && "IntersectionObserver" in window && !reduceMotion) {
  const targets = card.querySelectorAll(
    ".top-side, .title-block, .infobox-col, .middle, .about, " +
      ".section-divider, .childhood-photo, .childhood-text, " +
      ".timeline-item, .facts-box, .quote-wrap",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    const same = Array.from(el.parentElement.children).filter(
      (c) => c.className === el.className,
    );
    const k = same.indexOf(el);
    if (k > 0) el.style.transitionDelay = `${Math.min(k, 5) * 90}ms`;
    observer.observe(el);
  });
}

/* ---------- carousel (same as gallery.js) ---------- */
function makeImg(i, alt) {
  const img = new Image();
  img.alt = alt || "";
  img.draggable = false;
  img.onerror = () => {
    img.onerror = null;
    img.src = placeholder(i + 1, 800, 1120);
  };
  img.src = posters[i].src;
  return img;
}

const slidesEl = $("slides");
const dotsEl = $("dots");
let current = 0;
let suppressClick = false;
let slideEls = [];
let dotEls = [];

function render() {
  slideEls.forEach((el, i) => {
    let d = (i - current + N) % N;
    if (d > N / 2) d -= N;
    const pos = d === 0 ? "0" : Math.abs(d) === 1 ? "near" : "far";
    el.style.setProperty("--o", Math.max(-2, Math.min(2, d)));
    el.dataset.pos = pos;
    el.tabIndex = pos === "far" ? -1 : 0;
    el.setAttribute("aria-hidden", pos === "far" ? "true" : "false");
  });
  dotEls.forEach((d, i) =>
    d.setAttribute("aria-selected", i === current ? "true" : "false"),
  );
  $("counter").textContent = `${pad(current + 1)} / ${pad(N)}`;
}

function goTo(i) {
  current = (i + N) % N;
  render();
}
const next = () => goTo(current + 1);
const prev = () => goTo(current - 1);

/* ---------- lightbox (same as gallery.js) ---------- */
let lb = null;
let lbIndex = 0;
let lastFocus = null;

function buildLightbox() {
  lb = document.createElement("div");
  lb.className = "lightbox";
  lb.id = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-labelledby", "lbTitle");
  lb.setAttribute("aria-hidden", "true");
  lb.innerHTML = `
    <div class="lb-card">
      <figure class="lb-photo">
        <img id="lbImg" alt="" />
        <button class="lb-nav lb-prev" id="lbPrev" type="button" aria-label="Previous project">
          ${icon('<path d="M15 4 7 12l8 8" />', 22)}
        </button>
        <button class="lb-nav lb-next" id="lbNext" type="button" aria-label="Next project">
          ${icon('<path d="m9 4 8 8-8 8" />', 22)}
        </button>
      </figure>
      <aside class="lb-info">
        <button class="lb-close" id="lbClose" type="button" aria-label="Close">
          ${icon('<path d="M5 5l14 14M19 5 5 19" />', 22)}
        </button>
        <p class="lb-count" id="lbCount"></p>
        <h2 id="lbTitle"></h2>
        <p class="lb-sub" id="lbSub"></p>
        <p class="lb-caption" id="lbCaption"></p>
        <h3>More DonBelle projects</h3>
        <div class="lb-thumbs" id="lbThumbs"></div>
      </aside>
    </div>`;
  document.body.appendChild(lb);

  $("lbClose").addEventListener("click", closeLightbox);
  $("lbNext").addEventListener("click", () => lbStep(1));
  $("lbPrev").addEventListener("click", () => lbStep(-1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
}

function renderLightbox() {
  const p = posters[lbIndex];
  const img = $("lbImg");
  img.onerror = () => {
    img.onerror = null;
    img.src = placeholder(lbIndex + 1, 800, 1120);
  };
  img.src = p.src;
  img.alt = p.title;

  $("lbCount").textContent = `${pad(lbIndex + 1)} / ${pad(N)}`;
  $("lbTitle").textContent = p.title;
  $("lbSub").textContent = `${p.place} — ${p.tagline}`;
  $("lbCaption").textContent = p.caption;

  // 4 more projects: the next four after this one
  const thumbs = $("lbThumbs");
  thumbs.innerHTML = "";
  for (let k = 1; k <= Math.min(4, N - 1); k++) {
    const idx = (lbIndex + k) % N;
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `View ${posters[idx].title}`);
    b.appendChild(makeImg(idx, posters[idx].title));
    b.addEventListener("click", () => {
      lbIndex = idx;
      current = idx;
      render();
      renderLightbox();
    });
    thumbs.appendChild(b);
  }
}

function openLightbox(i) {
  lbIndex = i;
  lastFocus = document.activeElement;
  renderLightbox();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("lbClose").focus();
}

function closeLightbox() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + N) % N;
  current = lbIndex;
  render();
  renderLightbox();
}

/* build the slides + dots, then wire the carousel */
if (card && slidesEl && dotsEl && N) {
  buildLightbox();

  slideEls = posters.map((p, i) => {
    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "slide";
    slide.setAttribute("aria-label", `${p.title}, ${p.place}`);
    slide.appendChild(makeImg(i, p.title));

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.innerHTML = `<strong></strong><span class="place"></span><em></em>`;
    cap.querySelector("strong").textContent = p.title;
    cap.querySelector(".place").textContent = p.place;
    cap.querySelector("em").textContent = p.tagline;
    slide.appendChild(cap);

    slide.addEventListener("click", () => {
      if (suppressClick) return;
      if (i === current) openLightbox(i);
      else goTo(i);
    });
    slidesEl.appendChild(slide);
    return slide;
  });

  dotEls = posters.map((p, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", `Project ${i + 1}: ${p.title}`);
    d.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(d);
    return d;
  });

  $("nextBtn").addEventListener("click", next);
  $("prevBtn").addEventListener("click", prev);

  /* swipe / drag */
  const carouselEl = $("carousel");
  let startX = null;
  carouselEl.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".nav-btn")) return;
    startX = e.clientX;
  });
  carouselEl.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
      suppressClick = true;
      setTimeout(() => (suppressClick = false), 0);
    }
  });
  carouselEl.addEventListener("pointercancel", () => (startX = null));

  render();
}

/* ---------- header: menu, search, sign out ---------- */
const menuBtn = $("menuBtn");
const menuPanel = $("menuPanel");

function setMenu(open) {
  if (!menuBtn || !menuPanel) return;
  menuPanel.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  const i = menuBtn.querySelector("i");
  if (i) i.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

if (menuBtn && menuPanel) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!menuPanel.classList.contains("active"));
  });
  menuPanel.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => setMenu(false));
}

const signOut = $("signOut");
if (signOut) {
  signOut.addEventListener("click", () => {
    try {
      localStorage.removeItem("dbplay-user");
      sessionStorage.clear();
    } catch (err) {
      /* ignore */
    }
  });
}

const searchForm = $("searchForm");
const searchInput = $("searchInput");
const searchIcon = $("searchIcon");

function setSearch(open) {
  if (!searchInput) return;
  searchInput.classList.toggle("active", open);
  if (open) searchInput.focus();
  else {
    searchInput.value = "";
    searchInput.removeAttribute("aria-invalid");
  }
}

/* search finds text on this page, scrolls to it and highlights it */
const searchables = card
  ? Array.from(
      card.querySelectorAll(
        ".top-side, .title-block, .infobox, .about, .childhood-text, " +
          ".timeline-item, .facts-box li, .quote-text",
      ),
    )
  : [];

let hitTimer;
function goToText(query) {
  const hit = searchables.find((el) =>
    el.textContent.toLowerCase().includes(query),
  );

  if (!hit) {
    // not in the text: look through the projects in the carousel
    const k = posters.findIndex((p) =>
      [p.title, p.place, p.tagline, p.caption]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
    if (k === -1) return false;
    goTo(k);
    $("carousel").scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
    return true;
  }

  hit.classList.add("in-view");
  hit.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "center",
  });

  document
    .querySelectorAll(".search-hit")
    .forEach((el) => el.classList.remove("search-hit"));
  hit.classList.add("search-hit");
  clearTimeout(hitTimer);
  hitTimer = setTimeout(() => hit.classList.remove("search-hit"), 2400);
  return true;
}

if (searchIcon && searchInput) {
  searchIcon.addEventListener("click", () =>
    setSearch(!searchInput.classList.contains("active")),
  );
  searchIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSearch(!searchInput.classList.contains("active"));
    }
  });
  searchInput.addEventListener("input", () =>
    searchInput.removeAttribute("aria-invalid"),
  );
}
if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return;
    if (!goToText(q)) searchInput.setAttribute("aria-invalid", "true");
  });
}

/* ---------- back to top ---------- */
const toTop = document.createElement("button");
toTop.type = "button";
toTop.className = "to-top";
toTop.setAttribute("aria-label", "Back to top");
toTop.innerHTML = icon('<path d="m6 15 6-6 6 6" />', 22);
document.body.appendChild(toTop);

toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
);
window.addEventListener(
  "scroll",
  () => toTop.classList.toggle("show", window.scrollY > 600),
  { passive: true },
);

/* ---------- keyboard ---------- */
function carouselOnScreen() {
  const el = $("carousel");
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return (
    r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25
  );
}

document.addEventListener("keydown", (e) => {
  const lbOpen = lb && lb.classList.contains("open");

  if (e.key === "Escape") {
    if (lbOpen) closeLightbox();
    else {
      setMenu(false);
      if (searchInput && searchInput.classList.contains("active")) {
        setSearch(false);
      }
    }
    return;
  }

  if (lbOpen) {
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "ArrowLeft") lbStep(-1);
    if (e.key === "Tab") {
      // keep focus inside the lightbox
      const f = [...lb.querySelectorAll("button")];
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    return;
  }

  if (document.activeElement === searchInput) return;
  if (!carouselOnScreen()) return;
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});
