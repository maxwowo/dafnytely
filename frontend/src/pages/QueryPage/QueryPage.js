import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout, Menu, Select, DatePicker } from 'antd';
import Center from '../../components/Center/Center';

const QueryPage = () => {

  const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

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
      <Layout.Sider>
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

      <Layout.Content>
        <Center>
          Some content
        </Center>
      </Layout.Content>
    </FullSizeLayout>
  )
};

export default QueryPage;
