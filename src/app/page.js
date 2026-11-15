import Interactions from "./components/Interactions";
import SandWordmark from "./components/SandWordmark";
import ContactForm from "./components/ContactForm";

const EMAIL = "swapnilshukla470@gmail.com";
const GITHUB = "https://github.com/swaaaaaapnil";
const LINKEDIN = "https://www.linkedin.com/in/swapnil--shukla/";
const RESUME = "https://drive.google.com/file/d/1ix_odvRK7bSzrxeje-gBusr-4nX6MA3d/view?usp=sharing";
const FINORA = "https://finora-phi.vercel.app";
const SKYLYNX = "https://skylynx.vercel.app";
const SKETCHPAD = "https://sketchpad-blond.vercel.app";
const HABITQUEST =
  "https://www.figma.com/proto/bC93EGAXwyHI1L9cNbhRD1/high-fidelity?node-id=1-1380&t=0Rl73OqCYYl3zVoY-1&starting-point-node-id=102%3A10281";

const ext = { target: "_blank", rel: "noopener" };

const experience = [
  ["May 2026 —", "UnifyApps", "Forward deployed engineer. AI pipelines for 5+ enterprise clients in the UAE; invoice processing down to under 30 seconds, 40% faster end to end.", true],
  ["Jan — May 2026", "Genpact", "Intern."],
  ["May — Jun 2025", "DA-IICT", "Research intern. Approximation algorithms for geometric hitting sets."],
  ["Dec 2023 — Jan 2024", "Maitri Manthan", "Intern."],
  ["2022 — 2026", "DA-IICT, Gandhinagar", "B.Tech, Information and Communication Technology."],
];

const stack = [
  ["Languages", "TypeScript, Python, C++, SQL"],
  ["Web", "Next.js, React, Tailwind, Prisma, Supabase"],
  ["AI", "LLM pipelines, document extraction, on-device speech"],
  ["Infra", "Vercel, Inngest, Clerk, Arcjet"],
];

