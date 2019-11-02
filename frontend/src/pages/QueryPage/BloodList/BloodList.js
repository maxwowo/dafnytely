import React from 'react';
import { Descriptions, List, Typography, Empty } from 'antd';
import { BLOOD_UNIT_SIZE } from '../../../constants/bloodConstants';
import styles from './BloodList.module.less';

const BloodList = (
  {
    bloodList
  }
) => (
  <List
    locale={
      {
        emptyText: (
          <Empty
            description='No blood units match the description :('
          />
        )
      }
    }
    header='Blood list'
    className={styles.list}
    dataSource={bloodList}
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
        </Descriptions>
      </List.Item>
    )}
  />
);

export default BloodList;
