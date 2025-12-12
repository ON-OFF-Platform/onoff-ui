import React, { useId } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: boolean;
  label?: string;
}
const Checkbox:React.FC<CheckboxProps> = ({
  state = false,
  label,
  ...rest
}) => {
  const id = useId();

  return (
    <div className={styles.checkbox}>
      <input
        id={id}
        type='checkbox'
        checked={state}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;