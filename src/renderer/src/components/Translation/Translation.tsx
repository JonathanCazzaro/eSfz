import { TranslationInterface } from '@renderer/types/translation';
import React, { createContext, ReactNode, useContext } from 'react';
import fr_FR from './fr-FR.json';
import en_EN from './en-EN.json';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const version: { fr: TranslationInterface; en: TranslationInterface } = {
  fr: fr_FR,
  en: en_EN,
};

export const TranslationData = createContext<TranslationInterface>(version.en);

const Translation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    lang: [lang],
  } = useContext(AppData) as AppDataState;

  return <TranslationData.Provider value={version[lang]}>{children}</TranslationData.Provider>;
};

export default Translation;
