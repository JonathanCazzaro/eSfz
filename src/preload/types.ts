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

export interface Mapping {
  padId: number;
  samplesIds: number[];
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
