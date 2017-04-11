import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'

import Isvg from 'react-inlinesvg';

export default class FilterBox extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    filter: PropTypes.string,
    type: PropTypes.string
  }


  renderItems() {
    const { items, filter, onFilterChange } = this.props;

    return Object.keys(items).map((key) => (
      <li
        key={key}
        className={classnames(
          'filterbox-list_item', {
          checked: filter === key,
        })}
        onClick={() => onFilterChange(key)}
      >
        <Isvg
          className="hexagon-label"
          src={`${process.env.PUBLIC_URL}/img/hexagon.svg`}
          alt="task-hexagon"
        />
        {items[key]}
      </li>
    ));
  }

  render() {
    const { title } = this.props;

    return (
      <div className="filterbox">
        <div className="filterbox-title">{title}</div>
        <ul className="filterbox-list">
          {this.renderItems()}
        </ul>
      </div>
    )
  }
}
