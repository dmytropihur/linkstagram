import { ReactNode } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  variant?: string;
  disabled?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant,
  disabled,
  children,
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`${
        variant ? styles[`button-${variant}`] : `${styles[`button-regular`]}`
      } ${styles.button}`}
    >
      {children}
    </button>
  );
};

export default Button;
