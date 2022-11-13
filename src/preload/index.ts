/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { ApiResponse, Instrument, Sample, Platform } from './types';
import { platform } from 'os';

export interface Api {
  pickFolder: (defaultPath: string) => Promise<ApiResponse<string>>;
  importSamples: (defaultPath: string, copyPath: string) => Promise<ApiResponse<Sample[]>>;
  openExternalLink: (link: string) => Promise<ApiResponse<undefined>>;
  writeInstrument: (config: Instrument) => Promise<ApiResponse<number>>;
  openInstrument: (defaultPath: string) => Promise<ApiResponse<Instrument>>;
  getPlatform: () => Platform;
  cleanInstruments: (config: { path: string, id: number }[]) => Promise<ApiResponse<undefined>>;
  quitApp: () => void;
  minimizeApp: () => void;
  maximizeApp: () => void;
}

const api: Api = {
  pickFolder: (defaultPath) => ipcRenderer.invoke('dialog:pickDirectory', [defaultPath]),
  importSamples: (defaultPath, copyPath) =>
    ipcRenderer.invoke('dialog:importSamples', [defaultPath, copyPath]),
  openExternalLink: (link) => ipcRenderer.invoke('shell:openLink', [link]),
  writeInstrument: (config) => ipcRenderer.invoke('write:instrument', [config]),
  openInstrument: (defaultPath) => ipcRenderer.invoke('read:instrument', [defaultPath]),
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
