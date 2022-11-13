export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppDataState {
  midiDevice: [WebMidi.MIDIInput | null, StateSetter<WebMidi.MIDIInput | null>];
  midiDeviceModel: [MidiDeviceModel, StateSetter<MidiDeviceModel>];
  audioOutDevice: [AudioOutDevice | null, StateSetter<AudioOutDevice | null>];
  saveDir: [string, StateSetter<string>];
  settingsOpen: [boolean, StateSetter<boolean>];
  newInstrumentOpen: [boolean, StateSetter<boolean>];
  closeConfirm: [CloseConfirm, StateSetter<CloseConfirm>];
  instruments: [Instrument[], StateSetter<Instrument[]>];
  currentTabId: [number, StateSetter<number>];
  mode: [Mode, StateSetter<Mode>];
  openInstrument: () => Promise<void>;
  saveInstruments: (ids: number[]) => Promise<void>;
  updateInstrument: (newVersion: Instrument) => void;
  closeInstrument: (id: number, savedCheck?: boolean) => void;
  importSamples: (instrument: Instrument) => Promise<void>;
}

export interface AudioOutDevice {
  id: string;
  name: string;
}

export type MidiDeviceName = 'nanoPAD2';

export interface MidiDeviceModel {
  name: MidiDeviceName | undefined;
  noteRange: [number, number];
}

export interface Instrument {
  id: number;
  name: string;
  author: string;
  path: string;
  currentMapping?: number;
  samples: Sample[];
  mappings: Mapping[];
  saved?: boolean;
}

export interface Sample {
  id: number;
  name: string;
  filename: string;  
}

export interface Mapping {
  noteId: number;
  samplesIds: number[];
}

export interface CloseConfirm {
  ids: number[];
  actionType: 'close' | 'quit' | null;
}

export type Mode = "edition" | "play";
