"use client";
import { useState } from "react";
import { sendContact } from "../actions/sendContact";

export default function ContactForm() {
  const [status,setStatus] = useState("idle");
  const [error,setError] = useState("");

  async function action(formData) {
    setStatus("sending");
    setError("");
    const res = await sendContact(formData);
    if (res.ok) {
      setStatus("success");
      setTimeout(()=>setStatus("idle"),3000);
    } else {
      setError(res.error || "Error");
      setStatus("error");
      setTimeout(()=>setStatus("idle"),5000);
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-xl mx-auto">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="space-y-2">
        <label htmlFor="contact" className="text-sm font-medium text-purple-200">Your Email or Phone</label>
        <input
          name="email"              // keep same name so server action still works
          id="contact"
          type="text"               // allow phone numbers (was type="email")
          required
          className="w-full rounded-lg bg-black/40 border border-purple-600/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none px-4 py-3 text-sm text-white"
          placeholder="email@example.com or +91XXXXXXXXXX"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-purple-200">Message</label>
        <textarea name="message" id="message" rows={6} required
          className="w-full rounded-lg bg-black/40 border border-purple-600/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none px-4 py-3 text-sm text-white resize-y"
          placeholder="Write your message..." />
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={status === "sending"}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <span className="text-green-400 text-sm">Sent.</span>}
        {status === "error" && <span className="text-red-400 text-sm">{error}</span>}
      </div>
      <p className="text-xs text-purple-300/50">Have a role, idea, or challenge? Drop it here—I'll reply fast.</p>
    </form>
  );
}