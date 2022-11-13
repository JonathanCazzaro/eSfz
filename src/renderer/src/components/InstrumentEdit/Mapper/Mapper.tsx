import { useMidiDevice } from '@renderer/hooks/useMidiDevice';
import { usePrevious } from '@renderer/hooks/useOriginalValue';
import { AppData } from '@renderer/store';
import { AppDataState, Instrument, MidiDeviceModel } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import NanoPad2_Layout from './NanoPad2/NanoPad2_Layout';
import NoteSetup from './NoteSetup';

interface MapperProps {
  device: WebMidi.MIDIInput;
  instrument: Instrument;
  isDeviceOpen: boolean;
  deviceModel: MidiDeviceModel;
}

const Mapper: React.FC<MapperProps> = ({ device, instrument, isDeviceOpen, deviceModel }) => {
  const {
    updateInstrument,
    mode: [mode, setMode],
  } = useContext(AppData) as AppDataState;

  const [noteId, setNoteId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [, setVelocity] = useState(0);

  const previousNoteId = usePrevious(noteId);
  const previousInstrumentId = usePrevious(instrument.id);

  useMidiDevice(device, 'midimessage', (isPlaying, note, velocity) => {
    setPlaying(isPlaying);
    setNoteId(note);
    setVelocity(velocity);
  });

  useEffect(() => {
    if (instrument.id !== previousInstrumentId) {
      setNoteId(instrument.currentMapping || deviceModel.noteRange[0]);
    }
    if (noteId !== previousNoteId) {
      updateInstrument({ ...instrument, currentMapping: noteId });
    }
  }, [noteId, instrument.id]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-6 rounded bg-white bg-opacity-25 p-6 text-lg text-neutral-300'>
      <div className='flex h-full w-full gap-6'>
        <div className='flex h-full w-fit shrink-0 flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <label htmlFor='mode' className='text-slate-100'>
              Choix du mode
            </label>
            <div className={`switch ${mode === 'edition' ? 'bg-emerald-800' : 'bg-slate-700'} `}>
              <input
                type='checkbox'
                id='mode'
                name='mode'
                checked={mode === 'edition'}
                className='input-switch'
                onChange={({ currentTarget: { checked } }) => {
                  setMode(checked ? 'edition' : 'play');
                }}
              />
              <div className='flex w-full justify-between text-center text-sm font-semibold uppercase'>
                <span className='w-1/2'>édition</span>
                <span className='w-1/2'>jeu</span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-8'>
            <label htmlFor='device-state' className='text-slate-100'>
              Etat du contrôleur
            </label>
            <div className={`switch w-44 ${isDeviceOpen ? 'bg-emerald-800' : 'bg-neutral-700'} `}>
              <input
                type='checkbox'
                id='device-state'
                name='device-state'
                checked={isDeviceOpen}
                className='input-switch'
                onChange={({ currentTarget: { checked } }) => {
                  checked ? device.open() : device.close();
                }}
              />
              <div className='flex w-full justify-between text-center text-sm font-semibold uppercase'>
                <span className='w-1/2'>activé</span>
                <span className='w-1/2'>désactivé</span>
              </div>
            </div>
          </div>
        </div>
        <NoteSetup noteId={noteId} />
      </div>
      {deviceModel.name === 'nanoPAD2' && (
        <NanoPad2_Layout
          isPlaying={playing}
          padId={noteId}
          isActive={isDeviceOpen}
          setPadId={(padId) => setNoteId(padId)}
        />
      )}
    </div>
  );
};

export default Mapper;
