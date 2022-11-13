import { app, shell, BrowserWindow, protocol } from 'electron';
import * as path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { setHandlers } from './handlers';

const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 912,
    height: 720,
    minHeight: 660,
    show: false,
    frame: process.platform === 'darwin' ? true : false,
    transparent: true,
    title: 'eSfz',
    icon: process.platform === 'linux' ? path.join(__dirname, '../../build/icon.png') : undefined,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
  return mainWindow;
};

protocol.registerSchemesAsPrivileged([{ scheme: 'media', privileges: { bypassCSP: true, supportFetchAPI: true } }]);

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  protocol.registerFileProtocol('media', (request, callback) => {
    const url = request.url.replace('media://', '');
    try {
      return callback(url);
    } catch (err) {
      return callback('Resource cannot be loaded.');
    }
  });

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  const mainWindow = createWindow();

  setHandlers(mainWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
