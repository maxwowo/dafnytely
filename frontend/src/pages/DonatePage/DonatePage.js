import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import Center from '../../components/Center/Center';
import Axios from 'axios';
import Moment from 'moment';
import { bloodTypes } from '../../constants/bloodConstants';
import { Button, Card, Col, DatePicker, Input, InputNumber, Layout, Row, Select, Typography, notification } from 'antd';
import styles from './DonatePage.module.less';


class DonatePage extends React.Component {

  state = {
    bloodType: undefined,
    numBloodUnits: undefined,
    labId: undefined,
    donorId: undefined,
    expiryDate: undefined
  };

  submitForm = () => {
    const today = Moment(new Date()).format('YYYY-MM-DD');
    Axios.post(
      '/add',
      {
        method: 'add_blood',
        bloods: [
          {
            type: this.state.bloodType,
            arrival_date: today,
            use_by_date: this.state.expiryDate.format('YYYY-MM-DD'),
            donor_id: this.state.donorId,
            lab_id: this.state.labId
          }
        ]
      }
    ).then(res => {
      if (res.data.status === true) {
        for (let key in this.state) {
          this.setState({ [key]: undefined });
        }
      }
      notification['success'](
        {
          message: 'Donation submitted',
          description: 'Your donation has been successfully recorded'
        }
      )
    });
  };

  checkCanSubmit = () => {
    for (let key in this.state) {
      if (!this.state[key]) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <FullSizeLayout>
        <Layout.Content>
          <Center>
            <Card
              title='Make a donation'
              className={styles.card}
            >
              <Row>
                <Col
                  span={8}
                >
                  <Typography.Paragraph>
                    Blood type
                  </Typography.Paragraph>
                </Col>
                <Col
                  span={16}
                >
                  <Select
                    placeholder='Select a blood type'
                    optionFilterProp="children"
                    value={this.state.bloodType}
                    onChange={e => this.setState({ bloodType: e })}
                    className={styles.select}
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
                </Col>
              </Row>
              <Row
                className={styles.row}
              >
                <Col
                  span={8}
                >
                  <Typography.Paragraph>
                    Number of blood units
                  </Typography.Paragraph>
                </Col>
                <Col
                  span={16}
                >
                  <InputNumber
                    min={0}
                    value={this.state.numBloodUnits}
                    onChange={e => {
                      this.setState({ numBloodUnits: e });
                    }}
                    placeholder='Enter number of blood units'
                    className={styles.select}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Col
                  span={8}
                >
                  Lab ID
                </Col>
                <Col
                  span={16}
                >
                  <Input
                    placeholder='Enter lab ID'
                    value={this.state.labId}
                    onChange={e => this.setState({ labId: e.target.value })}
                    className={styles.select}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Col
                  span={8}
                >
                  Donor ID
                </Col>
                <Col
                  span={16}
                >
                  <Input
                    placeholder='Enter donor ID'
                    value={this.state.donorId}
                    onChange={e => this.setState({ donorId: e.target.value })}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Col
                  span={8}
                >
                  Expiry date
                </Col>
                <Col
                  span={16}
                >
                  <DatePicker
                    onChange={(e) => {
                      this.setState({ expiryDate: e });
                    }}
                    mode='date'
                    placeholder='Select minimum expiry date'
                    showToday={false}
                    value={this.state.expiryDate}
                    className={styles.datePicker}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Button
                  disabled={!this.checkCanSubmit()}
                  onClick={this.submitForm}
                  className={styles.submitButton}
                >
                  Submit
                </Button>
              </Row>
            </Card>
          </Center>
        </Layout.Content>
      </FullSizeLayout>
    );
  }
}

export default DonatePage;
