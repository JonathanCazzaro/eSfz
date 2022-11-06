import React, { createContext, ReactNode, useState } from 'react';
import { AppDataState, AudioOutDevice, CloseConfirm, Instrument } from './types/types';

export const AppData = createContext<AppDataState | null>(null);

const Store: React.FC<{ children: ReactNode }> = ({ children }) => {
  const midiDevice = useState<WebMidi.MIDIInput | null>(null);
  const audioOutDevice = useState<AudioOutDevice | null>(null);
  const settingsOpen = useState(false);
  const newInstrumentOpen = useState(false);
  const closeConfirm = useState<CloseConfirm>({ actionType: null, ids: [] });
  const [, _setCloseConfirm] = closeConfirm;

  const instruments = useState<Instrument[]>([]);
  const [_instruments, _setInstruments] = instruments;

  const currentTabId = useState<number>(0);
  const [_currentTabId, _setCurrentTabId] = currentTabId;

  const saveDir = useState('');
  const [_saveDir] = saveDir;

  const openInstrument = async () => {
    const { data } = await window.api.openInstrument(_saveDir);
    if (data) {
      const foundInstrument = _instruments.find(({ id }) => id === data.id);
      if (foundInstrument) {
        _setCurrentTabId(foundInstrument.id);
      } else {
        _setInstruments([..._instruments, { ...data, saved: true }]);
        _setCurrentTabId(data.id);
      }
    }
  };

  const saveInstruments = async (ids: number[]) => {
    const updates = _instruments.filter((instrument) => ids.includes(instrument.id));
    for (const update of updates) {
      if (!update.saved) await window.api.writeInstrument(update);
    }
    _setInstruments(
      _instruments.map((instrument) =>
        ids.includes(instrument.id) ? { ...instrument, saved: true } : instrument,
      ),
    );
  };

  const updateInstrument = (newVersion: Instrument) => {
    _setInstruments(
      _instruments.map((instrument) => (instrument.id === newVersion.id ? newVersion : instrument)),
    );
  };

  const closeInstrument = (id: number, savedCheck?: boolean) => {
    if (savedCheck) {
      const foundInstrument = _instruments.find((instrument) => instrument.id === id);
      if (foundInstrument && !foundInstrument.saved) {
        _setCloseConfirm({ actionType: 'close', ids: [id] });
        return;
      }
    }
    let instrumentIndex = 0;
    const update = _instruments.filter((instrument, index) => {
      if (instrument.id !== id) return true;
      else {
        instrumentIndex = index;
        return false;
      }
    });
    _setInstruments(update);
    if (currentTabId && _currentTabId === id) {
      _setCurrentTabId(update.length ? update[instrumentIndex].id : 0);
    }
  };

  return (
    <AppData.Provider
      value={{
        midiDevice,
        audioOutDevice,
        saveDir,
        settingsOpen,
        closeConfirm,
        instruments,
        currentTabId,
        newInstrumentOpen,
        openInstrument,
        saveInstruments,
        updateInstrument,
        closeInstrument,
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export default Store;
