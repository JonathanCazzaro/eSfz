import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { Instrument } from '../preload/types';
import { writeFile, mkdir } from 'fs/promises';

const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 912,
    height: 720,
    minHeight: 660,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png'),
        }
      : {}),
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

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  const mainWindow = createWindow();

  ipcMain.handle('dialog:pickDirectory', async (_e, args) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Sélectionner un dossier',
      buttonLabel: 'Sélectionner',
      defaultPath: args ? args[0] : undefined,
    });
    return canceled ? null : filePaths[0];
  });

  ipcMain.handle('shell:openLink', async (_e, args) => {
    await shell.openExternal(args[0]);
  });

  ipcMain.handle(
    'write:newInstrument',
    async (_e, args: [Omit<Instrument, 'saved'>]): Promise<boolean> => {
      try {
        const [instrument] = args;
        await writeFile(`${instrument.path}/settings.json`, JSON.stringify(instrument));
        await mkdir(`${instrument.path}/samples`);
        return true;
      } catch (error) {
        return false;
      }
    },
  );

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
