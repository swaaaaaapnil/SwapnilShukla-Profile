import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "100svh", display: "grid", placeContent: "center", gap: 16, textAlign: "center" }}>
      <p style={{ font: "500 13px var(--mono)", color: "var(--muted)" }}>404</p>
      <h1 style={{ fontSize: "clamp(32px,6vw,56px)", letterSpacing: "-.04em", lineHeight: 1 }}>Page not found</h1>
      <p style={{ color: "var(--muted)" }}>The link may be old, or the page has moved.</p>
      <div><Link className="btn primary" href="/">Back home</Link></div>
    </main>
  );
}
