// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import enTranslation from './en/translation.json';
import plTranslation from './pl/translation.json';
import deTranslation from './de/translation.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    pl: {
      translation: plTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
  lng: 'pl', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
