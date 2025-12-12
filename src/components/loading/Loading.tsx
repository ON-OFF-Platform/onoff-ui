import React, { useEffect, useState } from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  text?: string;
  timeout: number;
  onFinish?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'ONOFF, 일상의 시작과 끝', 
  timeout = 3500,
  onFinish,
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), timeout - 500);

    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, timeout);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [timeout, onFinish]);

  return (
    <div className={`${styles.bg} ${fade ? styles.fadeOut : ''}`}>
      <h4 className={styles.text}>
        {text.split('').map((char, idx) => (
          <span
            key={idx}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h4>
    </div>
  );
};

export default Loading;