import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './link.module.scss';

type LinkProps = {
  path: string;
  styleProp: string;
  children: ReactNode;
};

const LinkComponent: React.FC<LinkProps> = ({ path, styleProp, children }) => {
  return (
    <Link href={path}>
      <a className={`${styles}.${styleProp}`}>{children}</a>
    </Link>
  );
};

export default LinkComponent;
