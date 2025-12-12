import styles from './IndexPage.module.scss';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/utils/path';
import { IMAGES } from '@/assets/images';
import { useAuth } from '@/context/auth/AuthContext';
import { useDarkMode } from '@/hooks/dark-mode/useDarkMode';
import Img from '@/components/img/Img';
import Button from '@/components/button/Button';
import IndexLayout from '@/layouts/IndexLayout';
import CenterLayout from '@/layouts/CenterLayout';

const IndexPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  // Redirect to home if token exists
  useEffect(() => {
    if (isLoggedIn) navigate(PATH.HOME);
  }, [isLoggedIn])

  return (
    <IndexLayout>
      <CenterLayout>
        <div className={styles.img}>
          <Img
            src={isDarkMode ? IMAGES.LOGO_NAME_DARK : IMAGES.LOGO_NAME } 
            width='120px'
            alt='logo'/>
        </div>

        <div className={styles.btn}>
          <Button
            variant='tertiary'
            size='xlarge'
            onClick={() => navigate(PATH.LOGIN)}>로그인</Button>

          <Button
            variant='tertiary'
            size='xlarge'
            onClick={() => navigate(PATH.JOIN)}>회원가입</Button>
          
          <div className={styles.btnText} onClick={() => navigate(PATH.HOME)}>
            비회원 입장
          </div>
        </div>
      </CenterLayout>
    </IndexLayout>
  );
};

export default IndexPage;