import React from 'react';
import styles from './Modal.module.scss';

interface ModalContentProps {
  title? : string;
  message? : string;
}

export const ModalContent: React.FC<ModalContentProps> = ({ title, message }) => {
  return(
    <>
      {title && <h2 className={styles.title}>{title}</h2>}
      {message && <h2 className={styles.message}>{message}</h2>}
    </>
  )
}