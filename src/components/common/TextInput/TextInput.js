import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class TextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onChange : PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = (e) => {
    const value = e.target.value.trim();

    if (e.which === 13) {
      this.props.onSave(value);
      if (this.props.resetOnSubmit) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value.trim();

    this.setState({ text: value})

    if (onChange) {
      onChange(value);
    }
  }

  handleBlur = (e) => {
    if (this.props.onBlur) {
      const value = e.target.value.trim();

      this.props.onBlur(value);
    }
  }

  render() {
    return (
      <input className={
        classnames(
          'main-input', {
          edit: this.props.editing,
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
