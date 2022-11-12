import React from 'react';
import { pads } from './NanoPad2/pads.json';

interface NoteSetupProps {
  noteId: number;
}

const NoteSetup: React.FC<NoteSetupProps> = ({ noteId }) => {
  return (
    <div className='flex h-full w-full flex-col overflow-hidden rounded border border-slate-600 shadow-lg'>
      <div className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'>
        Edition du pad {pads.find(({ padId }) => padId === noteId)?.padLabel}
      </div>
      <div className='relative h-full'>
        <ul className='scrollbar absolute top-0 left-0 right-0 flex h-full flex-col overflow-y-auto bg-white bg-opacity-10 px-2 py-4'></ul>
      </div>
    </div>
  );
};

export default NoteSetup;
