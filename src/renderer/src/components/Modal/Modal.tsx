import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  trigger: boolean;
  className?: string;
  backgroundClassName?: string;
  handleClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  trigger,
  className,
  backgroundClassName,
  handleClose,
}) => {
  const mountElement = document.getElementById('root');
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = trigger ? 'hidden' : 'auto';
  }, [trigger]);

  return !!mountElement && trigger
    ? createPortal(
        <div className='fixed inset-0 z-30 flex items-center justify-center'>
          <div
            onClick={handleClose}
            className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 ${
              backgroundClassName || ''
            }`}
          ></div>
          <div className={className || 'modal-base'} ref={childrenRef}>
            {children}
          </div>
        </div>,
        mountElement,
      )
    : null;
};

export default Modal;
