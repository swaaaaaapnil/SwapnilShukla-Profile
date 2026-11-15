import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Swapnil Shukla",
  description:
    "Forward deployed engineer at UnifyApps. I build AI that enterprise teams actually use, and made Murmur, offline push-to-talk dictation for Mac and Windows.",
  metadataBase: new URL("https://swapnilshukla.vercel.app"),
  openGraph: {
    title: "Swapnil Shukla",
    description: "I build AI that enterprise teams actually use.",
    url: "https://swapnilshukla.vercel.app",
    siteName: "Swapnil Shukla",
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

// Runs before first paint: turns on the reveal styles and applies a saved theme, so nothing flashes.
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
