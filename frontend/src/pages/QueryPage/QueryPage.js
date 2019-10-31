import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout } from 'antd';
import Axios from 'axios';
import SidePanel from './SidePanel/SidePanel';
import BloodList from './BloodList/BloodList';
import styles from './QueryPage.module.less';

const bloodTypes = ['O', 'A', 'B', 'AB'];

class QueryPage extends React.Component {

  state = {
    bloodList: [],
    bloodTypeFilter: null,
    expiryDateFilter: null
  };

  componentDidMount() {
    for (let bloodType of bloodTypes) {
      Axios.post(
        '/query',
        {
          type: bloodType,
          sort: false,
          method: 'get_units_by_type'
        }
      ).then(
        res => {
          this.setState(
            {
              bloodList: [...this.state.bloodList, ...res.data.list]
            }
          );
        }
      );
    }
  }

  onBloodTypeChange = (
    value
  ) => {
    this.setState({ bloodTypeFilter: value, bloodList: [] });

    if (!this.state.expiryDateFilter) {
      Axios.post(
        '/query',
        {
          type: value,
          sort: false,
          method: 'get_units_by_type'
        }
      ).then(
        res => {
          this.setState(
            {
              bloodList: [...this.state.bloodList, ...res.data.list]
            }
          );
        }
      );
    }
  };

  onMinimumExpiryChange = (
    value
  ) => {
    this.setState({ expiryDateFilter: value });
    console.log(this.state.expiryDateFilter);
  };

  render() {
    return (
      <FullSizeLayout>
        <SidePanel
          bloodTypes={bloodTypes}
          onBloodTypeChange={this.onBloodTypeChange}
          onMinimumExpiryChange={this.onMinimumExpiryChange}
          bloodTypeFilter={this.state.bloodTypeFilter}
          expiryDateFilter={this.state.expiryDateFilter}
        />
        <Layout.Content
          className={styles.content}
        >
          <BloodList
            bloodList={this.state.bloodList}
          />
        </Layout.Content>
      </FullSizeLayout>
    );
  }
}

export default QueryPage;
