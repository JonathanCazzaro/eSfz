import React, { RefObject, useState } from 'react';
import { IconType } from 'react-icons';

interface NavbuttonProps {
  Icon: {
    Component: IconType;
    className?: string;
  };
  label: string;
  onClick: () => void;
  className?: string;
  nodeRef?: RefObject<HTMLLIElement>;
}

const Navbutton: React.FC<NavbuttonProps> = ({ Icon, label, onClick, className, nodeRef }) => {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <li className={`relative ${className || ''}`} ref={nodeRef}>
      <button
        className='navbar-button'
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        onClick={onClick}
      >
        <Icon.Component className={Icon.className} />
      </button>
      {showLabel && <span className='navbar-button-label'>{label}</span>}
    </li>
  );
};

export default Navbutton;
