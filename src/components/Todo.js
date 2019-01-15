import React from 'react';
import './Todo.css';

const Todo = ({ id, content, deleteTodo }) => (
  <li key={id} className="Todo">
    <span>{content}</span>
    <div className="options">
      <i className="fas fa-edit" />
      <i onClick={() => deleteTodo(id)} className="fas fa-trash" />
    </div>
  </li>
);

export default Todo;
