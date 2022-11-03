type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppDataState {
  midiDevice: [WebMidi.MIDIInput | null, StateSetter<WebMidi.MIDIInput | null>];
  audioOutDevice: [AudioOutDevice | null, StateSetter<AudioOutDevice | null>];
  saveDir: [string, StateSetter<string>];
  settingsOpen: [boolean, StateSetter<boolean>];
  newInstrumentOpen: [boolean, StateSetter<boolean>];
  instruments: [Instrument[], StateSetter<Instrument[]>];
  currentTab: [Instrument | 'welcome-screen', StateSetter<Instrument | 'welcome-screen'>];
}

export interface AudioOutDevice {
  id: string;
  name: string;
}

export interface Instrument {
  id: number;
  name: string;
  author: string;
  path: string;
  samples: Sample[];
  saved: boolean;
}

export interface Sample {
  id: number;
  filename: string;
}
