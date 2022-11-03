import React, { createContext, ReactNode, useState } from 'react';
import { AppDataState, AudioOutDevice, Instrument } from './types/types';

export const AppData = createContext<AppDataState | null>(null);

const Store: React.FC<{ children: ReactNode }> = ({ children }) => {
  const midiDevice = useState<WebMidi.MIDIInput | null>(null);
  const audioOutDevice = useState<AudioOutDevice | null>(null);
  const instruments = useState<Instrument[]>([]);
  const currentTab = useState<Instrument | 'welcome-screen'>('welcome-screen');
  const saveDir = useState('');
  const settingsOpen = useState(false);
  const newInstrumentOpen = useState(false);

  return (
    <AppData.Provider
      value={{
        midiDevice,
        audioOutDevice,
        saveDir,
        settingsOpen,
        instruments,
        currentTab,
        newInstrumentOpen,
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export default Store;
