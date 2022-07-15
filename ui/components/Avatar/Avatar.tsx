import { NextPage } from 'next';
import Image from 'next/image';
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
        <div
          className={
            gradient ? `${styles[`gradient-${size}`]} ${styles.gradient}` : ''
          }
        >
          <Image
            className={
              gradient
                ? `${styles[`icon-${size}-gradient`]} ${styles.icon}`
                : `${styles[`icon-${size}`]} ${styles.icon}
              `
            }
            width="100%"
            height="100%"
            src={icon.src}
            alt=""
          />
        </div>
      </a>
    </Link>
  );
};

export default Avatar;
