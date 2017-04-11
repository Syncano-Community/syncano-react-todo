import React, { Component, PropTypes } from 'react';

import TextInput from '../common/TextInput/TextInput';
import FilterBox from '../FilterBox/FilterBox';

import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../constants/TaskFilters';

const filters = {
  [SHOW_ALL]: 'All Tasks',
  [SHOW_ACTIVE]: 'Uncompleted Tasks',
  [SHOW_COMPLETED]: 'Completed Tasks'
};

export default class Sidebar extends Component {
  static propTypes = {
    onSearchTask: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.string
  }

  render() {
    return (
      <sidebar className="sidebar">
        <TextInput
          placeholder="Search for Tasks"
          onChange={this.props.onSearchTask}
        />
        <FilterBox
          title="Filter Tasks"
          items={filters}
          onFilterChange={this.props.onFilterChange}
          filter={this.props.filter}
        />
      </sidebar>
    );
  }
}
