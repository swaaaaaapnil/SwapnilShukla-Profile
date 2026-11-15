"use client";

import { useEffect } from "react";

const EMAIL = "swapnilshukla470@gmail.com";
const COMMANDS = [
  ["Work", "section", "#work"],
  ["Experience", "section", "#experience"],
  ["About", "section", "#about"],
  ["Contact", "section", "#contact"],
  ["Murmur", "project ↗", "https://murmur-talk.vercel.app"],
  ["Finora", "project ↗", "https://finora-phi.vercel.app"],
  ["Skylynx", "project ↗", "https://skylynx.vercel.app"],
  ["Sketchpad", "project ↗", "https://sketchpad-blond.vercel.app"],
  ["GitHub", "link ↗", "https://github.com/swaaaaaapnil"],
  ["LinkedIn", "link ↗", "https://www.linkedin.com/in/swapnil--shukla/"],
  ["Copy email", "action", "copy"],
  ["Toggle theme", "action", "theme"],
];

// All the page's small behaviours, wired to the server-rendered markup once it is on screen:
// header, reveal, clock, typed headline, nav indicator, theme toggle, ⌘K menu, Murmur demo.
export default function Interactions() {
  useEffect(() => {
    const cleanups = [];
    const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const later = (fn, ms) => { const id = setTimeout(fn, ms); cleanups.push(() => clearTimeout(id)); return id; };
    const watch = (obs) => { cleanups.push(() => obs.disconnect()); return obs; };
    const $ = (id) => document.getElementById(id);
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("js");

    // header border on scroll
    const hdr = $("top");
    on(window, "scroll", () => hdr.classList.toggle("scrolled", scrollY > 8), { passive: true });

    // reveal
    const io = watch(new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }));
    document.querySelectorAll(".rv").forEach((el, i) => { el.style.transitionDelay = (el.closest(".hero") ? i * 70 : 0) + "ms"; io.observe(el); });
    requestAnimationFrame(() => document.querySelectorAll(".rv").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); }));
    later(() => document.querySelectorAll(".rv:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 1.2) el.classList.add("in"); }), 1500);

    // clock
    const ck = $("clock");
    const tick = () => { try { ck.textContent = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date()) + " IST"; } catch {} };
    tick();
    const clockId = setInterval(tick, 15000);
    cleanups.push(() => clearInterval(clockId));

    // hero: split the name into words and blur them in
    document.querySelectorAll(".split").forEach((h) => {
      if (h.dataset.split) return;
      h.dataset.split = "1";
      let n = 0;
      const walk = (node) => [...node.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            const s = document.createElement("span"); s.className = "w"; s.textContent = p;
            s.style.transitionDelay = 100 + n++ * 45 + "ms"; frag.appendChild(s);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
      });
      walk(h);
      requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add("in")));
    });

    // hero line 2 types itself out; the hidden remainder holds the layout so nothing jumps
    {
      const typed = $("typed"), ghost = $("ghost"), caret = document.querySelector(".tcaret");
      const full = typed.dataset.full || typed.textContent;
      typed.dataset.full = full;
      if (reduce) { typed.textContent = full; ghost.textContent = ""; caret.classList.add("done"); }
      else {
        typed.textContent = ""; ghost.textContent = full; caret.classList.remove("done");
        let i = 0;
        const step = () => {
          i++; typed.textContent = full.slice(0, i); ghost.textContent = full.slice(i);
          if (i < full.length) later(step, full[i - 1] === " " ? 70 : 28 + Math.random() * 40);
          else later(() => caret.classList.add("done"), 2400);
        };
        later(step, 750);
        cleanups.push(() => { typed.textContent = full; ghost.textContent = ""; });
      }
    }

    // scroll progress hairline
    const prog = $("prog");
    const onScroll = () => { const h = root.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
    on(window, "scroll", onScroll, { passive: true }); onScroll();

    // nav: sliding indicator follows the section in view
    const ind = $("ind"), navLinks = [...document.querySelectorAll("#nav a")];
    const markNav = (id) => {
      navLinks.forEach((a) => a.classList.toggle("on", a.dataset.s === id));
      const a = navLinks.find((x) => x.dataset.s === id);
      if (!a) { ind.style.opacity = 0; return; }
      ind.style.opacity = 1; ind.style.width = a.offsetWidth + "px"; ind.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    const so = watch(new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) markNav(e.target.classList.contains("hero") ? null : e.target.id); }), { rootMargin: "-45% 0px -50% 0px" }));
    ["work", "experience", "about", "contact"].forEach((id) => so.observe($(id)));
    so.observe(document.querySelector(".hero"));

    // cursor spotlight on cards
    document.querySelectorAll(".card,.feature").forEach((c) => on(c, "pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
    }));

    // the Skylynx route animates with SMIL, which ignores reduced motion; stop it ourselves
    if (reduce) document.querySelectorAll(".sky svg").forEach((s) => s.pauseAnimations && s.pauseAnimations());

    // toast + copy email
    const toastEl = $("toast");
    let toastT;
    const toast = (m) => { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 1600); };
    cleanups.push(() => clearTimeout(toastT));
    const copyEmail = () => {
      try { navigator.clipboard.writeText(EMAIL).then(() => toast("Email copied"), () => toast(EMAIL)); } catch { toast(EMAIL); }
    };
    on($("copy"), "click", copyEmail);

    // theme toggle with a circular reveal
    const curDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
    const themeBtn = $("theme");
    on(themeBtn, "click", (e) => {
      const next = curDark() ? "light" : "dark";
      const apply = () => { root.dataset.theme = next; try { localStorage.setItem("theme", next); } catch {} };
      if (!document.startViewTransition || reduce) { apply(); return; }
      const b = themeBtn.getBoundingClientRect();
      const x = e.clientX || b.left + b.width / 2, y = e.clientY || b.top + b.height / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.startViewTransition(apply).ready.then(() => root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(.3,.8,.2,1)", pseudoElement: "::view-transition-new(root)" }
      ));
    });

    // command menu (⌘K / Ctrl+K)
    {
      const cmd = $("cmd"), cq = $("cq"), cl = $("cl");
      let sel = 0, list = COMMANDS, last = null;
      const paint = () => [...cl.children].forEach((li, i) => li.classList.toggle("sel", i === sel));
      const render = () => {
        const q = cq.value.toLowerCase();
        list = COMMANDS.filter((x) => x[0].toLowerCase().includes(q));
        sel = Math.min(sel, Math.max(0, list.length - 1)); cl.innerHTML = "";
        list.forEach((x, i) => {
          const li = document.createElement("li"); li.textContent = x[0];
          const s = document.createElement("span"); s.textContent = x[1]; li.appendChild(s);
          li.onmouseenter = () => { sel = i; paint(); }; li.onclick = () => go(x); cl.appendChild(li);
        });
        paint();
      };
      const open = () => { last = document.activeElement; cmd.classList.add("open"); cq.value = ""; sel = 0; render(); cq.focus(); };
      const close = () => { cmd.classList.remove("open"); last && last.focus && last.focus(); };
      const go = (x) => {
        close(); const v = x[2];
        if (v === "copy") copyEmail();
        else if (v === "theme") themeBtn.click();
        else if (v.startsWith("#")) document.querySelector(v).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        else window.open(v, "_blank", "noopener");
      };
      on(window, "keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmd.classList.contains("open") ? close() : open(); return; }
        if (!cmd.classList.contains("open") || !list.length) { if (e.key === "Escape" && cmd.classList.contains("open")) close(); return; }
        if (e.key === "Escape") close();
        else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % list.length; paint(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + list.length) % list.length; paint(); }
        else if (e.key === "Enter") go(list[sel]);
      });
      on(cq, "input", () => { sel = 0; render(); });
      on(cmd, "click", (e) => { if (e.target === cmd) close(); });
      on($("kbtn"), "click", open);
    }

    // Murmur: a port of the app's pill: idle glow bar -> black capsule with nine green voice bars
    // -> rounded card with live text -> green check, then the text lands in the doc.
    {
      const st = $("murmurStage"), win = st.querySelector(".win");
      const t = $("mtext"), pill = $("pill"), pillTxt = $("pillTxt");
      const ptx = $("ptx"), cv = $("orb"), g = cv.getContext("2d");
      const full = t.textContent, words = full.split(" ");
      let timer = null, i = 0, live = false, resetT = null, raf = 0, env = 0, target = 0, lastT = 0;
      const phase = (p) => { pill.dataset.phase = p; };
      const draw = (now) => {
        const tt = now / 1000, dt = Math.min(0.05, Math.max(0.001, tt - lastT)); lastT = tt;
        const k = target > env ? 1 - Math.exp(-dt * 38) : 1 - Math.exp(-dt * 9);
        env += (target - env) * k;
        const W = cv.width, H = cv.height, s = 2, n = 9, bw = 6 * s, gap = 5 * s, total = n * bw + (n - 1) * gap, x0 = (W - total) / 2;
        g.clearRect(0, 0, W, H);
        const gr = g.createLinearGradient(x0, 0, x0 + total, 0); gr.addColorStop(0, "#3DFF8F"); gr.addColorStop(1, "#0F7A40"); g.fillStyle = gr;
        for (let j = 0; j < n; j++) {
          const m = 0.4 + 0.6 * Math.abs(Math.sin(tt * 3 + j * 0.8)), h = Math.max(8, 8 + 32 * env * m) * s, x = x0 + j * (bw + gap), y = (H - h) / 2;
          g.beginPath(); g.roundRect ? g.roundRect(x, y, bw, h, bw / 2) : g.rect(x, y, bw, h); g.fill();
        }
        raf = live || env > 0.01 ? requestAnimationFrame(draw) : 0;
      };
      const kick = () => { if (!raf) { lastT = performance.now() / 1000; raf = requestAnimationFrame(draw); } };
      const stop = () => {
        if (!live) return; live = false; clearTimeout(timer); target = 0;
        pill.classList.remove("txt"); pill.classList.add("note"); pillTxt.textContent = "Inserted";
        phase("done"); t.textContent = full; t.parentNode.classList.remove("waiting");
        resetT = setTimeout(() => { phase("idle"); pill.classList.remove("note"); pillTxt.textContent = "Listening"; }, 1400);
      };
      const start = (auto) => {
        clearTimeout(timer); clearTimeout(resetT); live = true; i = 0; ptx.textContent = "";
        pill.classList.remove("txt", "note"); phase("listening"); env = 0; target = 0.55; kick();
        t.textContent = ""; t.parentNode.classList.add("waiting");
        const step = () => {
          if (!live) return;
          if (i < words.length) {
            target = 0.45 + Math.random() * 0.5;
            setTimeout(() => { if (live) target = 0.15 + Math.random() * 0.2; }, 120);
            if (i > 1) { ptx.textContent += (ptx.textContent ? " " : "") + words[i - 2]; pill.classList.add("txt"); }
            i++; timer = setTimeout(step, 150 + Math.random() * 110);
          } else { ptx.textContent = full; if (auto) timer = setTimeout(stop, 500); }
        };
        timer = setTimeout(step, 380);
      };
      cleanups.push(() => { live = false; clearTimeout(timer); clearTimeout(resetT); cancelAnimationFrame(raf); t.textContent = full; t.parentNode.classList.remove("waiting"); phase("idle"); pill.classList.remove("txt", "note"); });

      if (reduce) {
        on(pill, "click", () => { phase("done"); pill.classList.add("note"); pillTxt.textContent = "Inserted"; resetT = setTimeout(() => phase("idle"), 1400); });
      } else {
        on(pill, "pointerdown", (e) => { e.preventDefault(); start(false); });
        ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => on(pill, ev, stop));
        on(pill, "keydown", (e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(false); } });
        on(pill, "keyup", (e) => { if (e.key === " " || e.key === "Enter") stop(); });
        let seen = false;
        watch(new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !seen) { seen = true; timer = setTimeout(() => start(true), 500); } }), { threshold: 0.6 })).observe(st);
        on(st, "pointermove", (e) => {
          if (e.target.closest(".pill")) return;
          const r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          win.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-2px)`;
        });
        on(st, "pointerleave", () => { win.style.transform = ""; });
      }
    }

    // magnetic hero buttons: they lean a few pixels toward the cursor
    if (!reduce && matchMedia("(hover:hover) and (pointer:fine)").matches) {
      document.querySelectorAll(".hero .btn").forEach((b) => {
        on(b, "pointermove", (e) => {
          const r = b.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
          b.style.setProperty("--tx", (x * 0.18).toFixed(1) + "px"); b.style.setProperty("--ty", (y * 0.3).toFixed(1) + "px"); b.classList.add("mag");
        });
        on(b, "pointerleave", () => { b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); b.classList.remove("mag"); });
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
