import { useInit } from '@renderer/hooks/useInit';
import React from 'react';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';

const App: React.FC = () => {
  useInit();

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
};

export default App;
