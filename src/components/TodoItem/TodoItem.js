import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import moment from 'moment'

import TextInput from '../common/TextInput/TextInput'


export default class TaskItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(event) {
    const { editing } = this.state;

    if (editing === false) return;

    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({ editing : false });
    }
  }

  handleEditing = () => {
    this.setState({ editing: true });
  }

  handleSave = (value, key) => {
    const { todo } = this.props;

    this.props.editTask(todo.id, { [key]: value });
    this.setState({ editing: false });
  }

  handleBlur = (value, key) => {
    const { todo } = this.props;

    this.props.editTask(todo.id, { [key]: value });
  }

  renderEditableSection(todo) {
    return this.state.editing ? (
      <div>
        <TextInput
          text={todo.title}
          placeholder="Task title"
          editing={this.state.editing}
          onSave={(value) => this.handleSave(value, 'title')}
          onBlur={(value) => this.handleBlur(value, 'title')}
        />
        <TextInput
          text={todo.description}
          placeholder="Task description"
          editing={this.state.editing}
          onSave={(value) => this.handleSave(value, 'description')}
          onBlur={(value) => this.handleBlur(value, 'description')}
        />
      </div>
    ) : (
      <div
        onClick={this.handleEditing}
        style={{ cursor: 'pointer' }}
      >
        <h4>{todo.title}</h4>
        <p className="list-item_section_gray">
          {todo.description ||  <span style={{ fontSize: 10 }}>Click to add description</span>}
        </p>
      </div>
    )
  }

  renderSvg(color1, color2) {
    const gradient = `
      <linearGradient id="${this.props.todo.id}-${color1}-${color2}" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="${color1}"></stop>
        <stop offset="100%" stop-color="${color2}"></stop>
      </linearGradient>
    `;

    const svg = `
      <svg style="filter: drop-shadow( 0px 0px 10px ${color1} );" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="74" viewbox="0 0 200 173.20508075688772">
        <defs>
          ${gradient}
          <filter id="f1" x="0" y="0" width="100%" height="100%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="13"/> 
            <feOffset dx="2" dy="2" result="offsetblur"/> 
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"
          fill="url(#${this.props.todo.id}-${color1}-${color2})";
        >
        </path>
      </svg>
    `;

    return svg;
  }

  render() {
    const { todo, deleteTask } = this.props;
    const color1 = todo.completed ? '#04b26e' : '#324E8F';
    const color2 = todo.completed ? '#029950' : '#223875';

    const element = (
      <div className="list-item_content">
        <div
          onClick={() => this.props.editTask(todo.id, { completed: !todo.completed })}
          className={classnames('hexagon', {
            completed: todo.completed,
          })}
        >
          <div dangerouslySetInnerHTML={{ __html: this.renderSvg(color1, color2) }}></div>
          <i
            className={classnames('fa', {
              'fa-check-square-o': todo.completed,
              'fa-square-o': !todo.completed,
            })}
            aria-hidden="true">
          </i>
        </div>
        <header className="list-item_section flex-3">
          {this.renderEditableSection(todo)}
        </header>
        <div className="list-item_section flex-1 created_at">
          <div className="list-item_section_gray">Created at:</div>
          <div>
            {moment(todo.created_at).format('MMM Do YYYY, h:mm:ss')}
          </div>
        </div>
        <div className="list-item_section list-item_buttons">
          <button
            className="destroy"
            onClick={() => deleteTask(todo.id)}
          >
            delete
          </button>
        </div>
      </div>
    );

    return (
      <li
        key={todo.id}
        className={classnames(
          'list-item', {
          completed: todo.completed
        })}
      >
        {element}
      </li>
    )
  }
}
