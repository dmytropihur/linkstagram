import React, { ReactNode } from 'react';

import styles from './Error.module.scss';

type Props = {
  children: ReactNode;
};

const Error: React.FC<Props> = ({ children }) => {
  return <div className={styles.error}>{children}</div>;
};

export default Error;
