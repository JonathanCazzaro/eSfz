import { ElectronAPI } from '@electron-toolkit/preload';
import { Api } from './index';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
  interface HTMLMediaElement {
    setSinkId: (id: string) => Promise<undefined>;
  }
}
