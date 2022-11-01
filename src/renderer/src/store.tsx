import React, { createContext, ReactNode, useState } from 'react';
import { AppDataState, AudioOutDevice } from './types/types';

export const AppData = createContext<AppDataState | null>(null);

const Store: React.FC<{ children: ReactNode }> = ({ children }) => {
  const midiDevice = useState<WebMidi.MIDIInput | null>(null);
  const audioOutDevice = useState<AudioOutDevice | null>(null);
  const welcomeScreen = useState(true);
  const saveDir = useState('');

  return (
    <AppData.Provider value={{ midiDevice, audioOutDevice, welcomeScreen, saveDir }}>
      {children}
    </AppData.Provider>
  );
};

export default Store;
