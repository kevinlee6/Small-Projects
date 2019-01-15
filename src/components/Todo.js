import React, { Component } from 'react';
import './Todo.css';
import Options from './Options';

const cName = completed => (completed ? 'Todo-completed' : 'Todo-incompleted');

export default class Todo extends Component {
  state = {
    editedContent: this.props.content,
  };

  updateContent = e => {
    const editedContent = e.target.value;
    this.setState({ editedContent });
  };

  resetContent = () => {
    // in case user cancels edit, restore original
    const editedContent = this.props.content;
    this.setState({ editedContent });
  };

  render() {
    const {
      id,
      content,
      completed,
      deleteTodo,
      editTodo,
      toggleProp,
      editMode,
    } = this.props;
    return (
      <li key={id} className="Todo">
        {editMode ? (
          <input
            onChange={e => this.updateContent(e)}
            defaultValue={content}
            type="text"
          />
        ) : (
          <span
            className={cName(completed)}
            onClick={() => toggleProp('completed', id)}
          >
            {content}
          </span>
        )}
        <Options
          reset={this.resetContent}
          editMode={editMode}
          edit={editTodo}
          del={deleteTodo}
          toggleProp={toggleProp}
          id={id}
          content={this.state.editedContent}
        />
      </li>
    );
  }
}
