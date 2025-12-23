import React, { type ReactNode } from 'react';
import styles from './Modal.module.scss';
import Button from '@/components/button/Button';

interface ModalProps {
  isOpen: boolean,
  isBackgroundClick?: boolean
  isDouble?: boolean
  btn?: string;
  onConfirm?: () => void;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  textAlign?: 'left' | 'center' | 'right';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  isBackgroundClick = true,
  isDouble = false,
  btn = '확인',
  onClose, 
  onConfirm, 
  children,
  width = 80,
  textAlign = 'left'
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: any) => {
    if (e.target.classList.contains(styles.bg) && isBackgroundClick) {
      onClose();
    }
  }

  return (
    <div className={styles.bg} onClick={handleBackgroundClick}>
      <div style={{ width: `${width}%` }} className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ textAlign: `${textAlign}`}} className={styles.content}>{children}</div>

        <div className={styles.btn}>
          <Button onClick={onConfirm}>{btn}</Button>
          {isDouble && <Button variant='secondary' onClick={onClose}>취소</Button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;