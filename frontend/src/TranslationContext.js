// src/TranslationContext.js
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <TranslationContext.Provider value={{ t, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  return useContext(TranslationContext);
};
