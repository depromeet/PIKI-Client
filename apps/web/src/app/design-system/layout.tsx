import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-white">
      {children}
    </div>
  );
}

export default Layout;
