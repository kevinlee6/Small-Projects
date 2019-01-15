import React, { Component } from 'react';
import './App.css';
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
    };
    this.setState({
      todoLists: [...this.state.todoLists, nextTodoList],
    });
  };

  handleAddTodoList = () => {};

  render() {
    return (
      <div className="App">
        <AddTodoList addTodoList={this.addTodoList} />
        <ul>
          {this.state.todoLists.map(({ id, title }) => (
            <TodoList key={id} id={id} title={title} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
