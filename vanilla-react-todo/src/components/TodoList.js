import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Options from './Options';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.nextTodoId = 0;
    this.state = {
      editedTitle: this.props.title,
      todos: [],
    };
  }

  addTodo = content => {
    const newTodo = {
      id: ++this.nextTodoId,
      content,
      completed: false,
      editMode: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  };

  editTodo = (id, content) => {
    // also sets editMode to false
    // not reusing existing method to avoid additional setState
    const todos = this.state.todos.slice();
    const idx = todos.findIndex(todo => todo.id === id);
    const todo = todos[idx];
    const editedTodo = {
      ...todo,
      content,
      editMode: false,
    };
    todos[idx] = editedTodo;
    this.setState({ todos });
  };

  toggleProp = (prop, id) => {
    const todos = this.state.todos.slice();
    const idx = todos.findIndex(todo => todo.id === id);
    const todo = todos[idx];
    const toggledTodo = {
      ...todo,
      [prop]: !todo[prop],
    };
    todos[idx] = toggledTodo;
    this.setState({ todos });
  };

  updateTitle = e => {
    const editedTitle = e.target.value;
    this.setState({ editedTitle });
  };

  resetTitle = () => {
    const editedTitle = this.props.title;
    this.setState({ editedTitle });
  };

  render() {
    const {
      id,
      title,
      editMode,
      deleteTodoList,
      editTodoList,
      toggleTodoListProp,
    } = this.props;
    return (
      <li className="TodoList-container col-md-4">
        <div className="TodoList">
          <div className="TodoList-header">
            {editMode ? (
              <input
                onChange={e => this.updateTitle(e)}
                defaultValue={title}
                type="text"
              />
            ) : (
              <h4>{title}</h4>
            )}
            <Options
              id={id}
              reset={this.resetTitle}
              editMode={editMode}
              del={deleteTodoList}
              edit={editTodoList}
              toggleProp={toggleTodoListProp}
              content={this.state.editedTitle}
            />
          </div>
          <AddTodo addTodo={this.addTodo} />
          <ul className="TodoList-todos">
            {this.state.todos.map(({ id, content, completed, editMode }) => (
              <Todo
                key={id}
                id={id}
                content={content}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                toggleProp={this.toggleProp}
                completed={completed}
                editMode={editMode}
              />
            ))}
          </ul>
        </div>
      </li>
    );
  }
}
