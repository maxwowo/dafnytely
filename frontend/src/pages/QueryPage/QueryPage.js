import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Icon, Layout, Menu } from 'antd';
import Center from '../../components/Center/Center';

const QueryPage = () => {
  return (
    <FullSizeLayout>
      <Layout.Sider>
        <Menu
          theme='dark'
        >
          <Menu.Item>
            <Icon
              type='filter'
            />
            <span>
              boom boom
            </span>
          </Menu.Item>
          <Menu.Item>
            <Icon
              type='filter'
            />
            <span>bang bang</span>
          </Menu.Item>
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
