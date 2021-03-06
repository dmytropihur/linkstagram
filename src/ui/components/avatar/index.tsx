import Image from 'next/image';
import Link from 'next/link';

import ROUTES from '@/core/config/routes';
import icon from '@/public/images/icon.png';

import styles from './avatar.module.scss';

type AvatarProps = {
  size: 'sm' | 'md' | 'lg';
  gradient?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({ size, gradient }) => {
  return (
    <Link href={ROUTES.profile}>
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
            alt="User avatar"
          />
        </div>
      </a>
    </Link>
  );
};

export default Avatar;
