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
    bloodTypeFilter: undefined,
    expiryDateFilter: undefined
  };

  refreshBloodList = () => {
    this.setState({ bloodList: [] });
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
  };

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
    console.log(value.format('YYYY-MM-DD'));
    this.setState({ expiryDateFilter: value, bloodList: [] });
    Axios.post(
      '/query',
      {
        type: value,
        sort: false,
        date: value.format('YYYY-MM-DD'),
        method: 'get_units_by_type_date'
      }
    ).then(
      res => {
        console.log(res);
        this.setState(
          {
            bloodList: [...this.state.bloodList, ...res.data.list]
          }
        );
      }
    );
  };

  onClearButtonClicked = () => {
    this.setState({ bloodTypeFilter: undefined, expiryDateFilter: undefined });
    this.refreshBloodList();
  };

  componentDidMount() {
    this.refreshBloodList();
  }

  render() {
    return (
      <FullSizeLayout>
        <SidePanel
          bloodTypes={bloodTypes}
          onClearButtonClicked={this.onClearButtonClicked}
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
