import { Lang } from "./translation";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppDataState {
  midiDevice: [WebMidi.MIDIInput | null, StateSetter<WebMidi.MIDIInput | null>];
  midiDeviceModel: [MidiDeviceModel, StateSetter<MidiDeviceModel>];
  audioOutDevice: [AudioOutDevice | null, StateSetter<AudioOutDevice | null>];
  lang: [Lang, StateSetter<Lang>];
  saveDir: [string, StateSetter<string>];
  importDir: [string, StateSetter<string>];
  settingsOpen: [boolean, StateSetter<boolean>];
  newInstrumentOpen: [boolean, StateSetter<boolean>];
  closeConfirm: [CloseConfirm, StateSetter<CloseConfirm>];
  instruments: [Instrument[], StateSetter<Instrument[]>];
  pads: [Pad[], StateSetter<Pad[]>];
  currentTabId: [number, StateSetter<number>];
  mode: [Mode, StateSetter<Mode>];
  openInstrument: (props: { dialogTitle: string; buttonLabel: string }) => Promise<void>;
  saveInstruments: (ids: number[]) => Promise<void>;
  updateInstrument: (newVersion: Instrument) => void;
  closeInstrument: (id: number, savedCheck?: boolean) => void;
  importSamples: (props: { instrument: Instrument; dialogTitle: string; buttonLabel: string }) => Promise<void>;
  attachSample: (props: AttachSamplesProps) => void;
  detachSample: (props: AttachSamplesProps) => void;
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
  signal: HTMLAudioElement;
}

export interface Pad {
  id: number;
  label: string;
  affectedSamples: number[];  
}

export interface Mapping {
  device: MidiDeviceName;
  pads: {
    id: number;
    samples: number[];
  }[];
}

export interface CloseConfirm {
  ids: number[];
  actionType: 'close' | 'quit' | null;
}

export type Mode = 'edition' | 'play';
export type Axis = 'x' | 'y' | undefined;

export interface AttachSamplesProps {
  instrument: Instrument;
  pad: Pad;
  sampleId: number;
  deviceName: MidiDeviceName;
}
