import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './link.module.scss';

type LinkProps = {
  path: string;
  styleProp?: 'link';
  children: ReactNode;
  className?: string;
};

const LinkComponent: React.FC<LinkProps> = ({
  path,
  className,
  styleProp,
  children,
}) => {
  return (
    <Link href={path}>
      <a className={styleProp ? `${styles[styleProp]}` : `${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default LinkComponent;
