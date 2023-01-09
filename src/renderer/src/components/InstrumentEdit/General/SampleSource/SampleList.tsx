import SampleSourceIcon from '@renderer/components/CustomIcons/SampleSourceIcon';
import { Instrument, Sample } from '@renderer/types/types';
import React from 'react';
import SampleItem from './SampleItem';

interface SampleListProps {
  source: Sample[];
  instrument: Instrument;
  enableImport: boolean;
  noDataMessage: string;
  importSamples: (instrument: Instrument) => Promise<void>;
  handleDelete: (sampleId: number) => void;
  draggable?: boolean;
}

const SampleList: React.FC<SampleListProps> = ({
  instrument,
  source,
  enableImport,
  noDataMessage,
  importSamples,
  handleDelete,
  draggable
}) => {
  return (
    <ul className='scrollbar absolute top-0 left-0 right-0 flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white bg-opacity-10 px-2 py-4'>
      {source.length ? (
        source.map((sample) => (
          <SampleItem
            key={sample.id}
            {...sample}
            instrument={instrument}
            allowModification={enableImport}
            draggable={draggable || false}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <li className='vh-align absolute flex w-3/4 flex-col items-center gap-4 text-center'>
          {noDataMessage}
          {enableImport && (
            <button
              className='secondary-button from-slate-700 to-slate-600 text-slate-300'
              onClick={() => importSamples(instrument)}
            >
              <SampleSourceIcon />
              Importer des samples
            </button>
          )}
        </li>
      )}
    </ul>
  );
};

export default SampleList;
