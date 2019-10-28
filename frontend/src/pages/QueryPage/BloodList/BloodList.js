import React from 'react';
import { Descriptions, List, Typography } from 'antd';

const BloodList = (
  {
    bloodList
  }
) => (
  <List
    header={
      <Typography.Title
        style={{ textAlign: 'center' }}
      >
        Blood List
      </Typography.Title>
    }
    bordered
    dataSource={bloodList}
    renderItem={item => (
      <List.Item>
        <Descriptions
          title={item.type}
          style={{ padding: 10 }}
        >
          <Descriptions.Item label="Type">{item.type}</Descriptions.Item>
          <Descriptions.Item label="Arrival Date">{item['arrival_date']}</Descriptions.Item>
          <Descriptions.Item label="Use by date">{item['use-by-date']}</Descriptions.Item>
          <Descriptions.Item label="Donor ID">{item['donor-id']}</Descriptions.Item>
          <Descriptions.Item label="Lab ID">{item['lab-id']}</Descriptions.Item>
          <Descriptions.Item label="Volume">{item['volume-ml']}</Descriptions.Item>
        </Descriptions>
      </List.Item>
    )}
  />
);

export default BloodList;
