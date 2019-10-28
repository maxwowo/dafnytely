import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout, Menu, Select, DatePicker, List, Descriptions, Typography } from 'antd';

const QueryPage = () => {

  const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
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
      <Layout.Sider
        style={{ padding: 10 }}
      >
        <Menu
          theme='dark'
        >
          <Select
            placeholder="Filter by blood type"
            optionFilterProp="children"
            style={{ width: '100%' }}
            onChange={onBloodTypeChange}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              bloodTypes.map(
                el => (
                  <Select.Option
                    value={el}
                    key={el}
                  >
                    {`Type ${el}`}
                  </Select.Option>
                )
              )
            }
          </Select>

          <DatePicker
            onChange={onMinimumExpiryChange}
            mode='date'
            placeholder='Filter by minimum expiry date'
          />

        </Menu>
      </Layout.Sider>

      <Layout.Content
        style={{ padding: 10 }}
      >
        <List
          header={<Typography.Title style={{ textAlign: 'center' }}>Blood list</Typography.Title>}
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
      </Layout.Content>
    </FullSizeLayout>
  )
};

export default QueryPage;
