import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { useContext, useEffect } from 'react';
import { useMidiDevice } from './useMidiDevice';

export const useInit = () => {
  const {
    midiDevice: [, setMidiDevice],
    midiDeviceModel: [, setMidiDeviceModel],
    audioOutDevice: [, setAudioOutDevice],
    saveDir: [, setSaveDir],
  } = useContext(AppData) as AppDataState;
  const { getDevices } = useMidiDevice(null);

  useEffect(() => {
    const config = {
      midiDeviceId: localStorage.getItem('midi_device_id'),
      audioOutDeviceId: localStorage.getItem('audio_out_device_id'),
      saveDir: localStorage.getItem('save_dir'),
    };

    if (config.saveDir) setSaveDir(config.saveDir);
    else {
      const { env } = window.electron.process;
      localStorage.setItem('save_dir', env.HOME as string);
      setSaveDir(env.HOME as string);
    }

    if (config.midiDeviceId) {
      getDevices().then((devices) => {
        const foundDevice = devices?.find((input) => input.id === config.midiDeviceId);
        if (foundDevice) {
          setMidiDevice(foundDevice);
          if (foundDevice.name?.includes('nanoPAD2')) {
            setMidiDeviceModel({ name: 'nanoPAD2', noteRange: [36, 51] });
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
