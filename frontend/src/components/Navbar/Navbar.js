import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.less';

const Navbar = () => (
  <Layout.Header>
    <img
      src={logo}
      className={styles.logo}
      alt='Logo'
    />
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="query">Query</Menu.Item>
      <Menu.Item key="donate">Donate</Menu.Item>
      <Menu.Item key="admin">Admin</Menu.Item>
    </Menu>
  </Layout.Header>
);

export default Navbar;
