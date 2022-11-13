import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';
import Settings from '../Settings/Settings';
import NewInstrument from '../Dialogs/NewInstrument/NewInstrument';
import CloseConfirm from '../Dialogs/CloseConfirm/CloseConfirm';

const App: React.FC = () => {
  const {
    settingsOpen: [settingsOpen, setSettingsOpen],
    newInstrumentOpen: [newInstrumentOpen, setNewInstrumentOpen],
    closeConfirm: [closeConfirm, setCloseConfirm],
  } = useContext(AppData) as AppDataState;

  return (
    <>
      <Navbar />
      <Main />
      <Settings isOpen={settingsOpen} handleClose={() => setSettingsOpen(false)} />
      {newInstrumentOpen && (
        <NewInstrument isOpen={newInstrumentOpen} handleClose={() => setNewInstrumentOpen(false)} />
      )}
      {!!closeConfirm.ids.length && (
        <CloseConfirm
          actionType={closeConfirm.actionType}
          instrumentIds={closeConfirm.ids}
          resetIds={() => setCloseConfirm({ actionType: null, ids: [] })}
        />
      )}
    </>
  );
};

export default App;
