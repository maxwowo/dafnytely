import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout } from 'antd';
import SidePanel from './SidePanel/SidePanel';
import BloodList from './BloodList/BloodList';

const QueryPage = () => {

  const bloodTypes = ['O', 'A', 'B', 'AB',];
  const bloodList = [
    {
      'type': 'A',
      'arrival_date': '2019-08-12',
      'use-by-date': '2019-09-12',
      'donor-id': 'D-12345',
      'lab-id': 'L-12345',
      'volume-ml': 500
    }
  ];

  const onBloodTypeChange = (
    value
  ) => {
    console.log(value);
  };

  const onMinimumExpiryChange = (
    value
  ) => {
    console.log(value);
  };

  return (
    <FullSizeLayout>
      <SidePanel
        bloodTypes={bloodTypes}
        onBloodTypeChange={onBloodTypeChange}
        onMinimumExpiryChange={onMinimumExpiryChange}
      />
      <Layout.Content
        style={{ padding: 10 }}
      >
        <BloodList
          bloodList={bloodList}
        />
      </Layout.Content>
    </FullSizeLayout>
  );
};

export default QueryPage;
