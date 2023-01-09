import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { useContext, useEffect } from 'react';
import { useMidiDevice } from './useMidiDevice';
import nanopad2 from '../devices_json/nanopad2.json';

export const useInit = () => {
  const {
    midiDevice: [, setMidiDevice],
    midiDeviceModel: [, setMidiDeviceModel],
    audioOutDevice: [, setAudioOutDevice],
    saveDir: [, setSaveDir],
    importDir: [, setImportDir],
    pads: [, setPads],
  } = useContext(AppData) as AppDataState;
  const { getDevices } = useMidiDevice(null);

  useEffect(() => {
    const config = {
      midiDeviceName: localStorage.getItem('midi_device_name'),
      audioOutDeviceId: localStorage.getItem('audio_out_device_id'),
      saveDir: localStorage.getItem('save_dir'),
    };

    if (config.saveDir) {
      setSaveDir(config.saveDir);
      setImportDir(config.saveDir);
    } else {
      const { env } = window.electron.process;
      localStorage.setItem('save_dir', env.HOME as string);
      setSaveDir(env.HOME as string);
      setImportDir(env.HOME as string);
    }

    if (config.midiDeviceName) {
      getDevices().then((devices) => {
        const foundDevice = devices?.find(({ name }) => name === config.midiDeviceName);
        if (foundDevice) {
          setMidiDevice(foundDevice);
          if (config.midiDeviceName?.includes('nanoPAD2')) {
            setMidiDeviceModel({ name: 'nanoPAD2', noteRange: [36, 51] });
            setPads(nanopad2.pads.map((pad) => ({ ...pad, affectedSamples: [] })));
          }
        }
      });
    }

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const parsedDevices = devices.filter(({ kind }) => kind === 'audiooutput');
      const foundDevice = parsedDevices.find(
        ({ deviceId }) => deviceId === config.audioOutDeviceId,
      );
      if (foundDevice) {
        setAudioOutDevice({
          id: foundDevice.deviceId,
          name: foundDevice.deviceId === 'default' ? 'Périphérique par défault' : foundDevice.label,
        });
      } else {
        setAudioOutDevice({
          id: parsedDevices[0].deviceId,
          name:
            parsedDevices[0].deviceId === 'default'
              ? 'Périphérique par défault'
              : parsedDevices[0].label,
        });
      }
    });
  }, []);
};
