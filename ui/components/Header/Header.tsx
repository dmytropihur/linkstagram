import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { ROUTES } from '@/core/config/constants';
import { useAppDispatch } from '@/core/store';
import selectUser from '@/core/store/user/selectors';
import { logout } from '@/core/store/user/slice';

import Avatar from '../Avatar/Avatar';
import LinkComponent from '../Link';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={ROUTES.home}>
          <a className={styles.logo}>Linkstagram</a>
        </Link>
        <div className={styles.linkWrapper}>
          {user?.username ? (
            <>
              <button
                type="button"
                className={`${styles.link} ${styles.button}`}
                onClick={onLogout}
              >
                Logout
              </button>
              <Avatar size="sm" gradient />
            </>
          ) : (
            <>
              <LinkComponent path={ROUTES.login} styleProp="link">
                Login
              </LinkComponent>
              <LinkComponent path={ROUTES.register} styleProp="link">
                Sign Up
              </LinkComponent>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
