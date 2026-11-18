/* Portfolio de Dimitri Gigan : moteur du jeu de cartes.
   Le contenu se modifie dans data.js, pas ici. */
(() => {
  "use strict";
  const d = window.PORTFOLIO;
  if (!d) return;

  /* =========================================================
     Outils
     ========================================================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const esc = t => String(t ?? "").replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wait = ms => new Promise(r => setTimeout(r, calm ? 0 : ms));
  const id = d.identite;

  /* =========================================================
     Sauvegarde (dans le navigateur du visiteur)
     ========================================================= */
  const KEY = "dg-portfolio-jeu-v1";
  const store = (() => {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { s = {}; }
    s.found = new Set(s.found || []);
    s.missions = new Set(s.missions || []);
    s.packs = s.packs || 0;
    const save = () => {
      try {
        localStorage.setItem(KEY, JSON.stringify({ ...s, found: [...s.found], missions: [...s.missions] }));
      } catch { /* stockage indisponible : le jeu marche quand même */ }
    };
    return { s, save };
  })();
  const S = store.s;

  /* =========================================================
     Sons (générés, aucun fichier) : coupés par défaut
     ========================================================= */
  const Sound = (() => {
    let ctx = null;
    const ac = () => {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    };
    const noise = (dur, f0, f1, type = "bandpass", gain = .22) => {
      const c = ac(), len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate), data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = type; f.Q.value = 1.2;
      f.frequency.setValueAtTime(f0, c.currentTime);
      f.frequency.exponentialRampToValueAtTime(f1, c.currentTime + dur);
      const g = c.createGain(); g.gain.value = gain;
      src.connect(f).connect(g).connect(c.destination); src.start();
    };
    const tone = (freq, t0, dur, type = "sine", gain = .12) => {
      const c = ac(), t = c.currentTime + t0;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .012);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05);
    };
    const arp = (notes, step = .07, type = "triangle", dur = .35) => notes.forEach((n, i) => tone(n, i * step, dur, type));
    const sounds = {
      flip: () => noise(.09, 3200, 1100),
      draw: () => noise(.2, 1600, 500, "bandpass", .18),
      tear: () => noise(.5, 700, 7000, "highpass", .28),
      super: () => arp([784, 988], .08),
      ultra: () => arp([659, 784, 988, 1319], .07),
      secrete: () => arp([523, 659, 784, 1047, 1319, 1568], .06, "triangle", .5),
      success: () => arp([660, 880, 1320], .09, "sine", .3),
      fail: () => { tone(196, 0, .18, "square", .05); tone(147, .1, .22, "square", .05); },
      unlock: () => arp([523, 659, 784, 1047, 784, 1047, 1319, 1568, 2093], .08, "triangle", .6)
    };
    return {
      play(name) { if (!S.sound) return; try { sounds[name]?.(); } catch { /* audio indisponible */ } },
      set(on) { S.sound = on; store.save(); if (on) { try { ac(); } catch { /* */ } } }
    };
  })();

  /* =========================================================
     Textes simples et liens
     ========================================================= */
  const slots = {
    prenom: id.prenom, nom: id.nom, titre: id.titre, accroche: id.accroche,
    email: id.email, ville: id.ville, annee: new Date().getFullYear()
  };
  $$("[data-slot]").forEach(n => { const k = n.dataset.slot; if (k in slots) n.textContent = slots[k]; });
  const status = $('[data-slot="disponibilite"]');
  if (id.disponible) { status.textContent = id.disponibilite; status.hidden = false; }
  if (id.logo) {
    const mono = $(".monogram");
    mono.classList.add("has-logo");
    mono.innerHTML = `<img src="${esc(id.logo)}" alt="Logo, retour en haut">`;
    $('link[rel="icon"]').href = id.logo;
  }
  const hrefs = { mailto: "mailto:" + id.email, cv: id.cv, linkedin: id.linkedin };
  $$("[data-href]").forEach(a => { const h = hrefs[a.dataset.href]; if (h) a.href = h; else a.remove(); });

  /* =========================================================
     Catalogue des cartes
     ========================================================= */
  const RARETES = { rare: "Rare", super: "Super rare", ultra: "Ultra rare", secrete: "Rare secrète" };
  const RANG = { rare: 0, super: 1, ultra: 2, secrete: 3 };
  const KINDS = { cert: "Certificat de formation", skill: "Compétence", exp: "Expérience", form: "Formation", secret: "Carte secrète" };
  const cert = d.certifications;

  const catalog = [];
  cert.modules.forEach((m, i) => catalog.push({
    id: m.id || `cert-${i + 1}`, kind: "cert", index: i, total: cert.modules.length,
    titre: m.titre, niveau: m.niveau, rarete: m.rarete, effet: m.effet, detail: m.detail,
    organisme: m.organisme, duree: m.duree, date: m.date, modalite: m.modalite, fichier: m.fichier,
    stats: m.stats || [m.duree && ["Durée", m.duree], (String(m.date || "").match(/\d{4}/) || [])[0] && ["Année", String(m.date).match(/\d{4}/)[0]]].filter(Boolean),
    source: "#certifications", sourceLabel: "les certificats en haut de page"
  }));
  const certMeta = c => [c.duree, c.modalite && c.modalite.toLowerCase(), c.date, c.organisme && `par le ${c.organisme}`].filter(Boolean).join(", ");
  (d.cartesCompetences || []).forEach((c, i, arr) => catalog.push({
    id: c.id || slug(c.titre), kind: "skill", index: i, total: arr.length,
    titre: c.titre, niveau: c.niveau, rarete: c.rarete, effet: c.effet, icone: c.icone,
    stats: c.stats || [], source: "#competences", sourceLabel: "les boosters de compétences"
  }));
  const parcours = [
    ...d.experiences.map(x => ({ kind: "exp", titre: x.entreprise, role: x.poste, periode: x.periode, debut: x.debut || 0, missions: x.missions || [], lieu: x.lieu })),
    ...d.formations.map(f => ({ kind: "form", titre: f.ecole, role: f.diplome, periode: f.periode, debut: f.debut || 0, missions: [] }))
  ].sort((a, b) => a.debut - b.debut);
  parcours.forEach((p, i) => catalog.push({
    ...p, id: `p-${slug(p.titre)}`, index: i, total: parcours.length,
    rarete: p.kind === "exp" && i === parcours.length - 1 ? "ultra" : p.kind === "form" ? "super" : "rare",
    effet: p.role, source: "#parcours", sourceLabel: "la pioche du parcours"
  }));
  const secret = { id: "secret", kind: "secret", rarete: "secrete", titre: d.carteSecrete?.titre || "Me recruter", effet: d.carteSecrete?.effet || "" };
  const byId = Object.fromEntries(catalog.map(c => [c.id, c]));
  const TOTAL = catalog.length;
  S.found = new Set([...S.found].filter(x => byId[x])); // ignore les cartes qui n'existent plus

  /* =========================================================
     Dessins des cartes
     ========================================================= */
  const ICONS = {
    data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    chart: '<path d="M3 21h18"/><path d="M6 17v-5M11 17V7M16 17v-8M21 17V4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9"/>',
    support: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13.5" width="4.5" height="6.5" rx="1.5"/><rect x="17" y="13.5" width="4.5" height="6.5" rx="1.5"/>',
    alert: '<path d="M12 3 2 21h20Z"/><path d="M12 10v5M12 18v.4"/>',
    ticket: '<path d="M3 7h18v3.5a2 2 0 0 0 0 4V18H3v-3.5a2 2 0 0 0 0-4Z"/><path d="M14.5 7v11" stroke-dasharray="2 2.2"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    screen: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    network: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.2V12M12 12 6.5 17.3M12 12l5.5 5.3"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'
  };
  const hexes = (active) => {
    const pts = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => {
      const a = Math.PI / 180 * (60 * k - 30);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    const cells = [[50, 30], [80, 30], [35, 56], [65, 56], [95, 56], [50, 82]];
    return `<svg viewBox="15 8 100 98" aria-hidden="true">${cells.map(([x, y], k) =>
      `<polygon points="${pts(x, y, 16)}" class="${k === active ? "on" : k < active ? "got" : ""}"/>`).join("")}</svg>`;
  };
  const STAR = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z"/></svg>';
  const emblem = () => id.logo ? `<span class="back__emblem has-logo"><img src="${esc(id.logo)}" alt=""></span>` : `<span class="back__emblem">DG</span>`;

  function art(c) {
    if (c.kind === "cert") return `<span class="card__art">${hexes(c.index)}</span>`;
    if (c.kind === "skill") return `<span class="card__art card__art--icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c.icone] || ICONS.gear}</svg></span>`;
    if (c.kind === "secret") return `<span class="card__art card__art--secret">${emblem()}</span>`;
    const end = (String(c.periode).match(/(\d{4})\s*$/) || [])[1];
    return `<span class="card__art card__art--year"><span class="year">${esc(c.debut || "")}</span>${end && end !== String(c.debut) ? `<span class="year__end">jusqu'à ${esc(end)}</span>` : ""}</span>`;
  }

  /** Construit une carte (bouton) à partir d'une entrée du catalogue. */
  function makeCard(c, { side = "front", label } = {}) {
    const rarete = RARETES[c.rarete] ? c.rarete : "rare";
    const niveau = c.niveau ? Math.max(1, Math.min(10, c.niveau)) : 0;
    const card = el("button", "card");
    card.type = "button";
    card.dataset.kind = c.kind;
    card.dataset.rarete = rarete;
    card.dataset.side = side;
    card.dataset.card = c.id;
    const num = c.total ? `${c.index + 1}/${c.total}` : "★";
    const stats = (c.stats || []).map(([k, v]) => `<span>${esc(k)} <b>${esc(v)}</b></span>`).join("");
    const effLabel = c.kind === "exp" ? "Rôle" : c.kind === "form" ? "Diplôme" : "Effet";
    card.setAttribute("aria-label", label || `${KINDS[c.kind]} : ${c.titre}${niveau ? `, niveau ${niveau}` : ""}, ${RARETES[rarete].toLowerCase()}`);
    card.innerHTML = `
      <span class="card__flip">
        <span class="face face--front">
          <span class="card__inner">
            <span class="card__top">${KINDS[c.kind]}</span>
            <span class="card__title">${esc(c.titre)}</span>
            <span class="card__stars"${niveau ? ` title="Niveau ${niveau}"` : ""}>${niveau ? STAR.repeat(niveau) : c.periode ? `<span class="card__period">${esc(c.periode)}</span>` : ""}</span>
            ${art(c)}
            <span class="card__effect"><b>${effLabel}</b> ${esc(c.effet || "")}</span>
            <span class="card__stats">${stats}</span>
            <span class="card__foot"><span>${RARETES[rarete]}</span><span>${num}</span></span>
          </span>
        </span>
        <span class="face face--back">
          ${emblem()}
          ${c.kind === "cert" ? `<span class="back__detail">
            <span class="back__title">${esc(c.titre)}</span>
            <span class="back__text">${esc(c.detail || "")}</span>
            <span class="back__meta">${esc(certMeta(c))}</span>
            <span class="back__hint">Cliquer pour retourner</span>
          </span>` : ""}
        </span>
      </span>`;
    return card;
  }

  /** Reflet holographique et inclinaison qui suivent la souris. */
  function addTilt(card) {
    if (!fine || calm) return;
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--px", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--py", (y * 100).toFixed(1) + "%");
      card.style.setProperty("--rx", ((0.5 - y) * 14).toFixed(2) + "deg");
      card.style.setProperty("--ry", ((x - 0.5) * 14).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", () => ["--px", "--py", "--rx", "--ry"].forEach(p => card.style.removeProperty(p)));
  }

  /** Retourne une carte face visible, avec le son de sa rareté. */
  function reveal(card) {
    if (card.dataset.side === "front") return;
    card.dataset.side = "front";
    Sound.play("flip");
    const r = card.dataset.rarete;
    if (r !== "rare") setTimeout(() => Sound.play(r), 250);
    if (r === "ultra" || r === "secrete") { card.classList.add("is-shiny"); setTimeout(() => card.classList.remove("is-shiny"), 1600); }
  }

  /* =========================================================
     Collection : découvertes, compteur, notifications
     ========================================================= */
  const toasts = $(".toasts");
  function toast(html, { action, onAction, long } = {}) {
    const t = el("div", "toast");
    t.innerHTML = `<span>${html}</span>`;
    if (action) {
      const b = el("button", "toast__btn", action);
      b.type = "button";
      b.addEventListener("click", () => { onAction?.(); t.remove(); });
      t.append(b);
    }
    toasts.append(t);
    while (toasts.children.length > 3) toasts.firstElementChild.remove();
    setTimeout(() => { t.classList.add("is-out"); setTimeout(() => t.remove(), 400); }, long ? 8000 : 3200);
  }

  function discover(cardId) {
    if (!byId[cardId] || S.found.has(cardId)) return false;
    S.found.add(cardId);
    store.save();
    const c = byId[cardId];
    updateCount(true);
    renderAlbum();
    toast(`Nouvelle carte : <b>${esc(c.titre)}</b> <span class="toast__meta">${S.found.size}/${TOTAL}</span>`);
    if (S.found.size === TOTAL) unlockSecret();
    return true;
  }

  function updateCount(pulse) {
    const chip = $(".chip");
    $("[data-count]").textContent = `${S.found.size}/${TOTAL}`;
    chip.setAttribute("aria-label", `Ma collection : ${S.found.size} cartes sur ${TOTAL}`);
    if (pulse && !calm) { chip.classList.remove("is-pulse"); void chip.offsetWidth; chip.classList.add("is-pulse"); }
  }

  function unlockSecret() {
    setTimeout(() => {
      Sound.play("unlock");
      toast("Collection complète ! <b>La carte secrète est débloquée.</b>", { action: "La voir", onAction: () => openViewer("secret"), long: true });
      renderAlbum();
    }, 900);
  }

  /* =========================================================
     1. La main de cartes : certifications (haut de page)
     ========================================================= */
  const hand = $(".hand");
  const certCards = catalog.filter(c => c.kind === "cert");
  $(".deck__set").textContent = cert.resume || "";
  const pickTitle = $(".deck__pick strong"), pickText = $(".deck__pick span");
  const pickMeta = $(".deck__meta"), pickFile = $(".deck__file");
  // Moins il y a de cartes, plus l'éventail s'ouvre
  const nCert = certCards.length;
  hand.style.setProperty("--fan", nCert <= 3 ? .66 : nCert <= 4 ? .45 : .27);
  hand.style.setProperty("--fan-rot", nCert <= 3 ? "9deg" : "6deg");
  certCards.forEach((c, i) => {
    const card = makeCard(c, { side: calm ? "front" : "back", label: `Certificat ${c.titre}, ${i + 1} sur ${certCards.length}. Retourner la carte.` });
    card.style.setProperty("--i", i);
    card.style.setProperty("--n", certCards.length);
    card.setAttribute("aria-pressed", "false");
    card.addEventListener("click", () => selectCert(i, true));
    addTilt(card);
    hand.append(card);
  });
  const handCards = $$(".card", hand);
  let currentCert = -1;
  function selectCert(i, fromClick) {
    const card = handCards[i];
    if (fromClick && i === currentCert) {
      card.dataset.side = card.dataset.side === "front" ? "back" : "front";
      Sound.play("flip");
    } else {
      handCards.forEach((k, j) => { k.setAttribute("aria-pressed", String(j === i)); if (j !== i) k.dataset.side = "front"; });
      if (fromClick) { card.dataset.side = "back"; Sound.play("flip"); }
      currentCert = i;
    }
    if (fromClick) discover(certCards[i].id);
    const c = certCards[i];
    pickTitle.textContent = `${c.titre}.`;
    pickText.textContent = c.detail;
    pickMeta.textContent = certMeta(c);
    if (c.fichier) { pickFile.href = c.fichier; pickFile.hidden = false; pickFile.setAttribute("aria-label", `Voir le certificat ${c.titre} (PDF)`); }
    else pickFile.hidden = true;
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    hand.classList.add("is-dealt");
    if (calm) { hand.classList.add("is-ready"); selectCert(0, false); return; }
    const deal = 900 + handCards.length * 70;
    handCards.forEach((k, j) => setTimeout(() => { k.dataset.side = "front"; }, deal + j * 160));
    setTimeout(() => { hand.classList.add("is-ready"); selectCert(0, false); }, deal + handCards.length * 160 + 400);
  }));

  /* =========================================================
     2. Parcours en pioche
     ========================================================= */
  const terrain = $(".terrain");
  const pileBtn = $(".deckpile");
  const detail = $(".pioche__detail");
  const pCards = catalog.filter(c => c.kind === "exp" || c.kind === "form");
  const slotEls = pCards.map((c, i) => {
    const li = el("li", "slot");
    li.dataset.hint = c.debut || "";
    li.setAttribute("aria-label", `Emplacement ${i + 1}, vide`);
    terrain.append(li);
    return li;
  });
  let drawn = 0;

  function showDetail(c) {
    $$(".card", terrain).forEach(k => k.setAttribute("aria-pressed", String(k.dataset.card === c.id)));
    detail.innerHTML = `
      <p class="pd__kind" data-kind="${c.kind}">${KINDS[c.kind]}</p>
      <h3 class="pd__title">${esc(c.titre)}</h3>
      <p class="pd__role">${esc(c.role)}</p>
      <p class="pd__when">${esc(c.periode)}${c.lieu ? `, ${esc(c.lieu)}` : ""}</p>
      ${c.missions.length ? `<ul class="pd__list">${c.missions.map(m => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}`;
  }

  function placeCard(i, animate) {
    const c = pCards[i], slot = slotEls[i];
    const card = makeCard(c, { side: animate && !calm ? "back" : "front" });
    card.setAttribute("aria-pressed", "false");
    card.addEventListener("click", () => showDetail(c));
    addTilt(card);
    slot.replaceChildren(card);
    slot.classList.add("is-filled");
    slot.removeAttribute("aria-label");
    if (animate && !calm) {
      const a = pileBtn.getBoundingClientRect(), b = slot.getBoundingClientRect();
      card.style.setProperty("--from-x", `${a.left + a.width / 2 - (b.left + b.width / 2)}px`);
      card.style.setProperty("--from-y", `${a.top + a.height / 2 - (b.top + b.height / 2)}px`);
      card.classList.add("is-drawn");
      Sound.play("draw");
      setTimeout(() => reveal(card), 520);
      slot.scrollIntoView?.({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }

  function updatePile() {
    const left = pCards.length - drawn;
    $("[data-left]").textContent = left ? `${left} carte${left > 1 ? "s" : ""}` : "Vide";
    pileBtn.disabled = left === 0;
    pileBtn.setAttribute("aria-label", left ? `Piocher la prochaine carte du parcours, ${left} restante${left > 1 ? "s" : ""}` : "Pioche vide : tout le parcours est sur le terrain");
    pileBtn.classList.toggle("is-empty", left === 0);
    $('[data-act="draw-all"]').hidden = left === 0;
  }

  function draw() {
    if (drawn >= pCards.length) return;
    const i = drawn++;
    placeCard(i, true);
    updatePile();
    discover(pCards[i].id);
    showDetail(pCards[i]);
  }
  async function drawAll() {
    while (drawn < pCards.length) { draw(); await wait(380); }
  }
  // Cartes déjà piochées lors d'une visite précédente
  while (drawn < pCards.length && S.found.has(pCards[drawn].id)) placeCard(drawn++, false);
  if (drawn) showDetail(pCards[drawn - 1]);
  else detail.innerHTML = `<p class="pd__empty">Le terrain est vide. Pioche ta première carte !</p>`;
  updatePile();

  /* =========================================================
     3. Booster de compétences
     ========================================================= */
  const pack = $(".pack"), pull = $(".pull"), bStatus = $(".booster__status");
  const btnReveal = $('[data-act="reveal-all"]'), btnNew = $('[data-act="new-pack"]');
  const skills = catalog.filter(c => c.kind === "skill");
  let opening = false;

  function pickPack() {
    const fresh = shuffle(skills.filter(c => !S.found.has(c.id)));
    const known = shuffle(skills.filter(c => S.found.has(c.id)));
    const picked = [...fresh.slice(0, 5), ...known].slice(0, Math.min(5, skills.length));
    return picked.sort((a, b) => RANG[a.rarete] - RANG[b.rarete]); // la plus rare en dernier
  }

  function packDone() {
    const left = skills.filter(c => !S.found.has(c.id)).length;
    bStatus.textContent = left
      ? `Booster terminé. Il reste ${left} compétence${left > 1 ? "s" : ""} à découvrir.`
      : `Toutes les compétences sont dans ta collection (${S.packs} booster${S.packs > 1 ? "s" : ""} ouvert${S.packs > 1 ? "s" : ""}).`;
    btnReveal.hidden = true;
    btnNew.hidden = false;
  }

  function onPullFlip() {
    const rest = $$(".card", pull).filter(k => k.dataset.side === "back").length;
    if (!rest) packDone();
    else bStatus.textContent = `Encore ${rest} carte${rest > 1 ? "s" : ""} à retourner.`;
  }

  async function openPack() {
    if (opening) return;
    opening = true;
    btnNew.hidden = true;
    Sound.play("tear");
    pack.classList.add("is-tearing");
    await wait(650);
    pack.hidden = true;
    S.packs++; store.save();
    const cards = pickPack();
    pull.replaceChildren();
    cards.forEach((c, i) => {
      const card = makeCard(c, { side: "back", label: `Carte face cachée ${i + 1} sur ${cards.length}. Retourner.` });
      card.style.setProperty("--i", i);
      card.addEventListener("click", () => {
        if (card.dataset.side === "front") return;
        reveal(card);
        card.setAttribute("aria-label", `${c.titre}, ${RARETES[c.rarete].toLowerCase()}, niveau ${c.niveau}`);
        discover(c.id);
        onPullFlip();
      });
      addTilt(card);
      pull.append(card);
    });
    pull.classList.add("is-open");
    bStatus.textContent = "Clique sur chaque carte pour la retourner.";
    btnReveal.hidden = false;
    $(".card", pull)?.focus({ preventScroll: true });
    opening = false;
  }

  async function revealAll() {
    btnReveal.hidden = true;
    for (const card of $$(".card", pull)) {
      if (card.dataset.side === "back") { card.click(); await wait(260); }
    }
  }

  function resetPack() {
    pull.replaceChildren();
    pull.classList.remove("is-open");
    pack.hidden = false;
    pack.classList.remove("is-tearing");
    bStatus.textContent = "Clique sur le booster pour l'ouvrir.";
    btnNew.hidden = true;
    pack.focus({ preventScroll: true });
  }

  /* =========================================================
     4. Mini-duel recruteur
     ========================================================= */
  const missions = d.missions || [];
  const mCount = $(".mission__count"), mTitle = $(".mission__title"), mFeed = $(".mission__feedback");
  const dHand = $(".duel__hand"), dScore = $(".duel__score");
  const btnNext = $('[data-act="next-mission"]'), btnResetM = $('[data-act="reset-missions"]');
  let mIndex = 0;

  const score = () => { dScore.textContent = `Missions réussies : ${S.missions.size}/${missions.length}`; };
  const firstOpenMission = () => { const i = missions.findIndex((_, k) => !S.missions.has(k)); return i === -1 ? null : i; };

  function finale() {
    mCount.textContent = "Toutes les missions";
    mTitle.textContent = "Recruteur convaincu ?";
    mFeed.innerHTML = `Vous avez vu comment je résous ${missions.length} situations concrètes. La suite se passe par email : <a href="mailto:${esc(id.email)}">${esc(id.email)}</a>`;
    mFeed.dataset.state = "win";
    dHand.replaceChildren();
    $(".duel__prompt").hidden = true;
    btnNext.hidden = true;
    btnResetM.hidden = false;
  }
  function loadMission(i) {
    if (i == null) return finale();
    mIndex = i;
    const m = missions[i];
    mCount.textContent = `Mission ${i + 1} sur ${missions.length}`;
    mTitle.textContent = m.titre;
    mFeed.textContent = "";
    delete mFeed.dataset.state;
    $(".duel__prompt").hidden = false;
    btnNext.hidden = true;
    btnResetM.hidden = S.missions.size === 0;
    dHand.replaceChildren();
    shuffle([m.bonne, ...m.autres]).forEach(cid => {
      const c = byId[cid];
      if (!c) return;
      const card = makeCard(c, { label: `Jouer la carte ${c.titre}` });
      card.addEventListener("click", () => play(card, cid));
      addTilt(card);
      dHand.append(card);
    });
  }
  function play(card, cid) {
    const m = missions[mIndex];
    if (mFeed.dataset.state === "win") return;
    if (cid === m.bonne) {
      card.classList.add("is-played");
      $$(".card", dHand).forEach(k => { if (k !== card) k.classList.add("is-out"); k.disabled = true; });
      Sound.play("success");
      mFeed.innerHTML = `<b>Mission réussie.</b> ${esc(m.bravo)}`;
      mFeed.dataset.state = "win";
      S.missions.add(mIndex); store.save();
      discover(cid);
      score();
      const next = firstOpenMission();
      btnNext.hidden = false;
      btnNext.textContent = next == null ? "Voir le résultat" : "Mission suivante";
      btnResetM.hidden = false;
      btnNext.focus({ preventScroll: true });
    } else {
      card.classList.remove("is-wrong"); void card.offsetWidth; card.classList.add("is-wrong");
      card.disabled = true;
      Sound.play("fail");
      mFeed.innerHTML = `<b>Pas cette carte.</b> Indice : ${esc(m.indice)}`;
      mFeed.dataset.state = "miss";
    }
  }
  btnNext.addEventListener("click", () => {
    loadMission(firstOpenMission());
    $(".duel__hand .card")?.focus({ preventScroll: true });
  });
  btnResetM.addEventListener("click", () => { S.missions.clear(); store.save(); score(); loadMission(0); });
  score();
  loadMission(firstOpenMission());

  /* =========================================================
     5. Album de la collection
     ========================================================= */
  const album = $(".album");
  function renderAlbum() {
    const n = S.found.size;
    $(".progress__bar").style.width = `${(n / TOTAL) * 100}%`;
    const pb = $(".progress");
    pb.setAttribute("aria-valuemax", TOTAL);
    pb.setAttribute("aria-valuenow", n);
    $(".album__count").innerHTML = n === TOTAL
      ? `<b>${n}/${TOTAL}</b> : collection complète, la carte secrète est à toi.`
      : `<b>${n}/${TOTAL}</b> cartes découvertes`;
    album.replaceChildren();
    [...catalog, secret].forEach(c => {
      const li = el("li");
      const b = el("button", "mini");
      b.type = "button";
      const got = c.kind === "secret" ? n === TOTAL : S.found.has(c.id);
      b.dataset.kind = c.kind;
      b.dataset.rarete = c.rarete || "rare";
      if (got) {
        b.innerHTML = `<span class="mini__kind">${KINDS[c.kind]}</span><span class="mini__title">${esc(c.titre)}</span><span class="mini__rar">${RARETES[c.rarete] || ""}</span>`;
        b.setAttribute("aria-label", `${c.titre}, ${KINDS[c.kind].toLowerCase()}. Voir la carte.`);
        b.addEventListener("click", () => openViewer(c.id));
      } else {
        b.classList.add("is-locked");
        b.innerHTML = `<span class="mini__q" aria-hidden="true">${c.kind === "secret" ? "★" : "?"}</span>`;
        if (c.kind === "secret") {
          b.setAttribute("aria-label", "Carte secrète verrouillée. Complète la collection pour la débloquer.");
          b.addEventListener("click", () => toast(`Il te manque <b>${TOTAL - n}</b> carte${TOTAL - n > 1 ? "s" : ""} pour débloquer la carte secrète.`));
        } else {
          b.setAttribute("aria-label", `Carte inconnue. À trouver dans ${c.sourceLabel}.`);
          b.addEventListener("click", () => {
            toast(`Cette carte se trouve dans ${c.sourceLabel}.`);
            $(c.source)?.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
          });
        }
      }
      li.append(b);
      album.append(li);
    });
  }

  /* =========================================================
     Visionneuse (boîte de dialogue)
     ========================================================= */
  const viewer = $(".viewer");
  function openViewer(cardId) {
    const c = cardId === "secret" ? secret : byId[cardId];
    if (!c) return;
    const card = makeCard(c, { side: "front" });
    card.addEventListener("click", () => {
      card.dataset.side = card.dataset.side === "front" ? "back" : "front";
      Sound.play("flip");
    });
    addTilt(card);
    $(".viewer__card").replaceChildren(card);
    $("#viewer-title").textContent = c.titre;
    let body = "";
    if (c.kind === "cert") body = `<p>${esc(c.detail)}</p><p class="viewer__meta">${esc(certMeta(c))}</p>${c.fichier ? `<div class="viewer__actions"><a class="btn btn--primary" href="${esc(c.fichier)}" target="_blank" rel="noopener">Voir le certificat (PDF)</a></div>` : ""}`;
    else if (c.kind === "skill") body = `<p>${esc(c.effet)}</p><p class="viewer__meta">${RARETES[c.rarete]}, niveau ${c.niveau}</p>`;
    else if (c.kind === "secret") body = `<p>${esc(d.carteSecrete?.message || "")}</p>
      <div class="viewer__actions"><a class="btn btn--primary" href="mailto:${esc(id.email)}">M'écrire</a><a class="btn btn--dark" href="${esc(id.cv)}" download>Télécharger mon CV</a></div>`;
    else body = `<p>${esc(c.role)}</p><p class="viewer__meta">${esc(c.periode)}</p>${c.missions.length ? `<ul>${c.missions.map(m => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}`;
    $(".viewer__body").innerHTML = body;
    viewer.dataset.kind = c.kind;
    viewer.showModal();
    if (c.kind === "secret") Sound.play("secrete");
  }
  viewer.addEventListener("click", e => { if (e.target === viewer) viewer.close(); });

  renderAlbum();
  updateCount(false);

  /* =========================================================
     Mode classique, son, actions
     ========================================================= */
  // Mode classique par défaut ; le choix du visiteur est retenu
  function setMode(classic) {
    S.mode = classic ? "classique" : "jeu"; S.classic = classic; store.save();
    document.body.classList.toggle("is-classic", classic);
    const b = $(".mode-btn");
    b.textContent = classic ? "Mode jeu" : "Mode classique";
    b.setAttribute("aria-label", classic ? "Passer en mode jeu de cartes" : "Passer en mode classique");
  }
  function setSound(on, quiet) {
    Sound.set(on);
    const b = $('[data-act="sound"]');
    b.setAttribute("aria-pressed", String(on));
    b.setAttribute("aria-label", on ? "Couper le son" : "Activer le son");
    if (on && !quiet) Sound.play("success");
  }
  setMode(S.mode !== "jeu");
  setSound(!!S.sound, true);

  // Confirmation sans boîte de dialogue du navigateur : il faut cliquer deux fois
  let resetArmed = 0;
  function confirmReset() {
    const b = $('[data-act="reset-all"]');
    if (Date.now() - resetArmed < 4000) return true;
    resetArmed = Date.now();
    b.textContent = "Cliquer encore pour tout effacer";
    setTimeout(() => { b.textContent = "Recommencer la collection"; }, 4000);
    return false;
  }

  const actions = {
    mode: () => {
      setMode(!S.classic);
      toast(S.classic ? "Mode classique : tout le parcours en liste." : "Mode jeu activé. Bonne partie !");
      if (!S.classic) $("#parcours").scrollIntoView({ behavior: calm ? "auto" : "smooth" });
    },
    sound: () => setSound(!S.sound),
    draw,
    "draw-all": drawAll,
    "open-pack": openPack,
    "reveal-all": revealAll,
    "new-pack": resetPack,
    "close-viewer": () => viewer.close(),
    "reset-all": () => {
      if (!confirmReset()) return;
      S.found.clear(); S.missions.clear(); S.packs = 0; store.save();
      location.reload();
    }
  };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-act]");
    if (t && actions[t.dataset.act]) actions[t.dataset.act](e);
  });

  /* =========================================================
     Contenu du mode classique
     ========================================================= */
  const tl = $('[data-list="experiences"]');
  d.experiences.forEach((x, i) => {
    const li = el("li", "job" + (i === 0 ? " job--lead" : ""));
    const head = el("div", "job__head");
    head.append(el("h4", "job__org", x.entreprise), el("p", "job__when", x.periode));
    const ul = el("ul", "job__tasks");
    x.missions.forEach(m => ul.append(el("li", null, m)));
    li.append(head, el("p", "job__role", x.poste), ul);
    tl.append(li);
  });
  const sc = $('[data-list="formations"]');
  d.formations.forEach(f => {
    const li = el("li", "school");
    li.append(el("p", "school__when", f.periode), el("h4", "school__name", f.ecole), el("p", "school__what", f.diplome));
    sc.append(li);
  });
  const early = $('[data-list="premieres"]');
  if (d.premieresExperiences?.length) {
    d.premieresExperiences.forEach(p => {
      const li = el("li");
      li.append(el("span", "early__when", p.periode), el("strong", null, p.entreprise), el("span", "early__what", p.poste));
      early.append(li);
    });
  } else $(".early").remove();
  const sg = $('[data-list="competences"]');
  d.competences.forEach(g => {
    const box = el("div", "skillset");
    const ul = el("ul");
    g.items.forEach(s => ul.append(el("li", null, s)));
    box.append(el("h3", "sub", g.groupe), ul);
    sg.append(box);
  });
  const at = $('[data-list="atouts"]');
  d.atouts.forEach(a => at.append(el("li", null, a)));
})();
