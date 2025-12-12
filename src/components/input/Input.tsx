import { forwardRef, useRef, useState, type InputHTMLAttributes } from 'react';
import { useId } from 'react';
import styles from './Input.module.scss';

type InputVariant = 'default' | 'disabled' | 'error';
type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    variant = 'default',
    inputSize = 'medium',
    label,
    errorMessage,
    ...rest
  }, ref
) => {

  const [isFocused, setIsFocused] = useState(false);

  const id = useId();

  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || internalRef;

  const hasValue = rest.value !== undefined ? rest.value : internalRef.current?.value ?? '';


  return (
    <div className={styles.inputWrapper}>
      {label && 
        <label
          htmlFor={id}
          className={`${styles.label} 
                      ${styles[inputSize]} 
                      ${isFocused || hasValue ? styles[`focused_${inputSize}`] : ''} 
                      ${isFocused && styles.isFocused} `}>
            {label}
        </label>
      }
      <input
        ref={inputRef}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.input} ${styles[variant]} ${styles[inputSize]}`}
        {...rest}
        disabled={variant === 'disabled'}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
});

export default Input;