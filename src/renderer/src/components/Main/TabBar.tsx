import { Instrument } from '@renderer/types/types';
import React from 'react';
import { IoMdAddCircle as AddIcon } from 'react-icons/io';

interface TabBarProps {
  instruments: Instrument[];
  setInstruments: (instruments: Instrument[]) => void;
  currentTab: Instrument | 'welcome-screen';
  setCurrentTab: (tab: Instrument | 'welcome-screen') => void;
}

const TabBar: React.FC<TabBarProps> = ({ currentTab, instruments, setCurrentTab, setInstruments }) => {
  return (
    <div className='relative flex h-10 w-full pt-2'>
      <div className='absolute inset-0 z-0 border-b border-slate-600 backdrop-brightness-50'></div>
      <button className='tab-button' onClick={() => setCurrentTab('welcome-screen')}>Bienvenue</button>
      <button className='add-tab-button'>
        <AddIcon className='h-6 w-6 scale-110' />
      </button>
    </div>
  );
};

export default TabBar;
