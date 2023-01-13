import React, { useContext } from 'react';
import Logo from '../../assets/logo_round.png';
import Navbutton from './Navbutton';
import { HiOutlineDocumentPlus as NewFileIcon, HiOutlineFolderOpen as OpenFileIcon, HiOutlineCog8Tooth as SettingsIcon } from 'react-icons/hi2';
import { IoLogoGithub as GithubIcon } from 'react-icons/io5';
import { VscSave as SaveIcon, VscSaveAll as SaveAllIcon } from 'react-icons/vsc';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { TranslationData } from '../Translation/Translation';

const Navbar: React.FC = () => {
  const {
    settingsOpen: [, setSettingsOpen],
    newInstrumentOpen: [, setNewInstrumentOpen],
    currentTabId: [currentTabId],
    instruments: [instruments],
    saveInstruments,
    openInstrument,
  } = useContext(AppData) as AppDataState;
  const { buttons, headers } = useContext(TranslationData);

  return (
    <nav className='h-screen bg-slate-500 bg-opacity-50 shadow-md'>
      <ul className='flex h-full flex-col items-center gap-2 px-1 pb-2'>
        <li className='draggable h-14 w-14 border-b border-slate-500 p-3 pb-4'>
          <img src={Logo} className='shadow-xl contrast-[0.85]' />
        </li>
        <Navbutton Icon={{ Component: NewFileIcon }} label={buttons.createInstrument[0]} onClick={() => setNewInstrumentOpen(true)} />
        <Navbutton
          Icon={{ Component: OpenFileIcon }}
          label={buttons.openInstrument[0]}
          onClick={() => openInstrument({ buttonLabel: buttons.validate[0], dialogTitle: headers.selectInstrument[0] })}
        />
        <Navbutton
          Icon={{ Component: SaveIcon, className: `scale-[0.9]` }}
          label={buttons.saveInstrument[0]}
          onClick={() => currentTabId && saveInstruments([currentTabId])}
          className={
            currentTabId && !instruments.find(({ id }) => id === currentTabId)?.saved ? 'unsaved after:top-2.5 after:right-2.5 after:scale-125' : undefined
          }
        />
        <Navbutton
          Icon={{ Component: SaveAllIcon }}
          label={buttons.saveAll[0]}
          onClick={() => {
            const unsavedInstruments = instruments.filter(({ saved }) => !saved).map(({ id }) => id);
            if (unsavedInstruments.length) saveInstruments(unsavedInstruments);
          }}
          className={instruments.find(({ saved }) => !saved) ? 'unsaved after:top-2.5 after:right-2.5 after:scale-125' : undefined}
        />
        <Navbutton Icon={{ Component: SettingsIcon, className: 'scale-110' }} label={buttons.openSettings[0]} onClick={() => setSettingsOpen(true)} />
        <Navbutton
          className='mt-auto mb-0'
          Icon={{ Component: GithubIcon, className: 'scale-125' }}
          label={buttons.openGithub[0]}
          onClick={() => window.api.openExternalLink('https://github.com/JonathanCazzaro/eSfz')}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
