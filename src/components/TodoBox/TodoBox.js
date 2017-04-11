import React, { Component, PropTypes } from 'react';
import TodoItem from '../TodoItem';
import TextInput from '../common/TextInput';
import Loading from '../common/Loading';
import Header from './Header';


export default class TodoBox extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.getTasks();
  }

  handleClearCompleted = () => {
    this.props.todos.forEach((todo) => {
      if (todo.completed) {
        this.props.actions.deleteTask(todo.id)
      }
    });
  }

  handleShow = (filter) => {
    this.setState({ filter })
  }

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.actions.addTask(text)
    }
  }

  handleCompleteAll = () => {
    const { todos } = this.props;
    const areAllCompleted = todos.every((todo) => todo.completed);
    this.props.todos.forEach((todo) => {
      this.props.actions.editTodo(todo.id, { completed: areAllCompleted ? false : true });
    });
  }

  renderHeader(completedCount) {
    const { todos, filter } = this.props;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Header
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      )
    }
  }

  renderItems() {
    const { todos, actions } = this.props;

    return todos.map((todo) =>
      <TodoItem
        key={todo.id}
        todo={todo}
        {...actions}
      />
    )
  }

  render() {
    const { todos } = this.props

    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <main className="main-section">
        <TextInput
          resetOnSubmit
          newTodo
          placeholder="What is your task?"
          onSave={this.handleSave}
        />
        <div style={{ marginTop: 30 }}>
          {todos.length === 0 ? (
            <Loading />
          ) : (
            <div>
              {this.renderHeader(completedCount)}
              <ul className="list">
                {this.renderItems()}
              </ul>
            </div>
          )}
        </div>
      </main>
    )
  }
}
