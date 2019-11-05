import React from 'react';
import { Button, Col, Descriptions, Empty, Layout, List, notification, Row } from 'antd';
import Axios from 'axios';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import styles from './AdminPage.module.less';
import { BLOOD_UNIT_SIZE } from '../../constants/bloodConstants';

const dummyBlood = [
  {
    type: 'A',
    arrival_date: '2018-19-20',
    use_by_date: '2020-19-20',
    donor_id: 'AB-12345',
    lab_id: 'CD-12345'
  },
  {
    type: 'B',
    arrival_date: '2018-19-20',
    use_by_date: '2020-19-20',
    donor_id: 'AB-12345',
    lab_id: 'CD-12345'
  },
  {
    type: 'AB',
    arrival_date: '2018-19-20',
    use_by_date: '2020-19-20',
    donor_id: 'AB-12345',
    lab_id: 'CD-12345'
  },
  {
    type: 'AB',
    arrival_date: '2018-19-20',
    use_by_date: '2020-19-20',
    donor_id: 'AB-12345',
    lab_id: 'CD-12345'
  }
];

const alertEnum = {
  PREDICTED_BELOW: 0,
  BELOW: 1,
  OUT_OF_STOCK: 2
};

const dummyAlerts = [
  {
    alertType: alertEnum.PREDICTED_BELOW,
    type: 'A'
  },
  {
    alertType: alertEnum.OUT_OF_STOCK,
    type: 'O'
  },
  {
    alertEnum: alertEnum.BELOW,
    type: 'AB'
  }
  // 'Blood predicted to fall below threshold in the next 5 days',
  // 'A type blood is below threshold',
  // 'AB type blood is out of stock'
];

class AdminPage extends React.Component {

  state = {
    expired_list: [],
    order_list: []
  };

  refreshExpiredBloodList = () => {
    Axios.post(
      '/expire',
      {
        method: 'get_all'
      }
    ).then(res => {
      if (res.data.list === undefined) {
        notification['error'](
          {
            message: 'Error when retrieving expired blood list',
            description: 'Undefined res.data.list'
          }
        );
      }
      this.setState({ expired_list: res.data.list });
    });
  };

  refreshOrderList = () => {
    Axios.post(
      '/list',
      {
        method: 'get_current'
      }
    ).then(res => {
      if (res.data.list === undefined) {
        notification['error'](
          {
            message: 'Error when retrieving order list',
            description: 'Undefined res.data.list'
          }
        );
      }
      this.setState({ order_list: res.data.list });
    });
  };

  componentDidMount() {
    this.refreshExpiredBloodList();
    this.refreshOrderList();
  }

  render() {
    return (
      <FullSizeLayout>
        <Layout.Content>
          <Row
            className={styles.card}
          >
            <Col
              span={24}
            >
              <Row
                type='flex'
                justify='space-between'
              >

                <Col
                  span={11}
                  className={styles.panel}
                >
                  <List
                    locale={
                      {
                        emptyText: (
                          <Empty
                            description='No expired blood units'
                          />
                        )
                      }
                    }
                    header='Expired blood units'
                    dataSource={this.state.expired_list}
                    renderItem={item => (
                      <List.Item>
                        <Descriptions
                          title={item.type}
                          className={styles.descriptions}
                        >
                          <Descriptions.Item label="Type">{item.type}</Descriptions.Item>
                          <Descriptions.Item label="Arrival Date">{item.arrival_date}</Descriptions.Item>
                          <Descriptions.Item label="Use by date">{item.use_by_date}</Descriptions.Item>
                          <Descriptions.Item label="Donor ID">{item.donor_id}</Descriptions.Item>
                          <Descriptions.Item label="Lab ID">{item.lab_id}</Descriptions.Item>
                          <Descriptions.Item label="Volume">{BLOOD_UNIT_SIZE} mL</Descriptions.Item>
                          <Descriptions.Item>
                            <Button
                              onClick={() => {
                                Axios.post(
                                  '/expire',
                                  {
                                    method: 'discard_by_id',
                                    id: item.id
                                  }
                                ).then(res => {
                                  if (res.data.status === undefined || res.data.status === false) {
                                    notification['error'](
                                      {
                                        message: 'Discard failed',
                                        description: 'Please try again.'
                                      }
                                    );
                                  } else {
                                    notification['success'](
                                      {
                                        message: 'Discard succeeded',
                                        description: 'The blood unit has been deleted from the system.'
                                      }
                                    );
                                    this.refreshExpiredBloodList();
                                  }
                                });
                              }}
                            >
                              Mark as discarded
                            </Button>
                          </Descriptions.Item>
                        </Descriptions>

                      </List.Item>
                    )}
                  />
                </Col>

                <Col
                  span={11}
                  className={styles.panel}
                >
                  <List
                    locale={
                      {
                        emptyText: (
                          <Empty
                            description='No active orders'
                          />
                        )
                      }
                    }
                    header='Order list'
                    dataSource={this.state.order_list}
                    renderItem={item => (
                      <List.Item>
                        <Descriptions
                          title={String(item.id)}
                          className={styles.descriptions}
                        >
                          <Descriptions.Item label="Type">{item.blood_type}</Descriptions.Item>
                          <Descriptions.Item label="Volume">{BLOOD_UNIT_SIZE} mL</Descriptions.Item>
                          <Descriptions.Item label="Number of units">{item.num_blood_units}</Descriptions.Item>
                          <Descriptions.Item label="Minimum expiry date">{item.min_expiry_date}</Descriptions.Item>
                          <Descriptions.Item/>
                          <Descriptions.Item/>
                          <Descriptions.Item>
                            <Button
                              onClick={() => {
                                Axios.post(
                                  '/list',
                                  {
                                    method: 'finish_order',
                                    order_id: item.id
                                  }
                                ).then(res => {
                                  if (res.data.status === undefined || res.data.status === false) {
                                    notification['error'](
                                      {
                                        message: 'Complete order failed',
                                        description: 'Please try again.'
                                      }
                                    );
                                  } else {
                                    notification['success'](
                                      {
                                        message: 'Complete succeeded',
                                        description: 'The order has been marked as completed'
                                      }
                                    );
                                    this.refreshOrderList();
                                  }
                                });
                              }}
                            >
                              Mark as completed
                            </Button>
                          </Descriptions.Item>
                        </Descriptions>

                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Layout.Content>
      </FullSizeLayout>
    );
  }
}

export default AdminPage;
