import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header/Header';
import PageHeader from '../components/PageHeader/PageHeader';
import * as TodoActions from '../actions'

import MainApp from '../components/MainApp';

const App = ({todos, actions}) => (
  <div className="app">
    <Header />
    <PageHeader />
    <MainApp
      todos={todos}
      actions={actions}
    />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
