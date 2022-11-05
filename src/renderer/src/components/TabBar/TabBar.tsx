import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';
import { IoMdAddCircle as AddIcon, IoMdCloseCircle as RoundedCloseIcon } from 'react-icons/io';
import {
  MdOutlineCheckBoxOutlineBlank as MaximizeIcon,
  MdOutlineClose as CloseIcon,
  MdMinimize as MinimizeIcon,
} from 'react-icons/md';

const TabBar: React.FC = () => {
  const {
    currentTabId: [currentTabId, setCurrentTabId],
    instruments: [instruments],
    newInstrumentOpen: [, setNewInstrumentOpen],
    closeInstrument,
  } = useContext(AppData) as AppDataState;

  return (
    <div className='draggable relative flex h-10 w-full px-4 pt-2'>
      <div className='absolute inset-0 z-0 border-b border-slate-600 backdrop-brightness-50'></div>
      <button
        className={`welcome-tab-button ${currentTabId ? 'border-b-slate-600 brightness-90' : ''}`}
        onClick={() => setCurrentTabId(0)}
      >
        Bienvenue
      </button>
      {instruments.map((instrument) => (
        <div
          key={instrument.id}
          className={`instrument-tab-button ${
            !currentTabId || currentTabId !== instrument.id
              ? 'border-b-slate-600 brightness-90'
              : ''
          }`}
        >
          <button
            className={`relative ${!instrument.saved ? 'unsaved' : ''}`}
            onClick={() => setCurrentTabId(instrument.id)}
          >
            {instrument.name}
          </button>
          <button onClick={() => closeInstrument(instrument.id, true)}>
            <RoundedCloseIcon className='scale-125' />
          </button>
        </div>
      ))}
      <button className='add-tab-button' onClick={() => setNewInstrumentOpen(true)}>
        <AddIcon className='h-6 w-6 scale-110' />
      </button>
      {!window.api.getPlatform().isMac && (
        <div className='undraggable ml-auto mr-0 mb-2 flex items-center gap-4 text-slate-400'>
          <p className='mx-4 text-slate-300'>eSfz</p>
          <button className='relative z-50' onClick={() => window.api.minimizeApp()}>
            <MinimizeIcon className='mb-1 scale-125 hover:text-slate-200' />
          </button>
          <button className='relative z-50' onClick={() => window.api.maximizeApp()}>
            <MaximizeIcon className='mt-px hover:text-slate-200' />
          </button>
          <button className='relative z-50' onClick={() => window.api.quitApp()}>
            <CloseIcon className='scale-110 hover:text-slate-200' />
          </button>
        </div>
      )}
    </div>
  );
};

export default TabBar;
