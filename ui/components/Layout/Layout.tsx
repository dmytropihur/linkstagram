import { NextPage } from 'next';

import Header from '../Header/Header';

// import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
