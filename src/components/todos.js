import React, { Component } from 'react';
import { connect } from 'react-redux';
import todoAction from '../redux/todos/actions.js';
import Todo from './singleTodo.js';
import Loader from './loader.js';
import BlankCenterDiv from './blankCenterDiv.js';
import './todos.css';

const {
  deleteTodo,
  editTodo,
  completeTodo,
  allCompleted,
  deleteCompleted,
  showMore
} = todoAction;
class Todos extends Component {
  componentWillReceiveProps(nextProps) {
    const newTodos = nextProps.todos;
    const oldTodos = this.props.todos;
    if (oldTodos.length === 0) {
      this.isScrollToTop = true;
    } else if (newTodos.length !== oldTodos.length) {
      if (JSON.stringify(oldTodos[0]) !== JSON.stringify(newTodos[0])) {
        this.isScrollToTop = true;
      } else {
        this.isScrollToBottom = true;
      }
    }
  }
  componentDidUpdate() {
    if (this.isScrollToTop) {
      this.scrollToTop();
    }
    if (this.isScrollToBottom) {
      this.scrollToBottom();
    }
    this.isScrollToTop = false;
    this.isScrollToBottom = false;
  }
  scrollToBottom = () => {
    const todosDiv = document.getElementById('todosDiv');
    todosDiv.scrollTop = todosDiv.scrollHeight;
  };
  scrollToTop = () => {
    const todosDiv = document.getElementById('todosDiv');
    todosDiv.scrollTop = 0;
  };
  scrollToBottom = () => {
    const todosDiv = document.getElementById('todosDiv');
    todosDiv.scrollTop = todosDiv.scrollHeight;
  };
  render() {
    const {
      todos,
      allCompleted,
      deleteCompleted,
      showMore,
      showAllenabled,
      loading
    } = this.props;
    if (loading) {
      return <BlankCenterDiv text={<Loader />} />;
    }
    if (todos.length === 0) {
      return <BlankCenterDiv text="No Todo" />;
    }
    return (
      <form className="todoForm">
        <div className="todoActions">
          <button type="button" className="todoEdit" onClick={allCompleted}>
            COMPLETE ALL
          </button>
          <button
            type="button"
            className="todoDelete"
            onClick={deleteCompleted}
          >
            Delete Completed
          </button>
        </div>
        <div
          id="todosDiv"
          style={{ height: '70vh', overflowY: 'auto', margin: '3px' }}
        >
          {todos.map(todo => (
            <Todo {...this.props} key={todo.id} todo={todo} />
          ))}
        </div>
        {showAllenabled && todos.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              showMore(todos[todos.length - 1]);
            }}
            className="todoShowMore"
          >
            SHOW MORE
          </button>
        ) : (
          ''
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { todos, showAllenabled, loading } = state.Todos;
  return {
    todos,
    showAllenabled,
    loading
  };
}
export default connect(mapStateToProps, {
  deleteTodo,
  editTodo,
  completeTodo,
  allCompleted,
  deleteCompleted,
  showMore
})(Todos);
