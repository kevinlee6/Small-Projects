import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.nextTodoId = 0;
    this.state = {
      todos: [],
    };
  }

  addTodo = content => {
    const newTodo = {
      id: ++this.nextTodoId,
      content,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  deleteTodo = id => {
    const todos = this.state.todos;
    const idx = todos.findIndex(todo => todo.id === id);
    this.setState({
      todos: [...todos.slice(0, idx), ...todos.slice(idx + 1)],
    });
  };

  render() {
    const { id, title, deleteTodoList } = this.props;
    return (
      <li className="TodoList-container col-md-4">
        <div className="TodoList">
          <div className="TodoList-header">
            <h4>{title}</h4>
            <div className="options">
              <i className="fas fa-edit" />
              <i onClick={() => deleteTodoList(id)} className="fas fa-trash" />
            </div>
          </div>
          <AddTodo addTodo={this.addTodo} />
          <ul className="TodoList-todos">
            {this.state.todos.map(({ id, content }) => (
              <Todo
                key={id}
                id={id}
                content={content}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </li>
    );
  }
}
