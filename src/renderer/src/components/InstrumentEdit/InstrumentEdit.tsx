import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext, useState } from 'react';
import FileSourceField from './General/FileSourceField';
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
  } = useContext(AppData) as AppDataState;
  const { author, name } = instrument;
  const [open, setOpen] = useState(true);
  const [connected, setConnected] = useState(true);

  useMidiDevice(midiDevice, 'statechange', (open, connected) => {
    setOpen(open);
    setConnected(connected);
  });

  return (
    <div className='grid h-full w-full grid-cols-[2.5fr,7.5fr] gap-4 p-6'>
      <aside className='flex h-full w-full flex-col gap-4 text-slate-400'>
        <TextField
          id='name'
          label="Nom de l'instrument"
          value={name}
          setValue={(name) => updateInstrument({ ...instrument, name, saved: false })}
          required
        />
        <TextField
          id='author'
          label='Auteur'
          value={author}
          setValue={(author) => updateInstrument({ ...instrument, author, saved: false })}
          placeholder='Jimmy Page...'
        />
        <FileSourceField label='Samples disponibles' instrument={instrument} />
      </aside>
      {midiDevice && connected ? (
        midiDeviceModel.name ? (
          <Mapper
            device={midiDevice}
            instrument={instrument}
            isDeviceOpen={open}
            deviceModel={midiDeviceModel}
          />
        ) : (
          <div className='flex items-center justify-center'>
            <p className='h-fit w-fit rounded-lg bg-yellow-400 bg-opacity-75 p-6 text-center'>
              <WarningIcon className='mx-auto mb-2 text-6xl' />
              Votre périphérique MIDI n'est pas compatible.
              <br />
              Une demande peut être faite à l'équipe afin de l'intégrer prochainement.
            </p>
          </div>
        )
      ) : (
        <div className='flex items-center justify-center'>
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
