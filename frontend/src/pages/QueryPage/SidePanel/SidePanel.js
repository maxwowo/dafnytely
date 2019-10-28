import React from 'react';
import { DatePicker, Layout, Menu } from 'antd';
import BloodTypeFilter from './BloodTypeFilter/BloodTypeFilter';

const SidePanel = (
  {
    bloodTypes,
    onBloodTypeChange,
    onMinimumExpiryChange
  }
) => (
  <Layout.Sider
    style={{ padding: 10 }}
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
