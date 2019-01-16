import React, { Component } from 'react';
import './AddTodo.css';

export default class AddTodo extends Component {
  state = {
    content: '',
  };

  handleChange = e => {
    const content = e.target.value;
    this.setState({
      content,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.content);
    this.setState({
      content: '',
    });
  };

  render() {
    return (
      <form className="form-inline AddTodo" onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          onChange={this.handleChange}
          value={this.state.content}
          type="text"
        />
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    );
  }
}
