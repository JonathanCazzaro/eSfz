import React, { createContext, ReactNode, useState } from 'react';
import {
  AppDataState,
  AssignSamplesProps,
  AudioOutDevice,
  CloseConfirm,
  Instrument,
  MidiDeviceModel,
  Mode,
  Pad,
} from './types/types';

export const AppData = createContext<AppDataState | null>(null);

const Store: React.FC<{ children: ReactNode }> = ({ children }) => {
  const midiDevice = useState<WebMidi.MIDIInput | null>(null);
  const midiDeviceModel = useState<MidiDeviceModel>({ name: undefined, noteRange: [0, 127] });
  const audioOutDevice = useState<AudioOutDevice | null>(null);

  const mode = useState<Mode>('edition');
  const settingsOpen = useState(false);
  const newInstrumentOpen = useState(false);
  const closeConfirm = useState<CloseConfirm>({ actionType: null, ids: [] });
  const [, _setCloseConfirm] = closeConfirm;

  const instruments = useState<Instrument[]>([]);
  const [_instruments, _setInstruments] = instruments;

  const pads = useState<Pad[]>([]);
  const [_pads, _setPads] = pads;

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
        _setInstruments([
          ..._instruments,
          {
            ...data,
            saved: true,
          },
        ]);
        _setCurrentTabId(data.id);
      }
    }
  };

  const saveInstruments = async (ids: number[]) => {
    const updates = _instruments
      .filter(({ id, saved }) => ids.includes(id) && !saved)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ saved, ...instrument }) => instrument);
    for (const update of updates) {
      await window.api.writeInstrument(update);
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
      _setCurrentTabId(update.length ? update[instrumentIndex - 1].id : 0);
    }
  };

  const importSamples = async (instrument: Instrument) => {
    const { data } = await window.api.importSamples(_saveDir, `${instrument.path}/samples`);
    if (data) {
      const update: Instrument = {
        ...instrument,
        samples: [...instrument.samples, ...data],
        saved: false,
      };
      updateInstrument(update);
    }
  };

  const assignSample = ({ deviceName, instrument, pad, sampleId }: AssignSamplesProps) => {
    if (!pad.affectedSamples.includes(sampleId)) {
      pad.affectedSamples.push(sampleId);
      _setPads([..._pads.map((item) => (item.id === pad.id ? pad : item))]);
      const foundMapping = instrument.mappings.find(({ device }) => device === deviceName);
      if (foundMapping) {
        const newSamples = foundMapping.pads.map(({ id, samples }) => ({
          id,
          samples: id === pad.id ? [...samples, sampleId] : samples,
        }));
        foundMapping.pads = newSamples;
        updateInstrument({
          ...instrument,
          mappings: instrument.mappings.map((mapping) =>
            mapping.device === foundMapping.device ? foundMapping : mapping,
          ),
          saved: false,
        });
      }
    }
  };

  return (
    <AppData.Provider
      value={{
        midiDevice,
        midiDeviceModel,
        audioOutDevice,
        saveDir,
        settingsOpen,
        closeConfirm,
        instruments,
        pads,
        currentTabId,
        newInstrumentOpen,
        mode,
        openInstrument,
        saveInstruments,
        updateInstrument,
        closeInstrument,
        importSamples,
        assignSample,
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export default Store;
