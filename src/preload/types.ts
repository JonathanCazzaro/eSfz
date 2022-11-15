export interface Instrument {
  id: number;
  name: string;
  author: string;
  path: string;
  samples: Sample[];
  mappings: Mapping[];
  currentMapping?: number;
  saved?: boolean;
}

export interface Sample {
  id: number;
  name: string;
  filename: string;
}

export type MidiDeviceName = 'nanoPAD2';

export interface Mapping {
  device: MidiDeviceName;
  pads: {
    id: number;
    samples: number[];
  }[];
}

export interface Platform {
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}
