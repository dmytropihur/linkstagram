import styles from './button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'accent' | 'regular';
}

const Button: React.FC<Props> = ({
  type = 'button',
  disabled,
  variant,
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