function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="top" id="top">
        <div className="wrap">
          <a className="mark" href="#home" aria-label="Swapnil Shukla, back to top">Swapnil Shukla</a>
          <nav id="nav">
            <span className="ind" id="ind"></span>
            <a href="#work" data-s="work">Work</a>
            <a href="#experience" data-s="experience">Experience</a>
            <a href="#about" data-s="about">About</a>
            <a href="#contact" data-s="contact">Contact</a>
          </nav>
          <div className="tools">
            <span className="clock" id="clock">IST</span>
            <button className="ic" id="kbtn" aria-label="Open command menu"><kbd>⌘K</kbd></button>
            <button className="ic" id="theme" aria-label="Toggle theme">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>
            </button>
          </div>
        </div>
        <div className="prog" id="prog"></div>
      </header>

      <main id="home">
        {/* HERO */}
        <section className="hero wrap">
          <div className="status rv"><b></b>Forward deployed engineer at UnifyApps</div>
          <h1 className="hl">
            <span className="nm split">Swapnil Shukla.</span>
            <br />
            <span className="ty" id="ty">
              <span className="typed" id="typed">I build AI that enterprise teams actually use.</span>
              <span className="tcaret" aria-hidden="true"></span>
              <span className="ghost" id="ghost" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="bio rv">
            I work with enterprise clients in the UAE, taking their messy, manual workflows and turning them into AI pipelines that run in production. On the side I made <a href="#work">Murmur</a>, offline push-to-talk dictation for Mac and Windows. Recently graduated from DA-IICT (B.Tech ICT).
          </p>
          <div className="links rv">
            <a className="btn primary" href="#contact">Get in touch</a>
            <a className="btn" href={GITHUB} {...ext}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
              GitHub
            </a>
            <a className="btn" href={LINKEDIN} {...ext}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
              LinkedIn
            </a>
            <a className="btn" href={RESUME} {...ext} aria-label="Resume (opens in a new tab)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" /></svg>
              Resume
            </a>
          </div>
        </section>

        {/* WORK */}
        <section className="wide" id="work">
          <div className="wrap label rv"><span>Selected work</span><span>2024 — now</span></div>

          <article className="feature rv">
            <div className="stage" id="murmurStage">
              <div className="desk"></div>
              <div className="win" aria-hidden="true">
                <div className="bar"><i></i><i></i><i></i><span>Notes — standup.md</span></div>
                <div className="doc">
                  <span id="mtext">Shipped the invoice parser for the Dubai client. Next up is retries on the OCR step, then a demo on Thursday.</span>
                  <span className="caret"></span>
                </div>
              </div>
              <button className="pill" id="pill" data-phase="idle" aria-label="Hold to try the Murmur dictation demo">
                <span className="idle"></span>
                <span className="hint">hold to talk</span>
                <span className="pcard" aria-hidden="true">
                  <canvas className="orb" id="orb" width="132" height="84"></canvas>
                  <svg className="check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#3DFF8F" /><path d="M7 12.4l3.2 3.1L17 8.8" fill="none" stroke="#0B0F0D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="lbl" id="pillTxt">Listening</span>
                  <span className="ptx"><span id="ptx"></span></span>
                </span>
              </button>
            </div>
            <div className="body">
              <div className="row"><h3>Murmur</h3><span className="meta">macOS · Windows · 2026</span></div>
              <p>Push-to-talk dictation that runs entirely on your machine. Hold a key, speak, and clean text lands in whatever app you&apos;re in. The speech model runs locally, so nothing you say ever leaves the laptop.</p>
              <div className="stats">
                <div><b>0</b><span>servers</span></div>
                <div><b>0</b><span>accounts</span></div>
                <div><b>0</b><span>recordings kept</span></div>
              </div>
              <div className="row">
                <Tags items={["on-device ASR", "native hotkeys", "cross-platform"]} />
                <a className="more" href="https://murmur-talk.vercel.app" {...ext}>murmur-talk.vercel.app <span className="arr">↗</span></a>
              </div>
            </div>
          </article>

          <div className="grid">
            <a className="card rv" href={FINORA} {...ext}>
              <div className="viz">
                <div className="fin" aria-hidden="true">
                  <div className="k">This month<b>₹ 42,380</b></div>
                  <div className="bars">
                    {[40, 62, 48, 80, 55, 92, 60].map((h, i) => (
                      <i key={i} className={i === 5 ? "h" : undefined} style={{ height: `${h}%` }}></i>
                    ))}
                  </div>
                </div>
              </div>
              <div className="txt">
                <div className="row"><h3>Finora</h3><span className="yr">2025</span></div>
                <p>Personal finance app. Snap a receipt and Gemini turns it into a transaction. Auth, rate limiting and background jobs done properly.</p>
                <Tags items={["Next.js", "Prisma", "Supabase", "Clerk", "Inngest"]} />
              </div>
            </a>

            <a className="card rv" href={SKYLYNX} {...ext}>
              <div className="viz">
                <div className="sky" aria-hidden="true">
                  <div className="rt">
                    <span><b>BOM</b>Mumbai</span>
                    <svg viewBox="0 0 120 40"><path className="arc" d="M6 34 Q60 -6 114 34" /><circle className="pl" r="3.2"><animateMotion dur="3.2s" repeatCount="indefinite" path="M6 34 Q60 -6 114 34" /></circle></svg>
                    <span className="r"><b>DXB</b>Dubai</span>
                  </div>
                  <div className="mt"><span>SL 204</span><span>3h 05m</span><span>Seat 14A</span></div>
                </div>
              </div>
              <div className="txt">
                <div className="row"><h3>Skylynx</h3><span className="yr">web app</span></div>
                <p>Flight booking, end to end: search a route, pick a seat, confirm. Tested against 1,000+ mock reservations, with a lean Express API behind a responsive React front end.</p>
                <Tags items={["React", "Node.js", "Express", "MongoDB", "Tailwind"]} />
              </div>
            </a>

            <a className="card rv" href={SKETCHPAD} {...ext}>
              <div className="viz">
                <svg className="sk" viewBox="0 0 240 130" aria-hidden="true">
                  <g className="ink">
                    <path pathLength="1" style={{ "--d": "0s" }} d="M26 38 C50 35 74 34 98 36 C99 52 98 70 99 88 C76 90 50 89 28 90 C27 72 27 55 26 38" />
                    <path pathLength="1" style={{ "--d": ".08s" }} d="M29 35 C54 37 76 36 96 39 C96 56 97 72 96 91 C72 87 48 92 25 87 C26 70 28 52 29 35" />
                    <path pathLength="1" style={{ "--d": ".5s" }} d="M40 54 C48 50 54 58 62 53 S76 52 84 55" />
                    <path pathLength="1" style={{ "--d": ".62s" }} d="M40 70 C50 67 58 73 70 69" />
                  </g>
                  <g className="arr">
                    <path pathLength="1" style={{ "--d": ".8s" }} d="M106 63 C120 55 132 70 146 61" />
                    <path pathLength="1" style={{ "--d": "1.05s" }} d="M137 54 L147 61 L138 68" />
                  </g>
                  <g className="acc">
                    <ellipse pathLength="1" style={{ "--d": "1.15s" }} cx="186" cy="62" rx="34" ry="25" transform="rotate(-4 186 62)" />
                    <ellipse pathLength="1" style={{ "--d": "1.25s" }} cx="187" cy="61" rx="32" ry="27" transform="rotate(5 187 61)" />
                    <path pathLength="1" style={{ "--d": "1.6s" }} d="M172 63 L182 72 L201 51" />
                  </g>
                </svg>
              </div>
              <div className="txt">
                <div className="row"><h3>Sketchpad</h3><span className="yr">2026</span></div>
                <p>A whiteboard where everything looks hand-drawn. Infinite canvas, autosave with Supabase sync, and an AI panel that sketches a first draft of a diagram from one sentence, using your own key.</p>
                <Tags items={["React", "roughjs", "Supabase", "BYOK AI"]} />
              </div>
            </a>

            <a className="card rv" href={HABITQUEST} {...ext}>
              <div className="viz">
                <div className="hq" aria-hidden="true">
                  <div className="lv"><b>Lv 7</b><span className="xp"><i></i></span><em>640 xp</em></div>
                  <ul>
                    <li className="done"><s></s>Read 20 min<span>12d</span></li>
                    <li className="done"><s></s>Morning run<span>5d</span></li>
                    <li className="tick"><s></s>No phone after 11<span>2d</span></li>
                  </ul>
                </div>
              </div>
              <div className="txt">
                <div className="row"><h3>HabitQuest</h3><span className="yr">prototype</span></div>
                <p>A habit tracker that plays like a game, with streaks, XP and levels for the habits you keep. Designed end to end as a high-fidelity Figma prototype.</p>
                <Tags items={["UI/UX", "Figma", "Prototyping"]} />
              </div>
            </a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="wrap" id="experience">
          <div className="label rv"><span>Experience</span></div>
          <div className="exp">
            {experience.map(([d, org, role, now]) => (
              <div className="r rv" key={org + d}>
                <span className="d">{d}</span>
                <span className="t"><b>{org}</b><span>{role}</span></span>
                {now ? <span className="now">now</span> : <span></span>}
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="wrap" id="about">
          <div className="label rv"><span>About</span></div>
          <div className="about">
            <p className="rv">I grew up in Doha and went to school at DPS-MIS, then moved to India for engineering. I like the part of the job where you sit with the people who&apos;ll use the thing, find out what&apos;s actually slow, and fix that.</p>
            <p className="rv">Outside work: sport, and a gold in the English Olympiad that I still bring up more than I should.</p>
            <dl className="stack rv">
              {stack.map(([k, v]) => [
                <dt key={k + "t"}>{k}</dt>,
                <dd key={k + "d"}>
                  {v.split(", ").map((s, i) => (
                    <span key={s} style={{ transitionDelay: `${150 + i * 60}ms` }}>{s}</span>
                  ))}
                </dd>,
              ])}
            </dl>
          </div>
        </section>

        {/* CONTACT */}
        <section className="wrap contact" id="contact">
          <div className="label rv"><span>Contact</span></div>
          <h2 className="rv">Building something with AI that has to work in the real world? <span>Let&apos;s talk.</span></h2>
          <div className="rv">
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL} <span className="arr">↗</span></a>
            <button className="copy" id="copy">copy</button>
          </div>
          <div className="or rv"><span>or leave a note here</span></div>
          <ContactForm email={EMAIL} />
          <SandWordmark text="Swapnil Shukla" />
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 Swapnil Shukla</span>
          <span>
            <a href={GITHUB} {...ext}>GitHub</a> · <a href={LINKEDIN} {...ext}>LinkedIn</a> · <a href="#home">Top ↑</a>
          </span>
        </div>
      </footer>

      <div className="cmd" id="cmd" role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="box">
          <input id="cq" placeholder="Jump to…" autoComplete="off" aria-label="Search commands" />
          <ul id="cl"></ul>
          <div className="foot"><span>↑↓ move</span><span>↵ open</span><span>esc close</span></div>
        </div>
      </div>
      <div className="toast" id="toast"></div>

      <Interactions />
    </>
  );
}
