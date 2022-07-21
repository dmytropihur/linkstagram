import cn from 'classnames';

import styles from './button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  variant?: 'accent' | 'regular';
}

const Button: React.FC<Props> = (props) => {
  const { variant, type, children, disabled, className, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={cn(styles.button, styles[`button-${variant}`], className)}
    >
      {children}
    </button>
  );
};

export default Button;
