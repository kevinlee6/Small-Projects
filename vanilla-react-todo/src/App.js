import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTodoList from './components/AddTodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.nextTodoListId = 0;
    this.state = {
      todoLists: [],
    };
  }

  addTodoList = title => {
    const nextTodoList = {
      id: ++this.nextTodoListId,
      title,
      editMode: false,
    };
    this.setState({
      todoLists: [...this.state.todoLists, nextTodoList],
    });
  };

  deleteTodoList = id => {
    const todoLists = this.state.todoLists.filter(
      todoList => todoList.id !== id
    );
    this.setState({ todoLists });
  };

  editTodoList = (id, title) => {
    const todoLists = this.state.todoLists.slice();
    const idx = todoLists.findIndex(todoList => todoList.id === id);
    const todoList = todoLists[idx];
    const editedTodoList = {
      ...todoList,
      title,
      editMode: false,
    };
    todoLists[idx] = editedTodoList;
    this.setState({ todoLists });
  };

  toggleTodoListProp = (prop, id) => {
    const todoLists = this.state.todoLists.slice();
    const idx = todoLists.findIndex(todoList => todoList.id === id);
    const todoList = todoLists[idx];
    const toggledTodoList = {
      ...todoList,
      [prop]: !todoList[prop],
    };
    todoLists[idx] = toggledTodoList;
    this.setState({ todoLists });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <AddTodoList addTodoList={this.addTodoList} />
          <ul className="TodoLists-container row">
            {this.state.todoLists.map(({ id, title, editMode }) => (
              <TodoList
                key={id}
                id={id}
                editMode={editMode}
                title={title}
                deleteTodoList={this.deleteTodoList}
                editTodoList={this.editTodoList}
                toggleTodoListProp={this.toggleTodoListProp}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
