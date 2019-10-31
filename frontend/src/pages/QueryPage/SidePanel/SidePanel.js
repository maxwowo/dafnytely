import React from 'react';
import { DatePicker, Layout, Menu, Button } from 'antd';
import BloodTypeFilter from './BloodTypeFilter/BloodTypeFilter';
import styles from './SidePanel.module.less';

const SidePanel = (
  {
    bloodTypes,
    onBloodTypeChange,
    onMinimumExpiryChange,
    bloodTypeFilter,
    expiryDateFilter,
    onClearButtonClicked
  }
) => (
  <Layout.Sider
    width='20%'
    className={styles.sider}
  >
    <Menu
      theme='light'
      className={styles.menu}
    >
      <BloodTypeFilter
        bloodTypes={bloodTypes}
        onBloodTypeChange={onBloodTypeChange}
        bloodTypeFilter={bloodTypeFilter}
      />

      <DatePicker
        onChange={onMinimumExpiryChange}
        value={expiryDateFilter}
        mode='date'
        placeholder='Filter by minimum expiry date'
        showToday={false}
        className={styles.datePicker}
      />

    </Menu>

    <Button
      onClick={onClearButtonClicked}
      className={styles.clearButton}
    >
      Clear
    </Button>
  </Layout.Sider>
);

export default SidePanel;
