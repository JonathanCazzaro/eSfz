/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { ApiResponse, Instrument, Platform } from './types';
import { platform } from 'os';

export interface Api {
  pickFolder: (defaultPath: string) => Promise<ApiResponse<string>>;
  openExternalLink: (link: string) => Promise<ApiResponse<undefined>>;
  writeInstrument: (config: Instrument) => Promise<ApiResponse<number>>;
  openInstrument: (defaultPath: string) => Promise<ApiResponse<Instrument>>;
  getPlatform: () => Platform;
  quitApp: () => void;
  minimizeApp: () => void;
  maximizeApp: () => void;
}

const api: Api = {
  pickFolder: (defaultPath) => ipcRenderer.invoke('dialog:pickDirectory', [defaultPath]),
  openExternalLink: (link) => ipcRenderer.invoke('shell:openLink', [link]),
  writeInstrument: (config) => ipcRenderer.invoke('write:instrument', [config]),
  openInstrument: (defaultPath) => ipcRenderer.invoke('read:instrument', [defaultPath]),
  getPlatform: () => ({
    isMac: platform() === 'darwin',
    isLinux: platform() === 'linux',
    isWindows: platform() === 'win32',
  }),
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
