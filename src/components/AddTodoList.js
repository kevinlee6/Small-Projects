import React, { Component } from 'react';

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
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.title}
          type="text"
        />
        <button className="btn btn-primary">Add List</button>
      </form>
    );
  }
}
