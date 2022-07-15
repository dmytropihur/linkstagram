import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../core/store';
import selectUser from '../../../core/store/user/selectors';
import { logout } from '../../../core/store/user/slice';
import Avatar from '../Avatar/Avatar';

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
        <Link href="/">
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
              <Link href="/login">
                <a className={styles.link}>Login</a>
              </Link>
              <Link href="/register">
                <a className={styles.link}>Sigh Up</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
