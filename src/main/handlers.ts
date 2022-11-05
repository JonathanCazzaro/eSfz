/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { access, mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { ApiResponse, Instrument } from '../preload/types';

interface Handler {
  event: string;
  callback: (event: Electron.IpcMainInvokeEvent, props: [any]) => Promise<any>;
}

export const setHandlers = (window: BrowserWindow) => {
  const handlers: Handler[] = [
    {
      event: 'dialog:pickDirectory',
      callback: async (_event, props: [string]): Promise<ApiResponse<string>> => {
        const response: ApiResponse<string> = {
          data: null,
          error: null,
        };
        try {
          const [path] = props;
          const { canceled, filePaths } = await dialog.showOpenDialog(window, {
            properties: ['openDirectory', 'createDirectory'],
            title: 'Sélectionner un dossier',
            buttonLabel: 'Sélectionner',
            defaultPath: path,
          });
          if (!canceled) response.data = filePaths[0];
          return response;
        } catch (error) {
          response.error = new Error('Service failed.');
          return response;
        }
      },
    },
    {
      event: 'shell:openLink',
      callback: async (_event, props: [string]): Promise<ApiResponse<undefined>> => {
        const response: ApiResponse<undefined> = {
          data: undefined,
          error: null,
        };
        try {
          const [url] = props;
          await shell.openExternal(url);
          return response;
        } catch (error) {
          response.error = new Error('Service failed.');
          return response;
        }
      },
    },
    {
      event: 'write:instrument',
      callback: async (_event, props: [Instrument]): Promise<ApiResponse<number>> => {
        const response: ApiResponse<number> = {
          data: null,
          error: null,
        };
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [{ saved, ...instrument }] = props;
          await writeFile(`${instrument.path}/${instrument.id}.esfz`, JSON.stringify(instrument), {
            encoding: 'utf-8',
          });
          try {
            await access(`${instrument.path}/${instrument.id}_samples`);
          } catch (error) {
            await mkdir(`${instrument.path}/${instrument.id}_samples`);
          }
          response.data = instrument.id;
          return response;
        } catch (error) {
          response.error = new Error('Service failed.');
          return response;
        }
      },
    },
    {
      event: 'read:instrument',
      callback: async (_event, props: [string]): Promise<ApiResponse<Instrument>> => {
        const response: ApiResponse<Instrument> = {
          data: null,
          error: null,
        };
        try {
          const [pathName] = props;
          const { canceled, filePaths } = await dialog.showOpenDialog(window, {
            properties: ['openDirectory'],
            title: "Sélectionnez l'emplacement de l'instrument",
            buttonLabel: 'Ouvrir',
            defaultPath: pathName,
          });
          if (!canceled) {
            try {
              const files = await readdir(filePaths[0], {
                encoding: 'utf-8',
              });
              const configFile = files.filter((file) => file.endsWith('.esfz'));
              if (configFile.length === 1) {
                try {
                  const fileContent = await readFile(`${filePaths[0]}/${configFile[0]}`, {
                    encoding: 'utf-8',
                  });
                  response.data = { ...JSON.parse(fileContent), saved: true };
                  return response;
                } catch (error) {
                  response.error = new Error('Service failed.');
                  return response;
                }
              } else
                response.error = new Error(
                  'Instrument directory should not contain more than one .esfz file.',
                );
              return response;
            } catch (error) {
              response.error = new Error('Service failed.');
              return response;
            }
          } else return response;
        } catch (error) {
          response.error = new Error('Service failed.');
          return response;
        }
      },
    },
    {
      event: 'app:quit',
      callback: async () => app.quit(),
    },
    {
      event: 'app:minimize',
      callback: async () => window.minimize(),
    },
    {
      event: 'app:maximize',
      callback: async () => {
        window.isMaximized() ? window.unmaximize() : window.maximize();
      },
    },
  ];

  handlers.forEach(({ event, callback }) => {
    ipcMain.handle(event, callback);
  });
};
