import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext } from 'react';
import InstrumentEdit from '../InstrumentEdit/InstrumentEdit';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import TabBar from '../TabBar/TabBar';

const Main: React.FC = () => {
  const {
    currentTabId: [currentTabId],
    instruments: [instruments],
    updateInstrument,
  } = useContext(AppData) as AppDataState;

  return (
    <main className='w-full relative'>
      <TabBar />
      <div className='pt-11 h-full'>
        {currentTabId ? (
          <InstrumentEdit
            instrument={instruments.find(({ id }) => id === currentTabId) as Instrument}
            updateInstrument={updateInstrument}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </main>
  );
};

export default Main;
