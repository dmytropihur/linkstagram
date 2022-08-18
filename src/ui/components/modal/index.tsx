import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        role="button"
        tabIndex={0}
        className={styles.overlay}
        onClick={onClose}
        onKeyDown={onClose}
      />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById('portal') as Element,
  );
};

export default Modal;
