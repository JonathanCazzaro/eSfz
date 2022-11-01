import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';

const Main: React.FC = () => {
  const {
    welcomeScreen: [welcomeScreen],
  } = useContext(AppData) as AppDataState;
  const [isWelcomeScreenOpen, setIsWelcomeScreenOpen] = useState(welcomeScreen);

  return (
    <main className='h-full w-full'>
      {welcomeScreen && (
        <Modal
          trigger={isWelcomeScreenOpen}
          handleClose={() => setIsWelcomeScreenOpen(false)}
          className='welcome-screen'
        >
          <WelcomeScreen />
        </Modal>
      )}
    </main>
  );
};

export default Main;
