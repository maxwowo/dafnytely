import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout } from 'antd';
import SidePanel from './SidePanel/SidePanel';
import BloodList from './BloodList/BloodList';
import styles from './QueryPage.module.less';
import Navbar from '../../components/Navbar/Navbar';

class QueryPage extends React.Component {

  state = {
    bloodTypes: [],
    bloodList: []
  };

  componentDidMount() {
    this.setState({
      bloodTypes: ['O', 'A', 'B', 'AB'],
      bloodList: [
        {
          'type': 'A',
          'arrival_date': '2019-08-12',
          'use-by-date': '2019-09-12',
          'donor-id': 'D-12345',
          'lab-id': 'L-12345',
          'volume-ml': 500
        }
      ]
    })
  }

  onBloodTypeChange = (
    value
  ) => {
    console.log(value);
  };

  onMinimumExpiryChange = (
    value
  ) => {
    console.log(value);
  };

  render() {
    return (
      <FullSizeLayout>
        <Navbar/>
        <FullSizeLayout>
        <SidePanel
          bloodTypes={this.state.bloodTypes}
          onBloodTypeChange={this.onBloodTypeChange}
          onMinimumExpiryChange={this.onMinimumExpiryChange}
        />
        <Layout.Content
          className={styles.content}
        >
          <BloodList
            bloodList={this.state.bloodList}
          />
        </Layout.Content>
        </FullSizeLayout>
      </FullSizeLayout>
    );
  }
}

export default QueryPage;
