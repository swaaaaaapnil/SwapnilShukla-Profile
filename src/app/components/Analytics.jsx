"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Log once (remove later)
  useEffect(() => {
    if (GA_ID) console.log("GA loaded:", GA_ID);
    else console.warn("GA_ID missing");
  }, [GA_ID]);

  // Track route changes
  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams.size ? `?${searchParams}` : "");
    window.gtag?.("config", GA_ID, {
      page_path: url,
      anonymize_ip: true
    });
  }, [GA_ID, pathname, searchParams]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}