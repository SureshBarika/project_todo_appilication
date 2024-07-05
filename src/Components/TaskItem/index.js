import { useState } from "react";

// import react icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { ImCheckmark } from "react-icons/im";

import Popup from "reactjs-popup";

import "./index.css";

const TaskItem = (props) => {
  const { item, deleteTodo, updateMarkedStatus, updateEditedTodo } = props;
  const { todo, id, todoStatus } = item;

  const [todoValue, updateTodo] = useState(todo);

  // styles for marking todo
  const markingStatus = todoStatus ? "toggled-btn" : "";

  // styles for popup container
  const overlyStyles = {
    backgroundColor: "#fff",
    margin: "5%",
  };

  // updating edited input
  const editTodo = (event) => updateTodo(event.target.value);

  // calling function for delete  related Todo
  const deleteItem = () => {
    deleteTodo(id);
  };

  // calling function toggle tha status of the todo
  const updateTodoStatus = () => {
    updateMarkedStatus(id);
  };

  return (
    <li className="todo-item-container">
      <button
        className={`label-btns change-by-view ${markingStatus}`}
        type="button"
        onClick={updateTodoStatus}
      >
        {todoStatus ? (
          <IoIosCheckmarkCircle />
        ) : (
          <IoIosCheckmarkCircleOutline />
        )}
      </button>

      <div className="label-container">
        <p className={`checkbox-label`}> {todo}</p>
        {todoStatus && (
          <h3 className="marked-task-text">
            Task Completed <ImCheckmark />{" "}
          </h3>
        )}
        <div className="icons-cont">
          <button
            className={`label-btns change-PC-view ${markingStatus}`}
            type="button"
            onClick={updateTodoStatus}
          >
            {todoStatus ? (
              <IoIosCheckmarkCircle />
            ) : (
              <IoIosCheckmarkCircleOutline />
            )}
          </button>
          <Popup
            modal
            trigger={
              <button className="label-btns">
                <FaEdit />
              </button>
            }
            overlayStyle={overlyStyles}
          >
            {(close) => {
              // calling function for
              const saveEditedOne = (event) => {
                event.preventDefault();

                const obj = { ...item, todo: todoValue };
                updateEditedTodo(obj);
                close();
              };

              return (
                <div>
                  <h1 className>
                    Edit your <span className="editable-task">{todo}</span> Task
                  </h1>
                  <form onSubmit={saveEditedOne}>
                    <input
                      className="todo-user-input"
                      onChange={editTodo}
                      type="text"
                      value={todoValue}
                    />
                    <br />
                    <div className="popup-btns-cont">
                      <button className="button" type="submit">
                        Save
                      </button>
                      <button className="close-btn">Close</button>
                    </div>
                  </form>
                </div>
              );
            }}
          </Popup>

          <button onClick={deleteItem} className="label-btns">
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
