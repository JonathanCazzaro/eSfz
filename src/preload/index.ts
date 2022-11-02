/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

export interface Api {
  pickFolder: (defaultPath?: string) => Promise<string | null>;
  openExternalLink: (link: string) => Promise<null>;
}

const api: Api = {
  pickFolder: (defaultPath) => ipcRenderer.invoke('dialog:pickDirectory', [defaultPath]),
  openExternalLink: (link) => ipcRenderer.invoke('shell:openLink', [link]),
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
