import React from 'react';
import styles from './Center.module.less';

const Center = (
  {
    children
  }
) => (
  <div
    className={styles.Center}
  >
    {children}
  </div>
);

export default Center;
