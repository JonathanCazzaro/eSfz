import React, { useContext } from 'react';
import Logo from '../../assets/logo_round.png';
import Navbutton from './Navbutton';
import {
  HiOutlineDocumentPlus as NewFileIcon,
  HiOutlineFolderOpen as OpenFileIcon,
  HiOutlineQuestionMarkCircle as HelpIcon,
  HiOutlineCog8Tooth as SettingsIcon,
} from 'react-icons/hi2';
import { IoSaveOutline as SaveIcon } from 'react-icons/io5';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const Navbar: React.FC = () => {
  const {
    settingsOpen: [, setSettingsOpen],
    newInstrumentOpen: [, setNewInstrumentOpen],
    currentTabId: [currentTabId],
    instruments: [instruments],
    saveInstruments,
    openInstrument,
  } = useContext(AppData) as AppDataState;

  return (
    <nav className='h-screen bg-slate-500 bg-opacity-50 shadow-md'>
      <ul className='flex h-full flex-col items-center gap-2 px-1 pb-2'>
        <li className='draggable h-14 w-14 border-b border-slate-500 p-3 pb-4'>
          <img src={Logo} className='shadow-xl contrast-[0.85]' />
        </li>
        <Navbutton
          Icon={{ Component: NewFileIcon }}
          label='Créer un instrument'
          onClick={() => setNewInstrumentOpen(true)}
        />
        <Navbutton
          Icon={{ Component: OpenFileIcon }}
          label='Ouvrir un instrument...'
          onClick={openInstrument}
        />
        <Navbutton
          Icon={{ Component: SaveIcon, className: `scale-[0.9]` }}
          label="Enregistrer l'instrument courant"
          onClick={() => currentTabId && saveInstruments([currentTabId])}
          className={
            currentTabId && !instruments.find(({ id }) => id === currentTabId)?.saved
              ? 'unsaved after:top-2.5 after:right-2.5 after:scale-125'
              : undefined
          }
        />
        <Navbutton
          Icon={{ Component: SettingsIcon, className: 'scale-110' }}
          label='Paramètres'
          onClick={() => setSettingsOpen(true)}
        />
        <Navbutton
          className='mt-auto mb-0'
          Icon={{ Component: HelpIcon, className: 'scale-110' }}
          label='Aide'
          onClick={() => window.api.openExternalLink('https://github.com/JonathanCazzaro/eSfz')}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
