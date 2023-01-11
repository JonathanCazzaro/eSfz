import { useMidiDevice } from '@renderer/hooks/useMidiDevice';
import { usePrevious } from '@renderer/hooks/useOriginalValue';
import { AppData } from '@renderer/store';
import { AppDataState, Instrument, MidiDeviceModel } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import NanoPad2_Layout from './NanoPad2/NanoPad2_Layout';
import NoteSetup from './NoteSetup';
import { TbArrowBarToLeft as LeftIcon, TbArrowBarRight as RightIcon } from 'react-icons/tb';
import { audioPlayer } from '@renderer/utils/audio';

interface MapperProps {
  device: WebMidi.MIDIInput;
  instrument: Instrument;
  isDeviceOpen: boolean;
  deviceModel: MidiDeviceModel;
  setConfigSection: () => void;
  isConfigVisible: boolean;
}

const Mapper: React.FC<MapperProps> = ({
  device,
  instrument,
  isDeviceOpen,
  deviceModel,
  setConfigSection,
  isConfigVisible,
}) => {
  const {
    updateInstrument,
    mode: [mode, setMode],
    pads: [pads],
    midiDeviceModel: [midiDeviceModel],
  } = useContext(AppData) as AppDataState;

  const [noteId, setNoteId] = useState<number>();
  const [playing, setPlaying] = useState(false);
  const [, setVelocity] = useState<number>();

  const previousNoteId = usePrevious(noteId);
  const previousInstrumentId = usePrevious(instrument.id);

  useMidiDevice(device, 'midimessage', (command, note, velocity) => {
    switch (command) {
      case 176:
        if (note !== 16) {
          setPlaying(true);
          setNoteId(note);
        } else {
          setPlaying(false);
        }
        break;
      case 144: {
        setPlaying(true);
        setNoteId(note);
        setVelocity(velocity);
        break;
      }
      case 128:
        setPlaying(false);
        break;
    }
  });

  useEffect(() => {
    if (mode === 'play') {
      if (playing) {
        const pad = pads.find(({ id }) => id === noteId);
        const samples = instrument.samples.filter(({ id }) => pad?.affectedSamples.includes(id));
        audioPlayer.play(samples.map(({ signal }) => signal));
      } else {
        setNoteId(undefined);
        setVelocity(undefined);
      }
    }
  }, [playing, noteId]);

  useEffect(() => {
    if (instrument.id !== previousInstrumentId) {
      setNoteId(instrument.currentMapping || deviceModel.noteRange[0]);
    }
    if (noteId !== previousNoteId) {
      updateInstrument({ ...instrument, currentMapping: noteId });
    }
  }, [noteId, instrument.id]);

  return (
    <div className='relative flex h-full w-full flex-col justify-center gap-6 overflow-hidden rounded bg-white bg-opacity-25 p-6 text-lg text-neutral-300'>
      <button onClick={setConfigSection} className='tertiary-button'>
        {isConfigVisible ? <LeftIcon className='scale-125' /> : <RightIcon className='scale-125' />}
        {isConfigVisible ? 'Cacher' : 'Afficher'} le volet configuration
      </button>
      <div className='flex h-full w-full gap-6'>
        <div className='mt-8 flex h-full w-fit shrink-0 flex-col gap-4'>
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
                  if (checked) setNoteId(midiDeviceModel.noteRange[0]);
                  else {
                    setNoteId(undefined);
                    setVelocity(undefined);
                  }
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
        {mode === 'edition' && <NoteSetup noteId={noteId} instrument={instrument} />}
      </div>
      <div className='scrollbar relative h-[17rem] shrink-0 overflow-x-auto rounded-2xl drop-shadow-lg scrollbar-thumb:bg-slate-400'>
        {deviceModel.name === 'nanoPAD2' && (
          <NanoPad2_Layout
            isPlaying={playing}
            padId={noteId}
            isActive={isDeviceOpen}
            setPadId={(padId) => setNoteId(padId)}
            isConfigVisible={isConfigVisible}
            instrument={instrument}
          />
        )}
      </div>
    </div>
  );
};

export default Mapper;
