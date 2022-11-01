import React, { useContext, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import Navbutton from '../Navbar/Navbutton';
import { HiOutlineCog8Tooth as SettingsIcon, HiOutlineXMark as CloseIcon } from 'react-icons/hi2';
import { AiFillFolderOpen as FolderIcon } from 'react-icons/ai';
import MidiDeviceSelector from './MidiDeviceSelector';
import AudioDeviceSelector from './AudioDeviceSelector';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    welcomeScreen: [welcomeScreen, setWelcomeScreen],
    saveDir: [saveDir, setSaveDir],
  } = useContext(AppData) as AppDataState;
  const actionerRef = useRef<HTMLLIElement>(null);

  const handleSetSplashScreen = () => {
    localStorage.setItem('welcome_screen', welcomeScreen ? '' : 'on');
    setWelcomeScreen(!welcomeScreen);
  };

  const handleSetSaveDir = async () => {
    const path = await window.fs.pickFolder(saveDir);
    if (path) {
      localStorage.setItem('save_dir', path);
      setSaveDir(path);
    }
  };

  return (
    <>
      <Navbutton
        Icon={{ Component: SettingsIcon, className: 'scale-110' }}
        label='Paramètres'
        onClick={() => setIsOpen(true)}
        nodeRef={actionerRef}
      />
      <Modal
        handleClose={() => setIsOpen(false)}
        trigger={isOpen}
        closeWhitelist={[actionerRef]}
        className='w-[38rem]'
      >
        <button className='modal-close-button' onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </button>
        <header className='p-4 font-bold text-2xl uppercase border-b border-slate-800'>
          <h1 className='flex items-center gap-4'>
            <SettingsIcon size={38} />
            Paramètres
          </h1>
        </header>
        <div className='p-4'>
          <h2 className='w-full bg-slate-800 text-slate-400 font-semibold pl-9 py-1 rounded-md'>
            Général
          </h2>
          <div className='px-2 mt-2 mb-2 border-b border-slate-500 pb-2'>
            <div className='flex gap-3 items-center'>
              <input
                type='checkbox'
                name='splashscreen'
                id='splashscreen'
                checked={welcomeScreen}
                onChange={handleSetSplashScreen}
              />
              <label htmlFor='splashscreen'>Ouvrir l'écran d'accueil au démarrage</label>
            </div>
          </div>
          <div className='px-2 mb-4'>
            <div className='flex gap-3 items-center whitespace-nowrap'>
              <p>Répertoire d'enregistrement par défaut :</p>
              <div className='bg-slate-100 rounded-lg w-full gap-2 flex items-center px-2'>
                <input
                  type='text'
                  value={saveDir}
                  readOnly
                  className='bg-transparent w-full outline-none text-sm py-1'
                />
                <button className='border-l pl-2 border-slate-300' onClick={handleSetSaveDir}>
                  <FolderIcon />
                </button>
              </div>
            </div>
          </div>
          <h2 className='w-full bg-slate-800 text-slate-400 font-semibold pl-9 py-1 rounded-md mb-2'>
            Entrée midi
          </h2>
          <div className='px-2 mt-2 mb-4'>
            <MidiDeviceSelector />
          </div>
          <h2 className='w-full bg-slate-800 text-slate-400 font-semibold pl-9 py-1 rounded-md mb-2'>
            Sortie audio principale
          </h2>
          <div className='px-2 mt-2 mb-4'>
            <AudioDeviceSelector />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
