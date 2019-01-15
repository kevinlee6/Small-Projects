import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';

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
    const { title } = this.props;
    return (
      <li>
        <h4>{title}</h4>
        <AddTodo addTodo={this.addTodo} />
        <ul>
          {this.state.todos.map(({ id, content }) => (
            <Todo
              key={id}
              id={id}
              content={content}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </ul>
      </li>
    );
  }
}
