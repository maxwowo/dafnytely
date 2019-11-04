import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout } from 'antd';
import Axios from 'axios';
import SidePanel from './SidePanel/SidePanel';
import BloodList from './BloodList/BloodList';
import { bloodTypes } from '../../constants/bloodConstants';
import styles from './QueryPage.module.less';

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
          method: 'get_all_units'
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
    Axios.post(
      '/query',
      {
        type: value,
        sort: false,
        date: this.state.expiryDateFilter ? this.state.expiryDateFilter.format('YYYY-MM-DD') : null,
        method: !this.state.expiryDateFilter ? 'get_units_by_type' : 'get_units_by_type_date'
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

  onMinimumExpiryChange = (
    value
  ) => {
    this.setState({ expiryDateFilter: value, bloodList: [] });
    Axios.post(
      '/query',
      {
        type: this.state.bloodTypeFilter,
        sort: false,
        date: value.format('YYYY-MM-DD'),
        method: !this.state.bloodTypeFilter ? 'get_units_by_date' : 'get_units_by_type_date'
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
