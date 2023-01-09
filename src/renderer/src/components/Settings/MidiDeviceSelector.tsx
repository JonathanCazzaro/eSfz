import { useMidiDevice } from '@renderer/hooks/useMidiDevice';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineExclamationTriangle as ErrorIcon } from 'react-icons/hi2';
import Selector from '../Selector/Selector';
import nanopad2 from '../../devices_json/nanopad2.json';

const MidiDeviceSelector: React.FC = () => {
  const {
    midiDevice: [device, setDevice],
    midiDeviceModel: [, setMidiDeviceModel],
    pads: [, setPads]
  } = useContext(AppData) as AppDataState;
  const [availableDevices, setAvailableDevices] = useState<WebMidi.MIDIInput[]>([]);
  const [deviceList, setDeviceList] = useState<WebMidi.MIDIInput[]>([]);
  const { getDevices, error } = useMidiDevice(device);

  useEffect(() => {
    getDevices().then((devices) => setAvailableDevices(devices || []));
  }, []);

  useEffect(() => {
    setDeviceList(availableDevices.filter(({ id }) => id !== device?.id));
  }, [availableDevices, device]);

  return error ? (
    <p className='flex items-center gap-4 rounded-full bg-yellow-400 px-4 py-px text-base shadow-md'>
      <ErrorIcon className='scale-125' />
      {error}
    </p>
  ) : (
    <Selector
      selectedOption={device?.name || 'Veuillez sélectionner une entrée'}
      onRefresh={async () => {
        const devices = await getDevices();
        setAvailableDevices(devices || []);
      }}
    >
      {deviceList.length ? (
        deviceList.map((currentDevice) => (
          <li key={currentDevice.id}>
            <button
              onPointerDown={() => {
                setDevice(currentDevice);
                if (currentDevice.name?.includes('nanoPAD2')) {
                  setMidiDeviceModel({ name: 'nanoPAD2', noteRange: [36, 51] });
                  setPads(nanopad2.pads.map((pad) => ({ ...pad, affectedSamples: [] })));
                } else setMidiDeviceModel({ name: undefined, noteRange: [0, 127] });
                localStorage.setItem('midi_device_name', currentDevice.name || '');
              }}
              className='w-full px-4 py-1 text-left hover:bg-slate-200'
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
