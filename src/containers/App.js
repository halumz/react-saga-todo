import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewTodo from '../components/newTodo';
import Todos from '../components/todos';
import todoAction from '../redux/todos/actions.js';

const { initTodos } = todoAction;

class App extends Component {
  componentDidMount() {
    setTimeout(async () => {
      this.props.initTodos();
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        <NewTodo />
        <Todos />
      </div>
    );
  }
}
export default connect(null, {
  initTodos
})(App);
