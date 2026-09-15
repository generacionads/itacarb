"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
  type ConsentValue,
} from "@/components/ui/CookieConsent";

const GTM_ID = "GTM-548BJK87";

export function GoogleTagManager() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(getStoredConsent() === "accepted");

    function handleConsentChange(e: Event) {
      const detail = (e as CustomEvent<ConsentValue>).detail;
      setAccepted(detail === "accepted");
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
  }, []);

  if (!accepted) return null;

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  );
}
