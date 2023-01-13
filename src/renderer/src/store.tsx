/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useState } from 'react';
import { Lang } from './types/translation';
import { AppDataState, AttachSamplesProps, AudioOutDevice, CloseConfirm, Instrument, MidiDeviceModel, Mode, Pad } from './types/types';
import { audioPlayer } from './utils/audio';

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

  const lang = useState<Lang>((localStorage.getItem('lang') as Lang) || 'en');

  const saveDir = useState('');
  const [_saveDir] = saveDir;

  const importDir = useState('');
  const [_importDir, _setImportDir] = importDir;

  const openInstrument = async ({ buttonLabel, dialogTitle }: { dialogTitle: string; buttonLabel: string }) => {
    const { data } = await window.api.openInstrument({ defaultPath: _saveDir, buttonLabel, dialogTitle });
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
            samples: data.samples.map((newSample) => ({
              ...newSample,
              signal: audioPlayer.makeSource(`${data.path}/samples/${newSample.filename}`),
            })),
          },
        ]);
        _setCurrentTabId(data.id);
      }
    }
  };

  const saveInstruments = async (ids: number[]) => {
    const updates = _instruments
      .filter(({ id, saved }) => ids.includes(id) && !saved)
      .map(({ saved, ...instrument }) => ({
        ...instrument,
        samples: instrument.samples.map(({ signal, ...sample }) => sample),
      }));
    for (const update of updates) {
      await window.api.writeInstrument(update);
    }
    _setInstruments(_instruments.map((instrument) => (ids.includes(instrument.id) ? { ...instrument, saved: true } : instrument)));
  };

  const updateInstrument = (newVersion: Instrument) => {
    _setInstruments(_instruments.map((instrument) => (instrument.id === newVersion.id ? newVersion : instrument)));
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

  const importSamples = async ({ instrument, buttonLabel, dialogTitle }: { instrument: Instrument; dialogTitle: string; buttonLabel: string }) => {
    const { data } = await window.api.importSamples({ defaultPath: _importDir, copyPath: `${instrument.path}/samples`, buttonLabel, dialogTitle });
    if (data) {
      if (data[0].directory) _setImportDir(data[0].directory);

      const update: Instrument = {
        ...instrument,
        samples: [
          ...instrument.samples,
          ...data.map((newSample) => ({
            ...newSample,
            signal: audioPlayer.makeSource(`${instrument.path}/samples/${newSample.filename}`),
          })),
        ],
        saved: false,
      };
      updateInstrument(update);
    }
  };

  const attachSample = ({ deviceName, instrument, pad, sampleId }: AttachSamplesProps) => {
    if (!pad.affectedSamples.includes(sampleId)) {
      const padCopy = { ...pad };
      padCopy.affectedSamples.push(sampleId);
      _setPads([..._pads.map((item) => (item.id === padCopy.id ? padCopy : item))]);
      const foundMapping = instrument.mappings.find(({ device }) => device === deviceName);
      if (foundMapping) {
        updateInstrument({
          ...instrument,
          mappings: instrument.mappings.map((mapping) => (mapping.device === foundMapping.device ? foundMapping : mapping)),
          saved: false,
        });
      }
    }
  };

  const detachSample = ({ deviceName, instrument, pad, sampleId }: AttachSamplesProps) => {
    const padCopy: Pad = {
      ...pad,
      affectedSamples: pad.affectedSamples.filter((id) => id !== sampleId),
    };
    _setPads([..._pads.map((item) => (item.id === padCopy.id ? padCopy : item))]);
    const foundMapping = instrument.mappings.find(({ device }) => device === deviceName);
    if (foundMapping) {
      foundMapping.pads = foundMapping.pads.map(({ id, samples }) => ({
        id,
        samples: id === padCopy.id ? samples.filter((id) => id !== sampleId) : samples,
      }));
      updateInstrument({
        ...instrument,
        mappings: instrument.mappings.map((mapping) => (mapping.device === foundMapping.device ? foundMapping : mapping)),
        saved: false,
      });
    }
  };

  return (
    <AppData.Provider
      value={{
        midiDevice,
        midiDeviceModel,
        audioOutDevice,
        lang,
        saveDir,
        importDir,
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
        attachSample,
        detachSample,
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export default Store;
