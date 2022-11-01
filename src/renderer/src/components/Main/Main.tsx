import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useEffect } from 'react';

const Main: React.FC = () => {
  const {
    midiDevice: [device],
  } = useContext(AppData) as AppDataState;

  return (
    <main className='h-full w-full'>
      <p className='text-white'>Coucou !</p>
    </main>
  );
};

export default Main;
