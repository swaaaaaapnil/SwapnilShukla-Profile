"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debug: remove after it works
  useEffect(() => {
    console.log("Analytics mounted. GA_ID =", GA_ID);
  }, [GA_ID]);

  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams.size ? `?${searchParams}` : "");
    // Will run after scripts attach window.gtag
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
          console.log('GA script loaded with ID ${GA_ID}');
        `}
      </Script>
    </>
  );
}