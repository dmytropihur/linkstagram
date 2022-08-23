import Button from '../button';

import styles from './confirm-alert.module.scss';

type ConfirmProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const Confirm: React.FC<React.PropsWithChildren<ConfirmProps>> = ({
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <div className={styles.root}>
      <span className={styles.text}>{children}</span>
      <div className={styles['button-wrapper']}>
        <Button
          variant="accent"
          type="button"
          className={styles.button}
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button type="button" className={styles.button} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
