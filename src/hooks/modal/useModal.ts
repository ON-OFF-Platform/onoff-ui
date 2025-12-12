import { useEffect, useState } from "react"

/**
 * This is Modal hooks
 */
interface useModalProps {
  onConfirmCallback?: () => void;
}
export const useModal = ({ onConfirmCallback }: useModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirmCallback?.();
    closeModal();
  }

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (isOpen && e.key === 'Enter') handleConfirm();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
    handleConfirm,
  }
}