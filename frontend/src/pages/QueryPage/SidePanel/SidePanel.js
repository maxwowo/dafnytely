import React from 'react';
import { DatePicker, Layout, Menu } from 'antd';
import BloodTypeFilter from './BloodTypeFilter/BloodTypeFilter';
import styles from './SidePanel.module.less'

const SidePanel = (
  {
    bloodTypes,
    onBloodTypeChange,
    onMinimumExpiryChange
  }
) => (
  <Layout.Sider
    className={styles.sider}
  >
    <Menu
      theme='dark'
    >
      <BloodTypeFilter
        bloodTypes={bloodTypes}
        onBloodTypeChange={onBloodTypeChange}
      />

      <DatePicker
        onChange={onMinimumExpiryChange}
        mode='date'
        placeholder='Filter by minimum expiry date'
        showToday={false}
      />

    </Menu>
  </Layout.Sider>
);

export default SidePanel
