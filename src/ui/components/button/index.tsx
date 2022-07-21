import cx from 'classnames';

import styles from './button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'accent' | 'regular';
}

const Button: React.FC<Props> = (props) => {
  const { variant, type, children, disabled, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={cx(styles.button, styles[`button-${variant}`])}
    >
      {children}
    </button>
  );
};

export default Button;
