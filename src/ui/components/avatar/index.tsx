import Image from 'next/future/image';
import Link from 'next/link';
import { useState } from 'react';

import ROUTES from '@/core/config/routes';
import undefinedUserImg from '@/public/images/undefined-user.svg';

import styles from './avatar.module.scss';

type AvatarProps = {
  size: 'sm' | 'md' | 'lg';
  gradient?: boolean;
  src: string | null;
};

const Avatar: React.FC<AvatarProps> = ({ size, src, gradient }) => {
  const [source, setSource] = useState(src);

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
            onError={() => {
              setSource(undefinedUserImg);
            }}
            width={100}
            height={100}
            src={source || undefinedUserImg}
            alt="User avatar"
          />
        </div>
      </a>
    </Link>
  );
};

export default Avatar;
