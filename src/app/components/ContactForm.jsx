"use client";

import { useEffect, useRef, useState } from "react";

// Posts to Formspree, which forwards each note to the inbox. The endpoint can be overridden
// with NEXT_PUBLIC_FORMSPREE_ENDPOINT; the fallback is the form the site has always used.
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meolvwdg";
const BASE_HINT = "Goes straight to my inbox. I usually reply within a day.";

export default function ContactForm({ email }) {
  const formRef = useRef(null);
  const resetTimer = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | invalid
  const [hint, setHint] = useState(BASE_HINT);
  const [bad, setBad] = useState({});

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const check = (el) => {
    const ok = el.checkValidity();
    setBad((b) => (b[el.name] === !ok ? b : { ...b, [el.name]: !ok }));
    return ok;
  };
  const onBlur = (e) => { if (e.target.value) check(e.target); };
  const onInput = (e) => { if (bad[e.target.name]) check(e.target); };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); formRef.current.requestSubmit(); }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const f = formRef.current;
    const invalid = [...f.querySelectorAll("[required]")].filter((el) => !check(el));
    if (invalid.length) {
      invalid[0].focus();
      setStatus("invalid");
      setHint(invalid[0].type === "email" ? "That email doesn't look right." : "Add a short message first.");
      return;
    }
    setStatus("sending"); setHint("Sending…");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error((d.errors && d.errors.map((x) => x.message).join(", ")) || "Send failed");
      f.reset(); setBad({});
      setStatus("sent"); setHint("Got it, thanks. I'll get back to you soon.");
      resetTimer.current = setTimeout(() => { setStatus("idle"); setHint(BASE_HINT); }, 6000);
    } catch {
      setStatus("error"); setHint(null);
    }
  }

  const label = { sending: "Sending…", sent: "Sent", error: "Try again" }[status] || "Send message";
  const err = status === "error" || status === "invalid";
  const cls = ["note", status === "sending" && "sending", status === "sent" && "sent"].filter(Boolean).join(" ");
  const field = (name) => "f" + (bad[name] ? " bad" : "");

  // the reveal class lives on a wrapper: React re-renders the form class, which would drop "in"
  return (
    <div className="rv">
    <form className={cls} id="note" ref={formRef} action={ENDPOINT} method="POST" noValidate onSubmit={onSubmit} onKeyDown={onKeyDown}>
      <input type="hidden" name="_subject" value="Portfolio Contact" />
      <input type="text" name="_gotcha" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="two">
        <label className={field("email")}>
          <span>Your email</span>
          <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" onBlur={onBlur} onInput={onInput} />
        </label>
        <label className="f">
          <span>Phone / WhatsApp <em>optional</em></span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="+91 98765 43210" />
        </label>
      </div>
      <label className={field("message")}>
        <span>Message</span>
        <textarea name="message" required rows={4} maxLength={2000} placeholder="A role, an idea, a messy workflow you want automated…" onBlur={onBlur} onInput={onInput} />
      </label>
      <div className="foot">
        <p className={"hint" + (err ? " err" : "")} aria-live="polite">
          <i className="dot"></i>
          <span>
            {status === "error" ? (
              <>Couldn&apos;t send just now. <a href={`mailto:${email}`}>Email me directly</a> instead.</>
            ) : (
              hint
            )}
          </span>
        </p>
        <button className="btn primary send" type="submit" disabled={status === "sending" || status === "sent"}>
          <span className="lbl">{label}</span>
          <kbd>⌘↵</kbd>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </button>
      </div>
    </form>
    </div>
  );
}
