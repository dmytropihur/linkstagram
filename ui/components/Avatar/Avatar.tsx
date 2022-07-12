import { NextPage } from 'next';
import Link from 'next/link';

import icon from '../../../public/images/icon.png';

import styles from './Avatar.module.scss';

type AvatarProps = {
  size: 'sm' | 'md' | 'lg';
  gradient?: boolean;
};

const Avatar: NextPage<AvatarProps> = ({ size, gradient }) => {
  return (
    <Link href="profile">
      <a className={styles.root}>
        {gradient && (
          <div className={`${styles[`gradient-${size}`]} ${styles.gradient}`}>
            <img
              className={`${styles[`icon-${size}-gradient`]} ${styles.icon}`}
              src={icon.src}
              alt=""
            />
          </div>
        )}
        {!gradient && (
          <div>
            <img
              className={`${styles[`icon-${size}`]} ${styles.icon}`}
              src={icon.src}
              alt=""
            />
          </div>
        )}
      </a>
    </Link>
  );
};

export default Avatar;
