import React from 'react';
import { Layout } from 'antd';
import styles from './FullSizeLayout.module.less';

const FullSizeLayout = (
  {
    children
  }
) => (
  <Layout
    className={styles.FullSizeLayout}
  >
    {children}
  </Layout>
);

export default FullSizeLayout;
