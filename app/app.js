/* Conscious Discipline Studio — app engine (routing, gamification, components). Content lives in content.js. */
(function () {
  "use strict";
  const C = window.CD_CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icons ---------- */
  const P = {
    brain: '<path d="M9 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 4 10a3 3 0 0 0 1 2.2A3 3 0 0 0 6 17a3 3 0 0 0 3 3h1V4H9zM15 4a3 3 0 0 1 3 3v.2A3 3 0 0 1 20 10a3 3 0 0 1-1 2.2A3 3 0 0 1 18 17a3 3 0 0 1-3 3h-1V4h1z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    puzzle: '<path d="M10 4h4v3a2 2 0 1 0 0 0h3v4h-1a2 2 0 1 0 0 4h1v5H7v-5H6a2 2 0 1 1 0-4h1V7h3V4z"/>',
    home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.8z"/>',
    wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M10 15h4l1 5H9z"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1.5 1 2.5 2 3 4 1-2 0-5 0-7z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 1 2-2h13"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 14a5 5 0 0 1 6 6"/>',
    mega: '<path d="M4 10v4h3l7 4V6L7 10H4zM17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10"/>',
    hand: '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7c-3 0-4.5-2-6-4l-1.5-2.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    split: '<path d="M12 21v-7M12 14L6 8M12 14l6-6M6 8V4M18 8V4M4 6l2-2 2 2M16 6l2-2 2 2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    seed: '<path d="M12 21v-8M12 13c0-4 3-7 7-7 0 4-3 7-7 7zM12 15c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    scale: '<path d="M12 4v16M6 20h12M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    map: '<path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2-6-2zM9 4v14M15 6v14"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  };
  const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.star}</svg>`;

  /* ---------- Storage (per-viewer convenience; app works without it) ---------- */
  const KEY = "cd-studio-v1";
  const blank = () => ({ xp: 0, earned: {}, badges: {}, visited: {}, quiz: {}, sims: {}, breaths: 0, sorter: {}, streak: { last: "", count: 0 }, checkin: "", palette: "", mode: "", journal: {}, checks: {}, idgame: 0 });
  let S = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  /* ---------- Themes ---------- */
  const root = document.documentElement;
  if (!C.palettes.some((p) => p.id === (S.palette || ""))) S.palette = "";
  function applyTheme() {
    setTimeout(() => window.dispatchEvent(new Event("cd-theme")), 50);
    if (S.palette) root.setAttribute("data-palette", S.palette); else root.removeAttribute("data-palette");
    if (S.mode) root.setAttribute("data-theme", S.mode); else root.removeAttribute("data-theme");
  }
  applyTheme();

  /* ---------- Gamification ---------- */
  const LEVELS = C.levels; // [{xp, title}]
  function levelOf(xp) {
    let i = 0;
    while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].xp) i++;
    const cur = LEVELS[i], next = LEVELS[i + 1];
    const pct = next ? (xp - cur.xp) / (next.xp - cur.xp) : 1;
    return { i, cur, next, pct };
  }
  function award(key, amount, label) {
    if (key && S.earned[key]) return false;
    const before = levelOf(S.xp).i;
    if (key) S.earned[key] = 1;
    S.xp += amount;
    save();
    toast(`<span class="xp">+${amount} XP</span> ${esc(label)}`);
    renderHud();
    const after = levelOf(S.xp).i;
    if (after > before) setTimeout(() => levelUp(LEVELS[after]), 500);
    checkBadges();
    return true;
  }
  function checkBadges() {
    C.badges.forEach((b) => {
      if (!S.badges[b.id] && b.test(S, C)) {
        S.badges[b.id] = Date.now();
        save();
        setTimeout(() => toast(`${icon("trophy")} Badge unlocked: <b>${esc(b.name)}</b>`), 700);
      }
    });
  }
  function bumpStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (S.streak.last === today) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak.count = S.streak.last === y ? S.streak.count + 1 : 1;
    S.streak.last = today;
    save();
  }

  /* ---------- Toasts, confetti, level up ---------- */
  const toastBox = h('<div class="toasts" role="status" aria-live="polite"></div>');
  document.body.appendChild(toastBox);
  function toast(html) {
    const t = h(`<div class="toast">${html}</div>`);
    toastBox.appendChild(t);
    while (toastBox.children.length > 3) toastBox.firstElementChild.remove();
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 2600);
  }
  function confetti() {
    if (reduced) return;
    const cv = h('<canvas id="confetti"></canvas>');
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const W = (cv.width = innerWidth), H = (cv.height = innerHeight);
    const cs = getComputedStyle(root);
    const cols = ["--accent", "--accent-2", "--executive", "--emotional", "--survival"].map((v) => cs.getPropertyValue(v).trim());
    const ps = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * 120, y: H * .45, vx: (Math.random() - .5) * 14, vy: -Math.random() * 15 - 4, r: Math.random() * 6 + 3, c: cols[(Math.random() * cols.length) | 0], a: Math.random() * 6, va: (Math.random() - .5) * .4 }));
    let f = 0;
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      ps.forEach((p) => { p.vy += .42; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); });
      if (++f < 150) requestAnimationFrame(tick); else cv.remove();
    })();
  }
  function levelUp(lv) {
    confetti();
    const m = h(`<div class="levelup" role="dialog" aria-modal="true" aria-label="Level up">
      <div class="card"><span class="burst"></span><span class="burst"></span><div class="skill-badge">${icon("trophy")}</div><span class="eyebrow">Level up</span><h2>${esc(lv.title)}</h2><p class="muted">${esc(lv.note)}</p><button class="btn" type="button">Keep going</button></div></div>`);
    document.body.appendChild(m);
    const close = () => { m.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    $("button", m).addEventListener("click", close);
    m.addEventListener("click", (e) => { if (e.target === m) close(); });
    $("button", m).focus();
  }

  /* ---------- HUD ---------- */
  function renderHud() {
    const L = levelOf(S.xp);
    $("#lvTitle").textContent = `Lv ${L.i + 1} · ${L.cur.title}`;
    $("#lvXp").textContent = L.next ? `${S.xp} / ${L.next.xp} XP` : `${S.xp} XP`;
    $("#lvBar").style.width = Math.round(L.pct * 100) + "%";
    $("#streak").innerHTML = `${icon("flame")} ${S.streak.count || 0}`;
    $("#streak").title = `${S.streak.count || 0}-day learning streak`;
    $("#badgeCount").innerHTML = `${icon("trophy")} ${Object.keys(S.badges).length}`;
    renderRail();
  }

  /* ---------- Module progress ---------- */
  const TABS = [
    { id: "learn", label: "Learn" },
    { id: "how", label: "How it works" },
    { id: "why", label: "Why it works" },
    { id: "examples", label: "Examples & scripts" },
    { id: "dodont", label: "Do's & don'ts" },
    { id: "challenge", label: "Challenge" },
  ];
  function modProgress(m) {
    let done = TABS.filter((t) => S.visited[m.id + ":" + t.id]).length;
    const q = S.quiz[m.id];
    if (q && q.done) done += 1;
    return done / (TABS.length + 1);
  }
  const modDone = (m) => !!(S.quiz[m.id] && S.quiz[m.id].done) && TABS.every((t) => S.visited[m.id + ":" + t.id]);

  /* ---------- Rail ---------- */
  function renderRail() {
    const r = $("#rail");
    const cur = location.hash.slice(1) || "home";
    const link = (id, label, dot, extra = "", cls = "") => `<a class="nav-link ${cls}" href="#${id}" ${cur === id ? 'aria-current="page"' : ""}><span class="dot">${dot}</span>${esc(label)}${extra}</a>`;
    let html = `<div class="rail-group"><span class="eyebrow">Start</span>
      ${link("home", "Home", icon("home"))}
      ${link("brain", "Brain State Model", icon("brain"))}
      ${link("powers", "Powers & Skills", icon("compass"))}</div>`;
    C.sections.forEach((sec) => {
      html += `<div class="rail-group"><span class="eyebrow">${esc(sec.name)}</span>`;
      C.modules.filter((m) => m.section === sec.id).forEach((m) => {
        const p = Math.round(modProgress(m) * 100);
        html += link(m.id, m.short || m.title, modDone(m) ? icon("check") : m.num, p ? `<span class="pct">${p}%</span>` : "", modDone(m) ? "done" : "");
      });
      html += "</div>";
    });
    html += `<div class="rail-group"><span class="eyebrow">Practise</span>
      ${link("sim", "Real-life simulator", icon("play"))}
      ${link("identify", "Spot the state", icon("eye"))}
      ${link("calm", "Calming corner", icon("wind"))}</div>
      <div class="rail-group"><span class="eyebrow">Teach</span>
      ${link("teach", "Teaching strategies", icon("users"))}
      ${link("progress", "My progress", icon("trophy"))}</div>`;
    r.innerHTML = html;
    const curEl = $('[aria-current="page"]', r);
    if (curEl && window.innerWidth <= 860) curEl.scrollIntoView({ block: "nearest", inline: "center" });
  }

  /* ---------- Components ---------- */
  function flowchart(f) {
    let html = `<div class="flow reveal" role="list" aria-label="${esc(f.title)}">`;
    f.nodes.forEach((n, i) => {
      const delay = reduced ? 0 : i * 90;
      if (i > 0) html += `<div class="flow-arrow" aria-hidden="true"><i></i></div>`;
      if (n.type === "decision") {
        html += `<div class="flow-node decision" role="listitem" style="animation-delay:${delay}ms">${esc(n.t)}${n.s ? `<small>${esc(n.s)}</small>` : ""}</div>`;
        html += `<div class="flow-branch" style="animation-delay:${delay + 60}ms">
          <div class="yes"><span class="lbl">${esc(n.yesLabel || "Yes")}</span><div class="flow-node">${esc(n.yes.t)}${n.yes.s ? `<small>${esc(n.yes.s)}</small>` : ""}</div></div>
          <div class="no"><span class="lbl">${esc(n.noLabel || "No")}</span><div class="flow-node">${esc(n.no.t)}${n.no.s ? `<small>${esc(n.no.s)}</small>` : ""}</div></div></div>`;
      } else {
        html += `<div class="flow-node ${n.type || ""}" role="listitem" style="animation-delay:${delay}ms">${esc(n.t)}${n.s ? `<small>${esc(n.s)}</small>` : ""}</div>`;
      }
    });
    return html + "</div>";
  }
  function pipeline(p) {
    let html = `<div class="pipe" role="list" aria-label="${esc(p.title)}">`;
    p.steps.forEach((s, i) => {
      if (i) html += `<div class="pipe-join" aria-hidden="true"></div>`;
      html += `<div class="pipe-step" role="listitem"><span class="k">${esc(s.k || "Step " + (i + 1))}</span><b>${esc(s.t)}</b><span>${esc(s.s || "")}</span></div>`;
    });
    return html + "</div>";
  }
  function treeNode(n, depth) {
    const kids = n.children && n.children.length;
    const open = depth < 1;
    return `<li ${kids ? `aria-expanded="${open}"` : ""}>
      <button type="button" class="tree-node ${kids ? "" : "leaf"}" ${kids ? "" : 'tabindex="-1"'}>${kids ? icon("chev", "tw") : ""}<span style="color:inherit"><b>${esc(n.t)}</b>${n.s ? ` <span>— ${esc(n.s)}</span>` : ""}</span></button>
      ${kids ? `<ul>${n.children.map((c) => treeNode(c, depth + 1)).join("")}</ul>` : ""}</li>`;
  }
  function tree(t) {
    return `<ul class="tree tree-root">${treeNode(t.root, 0)}</ul><div class="pill-row" style="margin-top:.6rem"><button class="btn ghost small" type="button" data-tree="open">Expand all</button><button class="btn ghost small" type="button" data-tree="close">Collapse</button></div>`;
  }
  function wireTrees(el) {
    $$(".tree-node", el).forEach((b) => b.addEventListener("click", () => {
      const li = b.parentElement;
      if (li.hasAttribute("aria-expanded")) li.setAttribute("aria-expanded", li.getAttribute("aria-expanded") !== "true");
    }));
    $$("[data-tree]", el).forEach((b) => b.addEventListener("click", () => {
      const wrap = b.closest(".card") || el;
      $$("li[aria-expanded]", wrap).forEach((li, i) => li.setAttribute("aria-expanded", b.dataset.tree === "open" ? "true" : String(i === 0)));
    }));
  }
  function ring(p) {
    const r = 12, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="4"/><circle cx="15" cy="15" r="${r}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" transform="rotate(-90 15 15)"/></svg>`;
  }

  /* Quiz engine — used by module challenges */
  function quiz(el, items, onDone, keyBase) {
    let i = 0, score = 0;
    const res = [];
    function draw() {
      if (i >= items.length) {
        const stars = score === items.length ? 3 : score >= items.length - 1 ? 2 : 1;
        el.innerHTML = `<div class="card quiz" style="text-align:center;justify-items:center">
          <div class="skill-badge">${icon("trophy")}</div>
          <h3>Challenge complete</h3>
          <div class="stars" aria-label="${stars} of 3 stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
          <p class="muted">${score} of ${items.length} best responses. ${score === items.length ? "Every answer matched the book's approach." : "Try again to sharpen the ones you missed."}</p>
          <div class="pill-row" style="justify-content:center"><button class="btn" type="button" data-again>${icon("reset")} Try again</button></div></div>`;
        $("[data-again]", el).addEventListener("click", () => { i = 0; score = 0; res.length = 0; draw(); });
        onDone && onDone(score, items.length);
        return;
      }
      const q = items[i];
      const dots = items.map((_, k) => `<i class="${res[k] === true ? "ok" : res[k] === false ? "no" : ""} ${k === i ? "cur" : ""}"></i>`).join("");
      el.innerHTML = `<div class="card quiz">
        <div class="q-head"><span class="eyebrow">Scenario ${i + 1} of ${items.length}</span><span class="q-dots" aria-hidden="true">${dots}</span></div>
        <p class="q-situation">${esc(q.sit)}</p>
        <div class="options">${q.opts.map((o, k) => `<button class="opt" type="button" data-k="${k}"><span class="key">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>
        <div data-explain></div></div>`;
      $$(".opt", el).forEach((b) => b.addEventListener("click", () => {
        const k = +b.dataset.k, ok = k === q.a;
        $$(".opt", el).forEach((x) => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        res[i] = ok;
        if (ok) { score++; award(`${keyBase}:q${i}`, 15, "Best response chosen"); }
        $("[data-explain]", el).innerHTML = `<div class="explain"><b style="color:var(${ok ? "--good" : "--bad"})">${ok ? "That's the Conscious Discipline move." : "Not quite. The best response is " + "ABCD"[q.a] + "."}</b><p>${esc(q.why)}</p>${q.whyNot ? `<p class="muted">${esc(q.whyNot)}</p>` : ""}<div><button class="btn small" type="button" data-next>${i + 1 < items.length ? "Next scenario" : "See results"} ${icon("chev")}</button></div></div>`;
        const nx = $("[data-next]", el);
        nx.addEventListener("click", () => { i++; draw(); });
        nx.focus({ preventScroll: true });
      }));
    }
    draw();
  }

  /* Do / Don't sorter */
  function sorter(el, m) {
    const deck = [...m.dos.map((d) => ({ t: d.t, why: d.why, k: "do" })), ...m.donts.map((d) => ({ t: d.t, why: d.why, k: "dont" }))];
    for (let i = deck.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [deck[i], deck[j]] = [deck[j], deck[i]]; }
    const cards = deck.slice(0, 8);
    let i = 0, right = 0;
    function draw() {
      if (i >= cards.length) {
        el.innerHTML = `<div class="card sorter" style="text-align:center"><h3>${right} / ${cards.length} sorted correctly</h3><p class="muted">${right === cards.length ? "Perfect sort." : "Read the lists above, then go again."}</p><div><button class="btn" type="button">${icon("reset")} Shuffle again</button></div></div>`;
        if (right === cards.length) { S.sorter[m.id] = 1; save(); award(`${m.id}:sort`, 30, "Perfect do/don't sort"); }
        $("button", el).addEventListener("click", () => sorter(el, m));
        return;
      }
      const c = cards[i];
      el.innerHTML = `<div class="card sorter"><div class="q-head"><span class="eyebrow">Quick sort · ${i + 1} of ${cards.length}</span><span class="muted" style="font-size:.85rem">${right} correct</span></div>
        <div class="sort-card" aria-live="polite">${esc(c.t)}</div>
        <div class="sort-btns"><button class="btn dont" type="button" data-k="dont">✕ Don't</button><button class="btn do" type="button" data-k="do">✓ Do</button></div>
        <div class="sort-feedback" aria-live="polite"></div></div>`;
      $$("[data-k]", el).forEach((b) => b.addEventListener("click", () => {
        const ok = b.dataset.k === c.k;
        if (ok) right++;
        $$("[data-k]", el).forEach((x) => (x.disabled = true));
        const fb = $(".sort-feedback", el);
        fb.className = "sort-feedback " + (ok ? "ok" : "no");
        fb.textContent = (ok ? "Right. " : `That one is a ${c.k === "do" ? "do" : "don't"}. `) + (c.why || "");
        $(".sort-card", el).classList.add(c.k === "do" ? "fly-right" : "fly-left");
        setTimeout(() => { i++; draw(); }, ok ? 1300 : 2600);
      }));
    }
    draw();
  }

  /* ---------- Views ---------- */
  const stage = () => $("#stage");
  function mount(html, after) {
    const s = stage();
    s.innerHTML = `<div class="stage-inner view-enter">${html}</div>`;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    wireTrees(s);
    wireExplainers(s);
    wireHair(s);
    if (!reduced) { const sc = h('<div class="scan" aria-hidden="true"></div>'); document.body.appendChild(sc); setTimeout(() => sc.remove(), 750); }
    after && after(s);
    $$("[data-count]", s).forEach((el) => countUp(el, +el.dataset.count));
  }
  function countUp(el, to) {
    if (reduced || !to) return;
    const t0 = performance.now(), d = 900;
    (function f(t) { const k = Math.min(1, (t - t0) / d); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
  }

  function viewHome() {
    const total = C.modules.length;
    const done = C.modules.filter(modDone).length;
    const checkOpts = C.checkin.map((c) => `<button class="state-card ${c.state}" type="button" data-ci="${c.state}"><span class="tag ${c.state[0] === "s" ? "s" : c.state[0] === "e" ? "e" : "x"}">${esc(c.label)}</span><span class="q">${esc(c.q)}</span></button>`).join("");
    mount(`
      <section class="hero">
        <div class="section">
          <span class="eyebrow">Based on Conscious Discipline by Becky A. Bailey</span>
          <h1>Discipline starts with <span class="grad">your calm.</span></h1>
          <p class="lede">${esc(C.intro.lede)}</p>
          <div class="hero-actions"><a class="btn" href="#brain">${icon("brain")} Start with the brain</a><a class="btn ghost" href="#sim">${icon("play")} Try a real-life scenario</a></div>
        </div>
        ${heroArt()}
      </section>

      <section class="card section">
        <div class="section-head"><div class="prose"><span class="eyebrow">Daily check-in · +10 XP once a day</span><h3>How are you arriving today?</h3><p class="muted">The book asks adults to notice their own state first. Pick the one closest to you right now.</p></div></div>
        <div class="grid">${checkOpts}</div>
        <div data-ci-out></div>
      </section>

      <section class="section">
        <div class="section-head"><div class="prose"><span class="eyebrow">Your learning path · ${done} of ${total} modules complete</span><h2>Ten chapters, one journey</h2><p class="muted">Work in order: the book builds safety first, then connection, then problem solving. Each module has six tabs and a challenge.</p></div></div>
        <div class="journey">${C.modules.map((m) => {
          const p = modProgress(m);
          return `<a class="stop ${modDone(m) ? "done" : ""}" href="#${m.id}"><span class="num">${m.num}</span><b>${esc(m.title)}</b><span class="muted" style="font-size:.88rem">${esc(m.tagline)}</span><span class="meta"><span class="tag">${esc(C.sections.find((s) => s.id === m.section).name)}</span>${ring(p)}</span></a>`;
        }).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="prose"><span class="eyebrow">The big picture</span><h2>How the whole approach fits together</h2></div></div>
        <div class="grid-2">
          <div class="card section"><h3>The pyramid, bottom to top</h3><div class="hl" data-hair="stack"></div>${pipeline(C.intro.pyramid)}</div>
          <div class="card section"><h3>Old model vs. new model</h3>
            <div class="dd">${C.intro.compare.map((c) => `<div class="def"><b>${esc(c.k)}</b><span><span class="tag s">Traditional</span> ${esc(c.old)}</span><span><span class="tag x">Conscious</span> ${esc(c.neu)}</span></div>`).join("")}</div></div>
        </div>
      </section>
      <p class="footer-note">This app paraphrases and summarises ideas from <i>Conscious Discipline: Building Resilient Classrooms</i> (Becky A. Bailey, Loving Guidance, 2014) for study purposes. Scenarios are illustrative. Progress is saved only in this browser.</p>
    `, (s) => {
      $$("[data-ci]", s).forEach((b) => b.addEventListener("click", () => {
        $$("[data-ci]", s).forEach((x) => x.classList.toggle("on", x === b));
        const c = C.checkin.find((x) => x.state === b.dataset.ci);
        $("[data-ci-out]", s).innerHTML = `<div class="explain"><b>${esc(c.title)}</b><p>${esc(c.advice)}</p><div class="say">${esc(c.say)}</div></div>`;
        const today = new Date().toISOString().slice(0, 10);
        if (S.checkin !== today) { S.checkin = today; bumpStreak(); award("checkin:" + today, 10, "Daily check-in"); }
      }));
    });
  }

  function heroArt() {
    // Holographic version of the book's three-floor building, slowly rotating in 3D.
    return `<div class="holo" role="img" aria-label="Three glowing floors: Survival, Emotional and Executive states">
      <div class="holo-ring"></div>
      <div class="holo-stack"><div class="holo-floor f1"></div><div class="holo-floor f2"></div><div class="holo-floor f3"></div></div>
      <div class="holo-beam"></div><i class="holo-spark"></i><i class="holo-spark"></i><i class="holo-spark"></i>
      <div class="holo-label l3"><b>Executive</b><span>What can I learn?</span></div>
      <div class="holo-label l2"><b>Emotional</b><span>Am I loved?</span></div>
      <div class="holo-label l1"><b>Survival</b><span>Am I safe?</span></div>
    </div>`;
  }

  function viewBrain() {
    const B = C.brain;
    mount(`
      <section class="section">
        <span class="eyebrow">Chapter 2 · The core model</span>
        <h1>The Brain State Model</h1>
        <p class="lede muted prose">${esc(B.lede)}</p>
      </section>
      <section class="grid-2" style="align-items:stretch">
        <div class="card section"><span class="eyebrow">Graphic · the iceberg</span><h3>What you see is not what drives it</h3>${iceberg()}</div>
        <div class="card section"><span class="eyebrow">Interactive · ride the floors</span><h3>Point high to climb, low to drop</h3><div class="hl" data-hair="elevator"></div></div>
      </section>
      ${explainer(B.explainer, "brain")}
      <section class="card brain-wrap">
        <svg class="brain-svg" viewBox="0 0 360 330" role="img" aria-label="Interactive three-floor model of brain states">
          ${B.states.map((st, i) => {
            const y = 20 + (2 - i) * 100;
            const dark = "var(--on-state)";
            return `<g class="layer" data-st="${st.id}" tabindex="0" role="button" aria-label="${esc(st.name)} state">
              <rect x="20" y="${y}" width="320" height="88" rx="20" fill="var(--${st.id})"/>
              <text x="40" y="${y + 36}" fill="${dark}" font-family="var(--f-display)" font-weight="800" font-size="22">${esc(st.name)}</text>
              <text x="40" y="${y + 62}" fill="${dark}" font-family="var(--f-hand)" font-size="17">${esc(st.q)}</text>
              <text x="325" y="${y + 36}" text-anchor="end" fill="${dark}" font-family="var(--f-display)" font-size="12" font-weight="700" opacity=".85">${esc(st.floor.toUpperCase())}</text>
              <text x="325" y="${y + 62}" text-anchor="end" fill="${dark}" font-family="var(--f-display)" font-size="12" font-weight="700" opacity=".85">${esc(st.region)}</text></g>`;
          }).join("")}
        </svg>
        <div class="state-cards">${B.states.slice().reverse().map((st) => `
          <button type="button" class="state-card ${st.id}" data-st="${st.id}">
            <span class="pill-row"><span class="tag ${st.id[0] === "s" ? "s" : st.id[0] === "e" ? "e" : "x"}">${esc(st.name)} · ${esc(st.region)}</span><span class="tag">Need: ${esc(st.need)}</span></span>
            <span class="q">${esc(st.q)}</span>
            <span class="body"><span>${esc(st.desc)}</span><span><b>You'll see:</b> ${esc(st.looks)}</span><span><b>What helps:</b> ${esc(st.helps)}</span><span class="say">${esc(st.say)}</span></span>
          </button>`).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="prose"><span class="eyebrow">Interactive · the state elevator</span><h2>Watch a state shift</h2><p class="muted">Triggers drop a person down the floors. Calming and connection lift them back up. Press the buttons and watch where the child lands, then use the right help for that floor.</p></div></div>
        <div class="card elevator">
          <div class="shaft" aria-hidden="true"><div class="car" id="car">${icon("users")}</div></div>
          <div class="elev-ctrl">
            <div><span class="eyebrow">Current state</span><div id="elevState" style="margin-top:.3rem"></div></div>
            <p id="elevMsg" class="muted" aria-live="polite"></p>
            <span class="eyebrow">Triggers</span><div class="trig">${B.triggers.map((t, i) => `<button class="btn ghost small" type="button" data-trig="${i}">${icon("bolt")} ${esc(t.t)}</button>`).join("")}</div>
            <span class="eyebrow">Help</span><div class="trig">${B.helps.map((t, i) => `<button class="btn small" type="button" data-help="${i}">${esc(t.t)}</button>`).join("")}</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="prose"><span class="eyebrow">The method</span><h2>The four-step pipeline</h2><p class="muted">The order matters. Teaching or consequences come last, once everyone is back on the top floor.</p></div></div>
        ${pipeline(B.pipeline)}
        <div class="grid-2">
          <div class="card section"><h3>Which state is this child in?</h3>${flowchart(B.identifyFlow)}</div>
          <div class="card section"><h3>The gatekeeper: how a message gets in</h3>${flowchart(B.gateFlow)}</div>
        </div>
      </section>

      <section class="grid-2">
        <div class="card section"><h3>Survival behaviours</h3>${tree(B.survivalTree)}</div>
        <div class="card section"><h3>The 12 executive skills</h3><p class="muted" style="font-size:.9rem">Memory hook: <b>A TOP WIFE Makes Good TEa</b>. These are not fully mature until the mid-twenties, so adults lend theirs.</p>${tree(B.execTree)}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="prose"><span class="eyebrow">Psychology</span><h2>Why the model works</h2></div></div>
        <div class="defs">${B.psych.map((p) => `<div class="def"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></div>`).join("")}</div>
      </section>
      <div class="pill-row"><a class="btn" href="#identify">${icon("eye")} Practise: Spot the state</a><a class="btn ghost" href="#m1">Go to module 1 ${icon("chev")}</a></div>
    `, (s) => {
      award("visit:brain", 10, "Explored the Brain State Model");
      const svg = $(".brain-svg", s);
      const pick = (id) => {
        svg.classList.add("has-on");
        $$(".layer", s).forEach((l) => l.classList.toggle("on", l.dataset.st === id));
        $$(".state-card", s).forEach((c) => c.classList.toggle("on", c.dataset.st === id));
        award("brain:" + id, 5, "Studied the " + id + " state");
      };
      $$("[data-st]", s).forEach((el) => {
        el.addEventListener("click", () => pick(el.dataset.st));
        el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(el.dataset.st); } });
      });
      // Elevator
      let level = 2; // 0 survival, 1 emotional, 2 executive
      const names = ["survival", "emotional", "executive"];
      const car = $("#car", s);
      const drawElev = (msg) => {
        const shaft = car.parentElement.clientHeight - 64;
        car.style.top = 6 + (2 - level) * (shaft / 2) + "px";
        const st = B.states[level];
        $("#elevState", s).innerHTML = `<span class="state-pill ${st.id}">${esc(st.name)} · ${esc(st.q)}</span>`;
        $("#elevMsg", s).textContent = msg || "Calm and ready to learn. Try a trigger.";
      };
      drawElev();
      window.addEventListener("resize", () => drawElev($("#elevMsg", s).textContent), { passive: true });
      $$("[data-trig]", s).forEach((b) => b.addEventListener("click", () => {
        const t = B.triggers[+b.dataset.trig];
        level = Math.max(0, Math.min(level, t.to));
        drawElev(t.msg);
      }));
      $$("[data-help]", s).forEach((b) => b.addEventListener("click", () => {
        const hp = B.helps[+b.dataset.help];
        if (hp.works === names[level]) {
          level = Math.min(2, level + 1);
          drawElev(hp.ok);
          if (level === 2) award("elevator", 25, "Helped a child back to the executive state");
        } else drawElev(level === 2 ? "Already on the top floor. This is the time to teach and problem-solve." : hp.miss);
      }));
    });
  }

  function viewPowers() {
    const segs = C.modules.filter((m) => m.power);
    const cx = 210, cy = 210, R = 190, r0 = 70;
    const secColor = { safety: "var(--survival)", connection: "var(--emotional)", problem: "var(--executive)" };
    const arc = (a0, a1) => {
      const p = (a, rr) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
      const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0);
      return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`;
    };
    const n = segs.length, gap = 0.025;
    const wheel = segs.map((m, i) => {
      const a0 = -Math.PI / 2 + (i / n) * 2 * Math.PI + gap, a1 = -Math.PI / 2 + ((i + 1) / n) * 2 * Math.PI - gap, am = (a0 + a1) / 2;
      const tx = cx + 132 * Math.cos(am), ty = cy + 132 * Math.sin(am);
      const ink = "var(--on-state)";
      return `<g class="seg-g" data-m="${m.id}" tabindex="0" role="button" aria-label="${esc(m.power)} and ${esc(m.title)}"><path d="${arc(a0, a1)}" fill="${secColor[m.section]}"/>
        <text x="${tx}" y="${ty - 4}" text-anchor="middle" fill="${ink}" font-size="15">${esc(m.power)}</text>
        <text x="${tx}" y="${ty + 14}" text-anchor="middle" fill="${ink}" font-size="11" opacity=".85">${esc(m.title)}</text></g>`;
    }).join("");
    mount(`
      <section class="section"><span class="eyebrow">Chapter 1 · The framework</span><h1>Seven Powers, seven skills</h1>
        <p class="lede muted prose">${esc(C.powersLede)}</p></section>
      <section class="card wheel-wrap">
        <svg class="wheel" viewBox="0 0 420 420" role="img" aria-label="Wheel of the seven powers and skills"><g class="spin">${wheel}</g>
          <circle cx="210" cy="210" r="200" fill="none" stroke="var(--line)" stroke-dasharray="2 6"/>
          <circle cx="210" cy="210" r="62" fill="var(--surface-solid)" stroke="var(--accent)" stroke-opacity=".5"/><text x="210" y="205" text-anchor="middle" fill="var(--ink)" font-size="16">Conscious</text><text x="210" y="224" text-anchor="middle" fill="var(--ink)" font-size="16">Adult</text></svg>
        <div class="power-detail" id="pd"><span class="eyebrow">Tap a segment</span><h3>Each power is a mindset for the adult. Each skill is what you do with children.</h3>
          <div class="pill-row"><span class="tag s">Safety</span><span class="tag e">Connection</span><span class="tag x">Problem solving</span></div></div>
      </section>
      <section class="section"><div class="section-head"><div class="prose"><span class="eyebrow">Tree</span><h2>Three components → seven skills → tools</h2></div></div>
        <div class="card">${tree(C.frameworkTree)}</div></section>
      <section class="section"><div class="section-head"><div class="prose"><span class="eyebrow">Process</span><h2>Stimulus, pause, response</h2><p class="muted">Every power works by widening the pause between what happens and what you do.</p></div></div>
        <div class="card">${flowchart(C.pauseFlow)}</div></section>
    `, (s) => {
      award("visit:powers", 10, "Explored the Seven Powers");
      const w = $(".wheel", s);
      const pick = (id) => {
        const m = C.modules.find((x) => x.id === id);
        w.classList.add("has-on");
        $$(".seg-g", s).forEach((g) => g.classList.toggle("on", g.dataset.m === id));
        $("#pd", s).innerHTML = `<span class="eyebrow">Power of ${esc(m.power)} → Skill of ${esc(m.title)}</span><h2>${esc(m.powerGist)}</h2><p>${esc(m.summary)}</p><div class="say">${esc(m.keyScript)}</div><div><a class="btn" href="#${m.id}">Open module ${m.num} ${icon("chev")}</a></div>`;
      };
      $$(".seg-g", s).forEach((g) => {
        g.addEventListener("click", () => pick(g.dataset.m));
        g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(g.dataset.m); } });
      });
    });
  }

  function viewModule(m, tabId) {
    const tab = TABS.find((t) => t.id === tabId) ? tabId : "learn";
    const sec = C.sections.find((s) => s.id === m.section);
    const idx = C.modules.indexOf(m), prev = C.modules[idx - 1], next = C.modules[idx + 1];
    mount(`
      <section class="skill-hero">
        <div class="skill-badge">${icon(m.icon)}</div>
        <div class="section" style="gap:.4rem">
          <span class="eyebrow">Module ${m.num} · ${esc(sec.name)}${m.power ? " · Power of " + esc(m.power) : ""}</span>
          <h1>${esc(m.title)}</h1>
          <p class="muted" style="font-size:var(--step-1)">${esc(m.tagline)}</p>
        </div>
      </section>
      <div class="tabs" role="tablist">${TABS.map((t) => `<button class="tab" role="tab" type="button" data-tab="${t.id}" aria-selected="${t.id === tab}">${S.visited[m.id + ":" + t.id] ? icon("check", "ck") : ""}${t.label}</button>`).join("")}</div>
      <div id="panel"></div>
      <div class="pill-row" style="justify-content:space-between">
        ${prev ? `<a class="btn ghost" href="#${prev.id}">← ${esc(prev.short || prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="btn ghost" href="#${next.id}">${esc(next.short || next.title)} →</a>` : `<a class="btn ghost" href="#sim">Real-life simulator →</a>`}
      </div>
    `, (s) => {
      const show = (id) => {
        $$(".tab", s).forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === id));
        const p = $("#panel", s);
        p.innerHTML = `<div class="panel" role="tabpanel">${panel(m, id)}</div>`;
        wireTrees(p);
        wireExplainers(p);
        if (id === "dodont") sorter($("[data-sorter]", p), m);
        if (id === "challenge") quiz($("[data-quiz]", p), m.quiz, (sc, tot) => {
          const first = !(S.quiz[m.id] && S.quiz[m.id].done);
          S.quiz[m.id] = { done: true, best: Math.max(sc, (S.quiz[m.id] && S.quiz[m.id].best) || 0), of: tot };
          save();
          if (first) award(`${m.id}:complete`, 40, `Finished ${m.title} challenge`);
          if (modDone(m)) { award(`${m.id}:mastered`, 50, `Module ${m.num} mastered`); if (!reduced) confetti(); }
          renderRail();
        }, m.id);
        if (!S.visited[m.id + ":" + id]) {
          S.visited[m.id + ":" + id] = 1; save();
          award(`${m.id}:${id}`, 10, `${m.short || m.title}: ${TABS.find((t) => t.id === id).label}`);
          const tb = $(`[data-tab="${id}"]`, s);
          if (tb && !$(".ck", tb)) tb.insertAdjacentHTML("afterbegin", icon("check", "ck"));
        }
      };
      $$(".tab", s).forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
      show(tab);
    });
  }

  function panel(m, id) {
    if (id === "learn") return `
      ${m.explainer ? explainer(m.explainer, m.id) : ""}
      <div class="grid-2">
        <div class="card section"><span class="eyebrow">Core idea</span><div class="prose">${m.core.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          ${m.keyScript ? `<div class="say">${esc(m.keyScript)}</div>` : ""}</div>
        <div class="card section"><span class="eyebrow">Concept tree</span>${tree(m.tree)}</div>
      </div>
      <div class="section"><span class="eyebrow">Key terms</span><div class="defs">${m.concepts.map((c) => `<div class="def"><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div>`).join("")}</div></div>`;
    if (id === "how") return `
      ${m.pipeline ? `<div class="section"><span class="eyebrow">Pipeline</span><h3>${esc(m.pipeline.title)}</h3>${pipeline(m.pipeline)}</div>` : ""}
      <div class="grid-2">${m.flows.map((f) => `<div class="card section"><span class="eyebrow">Flowchart</span><h3>${esc(f.title)}</h3>${f.desc ? `<p class="muted">${esc(f.desc)}</p>` : ""}${flowchart(f)}</div>`).join("")}</div>`;
    if (id === "why") return `
      <div class="section"><span class="eyebrow">The psychology behind it</span><div class="defs">${m.psych.map((p) => `<div class="def"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></div>`).join("")}</div></div>
      ${m.compare ? `<div class="card section"><span class="eyebrow">Side by side</span><div class="defs">${m.compare.map((c) => `<div class="def"><b>${esc(c.k)}</b><span><span class="tag s">Instead of</span> ${esc(c.old)}</span><span><span class="tag x">Try</span> ${esc(c.neu)}</span></div>`).join("")}</div></div>` : ""}`;
    if (id === "examples") return `
      <div class="section"><span class="eyebrow">Practical use cases</span><div class="grid-2">${m.examples.map((e) => `
        <div class="card section"><b style="font-family:var(--f-display)">${esc(e.title)}</b>${pipeline({ title: e.title, steps: [{ k: "Situation", t: "", s: e.sit }, { k: "Response", t: "", s: e.resp }, { k: "Result", t: "", s: e.out }] })}</div>`).join("")}</div></div>
      <div class="grid-2">
        <div class="card section"><span class="eyebrow">Scripts to practise out loud</span><div class="say-list">${m.scripts.map((sc) => `<div class="say">${esc(sc.say)}<span class="say-ctx">${esc(sc.ctx)}</span></div>`).join("")}</div></div>
        <div class="card section"><span class="eyebrow">Classroom structures & rituals</span><div class="defs" style="grid-template-columns:1fr">${m.structures.map((c) => `<div class="def"><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div>`).join("")}</div></div>
      </div>`;
    if (id === "dodont") return `
      <div class="dd">
        <div class="dd-col do"><h3><i>✓</i> Do</h3>${m.dos.map((d) => `<div class="dd-item">${esc(d.t)}${d.why ? `<small>${esc(d.why)}</small>` : ""}</div>`).join("")}</div>
        <div class="dd-col dont"><h3><i>✕</i> Don't</h3>${m.donts.map((d) => `<div class="dd-item">${esc(d.t)}${d.why ? `<small>${esc(d.why)}</small>` : ""}</div>`).join("")}</div>
      </div>
      <div class="section"><span class="eyebrow">Game · +30 XP for a perfect sort</span><h3>Do or don't?</h3><div data-sorter></div></div>`;
    if (id === "challenge") return `
      <div class="prose"><p class="muted">Read each classroom moment and pick the response the book would recommend. +15 XP for each best response, +40 XP for finishing.</p></div>
      <div data-quiz></div>
      ${m.reflect ? `<div class="card section"><span class="eyebrow">Reflect · saved in this browser</span><h3>${esc(m.reflect)}</h3><textarea id="j-${m.id}" placeholder="Write a few lines...">${esc(S.journal[m.id] || "")}</textarea></div>` : ""}`;
    return "";
  }

  /* Real-life simulator */
  const stateOf = (v) => (v < 34 ? "survival" : v < 67 ? "emotional" : "executive");
  const stName = { survival: "Survival · Am I safe?", emotional: "Emotional · Am I loved?", executive: "Executive · What can I learn?" };
  const BANDS = [["all", "All"], ["early", "Early years"], ["primary", "Primary"], ["secondary", "Secondary"], ["adult", "Adults & self"]];
  function avatar(state, cls = "avatar") {
    return `<svg class="${cls} ${state}" viewBox="0 0 200 200" aria-hidden="true">${avatarInner(state)}</svg>`;
  }
  function avatarInner(state) {
    const col = `var(--${state})`;
    const amp = state === "survival" ? 16 : state === "emotional" ? 8 : 3;
    const n = state === "survival" ? 18 : 12;
    let d = "";
    for (let i = 0; i <= n * 2; i++) {
      const a = (i / (n * 2)) * Math.PI * 2, r = 80 + (i % 2 ? amp : -amp / 2);
      d += (i ? "L" : "M") + (100 + r * Math.cos(a)).toFixed(1) + " " + (100 + r * Math.sin(a)).toFixed(1);
    }
    const face = {
      survival: `<circle cx="80" cy="92" r="9" fill="var(--ink)"/><circle cx="120" cy="92" r="9" fill="var(--ink)"/><circle cx="80" cy="92" r="3" fill="var(--surface-solid)"/><circle cx="120" cy="92" r="3" fill="var(--surface-solid)"/><path d="M66 74 L92 82 M134 74 L108 82" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><ellipse cx="100" cy="128" rx="14" ry="10" fill="var(--ink)"/>`,
      emotional: `<ellipse cx="80" cy="94" rx="7" ry="5" fill="var(--ink)"/><ellipse cx="120" cy="94" rx="7" ry="5" fill="var(--ink)"/><path d="M68 80 Q80 72 92 80 M108 80 Q120 72 132 80" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M80 128 Q90 120 100 128 T120 128" stroke="var(--ink)" stroke-width="5" fill="none" stroke-linecap="round"/>`,
      executive: `<path d="M72 94 Q80 86 88 94 M112 94 Q120 86 128 94" stroke="var(--ink)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M80 120 Q100 138 120 120" stroke="var(--ink)" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="70" cy="112" r="7" fill="${col}" opacity=".35"/><circle cx="130" cy="112" r="7" fill="${col}" opacity=".35"/>`,
    }[state];
    return `<path class="aura" d="${d}Z" fill="${col}" fill-opacity=".14" stroke="${col}" stroke-width="2" stroke-opacity=".8"/>
      <circle cx="100" cy="100" r="58" fill="var(--surface-solid)" stroke="${col}" stroke-width="3"/>
      ${face}`;
  }
  const C_LEN = 2 * Math.PI * 40;
  const gauge = (id, label) => `<div class="gauge" style="position:relative" id="${id}"><svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--surface-2)" stroke-width="8"/>
      <circle class="fg" cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C_LEN}" stroke-dashoffset="${C_LEN}" transform="rotate(-90 50 50)"/>
      <text x="50" y="56" text-anchor="middle" fill="var(--ink)" font-family="var(--f-mono)" font-size="16" class="num">0</text></svg><span class="gv">${esc(label)}</span></div>`;
  function setGauge(el, v, color) {
    const fg = $(".fg", el);
    fg.style.strokeDashoffset = C_LEN * (1 - v / 100);
    fg.style.stroke = color;
    $(".num", el).textContent = Math.round(v);
  }
  function popDelta(el, d) {
    if (!d) return;
    const x = h(`<span class="delta" style="top:-6px;right:-4px;color:var(${d > 0 ? "--good" : "--bad"})">${d > 0 ? "+" : ""}${d}</span>`);
    el.appendChild(x);
    setTimeout(() => x.remove(), 1200);
  }
  function typeText(el, text, done) {
    if (reduced) { el.textContent = text; done(); return () => {}; }
    let i = 0, stop = false;
    el.classList.add("caret");
    const tick = () => {
      if (stop) return;
      i = Math.min(text.length, i + 2);
      el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(tick, 16); else { el.classList.remove("caret"); done(); }
    };
    tick();
    return () => { if (i < text.length) { stop = true; el.textContent = text; el.classList.remove("caret"); done(); } };
  }

  function viewSim(simId) {
    const sim = C.sims.find((x) => x.id === simId);
    if (!sim) {
      const band = S.simBand || "all";
      const list = C.sims.filter((x) => band === "all" || x.band === band);
      mount(`
        <section class="section"><span class="eyebrow">Practise · ${C.sims.length} missions</span><h1>Real-life <span class="grad">simulator</span></h1>
          <p class="lede">Branching classroom moments. Every choice moves two gauges: your own composure and the other person's brain state. Bring everyone to the top floor to earn three stars.</p></section>
        <div class="card section" style="gap:.8rem">
          <div class="toggle-row"><span><b style="font-family:var(--f-display);font-weight:600">Pressure mode</b> <span class="muted" style="font-size:.85rem">· 20 seconds per decision, like real life. Bonus XP.</span></span>
            <label class="switch"><input type="checkbox" id="pressure" ${S.pressure ? "checked" : ""} aria-label="Pressure mode"><span></span></label></div>
          <div class="sim-filters" role="group" aria-label="Filter by age group">${BANDS.map(([v, l]) => `<button class="btn ghost small" type="button" data-band="${v}" aria-pressed="${band === v}">${l}</button>`).join("")}</div>
        </div>
        <div class="sim-list">${list.map((x) => {
          const best = S.sims[x.id] || 0;
          return `<a class="sim-card tilt" href="#sim-${x.id}">
            <div class="top">${avatar(stateOf(x.childStart ?? 30), "mini-face")}<div style="display:grid;gap:.25rem;min-width:0"><h3>${esc(x.title)}</h3><span class="tag">${esc(x.age)}</span></div></div>
            <p class="muted" style="font-size:.9rem">${esc(x.blurb)}</p>
            <span class="meta"><span>Difficulty <span class="pips" aria-label="difficulty ${x.level} of 3">${[1, 2, 3].map((k) => `<i class="${k <= x.level ? "on" : ""}"></i>`).join("")}</span></span><span class="stars" aria-label="${best} stars">${"★".repeat(best)}${"☆".repeat(3 - best)}</span></span>
            <span class="meta"><span>${esc(x.skills)}</span>${icon("play")}</span></a>`;
        }).join("")}</div>`, (s) => {
        award("visit:sim", 10, "Opened the simulator");
        $("#pressure", s).addEventListener("change", (e) => { S.pressure = e.target.checked; save(); toast(S.pressure ? "Pressure mode on: 20 seconds per decision" : "Pressure mode off"); });
        $$("[data-band]", s).forEach((b) => b.addEventListener("click", () => { S.simBand = b.dataset.band; save(); viewSim(); }));
      });
      return;
    }
    let node = sim.start, comp = 70, child = sim.childStart ?? 30, token = 0, timerRaf = 0;
    const path = [];
    mount(`<section class="section" style="gap:.5rem"><a href="#sim" class="muted" style="font-size:.85rem">← All missions</a><span class="eyebrow">${esc(sim.age)} · ${esc(sim.skills)}${S.pressure ? " · Pressure mode" : ""}</span><h1>${esc(sim.title)}</h1></section>
      <div class="card sim-hud">
        ${gauge("gComp", "Your composure")}
        <div class="avatar-wrap"><div id="av"></div><span class="avatar-name">${esc(sim.who || "Child")}</span><div id="chv"></div></div>
        ${gauge("gChild", sim.meter || "Child's state")}
      </div>
      <div class="card section"><div class="timer" id="timer" ${S.pressure ? "" : "hidden"}><i></i></div><div id="scene" class="scene" aria-live="polite"></div></div>`, (s) => {
      const av = $("#av", s), gC = $("#gComp", s), gK = $("#gChild", s);
      const meters = (dc, dk) => {
        const st = stateOf(child);
        setGauge(gC, comp, comp < 40 ? "var(--survival)" : comp < 70 ? "var(--emotional)" : "var(--accent)");
        setGauge(gK, child, `var(--${st})`);
        av.innerHTML = avatar(st);
        $("#chv", s).innerHTML = `<span class="state-pill ${st}">${stName[st]}</span>`;
        popDelta(gC, dc); popDelta(gK, dk);
      };
      const stopTimer = () => { cancelAnimationFrame(timerRaf); const t = $("#timer i", s); if (t) t.style.transform = "scaleX(1)"; };
      const startTimer = (my, onOut) => {
        if (!S.pressure) return;
        const bar = $("#timer i", s), t0 = performance.now(), dur = 20000;
        const f = (t) => {
          if (my !== token) return;
          const k = Math.min(1, (t - t0) / dur);
          bar.style.transform = `scaleX(${1 - k})`;
          if (k < 1) timerRaf = requestAnimationFrame(f); else onOut();
        };
        timerRaf = requestAnimationFrame(f);
      };
      const draw = () => {
        const my = ++token;
        stopTimer();
        const n = sim.nodes[node];
        meters();
        const box = $("#scene", s);
        if (n.end) {
          $("#timer", s).hidden = true;
          const st = stateOf(child);
          const stars = n.stars ?? (st === "executive" && comp >= 60 ? 3 : st !== "survival" && comp >= 40 ? 2 : 1);
          if (stars > (S.sims[sim.id] || 0)) { S.sims[sim.id] = stars; save(); }
          award(`sim:${sim.id}:${stars}`, stars * 20, `${sim.title}: ${stars} star${stars > 1 ? "s" : ""}`);
          if (S.pressure && stars >= 2) award(`simP:${sim.id}`, 30, "Held steady under pressure");
          if (stars === 3) confetti();
          box.innerHTML = `<div class="section" style="justify-items:start">
            <span class="eyebrow">Mission debrief</span><h2>${esc(n.title)}</h2><div class="stars" style="font-size:1.8rem">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
            <p class="scene-text">${esc(n.text)}</p>
            <div class="explain" style="width:100%"><b>What the book teaches here</b><p>${esc(n.lesson)}</p></div>
            ${path.length ? `<div class="section" style="gap:.4rem;width:100%"><span class="eyebrow">Your decision path</span>${pipeline({ title: "Your choices", steps: path.map((p, i) => ({ k: (p.good ? "✓ " : "✕ ") + "Choice " + (i + 1), t: p.t, s: p.fb })) })}</div>` : ""}
            <div class="pill-row"><button class="btn" type="button" data-replay>${icon("reset")} Play again</button><a class="btn ghost" href="#sim">More missions</a></div></div>`;
          $("[data-replay]", s).addEventListener("click", () => { node = sim.start; comp = 70; child = sim.childStart ?? 30; path.length = 0; $("#timer", s).hidden = !S.pressure; draw(); });
          return;
        }
        box.innerHTML = `<p class="scene-text" id="st"></p><div data-rest hidden>
          ${n.child ? `<div class="child-line" style="margin-bottom:1rem">${esc(n.child)}</div>` : ""}
          ${n.hint ? `<p class="muted" style="font-size:.88rem;margin-bottom:1rem">${icon("eye")} ${esc(n.hint)}</p>` : ""}
          <div class="options fade-in">${n.choices.map((c, k) => `<button class="opt" type="button" data-k="${k}"><span class="key">${"ABCD"[k]}</span><span>${esc(c.t)}</span></button>`).join("")}</div>
          <div data-fb style="margin-top:1rem"></div></div>`;
        const rest = $("[data-rest]", box);
        const skip = typeText($("#st", box), n.text, () => {
          if (my !== token) return;
          rest.hidden = false;
          rest.style.display = "grid";
          startTimer(my, () => {
            comp = Math.max(0, comp - 15); child = Math.max(0, child - 10); meters(-15, -10);
            $("[data-fb]", box).innerHTML = `<div class="explain"><b style="color:var(--bad)">Time's up</b><p>Hesitation reads as uncertainty, and the moment escalates. Take a S.T.A.R. breath and choose.</p></div>`;
          });
        });
        $("#st", box).addEventListener("click", skip);
        $$(".opt", box).forEach((b) => b.addEventListener("click", () => {
          token++; stopTimer();
          const c = n.choices[+b.dataset.k];
          const dc = c.comp || 0, dk = c.child || 0;
          comp = Math.max(0, Math.min(100, comp + dc));
          child = Math.max(0, Math.min(100, child + dk));
          path.push({ t: c.t, fb: c.fb, good: c.good });
          $$(".opt", box).forEach((x) => (x.disabled = true));
          b.classList.add(c.good ? "right" : "wrong");
          meters(dc, dk);
          $("[data-fb]", box).innerHTML = `<div class="explain"><b style="color:var(${c.good ? "--good" : "--bad"})">${c.good ? "Helpful move" : "That raises the alarm"}</b><p>${esc(c.fb)}</p><div><button class="btn small" type="button">Continue ${icon("chev")}</button></div></div>`;
          const btn = $("[data-fb] button", box);
          btn.addEventListener("click", () => { node = c.next; draw(); });
          btn.focus({ preventScroll: true });
        }));
      };
      window.addEventListener("hashchange", () => { token++; stopTimer(); }, { once: true });
      draw();
    });
  }

  /* ---------- Animated explainers: teacher and child on a stage, scene by scene ---------- */
  const AX = { x: 50, y: 95, s: 160 }, CX = { x: 395, y: 115, s: 135 };
  const ac = { x: AX.x + AX.s / 2, y: AX.y + AX.s / 2 }, cc = { x: CX.x + CX.s / 2, y: CX.y + CX.s / 2 };
  function fxSvg(sc) {
    const col = (st) => `var(--${st || "executive"})`;
    switch (sc.fx) {
      case "breath": return [0, 1, 2].map((i) => `<circle class="fx-breath" style="animation-delay:${i * .7}s;transform-origin:${ac.x}px ${ac.y}px" cx="${ac.x}" cy="${ac.y}" r="70" fill="none" stroke="var(--accent)" stroke-width="3"/>`).join("") + `<text x="${ac.x}" y="${AX.y - 8}" text-anchor="middle" class="fx-label">breathe in… and out</text>`;
      case "waves": return [0, 1, 2, 3].map((i) => `<path class="fx-wave" style="animation-delay:${i * .45}s" d="M${ac.x + 70} ${ac.y - 26} q16 26 0 52" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>`).join("") + `<text x="300" y="${ac.y - 50}" text-anchor="middle" class="fx-label">calm downloads</text>`;
      case "bolt": return `<g class="fx-bolt"><path d="M${cc.x + 10} 18 l-26 44 h20 l-14 40 l40 -54 h-22 l14 -30z" fill="var(--survival)" stroke="var(--on-state)" stroke-width="2"/></g><circle class="fx-flash" cx="${cc.x}" cy="${cc.y}" r="80" fill="var(--survival)"/>`;
      case "heart": return `<path class="fx-travel" d="M0 6 C-14 -8 -26 6 0 24 C26 6 14 -8 0 6Z" fill="var(--accent-2)" style="--fx:${ac.x + 60}px;--fy:${ac.y - 20}px;--tx:${cc.x - 60}px;--ty:${cc.y - 30}px"/><path class="fx-travel" style="animation-delay:.6s;--fx:${ac.x + 60}px;--fy:${ac.y}px;--tx:${cc.x - 60}px;--ty:${cc.y - 10}px" d="M0 4 C-9 -5 -17 4 0 16 C17 4 9 -5 0 4Z" fill="var(--accent-2)"/>`;
      case "ball": return `<g class="fx-ball" style="--fx:${ac.x + 60}px;--fy:${ac.y - 10}px;--mx:300px;--my:40px;--tx:${cc.x - 55}px;--ty:${cc.y - 20}px"><circle r="22" fill="var(--surface-solid)" stroke="var(--ink)" stroke-width="2"/><path d="M-22 0 A22 22 0 0 1 22 0Z" fill="var(--accent-2)"/><path d="M-8 -20 A22 22 0 0 1 8 -20 L0 0Z" fill="var(--emotional)"/></g><text x="300" y="30" text-anchor="middle" class="fx-label">feelings · power · responsibility</text>`;
      case "hold": return `<g transform="translate(${ac.x + 70} ${ac.y - 10})"><g class="fx-bob"><circle r="22" fill="var(--surface-solid)" stroke="var(--ink)" stroke-width="2"/><path d="M-22 0 A22 22 0 0 1 22 0Z" fill="var(--accent-2)"/></g></g><text x="${ac.x + 70}" y="${ac.y - 44}" text-anchor="middle" class="fx-label">adult keeps the ball</text>`;
      case "throw": return `<g class="fx-throw" style="--fx:${ac.x + 60}px;--fy:${ac.y - 10}px;--tx:${cc.x - 20}px;--ty:${cc.y - 20}px"><circle r="22" fill="var(--surface-solid)" stroke="var(--ink)" stroke-width="2"/><path d="M-22 0 A22 22 0 0 1 22 0Z" fill="var(--bad)"/></g><circle class="fx-flash" style="animation-delay:.7s" cx="${cc.x}" cy="${cc.y}" r="80" fill="var(--survival)"/>`;
      case "shield": return `<path class="fx-shield" style="transform-origin:${cc.x}px ${cc.y}px" d="M${cc.x} ${cc.y - 92} l70 26 v42 c0 44 -30 70 -70 80 c-40 -10 -70 -36 -70 -80 v-42z" fill="var(--executive)" fill-opacity=".12" stroke="var(--executive)" stroke-width="3"/>`;
      case "bulb": return `<g class="fx-bulb" style="transform-origin:${cc.x}px 50px"><g stroke="var(--emotional)" stroke-width="3" stroke-linecap="round">${[0, 45, 90, 135, 180].map((a) => { const r = (a + 180) * Math.PI / 180; return `<line x1="${cc.x + Math.cos(r) * 32}" y1="${50 + Math.sin(r) * 32}" x2="${cc.x + Math.cos(r) * 44}" y2="${50 + Math.sin(r) * 44}"/>`; }).join("")}</g><circle cx="${cc.x}" cy="50" r="20" fill="var(--emotional)"/><rect x="${cc.x - 9}" y="68" width="18" height="12" rx="3" fill="var(--ink-soft)"/></g>`;
      case "light": return `<polygon class="fx-beam" points="${ac.x + 55},${ac.y + 10} 300,22 560,22 560,72 300,72" fill="url(#beam)"/><g class="fx-pop"><rect x="330" y="22" width="230" height="50" rx="14" fill="var(--surface-solid)" stroke="${sc.bad ? "var(--bad)" : "var(--good)"}" stroke-width="2.5"/><text x="445" y="53" text-anchor="middle" class="fx-big" fill="${sc.bad ? "var(--bad)" : "var(--good)"}">${esc(sc.label)}</text></g>`;
      case "choices": return (sc.opts || []).map((o, i) => `<g class="fx-pop" style="animation-delay:${i * .35}s"><rect x="215" y="${20 + i * 56}" width="170" height="44" rx="12" fill="var(--surface-solid)" stroke="var(--accent)" stroke-width="2"/><text x="300" y="${48 + i * 56}" text-anchor="middle" class="fx-big" fill="var(--accent)">${esc(o)}</text></g>`).join("");
      case "spark": return [[cc.x - 70, 70], [cc.x + 70, 80], [cc.x, 40], [ac.x - 60, 80], [ac.x + 60, 60], [300, 50]].map(([x, y], i) => `<path class="fx-star" style="animation-delay:${i * .2}s;transform-origin:${x}px ${y}px" d="M${x} ${y - 12} l3.5 8.5 9 .8 -6.8 6 2 8.8 -7.7 -4.6 -7.7 4.6 2 -8.8 -6.8 -6 9 -.8z" fill="var(--emotional)"/>`).join("");
      case "question": return `<text class="fx-bob" x="${ac.x}" y="${AX.y - 6}" text-anchor="middle" font-size="44" font-family="var(--f-display)" fill="var(--accent-2)">?</text>`;
      case "split": return `<g class="fx-pop"><rect x="200" y="22" width="90" height="40" rx="10" fill="color-mix(in srgb, var(--bad) 18%, transparent)" stroke="var(--bad)"/><text x="245" y="47" text-anchor="middle" class="fx-big" fill="var(--bad)">${esc((sc.opts || [])[0] || "")}</text></g><g class="fx-pop" style="animation-delay:.4s"><rect x="310" y="22" width="90" height="40" rx="10" fill="color-mix(in srgb, var(--good) 18%, transparent)" stroke="var(--good)"/><text x="355" y="47" text-anchor="middle" class="fx-big" fill="var(--good)">${esc((sc.opts || [])[1] || "")}</text></g>`;
      default: return "";
    }
  }
  function stageSvg(sc, who) {
    return `<svg class="ex-svg" viewBox="0 0 600 300" role="img" aria-label="${esc(sc.cap)}">
      <defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="var(--emotional)" stop-opacity=".55"/><stop offset="1" stop-color="var(--emotional)" stop-opacity=".05"/></linearGradient></defs>
      <ellipse cx="${ac.x}" cy="282" rx="80" ry="10" fill="var(--ink)" opacity=".12"/><ellipse cx="${cc.x}" cy="282" rx="68" ry="9" fill="var(--ink)" opacity=".12"/>
      <svg x="${AX.x}" y="${AX.y}" width="${AX.s}" height="${AX.s}" style="width:${AX.s}px;height:${AX.s}px" viewBox="0 0 200 200" class="avatar ${sc.a || "executive"}">${avatarInner(sc.a || "executive")}</svg>
      <svg x="${CX.x}" y="${CX.y}" width="${CX.s}" height="${CX.s}" style="width:${CX.s}px;height:${CX.s}px" viewBox="0 0 200 200" class="avatar ${sc.c || "emotional"}">${avatarInner(sc.c || "emotional")}</svg>
      <text x="${ac.x}" y="${AX.y + AX.s + 14}" text-anchor="middle" class="fx-name">TEACHER</text>
      <text x="${cc.x}" y="${CX.y + CX.s + 14}" text-anchor="middle" class="fx-name">${esc((who || "CHILD").toUpperCase())}</text>
      <g class="fx">${fxSvg(sc)}</g></svg>`;
  }
  function explainer(ex, key) {
    return `<div class="card explainer" data-ex="${key}">
      <div class="ex-head"><span class="eyebrow">Watch it in action · ${ex.scenes.length} scenes</span><div class="pill-row"><button class="btn ghost small" type="button" data-exprev aria-label="Previous scene">←</button><button class="btn small" type="button" data-explay>${icon("play")} Play</button><button class="btn ghost small" type="button" data-exnext aria-label="Next scene">→</button></div></div>
      <div class="ex-cap" aria-live="polite"></div>
      <div class="ex-stage"></div>
      <div class="ex-lines"><div class="ex-say teacher"></div><div class="ex-say child"></div></div>
      <div class="ex-dots"></div></div>`;
  }
  function wireExplainers(root) {
    $$(".explainer", root).forEach((el) => {
      const key = el.dataset.ex;
      const ex = key === "brain" ? C.brain.explainer : (C.modules.find((m) => m.id === key) || {}).explainer;
      if (!ex) return;
      let i = 0, timer = null, playing = false;
      const playBtn = $("[data-explay]", el);
      const show = (k) => {
        i = Math.max(0, Math.min(ex.scenes.length - 1, k));
        const sc = ex.scenes[i];
        $(".ex-cap", el).innerHTML = `<span class="ex-num">${i + 1}</span><span>${esc(sc.cap)}</span>`;
        $(".ex-stage", el).innerHTML = stageSvg(sc, ex.who);
        const t = $(".ex-say.teacher", el), c = $(".ex-say.child", el);
        t.innerHTML = sc.as ? `<span class="tag">Teacher</span><span>${esc(sc.as)}</span>` : "";
        c.innerHTML = sc.cs ? `<span class="tag">${esc(ex.who || "Child")}</span><span>${esc(sc.cs)}</span>` : "";
        t.hidden = !sc.as; c.hidden = !sc.cs;
        $(".ex-dots", el).innerHTML = ex.scenes.map((_, k) => `<button type="button" class="${k === i ? "on" : k < i ? "past" : ""}" data-k="${k}" aria-label="Scene ${k + 1}"></button>`).join("");
        $$(".ex-dots button", el).forEach((b) => b.addEventListener("click", () => { stop(); show(+b.dataset.k); }));
        if (i === ex.scenes.length - 1) award("explainer:" + key, 15, "Watched an explainer");
      };
      const stop = () => { clearInterval(timer); playing = false; playBtn.innerHTML = `${icon("play")} Play`; };
      const play = () => {
        if (i >= ex.scenes.length - 1) show(0);
        playing = true; playBtn.innerHTML = `${icon("reset")} Pause`;
        timer = setInterval(() => { if (i >= ex.scenes.length - 1) stop(); else show(i + 1); }, 4200);
      };
      playBtn.addEventListener("click", () => (playing ? stop() : play()));
      $("[data-exprev]", el).addEventListener("click", () => { stop(); show(i - 1); });
      $("[data-exnext]", el).addEventListener("click", () => { stop(); show(i + 1); });
      window.addEventListener("hashchange", stop, { once: true });
      show(0);
    });
  }

  /* Iceberg: behaviour above the waterline, the state and needs beneath it */
  function iceberg() {
    return `<svg class="iceberg" viewBox="0 0 600 360" role="img" aria-label="Iceberg: behaviour is the visible tip; brain state, old recordings and unmet needs lie beneath">
      <defs><linearGradient id="sea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".28"/><stop offset="1" stop-color="var(--accent-3)" stop-opacity=".08"/></linearGradient>
      <linearGradient id="ice" x1="0" x2="1"><stop offset="0" stop-color="var(--ink)" stop-opacity=".9"/><stop offset="1" stop-color="var(--ink-soft)" stop-opacity=".7"/></linearGradient></defs>
      <rect x="0" y="120" width="600" height="240" fill="url(#sea)"/>
      <g class="ice-bob">
        <path d="M250 120 L285 50 L305 70 L325 30 L360 120 Z" fill="url(#ice)"/>
        <path d="M250 120 L360 120 L430 190 L470 300 L380 345 L230 345 L140 290 L170 190 Z" fill="var(--ink-soft)" fill-opacity=".35" stroke="var(--ink-soft)" stroke-opacity=".5"/>
      </g>
      <path class="ice-wave" d="M0 120 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
      <g><text x="30" y="40" class="ice-t">BEHAVIOUR · what we see</text><text x="30" y="60" class="ice-s">hitting · back talk · refusing</text><line x1="210" y1="52" x2="282" y2="70" stroke="var(--ink-soft)" stroke-dasharray="3 3"/></g>
      <g><text x="300" y="175" text-anchor="middle" class="ice-t">BRAIN STATE</text><text x="300" y="193" text-anchor="middle" class="ice-s">survival · emotional · executive</text></g>
      <g><text x="300" y="235" text-anchor="middle" class="ice-t">OLD RECORDINGS</text><text x="300" y="253" text-anchor="middle" class="ice-s">scripts and beliefs from early life</text></g>
      <g><text x="300" y="295" text-anchor="middle" class="ice-t">UNMET NEEDS</text><text x="300" y="313" text-anchor="middle" class="ice-s">safety · connection · a missing skill</text></g>
      <text x="20" y="112" class="ice-s">waterline</text>
    </svg>`;
  }

  /* ---------- Hairline figures: thin isometric line drawings that answer the pointer ---------- */
  const ISO = (x, y, z) => [(x - y) * 0.866, (x + y) * 0.5 - z];
  const pts = (arr) => arr.map((p) => ISO(...p).map((v) => v.toFixed(1)).join(",")).join(" ");
  function isoBox(x, y, z, w, d, hgt, o) {
    // top face, and the two visible side faces, as hairline outlines
    const top = [[x, y, z + hgt], [x + w, y, z + hgt], [x + w, y + d, z + hgt], [x, y + d, z + hgt]];
    const left = [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + hgt], [x, y + d, z + hgt]];
    const right = [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + hgt], [x + w, y, z + hgt]];
    const fill = o.fill || "var(--surface-solid)";
    return `<g class="hl-box ${o.cls || ""}">
      <polygon points="${pts(left)}" fill="${fill}" fill-opacity="${o.on ? .9 : .55}" stroke="${o.stroke}" stroke-width="1.2"/>
      <polygon points="${pts(right)}" fill="${fill}" fill-opacity="${o.on ? .75 : .4}" stroke="${o.stroke}" stroke-width="1.2"/>
      <polygon points="${pts(top)}" fill="${o.on ? o.stroke : fill}" fill-opacity="${o.on ? .22 : .7}" stroke="${o.stroke}" stroke-width="1.4"/>
      ${o.grid ? [1, 2, 3].map((k) => `<polyline points="${pts([[x + (w * k) / 4, y, z + hgt], [x + (w * k) / 4, y + d, z + hgt]])}" fill="none" stroke="${o.stroke}" stroke-opacity=".35" stroke-width=".8"/>`).join("") : ""}
    </g>`;
  }
  const HAIR = {
    stack: {
      label: "The Conscious Discipline pyramid. Move your pointer over it to pull the layers apart.",
      vb: "-200 -235 470 300",
      draw(k) {
        const layers = [["Brain State Model", "--survival"], ["Seven Powers", "--emotional"], ["School Family", "--executive"], ["Seven Skills", "--accent"]];
        const gap = 18 + k * 34;
        return layers.map(([name, c], i) => {
          const s = 150 - i * 26, off = (150 - s) / 2;
          const z = i * gap;
          const [lx, ly] = ISO(off - 75 + s, off - 75, z + 14);
          return isoBox(off - 75, off - 75, z, s, s, 14, { stroke: `var(${c})`, on: k > .35, grid: true }) +
            `<g class="hl-tag" style="opacity:${.35 + k * .65}"><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${(lx + 40).toFixed(1)}" y2="${ly.toFixed(1)}" stroke="var(${c})" stroke-width="1" stroke-dasharray="3 3"/><text x="${(lx + 44).toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="var(--ink)" class="hl-text">${name}</text></g>`;
        }).join("");
      },
    },
    elevator: {
      label: "The brain-state building. Move your pointer up and down to ride the elevator between floors.",
      vb: "-190 -265 420 345",
      draw(k) {
        const floors = [["Survival", "--survival", "Am I safe?"], ["Emotional", "--emotional", "Am I loved?"], ["Executive", "--executive", "What can I learn?"]];
        const level = Math.round(k * 2); // 0..2, pointer high = executive
        const H = 62;
        let out = "";
        floors.forEach(([n, c, q], i) => {
          out += isoBox(-70, -70, i * H, 140, 140, H - 8, { stroke: `var(${c})`, on: i === level });
          const [tx, ty] = ISO(70, -70, i * H + H / 2);
          out += `<g style="opacity:${i === level ? 1 : .45}"><text x="${(tx + 14).toFixed(1)}" y="${(ty - 2).toFixed(1)}" class="hl-text" fill="var(${c})">${n}</text><text x="${(tx + 14).toFixed(1)}" y="${(ty + 14).toFixed(1)}" class="hl-sub" fill="var(--ink-soft)">${q}</text></g>`;
        });
        // glass shaft and the car
        const carZ = k * (H * 2);
        out += `<polyline points="${pts([[-70, 70, 0], [-70, 70, H * 3 + 20]])}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 4" fill="none"/>`;
        out += isoBox(-92, 48, carZ + 6, 30, 30, 40, { stroke: "var(--accent)", on: true, fill: "var(--accent)" });
        return out;
      },
    },
  };
  function wireHair(rootEl) {
    $$("[data-hair]", rootEl).forEach((box) => {
      const F = HAIR[box.dataset.hair];
      if (!F) return;
      let k = box.dataset.hair === "elevator" ? 1 : 0, target = k, raf = 0;
      const render = () => { box.innerHTML = `<svg viewBox="${F.vb}" class="hl-svg" role="img" aria-label="${esc(F.label)}">${F.draw(k)}</svg>`; };
      const loop = () => {
        k += (target - k) * .14;
        render();
        if (Math.abs(target - k) > .002) raf = requestAnimationFrame(loop); else { k = target; render(); raf = 0; }
      };
      const go = () => { if (!raf) raf = requestAnimationFrame(loop); };
      render();
      box.parentElement.addEventListener("pointermove", (e) => {
        const r = box.getBoundingClientRect();
        if (box.dataset.hair === "elevator") target = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height));
        else { const dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height; target = Math.max(0, 1 - Math.hypot(dx, dy) * 1.4); }
        go();
      });
      box.parentElement.addEventListener("pointerleave", () => { target = box.dataset.hair === "elevator" ? 1 : 0; go(); });
      // Without a pointer (touch, keyboard), a tap cycles the figure
      box.addEventListener("click", () => { target = box.dataset.hair === "elevator" ? (Math.round(target * 2) + 1) % 3 / 2 : target > .5 ? 0 : 1; go(); });
      if (!reduced && box.dataset.hair === "stack") { target = 1; go(); setTimeout(() => { target = 0; go(); }, 1400); }
    });
  }

  /* Spot the state game */
  function viewIdentify() {
    const deck = C.identify.slice().sort(() => Math.random() - .5).slice(0, 10);
    let i = 0, score = 0, streak = 0;
    mount(`<section class="section"><span class="eyebrow">Practise · speed round</span><h1>Spot the state</h1>
      <p class="lede muted prose">Read the behaviour and choose the brain state behind it. The book's rule of thumb: physical behaviour usually means survival, verbal and social behaviour usually means emotional, and calm, willing behaviour means executive.</p></section>
      <div class="card section" id="idg"></div>`, (s) => {
      const box = $("#idg", s);
      const draw = () => {
        if (i >= deck.length) {
          const best = Math.max(S.idgame || 0, score);
          S.idgame = best; save();
          award("identify:" + (score >= 8 ? "pro" : "done"), score >= 8 ? 40 : 15, score >= 8 ? "Sharp state spotter" : "Finished Spot the state");
          box.innerHTML = `<div class="section" style="text-align:center;justify-items:center"><h2>${score} / ${deck.length}</h2><p class="muted">Best score: ${best}. ${score >= 8 ? "You read states like a pro." : "Re-read the Brain State Model, then try again."}</p><button class="btn" type="button">${icon("reset")} New round</button></div>`;
          $("button", box).addEventListener("click", viewIdentify);
          return;
        }
        const c = deck[i];
        box.innerHTML = `<div class="q-head"><span class="eyebrow">Behaviour ${i + 1} of ${deck.length}</span><span class="chip">${icon("flame")} streak ${streak}</span></div>
          <p class="q-situation" style="font-size:1.2rem">${esc(c.t)}</p>
          <div class="grid">${["survival", "emotional", "executive"].map((st) => `<button class="state-card ${st}" type="button" data-s="${st}"><span class="tag ${st[0] === "s" ? "s" : st[0] === "e" ? "e" : "x"}">${st}</span><span class="q">${esc(C.brain.states.find((x) => x.id === st).q)}</span></button>`).join("")}</div><div data-fb></div>`;
        $$("[data-s]", box).forEach((b) => b.addEventListener("click", () => {
          const ok = b.dataset.s === c.s;
          if (ok) { score++; streak++; } else streak = 0;
          $$("[data-s]", box).forEach((x) => { x.disabled = true; if (x.dataset.s === c.s) x.classList.add("on"); });
          $("[data-fb]", box).innerHTML = `<div class="explain"><b style="color:var(${ok ? "--good" : "--bad"})">${ok ? "Correct" : "It's " + c.s}</b><p>${esc(c.why)}</p><div><button class="btn small" type="button">Next ${icon("chev")}</button></div></div>`;
          const nb = $("[data-fb] button", box);
          nb.addEventListener("click", () => { i++; draw(); });
          nb.focus({ preventScroll: true });
        }));
      };
      draw();
    });
  }

  /* Calming corner */
  function viewCalm() {
    const ex = C.breathing;
    let cur = 0, timer = null, running = false;
    mount(`<section class="section"><span class="eyebrow">Composure · active calming</span><h1>Calming corner</h1>
      <p class="lede muted prose">${esc(C.calmLede)}</p></section>
      <div class="card section">
        <div class="breath-pick" role="group" aria-label="Choose a calming exercise">${ex.map((e, i) => `<button class="btn ghost small" type="button" data-b="${i}" aria-pressed="${i === 0}">${esc(e.name)}</button>`).join("")}</div>
        <div class="breath-stage"><div class="breath-orb-wrap"><div class="breath-orb" id="orb">Ready</div></div><p id="bdesc" class="muted prose" style="text-align:center"></p>
          <div class="pill-row"><button class="btn" type="button" id="bgo">${icon("play")} Start 3 rounds</button></div></div>
      </div>
      <section class="grid">${ex.map((e) => `<div class="card section"><h3>${esc(e.name)}</h3><p class="muted">${esc(e.how)}</p><span class="tag">${esc(e.use)}</span></div>`).join("")}</section>
      <div class="card section"><span class="eyebrow">For you, before you respond</span><h3>The adult's calming phrase</h3><div class="say">I'm safe. Keep breathing. I can handle this.</div><p class="muted">Use it the moment you feel heat rising. A calm adult is the most powerful safety tool in the room.</p></div>
    `, (s) => {
      const orb = $("#orb", s), desc = $("#bdesc", s), go = $("#bgo", s);
      const setEx = (i) => { cur = i; $$("[data-b]", s).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.b === i)); desc.textContent = ex[i].how; stop(); };
      const stop = () => { clearTimeout(timer); running = false; orb.className = "breath-orb"; orb.textContent = "Ready"; go.innerHTML = `${icon("play")} Start 3 rounds`; };
      const run = () => {
        const e = ex[cur];
        const seq = [];
        for (let r = 0; r < 3; r++) e.steps.forEach((st) => seq.push(st));
        let k = 0;
        running = true; go.innerHTML = `${icon("reset")} Stop`;
        const step = () => {
          if (!running) return;
          if (k >= seq.length) {
            stop(); orb.textContent = "Well done";
            S.breaths = (S.breaths || 0) + 1; save();
            award("breath:" + e.name + ":" + new Date().toISOString().slice(0, 10), 20, `Practised ${e.name}`);
            return;
          }
          const st = seq[k++];
          orb.className = "breath-orb " + st.phase;
          orb.style.transitionDuration = st.sec + "s";
          orb.textContent = st.t;
          timer = setTimeout(step, st.sec * 1000);
        };
        step();
      };
      $$("[data-b]", s).forEach((b) => b.addEventListener("click", () => setEx(+b.dataset.b)));
      go.addEventListener("click", () => (running ? stop() : run()));
      setEx(0);
      window.addEventListener("hashchange", stop, { once: true });
    });
  }

  /* Teaching strategies */
  function viewTeach() {
    const T = C.teach;
    mount(`<section class="section"><span class="eyebrow">For teachers & trainers</span><h1>Teaching strategies</h1><p class="lede muted prose">${esc(T.lede)}</p></section>
      <section class="section"><div class="section-head"><div class="prose"><span class="eyebrow">Roll-out pipeline</span><h2>The three-year change</h2><p class="muted">${esc(T.rolloutNote)}</p></div></div>${pipeline(T.rollout)}</section>
      <section class="grid-2">
        <div class="card section"><span class="eyebrow">Daily rhythm</span><h3>A Conscious Discipline school day</h3><div class="timeline">${T.day.map((d) => `<div class="tl-item"><b>${esc(d.t)}</b><span class="muted">${esc(d.s)}</span></div>`).join("")}</div></div>
        <div class="card section"><span class="eyebrow">Month by month</span><h3>One skill per month</h3><div class="timeline">${T.months.map((d) => `<div class="tl-item"><b>${esc(d.t)}</b><span class="muted">${esc(d.s)}</span></div>`).join("")}</div></div>
      </section>
      <section class="section"><div class="section-head"><div class="prose"><span class="eyebrow">Strategies that work</span><h2>How to teach these skills to students</h2></div></div>
        <div class="grid-2">${T.strategies.map((x) => `<div class="card section"><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><p class="muted" style="font-size:.9rem"><b>Why it works:</b> ${esc(x.why)}</p>${x.try ? `<div class="say">${esc(x.try)}</div>` : ""}</div>`).join("")}</div></section>
      <section class="section"><div class="section-head"><div class="prose"><span class="eyebrow">Mini-lessons</span><h2>Ready-to-run lesson ideas</h2></div></div>
        <div class="grid">${T.lessons.map((x) => `<div class="card section"><span class="tag">${esc(x.skill)}</span><h3>${esc(x.t)}</h3><p class="muted">${esc(x.d)}</p></div>`).join("")}</div></section>
      <section class="grid-2">
        <div class="card section"><span class="eyebrow">Classroom set-up checklist · saved in this browser</span><h3>Structures to build</h3><div class="check">${T.checklist.map((c, i) => `<label><input type="checkbox" id="ck-${i}" data-ck="${i}" ${S.checks[i] ? "checked" : ""}><span><b>${esc(c.t)}</b> <span class="muted">— ${esc(c.s)}</span></span></label>`).join("")}</div></div>
        <div class="card section"><span class="eyebrow">Coaching colleagues</span><h3>Training other teachers</h3><div class="dd" style="grid-template-columns:1fr">${T.coaching.map((c) => `<div class="def"><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div>`).join("")}</div></div>
      </section>`, (s) => {
      award("visit:teach", 10, "Read the teaching strategies");
      $$("[data-ck]", s).forEach((b) => b.addEventListener("change", () => {
        S.checks[b.dataset.ck] = b.checked; save();
        if (b.checked) award("ck:" + b.dataset.ck, 5, "Classroom structure planned");
        checkBadges();
      }));
    });
  }

  /* Progress */
  function viewProgress() {
    const L = levelOf(S.xp);
    const mods = C.modules.filter(modDone).length;
    const quizBest = Object.values(S.quiz).reduce((a, q) => a + (q.best || 0), 0);
    const simStars = Object.values(S.sims).reduce((a, b) => a + b, 0);
    mount(`<section class="section"><span class="eyebrow">Your journey</span><h1>My progress</h1></section>
      <div class="stats">
        <div class="stat"><b data-count="${S.xp}">${S.xp}</b><span>Total XP</span></div>
        <div class="stat"><b>${L.i + 1}</b><span>Level · ${esc(L.cur.title)}</span></div>
        <div class="stat"><b>${mods}/${C.modules.length}</b><span>Modules mastered</span></div>
        <div class="stat"><b>${quizBest}</b><span>Best responses chosen</span></div>
        <div class="stat"><b>${simStars}</b><span>Simulator stars</span></div>
        <div class="stat"><b>${S.streak.count || 0}</b><span>Day streak</span></div>
      </div>
      <section class="section"><span class="eyebrow">Levels</span>${pipeline({ title: "Levels", steps: LEVELS.map((l, i) => ({ k: (i <= L.i ? "✓ " : "") + l.xp + " XP", t: l.title, s: l.note })) })}</section>
      <section class="section"><span class="eyebrow">Badges · ${Object.keys(S.badges).length} of ${C.badges.length}</span>
        <div class="badges">${C.badges.map((b) => `<div class="badge ${S.badges[b.id] ? "" : "locked"}">${medal(b)}<b>${esc(b.name)}</b><small>${esc(b.desc)}</small></div>`).join("")}</div></section>
      <div class="card section"><span class="eyebrow">Start over</span><p class="muted">Clear all XP, badges and notes saved in this browser.</p><div class="pill-row"><button class="btn ghost" type="button" id="rs1">Reset progress</button><button class="btn" type="button" id="rs2" hidden>Yes, clear everything</button></div></div>`, (s) => {
      $("#rs1", s).addEventListener("click", () => { $("#rs2", s).hidden = false; $("#rs1", s).textContent = "Cancel"; $("#rs1", s).onclick = () => viewProgress(); });
      $("#rs2", s).addEventListener("click", () => { const p = S.palette, md = S.mode; S = blank(); S.palette = p; S.mode = md; save(); renderHud(); viewProgress(); toast("Progress cleared"); });
    });
  }
  function medal(b) {
    const col = { safety: "var(--survival)", connection: "var(--emotional)", problem: "var(--executive)", gold: "var(--accent-2)", core: "var(--accent)" }[b.color || "core"];
    return `<svg class="medal" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 4h10l4 14H24zM34 4h10l-4 14H30z" fill="var(--line)"/><circle cx="32" cy="38" r="22" fill="${col}"/><circle cx="32" cy="38" r="16" fill="none" stroke="var(--on-state)" stroke-opacity=".6" stroke-width="2" stroke-dasharray="3 3"/><g transform="translate(20 26)" stroke="var(--on-state)" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><svg viewBox="0 0 24 24" width="24" height="24">${P[b.icon] || P.star}</svg></g></svg>`;
  }

  /* ---------- Router ---------- */
  function route() {
    const id = (location.hash.slice(1) || "home");
    renderRail();
    if (id === "home") return viewHome();
    if (id === "brain") return viewBrain();
    if (id === "powers") return viewPowers();
    if (id === "sim") return viewSim();
    if (id.startsWith("sim-")) return viewSim(id.slice(4));
    if (id === "identify") return viewIdentify();
    if (id === "calm") return viewCalm();
    if (id === "teach") return viewTeach();
    if (id === "progress") return viewProgress();
    const m = C.modules.find((x) => x.id === id);
    if (m) return viewModule(m, "learn");
    location.hash = "home";
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("input", (e) => {
    if (e.target.id && e.target.id.startsWith("j-")) {
      S.journal[e.target.id.slice(2)] = e.target.value; save();
      if (e.target.value.trim().length > 40) award("journal:" + e.target.id, 15, "Wrote a reflection");
    }
  });

  /* Theme popover */
  const themeBtn = $("#themeBtn"), pop = $("#themePop");
  function renderThemePop() {
    pop.innerHTML = `<span class="eyebrow">Colour theme</span><div class="swatches">${C.palettes.map((p) => `<button class="swatch" type="button" data-pal="${p.id}" aria-pressed="${(S.palette || "") === p.id}"><span class="dots">${p.dots.map((d) => `<i style="background:${d}"></i>`).join("")}</span>${esc(p.name)}</button>`).join("")}</div>
      <div ${S.palette ? "hidden" : ""}><span class="eyebrow">Light or dark</span><div class="seg" style="margin-top:.4rem">${[["", "Auto"], ["light", "Light"], ["dark", "Dark"]].map(([v, l]) => `<button type="button" data-mode="${v}" aria-pressed="${(S.mode || "") === v}">${l}</button>`).join("")}</div></div>`;
    $$("[data-pal]", pop).forEach((b) => b.addEventListener("click", () => { S.palette = b.dataset.pal; save(); applyTheme(); renderThemePop(); award("theme", 5, "Made it yours"); }));
    $$("[data-mode]", pop).forEach((b) => b.addEventListener("click", () => { S.mode = b.dataset.mode; save(); applyTheme(); renderThemePop(); }));
  }
  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = pop.hidden;
    pop.hidden = !open;
    themeBtn.setAttribute("aria-expanded", open);
    if (open) renderThemePop();
  });
  document.addEventListener("click", (e) => { if (!pop.hidden && !pop.contains(e.target)) { pop.hidden = true; themeBtn.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) { pop.hidden = true; themeBtn.focus(); } });

  /* ---------- Living neural network background ---------- */
  (function neural() {
    if (reduced) return;
    const cv = document.createElement("canvas");
    cv.id = "neural";
    cv.setAttribute("aria-hidden", "true");
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    let W, H, nodes = [], pulses = [], mx = -1e3, my = -1e3;
    const cols = {}, dpr = Math.min(2, window.devicePixelRatio || 1);
    const readCols = () => { const cs = getComputedStyle(root); ["--accent", "--accent-2", "--accent-3"].forEach((k) => (cols[k] = cs.getPropertyValue(k).trim())); };
    const resize = () => {
      W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (W * H) / 16000));
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.8 + .8 }));
    };
    readCols(); resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("cd-theme", readCols);
    window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const D = 130;
    (function frame() {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = n.x - mx, dy = n.y - my;
        if (dx * dx + dy * dy < 14000) { n.x += dx * .012; n.y += dy * .012; }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = cols["--accent-3"];
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < D) {
          ctx.globalAlpha = (1 - d / D) * .35;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (Math.random() < .0009 && pulses.length < 14) pulses.push({ a, b, t: 0, c: Math.random() < .5 ? cols["--accent"] : cols["--accent-2"] });
        }
      }
      ctx.globalAlpha = .9;
      ctx.fillStyle = cols["--accent"];
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.283); ctx.fill(); }
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += .02;
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.globalAlpha = 1; ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    })();
  })();

  /* Cursor spotlight on glass panels, and a gentle 3D tilt on cards */
  document.addEventListener("pointermove", (e) => {
    if (!e.target.closest) return;
    const el = e.target.closest(".card, .stop, .sim-card, .def");
    if (el) { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", e.clientX - r.left + "px"); el.style.setProperty("--my", e.clientY - r.top + "px"); }
    if (reduced || e.pointerType !== "mouse") return;
    const t = e.target.closest(".stop, .tilt");
    if (t) { const r = t.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; t.style.transform = `perspective(700px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-3px)`; }
  }, { passive: true });
  document.addEventListener("pointerout", (e) => { const t = e.target.closest && e.target.closest(".stop, .tilt"); if (t && !t.contains(e.relatedTarget)) t.style.transform = ""; });

  bumpStreak();
  renderHud();
  route();
})();
