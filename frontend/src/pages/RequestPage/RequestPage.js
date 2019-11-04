import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import Center from '../../components/Center/Center';
import Axios from 'axios';
import { bloodTypes } from '../../constants/bloodConstants';
import { Button, Card, Col, DatePicker, InputNumber, Layout, Row, Select, Typography } from 'antd';
import styles from './RequestPage.module.less';


class RequestPage extends React.Component {

  state = {
    bloodType: undefined,
    numBloodUnits: undefined,
    expiryDate: undefined
  };

  checkCanSubmit = () => {
    return this.state.bloodType !== undefined && this.state.numBloodUnits !== undefined;
  };

  handleSubmit = () => {
    Axios.post(
      '/order',
      {
        type: this.state.bloodType,
        units: this.state.numBloodUnits,
        date: !this.state.expiryDate ? null : this.state.expiryDate.format('YYYY-MM-DD'),
        method: !this.state.expiryDate ? 'order_type_units' : 'order_type_date_units'
      }
    ).then(res => console.log(res));
  };

  render() {
    return (
      <FullSizeLayout>
        <Layout.Content>
          <Center>
            <Card
              title='Make a request'
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
                    onChange={e => this.setState({ numBloodUnits: e })}
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
                  Minimum expiry date
                </Col>
                <Col
                  span={16}
                >
                  <DatePicker
                    onChange={e => {
                      this.setState({ expiryDate: e });
                    }}
                    mode='date'
                    value={this.state.expiryDate}
                    placeholder='Select minimum expiry date'
                    showToday={false}
                    className={styles.datePicker}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Button
                  onClick={this.handleSubmit}
                  disabled={!this.checkCanSubmit()}
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

export default RequestPage;
