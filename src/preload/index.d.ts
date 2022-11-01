import { ElectronAPI } from '@electron-toolkit/preload';
import { FsApi } from './index';

declare global {
  interface Window {
    electron: ElectronAPI;
    fs: FsApi;
  }
}
