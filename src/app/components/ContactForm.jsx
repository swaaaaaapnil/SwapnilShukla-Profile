"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meolvwdg";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    if (!endpoint.startsWith("https://formspree.io/f/")) {
      setError("Form endpoint missing.");
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed.");
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setError(err.message || "Error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      {/* Honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-purple-200">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg bg-black/40 border border-purple-600/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none px-4 py-3 text-sm text-white"
          placeholder="recruiter@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-purple-200">
          Phone / WhatsApp (optional)
        </label>
        <input
          id="phone"
            name="phone"
            type="text"
            className="w-full rounded-lg bg-black/40 border border-purple-600/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none px-4 py-3 text-sm text-white"
            placeholder="+91XXXXXXXXXX"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-purple-200">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-lg bg-black/40 border border-purple-600/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none px-4 py-3 text-sm text-white resize-y"
          placeholder="Write your message..."
        />
      </div>

      {/* Optional subject / metadata */}
      <input type="hidden" name="_subject" value="Portfolio Contact" />
      <input type="hidden" name="_gotcha" style={{ display: "none" }} />

      <div className="flex items-center gap-4">
        <button
          disabled={status === "sending"}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <span className="text-green-400 text-sm">Sent.</span>}
        {status === "error" && <span className="text-red-400 text-sm">{error}</span>}
      </div>

      <p className="text-xs text-purple-300/50">
        Have a role, idea, or challenge? Drop it here—I'll reply fast.
      </p>
    </form>
  );
}