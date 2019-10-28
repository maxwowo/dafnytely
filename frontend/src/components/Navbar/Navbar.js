import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.less';

const Navbar = () => (
  <Layout.Header
    className={styles.header}
  >
    <img
      src={logo}
      className={styles.logo}
      alt='Logo'
    />
    <Menu
      theme="light"
      mode="horizontal"
      className={styles.menu}
    >
      <Menu.Item
        key="query"
        className={styles.menuItem}
      >
        Query
      </Menu.Item>
      <Menu.Item
        key="donate"
        className={styles.menuItem}
      >
        Donate
      </Menu.Item>
      <Menu.Item
        key="admin"
        className={styles.menuItem}
      >
        Admin
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

export default Navbar;
