import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store';
import selectUser from '@/core/store/user/selectors';
import { clearError } from '@/core/store/user/slice';

type LayoutProps = {
  children: React.ReactNode;
};

const Header = dynamic(() => import('../header'), {
  ssr: false,
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { error } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [router.route]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
