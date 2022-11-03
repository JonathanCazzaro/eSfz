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
    <main className='flex w-full flex-col'>
      <TabBar />
      {currentTab === 'welcome-screen' && (
        <div className='h-full p-6'>
          <WelcomeScreen />
        </div>
      )}
    </main>
  );
};

export default Main;
