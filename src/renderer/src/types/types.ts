type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppDataState {
  midiDevice: [WebMidi.MIDIInput | null, StateSetter<WebMidi.MIDIInput | null>];
  audioOutDevice: [AudioOutDevice | null, StateSetter<AudioOutDevice | null>];
  welcomeScreen: [boolean, StateSetter<boolean>];
  saveDir: [string, StateSetter<string>];
}

export interface AudioOutDevice {
  id: string;
  name: string;
}

