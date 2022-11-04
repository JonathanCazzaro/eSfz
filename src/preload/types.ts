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
