import React, { Component } from 'react';
import './AddTodoList.css';

export default class TodoList extends Component {
  state = {
    title: '',
  };

  handleChange = e => {
    const title = e.target.value;
    this.setState({
      title,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodoList(this.state.title);
    this.setState({
      title: '',
    });
  };

  render() {
    return (
      <form className="AddTodoList form-inline" onSubmit={this.handleSubmit}>
        <input
          className="form-control mb-3 mr-sm-3"
          placeholder="Title of Todo List"
          onChange={this.handleChange}
          value={this.state.title}
          type="text"
        />
        <button className="btn btn-primary mb-3">Add List</button>
      </form>
    );
  }
}
