/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

export interface FsApi {
  pickFolder: (defaultPath?: string) => Promise<string | null>;
}

const fsApi: FsApi = {
  pickFolder: (defaultPath) => ipcRenderer.invoke('dialog:pickDirectory', [defaultPath]),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('fs', fsApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
