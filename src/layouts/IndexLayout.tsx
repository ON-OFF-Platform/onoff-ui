import { type ReactNode } from 'react';

interface IndexLayoutProps {
  children?: ReactNode; // optional로 지정
}

const IndexLayout = ({ children }: IndexLayoutProps) => {
  return (
    <div className="_index_layout">
      {children}
    </div>
  );
};

export default IndexLayout;