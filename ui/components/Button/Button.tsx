import { NextPage } from 'next';

import styles from './Button.module.scss';

type ButtonProps = {
  type?: string;
  text: string;
  disabled?: boolean;
};

const Button: NextPage<ButtonProps> = ({ type, text, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${
        type === 'accent'
          ? styles[`button-${type}`]
          : `${styles[`button-regular`]}`
      } ${styles.button}`}
    >
      {text}
    </button>
  );
};

export default Button;
