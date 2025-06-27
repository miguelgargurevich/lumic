"use client";
import React, { useEffect, useState } from "react";

const COOKIE_KEY = "lumic_cookies_accepted";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/95 border border-gray-200 shadow-xl rounded-t-xl px-6 py-4 mb-0 max-w-xl w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-6 animate-fade-in">
        <span className="text-sm text-gray-800 flex-1 text-center sm:text-left">
          Este sitio utiliza cookies para mejorar tu experiencia. Al continuar, aceptas nuestra <a href="/terminos" className="underline text-primary hover:text-primary/80">Política de Cookies</a> y <a href="/terminos" className="underline text-primary hover:text-primary/80">Términos y Condiciones</a>.
        </span>
        <button
          className="mt-2 sm:mt-0 px-5 py-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
          onClick={accept}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
