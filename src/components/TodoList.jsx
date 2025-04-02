import { React, useState } from "react";
import "./TodoList.css";

const TodoList = ({ todoList, settodos, todos }) => {
  const [isEditing, setisEditing] = useState(false);
  const [changedText, setchangedText] = useState("");

  const handleCheck = (e) => {
    let id = e.target.name;
    const index = todos.findIndex((item) => item.id == id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  };

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data-id");
    let newTodos = todos.filter((item) => item.id != id);
    settodos(newTodos);
  };

  const handleEdit = (e) => {
    setchangedText(e.target.getAttribute("data-text"));
    setisEditing(true);
  };

  const handleChangeEdit = (e) => {
    setchangedText(e.target.value);
  };

  const handleSaveEditOnClick = (e) => {
    if (changedText.trim() !== "") {
      let id = e.target.getAttribute("data-id");
      const index = todos.findIndex((item) => item.id == id);
      let editedTodos = [...todos];
      editedTodos[index].text = changedText;
      settodos(editedTodos);
      setisEditing(false);
    } else {
      settodos(todos);
      setisEditing(false);
    }
  };

  const handleSaveEditOnEnter = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      handleSaveEditOnClick(e);
    }
  };

  return (
    <div className="todo-list">
      <input
        type="checkbox"
        onChange={handleCheck}
        checked={todoList.isCompleted}
        name={todoList.id}
      />
      {isEditing ? (
        <input
          type="text"
          onChange={handleChangeEdit}
          value={changedText}
          data-id={todoList.id}
          onBlur={handleSaveEditOnClick}
          onKeyDown={handleSaveEditOnEnter}
          autoFocus
        ></input>
      ) : (
        <p
          style={{
            textDecoration: todoList.isCompleted ? "line-through" : "none",
          }}
        >
          {todoList.text}
        </p>
      )}

      <span
        className="material-symbols-outlined"
        onClick={handleEdit}
        data-text={todoList.text}
        style={{ color: "black", display: isEditing ? "none" : "block" }}
      >
        edit
      </span>
      <span
        className="material-symbols-outlined"
        style={{ color: "black", display: isEditing ? "block" : "none" }}
        onClick={handleSaveEditOnClick}
        data-id={todoList.id}
      >
        check
      </span>
      <span
        className="material-symbols-outlined"
        onClick={handleDelete}
        data-id={todoList.id}
        style={{ color: "black" }}
      >
        close
      </span>
    </div>
  );
};

export default TodoList;

//saving work is pending
//on blur
//padding adjustmemnts
