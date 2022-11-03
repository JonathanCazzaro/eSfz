/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { Instrument } from './types';

export interface Api {
  pickFolder: (defaultPath?: string) => Promise<string | null>;
  openExternalLink: (link: string) => Promise<null>;
  writeNewInstrument: (config: Omit<Instrument, 'saved'>) => Promise<boolean>;
}

const api: Api = {
  pickFolder: (defaultPath) => ipcRenderer.invoke('dialog:pickDirectory', [defaultPath]),
  openExternalLink: (link) => ipcRenderer.invoke('shell:openLink', [link]),
  writeNewInstrument: (config) => ipcRenderer.invoke('write:newInstrument', [config]),
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
