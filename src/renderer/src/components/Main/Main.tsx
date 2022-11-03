import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import TabBar from './TabBar';

const Main: React.FC = () => {
  const {
    currentTab: [currentTab, setCurrentTab],
    instruments: [instruments, setInstruments],
  } = useContext(AppData) as AppDataState;

  return (
    <main className='flex flex-col w-full'>
      <TabBar
        currentTab={currentTab}
        instruments={instruments}
        setCurrentTab={setCurrentTab}
        setInstruments={setInstruments}
      />
      <div className='p-6 h-full'>
        <WelcomeScreen />
      </div>
    </main>
  );
};

export default Main;
