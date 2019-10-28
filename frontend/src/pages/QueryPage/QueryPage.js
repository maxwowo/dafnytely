import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Icon, Layout, Menu } from 'antd';

const QueryPage = () => {
  return (
    <FullSizeLayout>
      <Layout.Sider>
        <Menu>
          <Menu.Item>
            noeu
          </Menu.Item>
          <Menu.Item>
            oaentuh
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout.Content>
        Some content
      </Layout.Content>
    </FullSizeLayout>
  )
};

export default QueryPage;
