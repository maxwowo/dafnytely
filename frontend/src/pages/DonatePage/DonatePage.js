import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import Center from '../../components/Center/Center';
import { bloodTypes } from '../../constants/bloodConstants';
import { Button, Card, Col, DatePicker, Input, InputNumber, Layout, Row, Select, Typography } from 'antd';
import styles from './DonatePage.module.less';


class DonatePage extends React.Component {

  render() {
    return (
      <FullSizeLayout>
        <Layout.Content>
          <Center>
            <Card
              title='Make a donation'
              style={{ width: '80%', height: '80%' }}
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
                    onChange={() => {}}
                    mode='date'
                    placeholder='Enter minimum expiry date'
                    showToday={false}
                    className={styles.datePicker}
                  />
                </Col>
              </Row>

              <Row
                className={styles.row}
              >
                <Button
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
