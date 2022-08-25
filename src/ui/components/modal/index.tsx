import cn from 'classnames';
import ReactDom from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  open,
  onClose,
  className,
}) => {
  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  if (!open) return null;

  document.body.style.overflow = 'hidden';

  return ReactDom.createPortal(
    <>
      <div
        role="button"
        tabIndex={0}
        className={styles.overlay}
        onClick={handleClose}
        onKeyDown={handleClose}
      />
      <div className={cn(styles.modal, className)}>{children}</div>
    </>,
    document.getElementById('portal') as Element,
  );
};

export default Modal;
