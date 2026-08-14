'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dict } from './dictionary';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('kisanmitra-lang');
    if (savedLang === 'en' || savedLang === 'mr') {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'mr' : 'en';
    setLang(newLang);
    localStorage.setItem('kisanmitra-lang', newLang);
  };

  // Translation function
  const t = (key, variables = {}) => {
    let text = dict[lang][key];
    if (!text) return key; // fallback to key name if missing

    // Replace variables e.g. {price} with actual values
    Object.keys(variables).forEach((v) => {
      text = text.replace(`{${v}}`, variables[v]);
    });

    return text;
  };

  // We remove the !mounted block to ensure the server actually renders the application HTML for SEO.
  // The language will smoothly transition on the client if they have Marathi saved in localStorage.

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
