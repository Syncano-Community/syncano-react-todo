import React, { Component } from 'react'
import TodoBox from './TodoBox/TodoBox';
import Sidebar from './Sidebar/Sidebar';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED, SHOW_SEARCHED } from './../constants/TaskFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo) => todo.completed,
  [SHOW_SEARCHED]: (todo, text) => new RegExp(text, 'ig').test(todo.title)
}

export default class MainApp extends Component {
  state = {
    todos: this.props.todos,
    filter: SHOW_ALL
  }

  componentWillReceiveProps(nextProps) {
    const { filter } = this.state;
    const { todos } = nextProps;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);

    this.setState({
      todos: filteredTodos
    });
  }

  onFilterChange(filter) {
    const { todos } = this.props;
    let { filter: prevFilter } = this.state;

    if (prevFilter === filter) {
      filter = SHOW_ALL;
    };

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);

    this.setState({
      filter,
      todos: filteredTodos
    });
  }

  onSearchTask(text) {
    const { todos } = this.props;

    const filteredTodos = todos.filter((todo) => TODO_FILTERS[SHOW_SEARCHED](todo, text));

    this.setState({
      todos: filteredTodos 
    });
  }

  render() {
    const { filter, todos } = this.state;

    return (
      <div className="main-container">
        <Sidebar
          className="sidebar"
          filter={filter}
          onSearchTask={this.onSearchTask.bind(this)}
          onFilterChange={this.onFilterChange.bind(this)}
        />
        <TodoBox
          className="todo-section"
          todos={todos}
          actions={this.props.actions}
        />
      </div>
    )
  }
}
