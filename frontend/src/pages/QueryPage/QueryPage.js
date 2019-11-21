import React from 'react';
import FullSizeLayout from '../../components/FullSizeLayout/FullSizeLayout';
import { Layout, Button } from 'antd';
import Axios from 'axios';
import SidePanel from './SidePanel/SidePanel';
import BloodList from './BloodList/BloodList';
import { bloodTypes } from '../../constants/bloodConstants';
import styles from './QueryPage.module.less';
const selectionSort = (a,compare)=>{
  if(a.length <= 1){
      return;
  }
  let i = 0;
  while(i<a.length){
      let li = i;
      let j = i;
      while(j < a.length){
          if(compare(a[j], a[li])<0){
              li = j;
           }
           j = j + 1;
      }
      let tmp =a[i]
      a[i]=a[li];
      a[li]=tmp;
      i=i+1;
  }
}
class QueryPage extends React.Component {

  state = {
    bloodList: [],
    bloodTypeFilter: undefined,
    expiryDateFilter: undefined
  };

  refreshBloodList = () => {
    this.setState({ bloodList: [] });
    
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
          <Button style={{margin:"10px"}}
          onClick={()=>{
            let tmplist = [...this.state.bloodList];
            
            selectionSort(tmplist,(a,b)=>{
              if(a.type < b.type)return -1;
              return 1
            })
            console.log(tmplist)
            this.setState({
              bloodList:tmplist
            })
          }}>Sort by type</Button>
          <Button style={{margin:"10px"}} onClick={()=>{
            let tmplist = [...this.state.bloodList];
            
            selectionSort(tmplist,(a,b)=>{
              let adate = new Date(a.use_by_date);
              let bdate = new Date (b.use_by_date);
              if (adate < bdate) { return 1; } else { return -1; };
          })
            console.log(tmplist)
            this.setState({
              bloodList:tmplist
            })
          }} >Sort by date</Button>
          <BloodList
            bloodList={this.state.bloodList}
          />
        </Layout.Content>
      </FullSizeLayout>
    );
  }
}

export default QueryPage;
