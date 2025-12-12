import React, { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  active = false,
  children,
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]} ${active ? styles.active : ''}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;