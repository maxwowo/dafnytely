import React from 'react';
import { Button, Col, Icon, Layout, Row } from 'antd';
import styles from './Navbar.module.less';

const { Header } = Layout;

const Navbar = (
  {
    setSidePanelState,
    sidePanelCollapsed
  }
) => (
  <Header
    className={styles.Navbar}
  >
    <Row
      type="flex"
      align="middle"
      justify="space-between"
      className={styles.navRow}
    >
      <Col>
        <Icon
          type={sidePanelCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => setSidePanelState(!sidePanelCollapsed)}
        />
      </Col>

      <Col>
        <Button
          className={styles.navButton}
        >
          <Icon
            type='login'
          />
          Sign In
        </Button>

        <Button
          className={styles.navButton}
        >
          <Icon
            type='plus-circle'
          />
          Sign Up
        </Button>
      </Col>
    </Row>
  </Header>
);

export default Navbar;
