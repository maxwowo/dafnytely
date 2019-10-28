import React from 'react';
import { Select } from 'antd';

const BloodTypeFilter = (
  {
    bloodTypes,
    onBloodTypeChange
  }
) => (
  <Select
    placeholder="Filter by blood type"
    optionFilterProp="children"
    style={{ width: '100%' }}
    onChange={onBloodTypeChange}
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
);

export default BloodTypeFilter;
