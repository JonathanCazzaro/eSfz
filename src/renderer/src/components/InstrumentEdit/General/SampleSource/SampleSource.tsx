import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext } from 'react';
import SampleSourceIcon from '../../../CustomIcons/SampleSourceIcon';
import SampleList from './SampleList';

interface SampleSourceProps {
  instrument: Instrument;
  samples?: number[];
  label: string;
  className?: string;
  enableImport: boolean;
  noDataMessage: string;
  draggable?: boolean;
}

const SampleSource: React.FC<SampleSourceProps> = ({
  instrument,
  samples,
  label,
  className,
  enableImport,
  noDataMessage,
  draggable
}) => {
  const { importSamples } = useContext(AppData) as AppDataState;

  return (
    <div
      className={`flex h-full shrink flex-col overflow-hidden rounded border border-slate-600 shadow-lg ${className}`}
    >
      <div className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'>
        {label}
        {enableImport && (
          <button onClick={async () => importSamples(instrument)}>
            <SampleSourceIcon className='hover:brightness-150' />
          </button>
        )}
      </div>
      <div className='relative h-full'>
        <SampleList
          instrument={instrument}
          source={
            samples
              ? instrument.samples.filter(({ id }) => samples.includes(id))
              : instrument.samples
          }
          enableImport={enableImport}
          importSamples={importSamples}
          noDataMessage={noDataMessage}
          draggable={draggable}
        />
      </div>
    </div>
  );
};

export default SampleSource;
