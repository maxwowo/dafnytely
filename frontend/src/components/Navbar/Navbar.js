import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.less';

const links = [
  {
    name: 'Query',
    link: '/query'
  },
  {
    name: 'Donate',
    link: '/donate'
  },
  {
    name: 'Request',
    link: '/request'
  },
  {
    name: 'Admin',
    link: '/admin'
  }
];

const Navbar = () => (
  <Layout.Header
    className={styles.header}
  >
    <Link
      to='/'
    >
      <img
        src={logo}
        className={styles.logo}
        alt='Logo'
      />
    </Link>
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={null}
      className={styles.menu}
    >
      {
        links.map(
          el => (
            <Menu.Item
              key={el.name}
              className={styles.menuItem}
            >
              <Link
                to={el.link}
              >
                {el.name}
              </Link>
            </Menu.Item>
          )
        )
      }
    </Menu>
  </Layout.Header>
);


export default Navbar;
