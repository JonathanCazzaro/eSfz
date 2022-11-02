import React from 'react';
import Logo from '../../assets/logo_full.png';

const WelcomeScreen: React.FC = () => {
  return (
    <>
      <img src={Logo} className='mx-auto mt-6 w-56 drop-shadow-xl'></img>
      <div className='mt-6 flex flex-col gap-2 px-8'>
        <h1 className='ml-16 text-xl font-bold uppercase'>Introduction</h1>
        <p>
          Bienvenue sur eSfz, l'application intuitive pour générer ses propres instruments virtuels
          au format SFZ. Vous avez un controlleur midi, des samples, et un logiciel MAO ? Alors vous
          avez tout ce qu'il faut 😃
        </p>
        <p>
          Pour en savoir plus sur le format SFZ, rendez-vous sur
          <a
            href='https://sfzformat.com/'
            className='underline-offset-3 ml-1.5 underline'
            onClick={(e) => {
              e.preventDefault();
              window.api.openExternalLink('https://sfzformat.com/');
            }}
          >
            https://sfzformat.com/
          </a>
        </p>
      </div>
    </>
  );
};

export default WelcomeScreen;
