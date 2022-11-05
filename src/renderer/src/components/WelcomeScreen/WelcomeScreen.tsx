import React, { useContext } from 'react';
import Logo from '../../assets/logo_full.png';
import {
  HiOutlineDocumentPlus as NewFileIcon,
  HiOutlineFolderOpen as OpenFileIcon,
  HiOutlineCog8Tooth as SettingsIcon,
} from 'react-icons/hi2';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const WelcomeScreen: React.FC = () => {
  const {
    settingsOpen: [, setSettingsOpen],
    newInstrumentOpen: [, setNewInstrumentOpen],
    openInstrument,
  } = useContext(AppData) as AppDataState;

  return (
    <div className='mt-2 flex w-full flex-col items-center justify-center gap-10'>
      <img src={Logo} className='mx-auto max-w-xs drop-shadow-xl'></img>
      <div className='mx-auto flex max-w-[52rem] flex-col gap-2 rounded-md bg-slate-500 bg-opacity-30 py-6 px-8 text-slate-300'>
        <p>
          Bienvenue sur <strong>eSfz</strong>, l'application intuitive pour générer ses propres
          instruments virtuels au format SFZ. Vous avez un controlleur midi, des samples, et un
          logiciel MAO ? Alors vous avez tout ce qu'il faut 😃
        </p>
        <p>
          Pour en savoir plus sur le format SFZ, rendez-vous sur
          <a
            href='https://sfzformat.com/'
            className='underline-offset-3 ml-1.5 underline hover:brightness-150'
            onClick={(e) => {
              e.preventDefault();
              window.api.openExternalLink('https://sfzformat.com/');
            }}
          >
            https://sfzformat.com/
          </a>
        </p>
        <p>Quant à ceux qui se demandent pourquoi cet oiseau... pourquoi pas ?</p>
        <div className='mt-2 flex items-center gap-4 whitespace-nowrap rounded-md bg-slate-500 bg-opacity-30 p-4'>
          <p className='text-slate-300'>Par quoi commence-t-on ?</p>
          <div className='flex w-full justify-center gap-4'>
            <button className='secondary-button' onClick={() => setNewInstrumentOpen(true)}>
              <NewFileIcon />
              Créer un instrument
            </button>
            <button className='secondary-button' onClick={openInstrument}>
              <OpenFileIcon />
              Ouvrir un instrument
            </button>
            <button className='secondary-button' onPointerDown={() => setSettingsOpen(true)}>
              <SettingsIcon />
              Paramétrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
