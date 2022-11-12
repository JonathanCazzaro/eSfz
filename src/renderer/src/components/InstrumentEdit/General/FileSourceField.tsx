import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext } from 'react';
import SampleSourceIcon from '../../CustomIcons/SampleSourceIcon';
import SampleItem from './SampleItem';

interface FileSourceFieldProps {
  instrument: Instrument;
  label: string;
}

const FileSourceField: React.FC<FileSourceFieldProps> = ({ instrument, label }) => {
  const { importSamples } = useContext(AppData) as AppDataState;

  return (
    <div className='flex h-full shrink flex-col overflow-hidden rounded border border-slate-600 shadow-lg'>
      <div className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'>
        {label}
        <button onClick={async () => importSamples(instrument)}>
          <SampleSourceIcon className='hover:brightness-150' />
        </button>
      </div>
      <div className='relative h-full'>
        <ul className='scrollbar absolute top-0 left-0 right-0 flex h-full flex-col overflow-y-auto bg-white bg-opacity-10 px-2 py-4'>
          {instrument.samples.length ? (
            instrument.samples.map((sample) => (
              <SampleItem key={sample.id} {...sample} instrument={instrument} />
            ))
          ) : (
            <li className='vh-align absolute flex w-3/4 flex-col items-center gap-4 text-center'>
              Aucun sample n'est rattaché à cet instrument.
              <button
                className='secondary-button from-slate-700 to-slate-600 text-slate-300'
                onClick={() => importSamples(instrument)}
              >
                <SampleSourceIcon />
                Importer des samples
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FileSourceField;
