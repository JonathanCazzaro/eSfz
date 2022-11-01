import React from 'react';
import Logo from '../../assets/logo.svg';
import Navbutton from './Navbutton';
import {
  HiOutlineDocumentPlus as NewFileIcon,
  HiOutlineFolderOpen as OpenFileIcon,
  HiOutlineQuestionMarkCircle as HelpIcon,
  HiOutlineArrowTopRightOnSquare as ExportIcon,
} from 'react-icons/hi2';
import { IoSaveOutline as SaveIcon } from 'react-icons/io5';
import Settings from '../Settings/Settings';

const Navbar: React.FC = () => {
  return (
    <nav className='h-screen bg-slate-500 bg-opacity-50 shadow-md'>
      <ul className='flex flex-col items-center gap-2 h-full pb-2 px-1'>
        <li className='w-full p-3 pb-4 pl-4 border-b border-slate-500'>
          <img src={Logo} />
        </li>
        <Navbutton
          Icon={{ Component: NewFileIcon }}
          label='Créer un instrument'
          onClick={() => null}
        />
        <Navbutton
          Icon={{ Component: OpenFileIcon }}
          label='Ouvrir un instrument...'
          onClick={() => null}
        />
        <Navbutton
          Icon={{ Component: SaveIcon, className: 'scale-[0.9]' }}
          label="Enregistrer"
          onClick={() => null}
        />
        <Navbutton
          Icon={{ Component: ExportIcon }}
          label="Exporter en SFZ..."
          onClick={() => null}
        />
        <Settings />
        <Navbutton
          className='mt-auto mb-0'
          Icon={{ Component: HelpIcon, className: "scale-110" }}
          label='Aide'
          onClick={() => null}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
