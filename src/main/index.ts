import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { Instrument } from '../preload/types';
import { writeFile, mkdir, readFile } from 'fs/promises';

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

  ipcMain.handle('dialog:pickDirectory', async (_e, args: [string]) => {
    try {
      const [path] = args;
      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory', 'createDirectory'],
        title: 'Sélectionner un dossier',
        buttonLabel: 'Sélectionner',
        defaultPath: path,        
      });
      return canceled ? null : filePaths[0];
    } catch (error) {
      return null;
    }
  });

  ipcMain.handle('shell:openLink', async (_e, args: [string]) => {
    try {
      const [url] = args;
      await shell.openExternal(url);
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.handle('write:newInstrument', async (_e, args: [Instrument]): Promise<boolean> => {
    try {
      const [instrument] = args;
      await writeFile(`${instrument.path}/${instrument.name}.esfz`, JSON.stringify(instrument), {
        encoding: 'utf-8',
      });
      await mkdir(`${instrument.path}/samples`);
      return true;
    } catch (error) {
      return false;
    }
  });

  ipcMain.handle('read:instrument', async (_e, args: [string]): Promise<Instrument | null> => {
    try {
      const [path] = args;
      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        title: 'Ouvrir un instrument',
        buttonLabel: 'Ouvrir',
        defaultPath: path,
        filters: [
          {
            name: 'Instruments eSfz',
            extensions: ['esfz'],
          },
        ],
      });
      if (!canceled) {
        try {
          const fileContent = await readFile(filePaths[0], { encoding: 'utf-8' });
          return JSON.parse(fileContent);
        } catch (error) {
          return null;
        }
      } else return null;
    } catch (error) {
      return null;
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
