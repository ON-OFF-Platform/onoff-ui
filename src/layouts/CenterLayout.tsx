import { type ReactNode } from 'react';

interface IndexLayoutProps {
  children?: ReactNode;
}

const CenterLayout = ({ children }: IndexLayoutProps) => {
  return (
    <div className='_center_layout'>
      {children}
    </div>
  );
}; 

export default CenterLayout;