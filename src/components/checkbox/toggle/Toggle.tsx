import React from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
  largeLabel?: boolean;
  state?: boolean;
  on?: string;
  off?: string;
  onClick?: () => void;
}
const Toggle: React.FC<ToggleProps> = ({
  largeLabel = false,
  state = false,
  on = 'ON',
  off = 'OFF',
  onClick
}) => {
  return (
    <div className={styles.toggle}>
      <span className={`${largeLabel ? styles.largeLabel : styles.label}`}>{ state ? on : off }</span>

      <div className={`${styles.switch} ${ state ? styles.active : ''}`} onClick={() => onClick?.()}>
        <div className={`${styles.btn} ${ state ? styles.active : ''}`}></div>
      </div>
    </div>
  );
};

export default Toggle;