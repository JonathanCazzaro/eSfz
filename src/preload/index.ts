/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { ApiResponse, Instrument, Sample, Platform } from './types';
import { platform } from 'os';

export interface Api {
  pickFolder: (props: { defaultPath: string; dialogTitle: string; buttonLabel: string }) => Promise<ApiResponse<string>>;
  importSamples: (props: { defaultPath: string; copyPath: string; dialogTitle: string; buttonLabel: string }) => Promise<ApiResponse<Sample[]>>;
  openExternalLink: (link: string) => Promise<ApiResponse<undefined>>;
  writeInstrument: (config: Instrument) => Promise<ApiResponse<number>>;
  openInstrument: (props: { defaultPath: string; dialogTitle: string; buttonLabel: string }) => Promise<ApiResponse<Instrument>>;
  getPlatform: () => Platform;
  cleanInstruments: (config: { path: string; id: number }[]) => Promise<ApiResponse<undefined>>;
  quitApp: () => void;
  minimizeApp: () => void;
  maximizeApp: () => void;
}

const api: Api = {
  pickFolder: (props) => ipcRenderer.invoke('dialog:pickDirectory', [props]),
  importSamples: (props) => ipcRenderer.invoke('dialog:importSamples', [props]),
  openExternalLink: (link) => ipcRenderer.invoke('shell:openLink', [link]),
  writeInstrument: (config) => ipcRenderer.invoke('write:instrument', [config]),
  openInstrument: (props) => ipcRenderer.invoke('read:instrument', [props]),
  getPlatform: () => ({
    isMac: platform() === 'darwin',
    isLinux: platform() === 'linux',
    isWindows: platform() === 'win32',
  }),
  cleanInstruments: (config) => ipcRenderer.invoke('clean:instruments', [config]),
  quitApp: () => ipcRenderer.invoke('app:quit', []),
  minimizeApp: () => ipcRenderer.invoke('app:minimize', []),
  maximizeApp: () => ipcRenderer.invoke('app:maximize', []),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
