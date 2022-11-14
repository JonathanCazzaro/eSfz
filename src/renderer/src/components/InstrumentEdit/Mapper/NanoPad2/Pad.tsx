import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useRef } from 'react';

interface PadProps {
  isActive: boolean;
  currentPad?: number;
  padId: number;
  setPadId: (id: number) => void;
}

const Pad: React.FC<PadProps> = ({ currentPad, isActive, padId, setPadId }) => {
  const padRef = useRef<HTMLButtonElement>(null);
  const {
    updateInstrument,
    pads: [pads, setPads],
  } = useContext(AppData) as AppDataState;

  const pad = pads.find((pad) => pad.id === padId);

  return (
    <button
      ref={padRef}
      onClick={() => setPadId(padId)}
      onDragEnter={() => padRef.current?.classList.add('bg-emerald-400')}
      onDragLeave={() => padRef.current?.classList.remove('bg-emerald-400')}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        padRef.current?.classList.remove('bg-emerald-400');
        const sampleId = Number(e.dataTransfer.getData('text/plain'));
        if (pad) {
          if (!pad.affectedSamples.includes(sampleId)) pad.affectedSamples.push(sampleId);
          setPads([...pads.map((item) => (item.id === pad.id ? pad : item))]);
        }
      }}
      className={`nanopad-pad ${
        isActive && currentPad === padId
          ? ' bg-neutral-600 shadow-emerald-400 hover:brightness-100'
          : ''
      }`}
    ></button>
  );
};

export default Pad;
