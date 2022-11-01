import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { useContext, useEffect } from 'react';

export const useInit = () => {
  const {
    midiDevice: [midiDevice, setMidiDevice],
    audioOutDevice: [audioOutDevice, setAudioOutDevice],
    welcomeScreen: [welcomeScreen, setWelcomeScreen],
    saveDir: [saveDir, setSaveDir],
  } = useContext(AppData) as AppDataState;

  useEffect(() => {
    const config = {
      midiDeviceId: localStorage.getItem('midi_device_id'),
      audioOutDeviceId: localStorage.getItem('audio_out_device_id'),
      welcomeScreen: localStorage.getItem('welcome_screen'),
      saveDir: localStorage.getItem('save_dir'),
    };

    if (typeof config.welcomeScreen === 'string') setWelcomeScreen(!!config.welcomeScreen);
    else {
      localStorage.setItem('splashscreen', 'on');
      setWelcomeScreen(true);
    }

    if (config.saveDir) setSaveDir(config.saveDir);
    else {
      const { env } = window.electron.process;
      localStorage.setItem('save_dir', env.HOME as string);
      setSaveDir(env.HOME as string);
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

    navigator.requestMIDIAccess().then((midiAccess) => {
      const foundDevice = Array.from(midiAccess.inputs).find(
        (input) => input[1].id === config.midiDeviceId,
      );
      if (foundDevice) setMidiDevice(foundDevice[1]);
      else setMidiDevice(midiAccess.inputs[0]);
    });
  }, []);
};
