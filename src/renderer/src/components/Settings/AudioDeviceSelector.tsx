import { AppData } from '@renderer/store';
import { AppDataState, AudioOutDevice } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineExclamationTriangle as ErrorIcon } from 'react-icons/hi2';
import Selector from '../Selector/Selector';

// -------------- Pour jouer les sons sur le pérophérique sélectionné, on utilisera la méthode setSinkId de chaque object audio en lui passant le param id du périphérique --------------------

const AudioDeviceSelector: React.FC = () => {
  const {
    audioOutDevice: [device, setDevice],
  } = useContext(AppData) as AppDataState;
  const [error, setError] = useState('');
  const [availableDevices, setAvailableDevices] = useState<AudioOutDevice[]>([]);
  const [deviceList, setDeviceList] = useState<AudioOutDevice[]>([]);

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setAvailableDevices(
        devices
          .filter(({ kind }) => kind === 'audiooutput')
          .map(({ deviceId, label }) => ({
            id: deviceId,
            name: deviceId === 'default' ? 'Périphérique par défault' : label,
          })),
      );
    } catch (error) {
      setError('Les périphériques audio sont inaccessibles !');
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  useEffect(() => {
    setDeviceList(availableDevices.filter(({ id }) => id !== device?.id));
  }, [availableDevices, device]);

  return error ? (
    <p className='bg-yellow-400 px-4 rounded-full text-base py-px flex items-center gap-4 shadow-md'>
      <ErrorIcon className='scale-125' />
      {error}
    </p>
  ) : (
    <Selector selectedOption={device?.name} onRefresh={getDevices}>
      {deviceList.length ? (
        deviceList.map((currentDevice) => (
          <li key={currentDevice.id}>
            <button
              onPointerDown={() => {
                setDevice(currentDevice);
                localStorage.setItem('audio_out_device_id', currentDevice.id);
              }}
              className='hover:bg-slate-200 w-full text-left px-4 py-1'
            >
              {currentDevice?.name || 'Périphérique non identifié'}
            </button>
          </li>
        ))
      ) : (
        <li className='text-center italic text-slate-500'>Pas d'autre périphérique détecté</li>
      )}
    </Selector>
  );
};

export default AudioDeviceSelector;
