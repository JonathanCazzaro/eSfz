import React from 'react';
import Logo from '../../assets/logo_round.png';

const WelcomeScreen: React.FC = () => {
  return (
    <>
      <img src={Logo} className="mx-auto w-56 mt-6 drop-shadow-xl"></img>
    </>
  );
};

export default WelcomeScreen;
