import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ROUTES from '@/core/config/routes';

import undefinedUserImg from '../../../../public/images/undefined-user.jpg';

import styles from './avatar.module.scss';

type AvatarProps = {
  size: 'sm' | 'md' | 'lg';
  gradient?: boolean;
  src?: string | null;
};

const Avatar: React.FC<AvatarProps> = ({
  size,
  src = undefinedUserImg,
  gradient,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={ROUTES.profile}>
      <a className={styles.root}>
        <div
          className={cn(
            styles['gradient-wrapper'],
            {
              [styles[`gradient-${size}`]]: gradient,
            },
            { [styles.gradient]: gradient },
          )}
        >
          <div
            className={cn(
              styles['img-wrapper'],
              {
                [styles[`icon-wrapper-${size}-gradient`]]: gradient,
              },
              { [styles[`icon-wrapper-${size}`]]: !gradient },
            )}
          >
            <Image
              className={cn(
                styles.icon,
                {
                  [styles[`icon-${size}`]]: !gradient,
                },
                {
                  [styles[`icon-${size}-gradient`]]: gradient,
                },
              )}
              onError={() => setImageError(true)}
              width={88}
              height={88}
              layout="responsive"
              src={
                imageError
                  ? undefinedUserImg
                  : src || (undefinedUserImg as unknown as string)
              }
              alt="User avatar"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Avatar;
