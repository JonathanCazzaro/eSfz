import React, { useState } from 'react';

interface WelcomeScreenOptionProps {
  label: string;
  className: string;
}

const WelcomeScreenOption: React.FC<WelcomeScreenOptionProps> = ({ label, className }) => {
  const config = localStorage.getItem('welcome_screen');
  const [isActive, setIsActive] = useState(typeof config === 'string' ? !!config : true);

  return (
    <div className={className}>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          name='welcome-screen'
          id='welcome-screen'
          checked={isActive}
          onChange={({ currentTarget: { checked } }) => {
            localStorage.setItem('welcome_screen', checked ? 'on' : '');
            setIsActive(checked);
          }}
        />
        <label htmlFor='welcome-screen'>{label}</label>
      </div>
    </div>
  );
};

export default WelcomeScreenOption;
