import { TranslationData } from '@renderer/components/Translation/Translation';
import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext, useRef } from 'react';
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
  handleDrop?: (value: string) => void;
  handleDelete: (sampleId: number) => void;
}

const SampleSource: React.FC<SampleSourceProps> = ({
  instrument,
  samples,
  label,
  className,
  enableImport,
  noDataMessage,
  draggable,
  handleDrop,
  handleDelete
}) => {
  const { importSamples } = useContext(AppData) as AppDataState;
  const { headers, buttons } = useContext(TranslationData);

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`flex h-full shrink flex-col overflow-hidden rounded relative shadow-lg ${className}`}
      ref={componentRef}
      onDragEnter={
        handleDrop ? () => componentRef.current?.classList.add('dropzone-hover') : undefined
      }
      onDragLeave={
        handleDrop ? () => componentRef.current?.classList.remove('dropzone-hover') : undefined
      }
      onDragOver={handleDrop ? (e) => e.preventDefault() : undefined}
      onDrop={
        handleDrop
          ? (e) => {
              componentRef.current?.classList.remove('dropzone-hover');
              handleDrop(e.dataTransfer.getData('text/plain'));
            }
          : undefined
      }
    >
      <div className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'>
        {label}
        {enableImport && (
          <button onClick={async () => importSamples({ instrument, buttonLabel: buttons.select[0], dialogTitle: headers.selectSamples[0] })}>
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
          importSamples={(instrument) => importSamples({ instrument, buttonLabel: buttons.select[0], dialogTitle: headers.selectSamples[0] })}
          noDataMessage={noDataMessage}
          draggable={draggable}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default SampleSource;
