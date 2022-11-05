import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';
import Settings from '../Settings/Settings';
import NewInstrument from '../Dialogs/NewInstrument/NewInstrument';
import QuitConfirm from '../Dialogs/QuitConfirm/QuitConfirm';

const App: React.FC = () => {
  const {
    settingsOpen: [settingsOpen, setSettingsOpen],
    newInstrumentOpen: [newInstrumentOpen, setNewInstrumentOpen],
    quitConfirm: [quitConfirm, setQuitConfirm],
  } = useContext(AppData) as AppDataState;

  return (
    <>
      <Navbar />
      <Main />
      <Settings isOpen={settingsOpen} handleClose={() => setSettingsOpen(false)} />
      {newInstrumentOpen && (
        <NewInstrument isOpen={newInstrumentOpen} handleClose={() => setNewInstrumentOpen(false)} />
      )}
      {quitConfirm.length && <QuitConfirm instrumentIds={quitConfirm} />}
    </>
  );
};

export default App;
