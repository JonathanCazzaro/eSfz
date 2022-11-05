export interface Instrument {
  id: number;
  name: string;
  author: string;
  path: string;
  samples: Sample[];
  saved?: boolean;
}

export interface Sample {
  id: number;
  filename: string;
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
