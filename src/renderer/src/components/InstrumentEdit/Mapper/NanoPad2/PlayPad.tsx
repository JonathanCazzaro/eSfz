import { AppData } from '@renderer/store';
import { AppDataState, Instrument, Pad } from '@renderer/types/types';
import React, { useContext, useRef } from 'react';

interface PlayPadProps {
  isActive: boolean;
  currentPad?: number;
  padId: number;
  setPadId: (id: number) => void;
  instrument: Instrument;
}

const PlayPad: React.FC<PlayPadProps> = ({ currentPad, isActive, padId, setPadId, instrument }) => {
  const padRef = useRef<HTMLButtonElement>(null);
  const {
    pads: [pads],
    attachSample,
  } = useContext(AppData) as AppDataState;

  const pad = pads.find((pad) => pad.id === padId) as Pad;

  const handleDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
    padRef.current?.classList.remove('bg-emerald-400');
    attachSample({
      deviceName: 'nanoPAD2',
      instrument,
      pad,
      sampleId: Number(e.dataTransfer.getData('text/plain')),
    });
  };

  return (
    <button
      ref={padRef}
      onClick={() => setPadId(padId)}
      onDragEnter={() => padRef.current?.classList.add('bg-emerald-400')}
      onDragLeave={() => padRef.current?.classList.remove('bg-emerald-400')}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`nanopad-pad ${
        isActive && currentPad === padId
          ? ' bg-neutral-600 shadow-emerald-400 hover:brightness-100'
          : ''
      }`}
    ></button>
  );
};

export default PlayPad;
