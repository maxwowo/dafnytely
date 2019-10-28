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
    name: 'Admin',
    link: '/admin'
  }
];

const findLink = () => (
  links.find(el => el.link === window.location.pathname)
);

class Navbar extends React.Component {

  state = {
    selected: !findLink() ? null : findLink().name
  };

  render() {
    return (
      <Layout.Header
        className={styles.header}
      >
        <Link
          to='/'
          onClick={
            () => {
              this.setState(
                {
                  selected: null
                }
              );
            }
          }
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
          selectedKeys={
            !this.state.selected ? null : [this.state.selected]
          }
          onSelect={
            (e) => {
              this.setState(
                {
                  selected: e.key
                }
              );
            }
          }
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
  }
}

export default Navbar;
