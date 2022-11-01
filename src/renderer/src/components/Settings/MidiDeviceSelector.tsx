import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineExclamationTriangle as ErrorIcon } from 'react-icons/hi2';
import Selector from '../Selector/Selector';

const MidiDeviceSelector: React.FC = () => {
  const {
    midiDevice: [device, setDevice],
  } = useContext(AppData) as AppDataState;
  const [error, setError] = useState('');
  const [availableDevices, setAvailableDevices] = useState<WebMidi.MIDIInput[]>([]);
  const [deviceList, setDeviceList] = useState<WebMidi.MIDIInput[]>([]);

  const getDevices = async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      const parsedDevices = Array.from(midiAccess.inputs).map((input) => input[1]);
      if (!device) setDevice(parsedDevices[0]);
      setAvailableDevices(parsedDevices);
    } catch (err) {
      setError('Les périphériques MIDI sont inaccessibles !');
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
                localStorage.setItem('midi_device_id', currentDevice.id);
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

export default MidiDeviceSelector;
