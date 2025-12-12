import React from 'react';

interface ImgProps {
  src?: string,
  width?: string;
  height?: string;
  alt?: string;
  cursor?: boolean;
  onClick?: () => void;
}

const Img: React.FC<ImgProps> = ({
  src,
  width = '100px',
  height,
  alt,
  cursor = false,
  onClick
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height, cursor: cursor ? 'pointer' : 'default' }}
      onClick={onClick}
    />
  );
};

export default Img;