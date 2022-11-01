import { useOnClickOutside } from '@renderer/hooks/useOnClickOutside';
import React, { ReactNode, RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  trigger: boolean;
  className?: string;
  handleClose: () => void;
  closeWhitelist?: RefObject<HTMLElement>[];
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  trigger,
  className,
  handleClose,
  closeWhitelist,
}) => {
  const mountElement = document.getElementById('root');
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = trigger ? 'hidden' : 'auto';
  }, [trigger]);

  useOnClickOutside(childrenRef, handleClose, closeWhitelist || []);

  return !!mountElement && trigger
    ? createPortal(
        <div className='fixed inset-0 z-30 flex items-center justify-center'>
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30'></div>
          <div className={className || 'modal-base'} ref={childrenRef}>
            {children}
          </div>
        </div>,
        mountElement,
      )
    : null;
};

export default Modal;
