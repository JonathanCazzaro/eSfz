import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';
import NewInstrument from '../NewInstrument/NewInstrument';
import Settings from '../Settings/Settings';

const App: React.FC = () => {
  const {
    settingsOpen: [settingsOpen, setSettingsOpen],
    newInstrumentOpen: [newInstrumentOpen, setNewInstrumentOpen],
  } = useContext(AppData) as AppDataState;

  return (
    <>
      <Navbar />
      <Main />
      <Settings isOpen={settingsOpen} handleClose={() => setSettingsOpen(false)} />
      {newInstrumentOpen && (
        <NewInstrument isOpen={newInstrumentOpen} handleClose={() => setNewInstrumentOpen(false)} />
      )}
    </>
  );
};

export default App;
