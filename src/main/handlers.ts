/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { mkdir, readdir, readFile, writeFile, copyFile, rm } from 'fs/promises';
import { ApiResponse, Instrument, Sample } from '../preload/types';
import { generateId } from './utils/utils';
import path from 'path';

interface Handler {
  event: string;
  callback: (event: Electron.IpcMainInvokeEvent, props: any[any]) => Promise<any>;
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
      event: 'dialog:importSamples',
      callback: async (_event, props: [string, string]): Promise<ApiResponse<Sample[]>> => {
        const response: ApiResponse<Sample[]> = {
          data: null,
          error: null,
        };
        try {
          const [defaultPath, copyPath] = props;
          const { canceled, filePaths } = await dialog.showOpenDialog(window, {
            properties: ['openFile', 'multiSelections'],
            title: 'Sélectionner des fichiers audio',
            buttonLabel: 'Sélectionner',
            defaultPath: defaultPath,
            filters: [{ name: 'Fichiers audio', extensions: ['wav'] }],
          });
          if (!canceled) {
            response.data = filePaths.map((filePath) => ({
              id: generateId(8),
              filename: filePath,
              name: path.parse(filePath.split('/').at(-1) as string).name || '',
              directory: path.parse(filePath).dir,
            }));

            for (const sample of response.data) {
              try {
                await copyFile(sample.filename, `${copyPath}/${sample.id}.wav`);
              } catch (error) {
                response.error = new Error('Files importing has failed (might be partial).');
                return response;
              }
            }
            response.data = response.data.map((sample) => ({
              ...sample,
              filename: `${sample.id}.wav`,
            }));
          }
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
          const [{ saved, currentMapping, ...instrument }] = props;
          await writeFile(`${instrument.path}/${instrument.id}.esfz`, JSON.stringify(instrument), {
            encoding: 'utf-8',
          });
          try {
            const sampleFiles = await readdir(`${instrument.path}/samples`);
            const unusedSamples = sampleFiles.filter(
              (file) => !instrument.samples.map(({ filename }) => filename).includes(file),
            );
            for (const sample of unusedSamples) {
              await rm(`${instrument.path}/samples/${sample}`, { force: true });
            }
          } catch (error) {
            await mkdir(`${instrument.path}/samples`);
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
      event: 'clean:instruments',
      callback: async (
        _event,
        props: [{ path: string; id: number }[]],
      ): Promise<ApiResponse<undefined>> => {
        const response: ApiResponse<undefined> = {
          data: undefined,
          error: null,
        };
        try {
          for (const instrument of props[0]) {
            const configFile = await readFile(`${instrument.path}/${instrument.id}.esfz`, {
              encoding: 'utf-8',
            });
            const parsedConfig = JSON.parse(configFile) as Instrument;
            const sampleFiles = await readdir(`${instrument.path}/samples`);
            const unusedSamples = sampleFiles.filter(
              (file) => !parsedConfig.samples.map(({ filename }) => filename).includes(file),
            );
            for (const sample of unusedSamples) {
              await rm(`${instrument.path}/samples/${sample}`, { force: true });
            }
          }
        } catch (error) {
          response.error = new Error('Service failed.');
          return response;
        }
        return response;
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
