import React from 'react';
import { Button, Col, Descriptions, Empty, Layout, List, notification, Row, Tag } from 'antd';
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
    alert_list: []
  };

  componentDidMount() {
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
                                console.log(item);
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
                            description='No alerts'
                          />
                        )
                      }
                    }
                    header='Alerts'
                  >
                    {
                      dummyAlerts.map(item => (
                        <List.Item>
                          <Descriptions
                            className={styles.descriptions}
                          >
                            <Descriptions.Item
                              label='Description'>{item.alertType === alertEnum.OUT_OF_STOCK ? `${item.type} is out of stock` : item.alertType === alertEnum.PREDICTED_BELOW ? `${item.type} is predicted to fall below the threshold in the next 5 days` : `${item.type} is below the threshold`}</Descriptions.Item>
                            <Descriptions.Item label='Priority'>
                              {item.alertType === alertEnum.OUT_OF_STOCK ?
                                <Tag color='red'>High</Tag> : item.alertType === alertEnum.PREDICTED_BELOW ?
                                  <Tag color='gold'>Medium</Tag> : <Tag color='green'>Low</Tag>}
                            </Descriptions.Item>
                          </Descriptions>
                        </List.Item>
                      ))
                    }
                  </List>
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
