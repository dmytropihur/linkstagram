import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  variant?: string;
  disabled?: boolean;
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
};

const Button: NextPage<ButtonProps> = ({
  type,
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
        variant === 'accent'
          ? styles[`button-${variant}`]
          : `${styles[`button-regular`]}`
      } ${styles.button}`}
    >
      {children}
    </button>
  );
};

export default Button;
