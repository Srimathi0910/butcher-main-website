"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookieConsent");
      if (consent !== "true") {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowBanner(false)

    // ✅ Load Google Analytics on accept
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-WZY4LS7WL2'
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-WZY4LS7WL2')
  }



  const handleDecline = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed right-6 bottom-6 z-[99] max-w-xs md:max-w-sm bg-main-color text-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 border border-blue-100 animate-fade-in">
      <div className="text-base mb-1">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. <a href="/privacy-policy" className="underline text-blue-200 ml-1">Learn more</a>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleDecline}
          className="bg-white text-main-color cursor-pointer font-bold rounded-lg px-4 py-2 border border-main-color hover:bg-blue-50 transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-main-color/50 cursor-pointer text-white font-bold rounded-lg border border-white px-4 py-2 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
} 