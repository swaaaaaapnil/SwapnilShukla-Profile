import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Analytics only on client (avoids SSR + 404 prerender error)
const Analytics = dynamic(() => import("./components/Analytics"), { ssr: false });

export const metadata = {
  title: "Swapnil Shukla",
  description: "Portfolio"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
