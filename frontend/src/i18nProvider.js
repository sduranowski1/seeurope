// i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import polishMessages from './adminLocales/polishMessages'; // Import Polish translations

const messages = {
    en: englishMessages,
    // fr: frenchMessages,
    pl: polishMessages, // Add Polish translations
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'en'    [
        { locale: 'en', name: 'English' },
        { locale: 'pl', name: 'Polski' }
    ],);

export default i18nProvider;
