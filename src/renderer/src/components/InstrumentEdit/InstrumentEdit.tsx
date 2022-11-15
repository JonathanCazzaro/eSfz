import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import SampleSource from './General/SampleSource/SampleSource';
import TextField from './General/TextField';
import Mapper from './Mapper/Mapper';
import { IoWarning as WarningIcon } from 'react-icons/io5';
import { useMidiDevice } from '@renderer/hooks/useMidiDevice';

interface InstrumentEditProps {
  instrument: Instrument;
  updateInstrument: (instrument: Instrument) => void;
}

const InstrumentEdit: React.FC<InstrumentEditProps> = ({ instrument, updateInstrument }) => {
  const {
    midiDevice: [midiDevice],
    midiDeviceModel: [midiDeviceModel],
    pads: [pads, setPads],
  } = useContext(AppData) as AppDataState;
  const { author, name } = instrument;
  const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(true);
  const [open, setOpen] = useState(true);
  const [connected, setConnected] = useState(true);

  useMidiDevice(midiDevice, 'statechange', (open, connected) => {
    setOpen(open);
    setConnected(connected);
  });

  return (
    <div className='flex h-full w-full gap-4 p-6'>
      <aside
        className={`flex h-full min-w-[20rem] max-w-[20rem] flex-col gap-4 overflow-hidden text-slate-400 transition-all duration-300 ease-in ${
          isLeftSectionVisible ? 'w-full' : 'w-0 min-w-0'
        }`}
      >
        <TextField
          className='w-80'
          id='name'
          label="Nom de l'instrument"
          value={name}
          setValue={(name) => updateInstrument({ ...instrument, name, saved: false })}
          required
        />
        <TextField
          className='w-80'
          id='author'
          label='Auteur'
          value={author}
          setValue={(author) => updateInstrument({ ...instrument, author, saved: false })}
          placeholder='Jimmy Page...'
        />
        <SampleSource
          label='Samples disponibles'
          className='w-80'
          instrument={instrument}
          enableImport
          noDataMessage="Aucun sample n'est rattaché à cet instrument."
          draggable={true}
        />
      </aside>
      {midiDevice && connected ? (
        midiDeviceModel.name ? (
          <Mapper
            device={midiDevice}
            instrument={instrument}
            isDeviceOpen={open}
            deviceModel={midiDeviceModel}
            setConfigSection={() => setIsLeftSectionVisible(!isLeftSectionVisible)}
            isConfigVisible={isLeftSectionVisible}
          />
        ) : (
          <div className='flex w-full items-center justify-center'>
            <p className='h-fit w-fit rounded-lg bg-yellow-400 bg-opacity-75 p-6 text-center'>
              <WarningIcon className='mx-auto mb-2 text-6xl' />
              Votre périphérique MIDI n'est pas compatible.
              <br />
              Une demande peut être faite à l'équipe afin de l'intégrer prochainement.
            </p>
          </div>
        )
      ) : (
        <div className='flex w-full items-center justify-center'>
          <p className='h-fit w-fit rounded-lg bg-yellow-400 bg-opacity-75 p-6 text-center'>
            <WarningIcon className='mx-auto mb-2 text-6xl' />
            Aucun périphérique MIDI ne semble être raccordé ou configuré.
            <br />
            Vérifiez vos branchements et rendez vous dans le menu des paramètres.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstrumentEdit;
