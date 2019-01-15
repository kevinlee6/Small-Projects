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

  render() {
    return (
      <li>
        <h4>{this.props.title}</h4>
        <AddTodo addTodo={this.addTodo} />
        <ul>
          {this.state.todos.map(({ id, content }) => (
            <Todo key={id} id={id} content={content} />
          ))}
        </ul>
      </li>
    );
  }
}
