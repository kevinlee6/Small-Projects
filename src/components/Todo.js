import React from 'react';

const Todo = ({ id, content, deleteTodo }) => (
  <li key={id}>
    <span>{content}</span>
    <i className="fas fa-edit" />
    <i onClick={() => deleteTodo(id)} className="fas fa-trash" />
  </li>
);

export default Todo;
