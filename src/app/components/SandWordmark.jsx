"use client";

import { useEffect, useRef } from "react";

// Footer wordmark made of fine titanium grains: a slow sheen sweeps across and loose dust
// drifts off up-right. Plain text stays underneath, so it still reads if canvas is unavailable.
export default function SandWordmark({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const cv = document.createElement("canvas");
    const ctx = cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    box.appendChild(cv);
    box.classList.add("sand");

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDark = () => {
      const t = document.documentElement.dataset.theme;
      return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    };

    let W = 0, H = 0, dpr = 1, img, px;
    let N = 0, hx, hy, xn, shade; // settled grains
    let M = 0, dx, dy, dph, dsp, dsd; // loose dust grains
    let base = [168, 158, 142], hi = [244, 238, 228], fsz = 90, family = "sans-serif";
    let visible = false, raf = 0, gust = 0, gustTo = 0, last = 0, clock = 0, dead = false;

    function theme() {
      if (isDark()) { base = [172, 163, 149]; hi = [248, 243, 235]; }
      else { base = [92, 86, 77]; hi = [196, 178, 150]; }
      if (!raf) draw(clock);
    }

    function build() {
      const cr = cv.getBoundingClientRect(), br = box.getBoundingClientRect();
      if (!cr.width || !cr.height) return;
      dpr = Math.min(2, devicePixelRatio || 1);
      W = Math.round(cr.width * dpr); H = Math.round(cr.height * dpr);
      cv.width = W; cv.height = H;
      img = ctx.createImageData(W, H); px = new Uint32Array(img.data.buffer);

      const cs = getComputedStyle(box);
      fsz = parseFloat(cs.fontSize) * dpr;
      const o = document.createElement("canvas"); o.width = W; o.height = H;
      const x = o.getContext("2d", { willReadFrequently: true });
      x.font = `600 ${fsz}px ${family}`;
      if ("letterSpacing" in x) x.letterSpacing = (-0.05 * fsz).toFixed(2) + "px";
      x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#fff";
      const label = box.textContent.trim();
      const cx = (br.left - cr.left + br.width / 2) * dpr, cy = (br.top - cr.top + br.height / 2) * dpr;
      x.fillText(label, cx, cy + fsz * 0.04);
      const tw = x.measureText(label).width, left = cx - tw / 2;
      const d = x.getImageData(0, 0, W, H).data;

      const sx = [], sy = [], lx = [], ly = [];
      const keep = dpr > 1.5 ? 0.62 : 0.86;
      for (let y = 0; y < H; y++) for (let i = 0; i < W; i++) {
        if (d[(y * W + i) * 4 + 3] < 110) continue;
        const u = (i - left) / tw; // looser toward the right, as if wind comes from the left
        const r = Math.max(0, Math.min(1, (u - 0.3) / 0.7)) ** 1.5;
        if (Math.random() < keep * (1 - 0.4 * r * r)) { sx.push(i); sy.push(y); }
        if (Math.random() < 0.02 + 0.26 * r) { lx.push(i); ly.push(y); }
      }
      N = sx.length; hx = new Uint16Array(sx); hy = new Uint16Array(sy);
      xn = new Float32Array(N); shade = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        xn[i] = (hx[i] - left) / tw + ((hy[i] - cy) / fsz) * 0.35; // diagonal coordinate for the sheen
        const r = Math.random();
        shade[i] = 0.35 + 0.75 * r * r + (Math.random() < 0.03 ? 0.5 : 0);
      }
      M = lx.length; dx = new Float32Array(lx); dy = new Float32Array(ly);
      dph = new Float32Array(M); dsp = new Float32Array(M); dsd = new Float32Array(M);
      for (let i = 0; i < M; i++) { dph[i] = Math.random(); dsp[i] = 1 / (6000 + Math.random() * 7000); dsd[i] = Math.random() * 6.283; }
      draw(clock);
    }

    function put(i, s, a) {
      const t = s > 1 ? Math.min(1, s - 1) : 0, k = s > 1 ? 1 : s;
      const r = (base[0] * k + (hi[0] - base[0]) * t) | 0, g = (base[1] * k + (hi[1] - base[1]) * t) | 0, b = (base[2] * k + (hi[2] - base[2]) * t) | 0;
      px[i] = ((a * 255) << 24) | (b << 16) | (g << 8) | r;
    }

    function draw(t) {
      if (!W || !N) return;
      px.fill(0);
      const sw = ((t * 0.00006) % 1.9) - 0.45;
      const glow = 0.55 + gust * 0.5;
      for (let i = 0; i < N; i++) {
        const q = xn[i] - sw, band = 1 / (1 + q * q * 90);
        put(hy[i] * W + hx[i], shade[i] * (1 + band * glow * 1.6 + gust * 0.12), 1);
      }
      const sc = fsz / 90, speed = 1 + gust * 0.9;
      for (let i = 0; i < M; i++) {
        const p = still ? dph[i] : (dph[i] + t * dsp[i] * speed) % 1;
        const s = dsd[i];
        const x = dx[i] + (p * 120 + p * p * 300) * sc + Math.sin(p * 5 + s) * 14 * sc;
        const y = dy[i] - (p * 50 + p * p * 120) * sc + Math.cos(p * 4 + s * 1.3) * 9 * sc;
        const xi = x | 0, yi = y | 0;
        if (xi < 0 || yi < 0 || xi >= W || yi >= H) continue;
        const a = Math.min(1, p * 10) * (1 - p) ** 1.2;
        if (a < 0.02) continue;
        put(yi * W + xi, 0.7 + (s % 1) * 0.7, a);
      }
      ctx.putImageData(img, 0, 0);
    }

    function loop(now) {
      raf = 0;
      if (!visible || dead) return;
      const dt = last ? Math.min(64, now - last) : 16; last = now;
      gust += (gustTo - gust) * Math.min(1, dt / 500);
      clock += dt;
      draw(clock);
      raf = requestAnimationFrame(loop);
    }
    const kick = () => { if (!raf && visible && !still) { last = 0; raf = requestAnimationFrame(loop); } };

    const onEnter = () => { gustTo = 1; };
    const onLeave = () => { gustTo = 0; };
    box.addEventListener("pointerenter", onEnter);
    box.addEventListener("pointerleave", onLeave);

    // fade the name up as you reach the end of the page
    const fade = () => {
      if (still) return;
      const r = box.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.7)));
      box.style.opacity = (0.35 + p * 0.65).toFixed(2);
    };
    addEventListener("scroll", fade, { passive: true }); fade();

    let io, ro, mo, rt;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    family = getComputedStyle(box).fontFamily || "sans-serif";
    const first = family.split(",")[0].trim();
    Promise.race([document.fonts.load(`600 64px ${first}`), new Promise((r) => setTimeout(r, 1800))]).then(() => {
      if (dead) return;
      theme(); build();
      io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) kick(); else { cancelAnimationFrame(raf); raf = 0; } }, { rootMargin: "80px 0px" });
      io.observe(box);
      ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(build, 150); });
      ro.observe(box);
      mq.addEventListener("change", theme);
      mo = new MutationObserver(theme);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf); clearTimeout(rt);
      io && io.disconnect(); ro && ro.disconnect(); mo && mo.disconnect();
      mq.removeEventListener("change", theme);
      removeEventListener("scroll", fade);
      box.removeEventListener("pointerenter", onEnter);
      box.removeEventListener("pointerleave", onLeave);
      box.classList.remove("sand"); cv.remove();
    };
  }, []);

  return (
    <div className="big" aria-hidden="true" id="big" ref={ref}>
      {text}
    </div>
  );
}
