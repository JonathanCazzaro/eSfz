import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import { IoMdAddCircle as AddIcon } from 'react-icons/io';

const TabBar: React.FC = () => {
  const {
    currentTab: [currentTab, setCurrentTab],
    instruments: [instruments, setInstruments],
    newInstrumentOpen: [, setNewInstrumentOpen],
  } = useContext(AppData) as AppDataState;

  return (
    <div className='relative flex h-10 w-full pt-2'>
      <div className='absolute inset-0 z-0 border-b border-slate-600 backdrop-brightness-50'></div>
      <button className='tab-button' onClick={() => setCurrentTab('welcome-screen')}>
        Bienvenue
      </button>
      <button className='add-tab-button' onClick={() => setNewInstrumentOpen(true)}>
        <AddIcon className='h-6 w-6 scale-110' />
      </button>
    </div>
  );
};

export default TabBar;
