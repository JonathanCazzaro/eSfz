import React, { useContext } from 'react';
import Logo from '../../assets/logo_round.png';
import Navbutton from './Navbutton';
import {
  HiOutlineDocumentPlus as NewFileIcon,
  HiOutlineFolderOpen as OpenFileIcon,
  HiOutlineQuestionMarkCircle as HelpIcon,
  HiOutlineArrowTopRightOnSquare as ExportIcon,
  HiOutlineCog8Tooth as SettingsIcon,
} from 'react-icons/hi2';
import { IoSaveOutline as SaveIcon } from 'react-icons/io5';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const Navbar: React.FC = () => {
  const {
    settingsOpen: [, setSettingsOpen],
    newInstrumentOpen: [, setNewInstrumentOpen],
    instruments: [instruments, setInstruments],
    saveDir: [saveDir],
    currentTab: [, setCurrentTab],
  } = useContext(AppData) as AppDataState;

  const handleOpenInstrument = async () => {
    const instrumentData = await window.api.openInstrument(saveDir);
    if (instrumentData) {
      setInstruments([...instruments, instrumentData]);
      setCurrentTab(instrumentData);
    }
  };

  return (
    <nav className='h-screen bg-slate-500 bg-opacity-50 shadow-md'>
      <ul className='flex h-full flex-col items-center gap-2 px-1 pb-2'>
        <li className='h-14 w-14 border-b border-slate-500 p-3 pb-4'>
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
          onClick={handleOpenInstrument}
        />
        <Navbutton
          Icon={{ Component: SaveIcon, className: 'scale-[0.9]' }}
          label='Enregistrer'
          onClick={() => null}
        />
        <Navbutton
          Icon={{ Component: ExportIcon }}
          label='Exporter en SFZ...'
          onClick={() => null}
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
          onClick={() => null}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
