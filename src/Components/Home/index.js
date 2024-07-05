import { Component } from "react";

// import uuid utility for maintaining unique id for every Todo
import { v4 as uuidV4 } from "uuid";

import TaskItem from "../TaskItem";

import "./index.css";

class Home extends Component {
  state = {
    todoList: [],
    todo: "",
    errorMsg: false,
  };

  // adding Todo in the state
  addTodo = (event) => {
    event.preventDefault();
    const { todo } = this.state;

    // checking that user provided valid value or not
    if (todo === "") {
      // if user not provided valued input then we show Error
      this.setState({ errorMsg: true });
    } else {
      // if user provided valid input then crate todo and update it into state and localStorage also
      const obj = {
        id: uuidV4(),
        todo,
        todoStatus: false,
      };

      this.setState(
        (prvState) => ({
          todoList: [...prvState.todoList, obj],
          todo: "",
          errorMsg: false,
        }),
        this.saveChanges
      );
    }
  };

  // this function for toggling the todo status
  updateMarkedStatus = (id) => {
    const { todoList } = this.state;

    const filterTodo = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, todoStatus: !item.todoStatus };
      }
      return item;
    });

    this.setState(
      {
        todoList: filterTodo,
      },
      this.saveChanges
    );
  };

  // this function for taking input from user
  updateNewTodo = (event) => {
    this.setState({
      todo: event.target.value,
    });
  };

  // this function for deleting todo
  deleteTodo = (id) => {
    const { todoList } = this.state;
    const filteredData = todoList.filter((item) => item.id !== id);
    this.setState({ todoList: filteredData }, this.saveChanges);
  };

  // this function for update the edited Todo
  updateEditedTodo = (item) => {
    const { todoList } = this.state;
    const filtersAndUpdate = todoList.map((todo) => {
      if (item.id === todo.id) {
        return item;
      }
      return todo;
    });

    this.setState({ todoList: filtersAndUpdate }, this.saveChanges);
  };

  // this function for update the UI changes into localStorage
  saveChanges = () => {
    const { todoList } = this.state;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  componentDidMount() {
    const stringifiedTodoList = localStorage.getItem("todoList");
    const parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
      this.setState({ todoList: [] });
    } else {
      this.setState({ todoList: parsedTodoList });
    }
  }

  render() {
    const { todo, todoList, errorMsg } = this.state;
    return (
      <div className="todo-app-home-container">
        <h1 className="todo-main-heading">Todos</h1>

        <form onSubmit={this.addTodo} className="todo-form-container">
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <input
            value={todo}
            className="todo-user-input"
            placeholder="What needs to be done?"
            onChange={this.updateNewTodo}
            type="text"
          />
          {errorMsg && <p className="errorMsg">*Enter your Task</p>}
          <button className="button" type="submit">
            Add
          </button>
        </form>
        <h1 className="todo-items-heading">
          My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        <ul className="todo-items-container">
          {todoList.map((item) => (
            <TaskItem
              item={item}
              key={item.id}
              deleteTodo={this.deleteTodo}
              updateMarkedStatus={this.updateMarkedStatus}
              updateEditedTodo={this.updateEditedTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
