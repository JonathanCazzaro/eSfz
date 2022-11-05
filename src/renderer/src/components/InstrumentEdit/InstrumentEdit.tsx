import { Instrument } from '@renderer/types/types';
import React from 'react';
import Field from './Field';

interface InstrumentEditProps {
  instrument: Instrument;
  updateInstrument: (instrument: Instrument) => void;
}

const InstrumentEdit: React.FC<InstrumentEditProps> = ({ instrument, updateInstrument }) => {
  const { author, id, name, path, samples, saved } = instrument;

  return (
    <div className='mt-2 grid h-full w-full grid-cols-[0.5fr,1.5fr] gap-4'>
      <aside className='h-full w-full'>
        <div className='flex flex-col gap-4 text-slate-100'>
          <Field
            id='name'
            label="Nom de l'instrument"
            value={name}
            setValue={(name) => updateInstrument({ ...instrument, name, saved: false })}
          />
          <Field
            id='author'
            label='Auteur'
            value={author}
            setValue={(author) => updateInstrument({ ...instrument, author, saved: false })}
          />
        </div>
      </aside>
      <div className='h-full w-full bg-green-600'></div>
    </div>
  );
};

export default InstrumentEdit;
