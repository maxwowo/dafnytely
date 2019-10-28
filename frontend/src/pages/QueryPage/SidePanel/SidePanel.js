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
    width='20%'
    className={styles.sider}
  >
    <Menu
      theme='light'
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
        className={styles.datePicker}
      />

    </Menu>
  </Layout.Sider>
);

export default SidePanel
