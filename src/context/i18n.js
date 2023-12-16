import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en.json';
import heTranslation from '../locales/he.json';
 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      En: { translation: enTranslation },
      He: { translation: heTranslation },
    },
    lng: 'En',
    interpolation: {
      escapeValue: false,
    },
  });
  
export default i18n;
