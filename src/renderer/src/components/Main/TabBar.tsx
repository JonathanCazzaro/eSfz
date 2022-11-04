import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useEffect } from 'react';
import { IoMdAddCircle as AddIcon, IoMdCloseCircle as CloseIcon } from 'react-icons/io';

const TabBar: React.FC = () => {
  const {
    currentTab: [currentTab, setCurrentTab],
    instruments: [instruments, setInstruments],
    newInstrumentOpen: [, setNewInstrumentOpen],
  } = useContext(AppData) as AppDataState;

  const setRemoveInstrument = (id: number) => {
    setInstruments([...instruments.filter((instrument) => instrument.id !== id)]);
    setCurrentTab(instruments.length - 1 ? instruments[length] : 'welcome-screen');
  };

  return (
    <div className='relative flex h-10 w-full pt-2'>
      <div className='absolute inset-0 z-0 border-b border-slate-600 backdrop-brightness-50'></div>
      <button
        className={`welcome-tab-button ${
          typeof currentTab !== 'string' ? 'border-b-slate-600 brightness-90' : ''
        }`}
        onClick={() => setCurrentTab('welcome-screen')}
      >
        Bienvenue
      </button>
      {instruments.map((instrument) => (
        <div
          key={instrument.id}
          className={`instrument-tab-button ${
            typeof currentTab === 'string' || currentTab?.id !== instrument.id
              ? 'border-b-slate-600 brightness-90'
              : ''
          }`}
        >
          <button onClick={() => setCurrentTab(instrument)}>{instrument.name}</button>
          <button onClick={() => setRemoveInstrument(instrument.id)}>
            <CloseIcon className='scale-125' />
          </button>
        </div>
      ))}
      <button className='add-tab-button' onClick={() => setNewInstrumentOpen(true)}>
        <AddIcon className='h-6 w-6 scale-110' />
      </button>
    </div>
  );
};

export default TabBar;
