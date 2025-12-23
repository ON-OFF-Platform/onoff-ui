import styles from './LoginPage.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/utils/path';
import { IMAGES } from '@/assets/images';
import { handleLogin } from '@/services/services';
import { ModalContent } from '@/components/modal/ModalContent';
import { useModal } from '@/hooks/modal/useModal';
import { useAuth } from '@/context/auth/AuthContext';
import { useDarkMode } from '@/hooks/dark-mode/useDarkMode';
import Img from '@/components/img/Img';
import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import IndexLayout from '@/layouts/IndexLayout';
import CenterLayout from '@/layouts/CenterLayout';

const LoginPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const navigate = useNavigate();

  // State to track if login was successful
  const [isSuccess, setIsSuccess] = useState(false);

  // Input field states
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Refs to input elements for focusing
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  // Error message states
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Modal content states
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Redirect to home if token exists
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) navigate(PATH.HOME);
    console.log('login: ' + isLoggedIn)
  }, [isLoggedIn])

  // Login form handler
  const loginForm = async () => {
    setIdError('');
    setPasswordError('');
    setTitle('');
    setMessage('');

    if (!userId.trim()) {
      setIdError('아이디를 입력하세요.');
      idRef.current?.focus(); 
      return;
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력하세요.');
      pwdRef.current?.focus(); 
      return;
    }

    try {
      const data = await handleLogin(userId, password);
      setIsSuccess(true);
      openModal();
      setTitle(`${data.userName}님, 환영합니다.`);
    } catch (e) {
      setIsSuccess(false);
      openModal();
      setTitle('로그인 실패');
      setMessage('일치하는 회원정보가 없습니다. \n다시 입력해 주세요.');
      setUserId('');
      setPassword('');
    }
  };

  // Callback when modal confirm is clicked
  const handleLoginConfirm = () => {
    if (isSuccess) {
      navigate(PATH.HOME)
      window.location.reload();
    } else {
      idRef.current?.focus();
    }
  }

  // Modal hook
  const { isOpen, openModal, closeModal, handleConfirm } = useModal({
    onConfirmCallback : handleLoginConfirm
  });


  return (
    <IndexLayout>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        width={30}
      >
        <ModalContent
          title={title}
          message={message}
        />
      </Modal>

      <CenterLayout>
        <div className={styles.img}>
          <Img 
            src={isDarkMode ? IMAGES.LOGO_NAME_DARK : IMAGES.LOGO_NAME } 
            width='120px'
            alt='logo'
            onClick={() => navigate(PATH.INDEX)}/>
        </div>

        <Input
          ref={idRef}
          inputSize='large'
          label='ID'
          errorMessage={idError}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          ref={pwdRef}
          inputSize='large'
          type='password'
          label='PASSWORD'
          errorMessage={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              loginForm();
            }
          }}
        />

        <Button size='large' onClick={loginForm}>
          LOGIN
        </Button>
      </CenterLayout>
    </IndexLayout>
  );
};

export default LoginPage;