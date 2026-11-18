(() => {
  const d = window.PORTFOLIO;
  if (!d) return;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const id = d.identite;

  /* ---- Textes simples ---- */
  const slots = {
    prenom: id.prenom, nom: id.nom, titre: id.titre, accroche: id.accroche,
    email: id.email, ville: id.ville, annee: new Date().getFullYear()
  };
  $$("[data-slot]").forEach(n => {
    const k = n.dataset.slot;
    if (k in slots) n.textContent = slots[k];
  });
  const status = $('[data-slot="disponibilite"]');
  if (id.disponible) { status.textContent = id.disponibilite; status.hidden = false; }

  if (id.logo) {
    const mono = $(".monogram");
    mono.classList.add("has-logo");
    mono.innerHTML = `<img src="${id.logo}" alt="Logo, retour en haut">`;
    $('link[rel="icon"]').href = id.logo;
  }
  const hrefs = { mailto: "mailto:" + id.email, cv: id.cv, linkedin: id.linkedin };
  $$("[data-href]").forEach(a => {
    const h = hrefs[a.dataset.href];
    if (h) a.href = h; else a.remove();
  });

  /* ---- Main de cartes : certifications ---- */
  const c = d.certifications;
  const hand = $(".hand");
  const total = c.modules.length;
  $(".deck__set").textContent = `Certifié sur le logiciel ${c.nom} en ${c.date.toLowerCase()} : ${total} modules sur ${total}.`;
  const pickTitle = $(".deck__pick strong");
  const pickText = $(".deck__pick span");

  // Motif en nid d'abeille : chaque carte allume sa propre alvéole
  const hexes = (active) => {
    const pts = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => {
      const a = Math.PI / 180 * (60 * k - 30);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    const cells = [[50, 30], [80, 30], [35, 56], [65, 56], [95, 56], [50, 82]];
    return `<svg viewBox="15 8 100 98" aria-hidden="true">${cells.map(([x, y], k) =>
      `<polygon points="${pts(x, y, 16)}" class="${k === active ? "on" : k < active ? "got" : ""}"/>`).join("")}</svg>`;
  };

  const RARETES = { rare: "Rare", super: "Super rare", ultra: "Ultra rare", secrete: "Rare secrète" };
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const star = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z"/></svg>';
  const esc = t => String(t).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  c.modules.forEach((m, i) => {
    const rarete = RARETES[m.rarete] ? m.rarete : "rare";
    const niveau = Math.max(1, Math.min(10, m.niveau || 5));
    const stats = m.stats || c.stats || [];
    const card = el("button", "card");
    card.type = "button";
    card.dataset.rarete = rarete;
    card.dataset.side = calm ? "front" : "back";
    card.style.setProperty("--i", i);
    card.style.setProperty("--n", total);
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `Certification ASSIA, module ${m.titre}, niveau ${niveau}, ${RARETES[rarete].toLowerCase()}, ${i + 1} sur ${total}. Retourner la carte.`);
    card.innerHTML = `
      <span class="card__flip">
        <span class="face face--front">
          <span class="card__inner">
            <span class="card__top">Certification ASSIA</span>
            <span class="card__title">${esc(m.titre)}</span>
            <span class="card__stars" title="Niveau ${niveau}">${star.repeat(niveau)}</span>
            <span class="card__art">${hexes(i)}</span>
            <span class="card__effect"><b>Effet</b> ${esc(m.effet || "")}</span>
            <span class="card__stats">${stats.map(([k, v]) => `<span>${esc(k)} <b>${esc(v)}</b></span>`).join("")}</span>
            <span class="card__foot"><span>${RARETES[rarete]}</span><span>${i + 1}/${total}</span></span>
          </span>
        </span>
        <span class="face face--back">
          <span class="back__emblem${id.logo ? " has-logo" : ""}">${id.logo ? `<img src="${esc(id.logo)}" alt="">` : "DG"}</span>
          <span class="back__detail">
            <span class="back__title">${esc(m.titre)}</span>
            <span class="back__text">${esc(m.detail || "")}</span>
            <span class="back__hint">Cliquer pour retourner</span>
          </span>
        </span>
      </span>`;
    card.addEventListener("click", () => select(i, true));
    hand.append(card);
  });

  const cards = $$(".card", hand);
  let current = -1;
  function select(i, fromClick) {
    const card = cards[i];
    if (fromClick && i === current) {
      card.dataset.side = card.dataset.side === "front" ? "back" : "front";
    } else {
      cards.forEach((k, j) => {
        k.setAttribute("aria-pressed", String(j === i));
        if (j !== i) k.dataset.side = "front";
      });
      if (fromClick) card.dataset.side = "back";
      current = i;
    }
    const m = c.modules[i];
    pickTitle.textContent = `${m.titre}, niveau ${m.niveau}.`;
    pickText.textContent = m.detail;
  }

  // Distribution : les cartes arrivent face cachée, se déploient puis se retournent une par une
  // (le seul mouvement automatique de la page)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    hand.classList.add("is-dealt");
    if (calm) { hand.classList.add("is-ready"); select(0, false); return; }
    const deal = 900 + total * 70;
    cards.forEach((k, j) => setTimeout(() => { k.dataset.side = "front"; }, deal + j * 160));
    setTimeout(() => { hand.classList.add("is-ready"); select(0, false); }, deal + total * 160 + 400);
  }));

  // Reflet holographique et inclinaison qui suivent le pointeur
  if (fine && !calm) {
    cards.forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--px", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--py", (y * 100).toFixed(1) + "%");
        card.style.setProperty("--rx", ((0.5 - y) * 14).toFixed(2) + "deg");
        card.style.setProperty("--ry", ((x - 0.5) * 14).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", () => {
        ["--px", "--py", "--rx", "--ry"].forEach(p => card.style.removeProperty(p));
      });
    });
  }

  /* ---- Parcours ---- */
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

  /* ---- Compétences ---- */
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
