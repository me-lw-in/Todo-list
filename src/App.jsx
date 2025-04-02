import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [todos, settodos] = useState(() => {
    // Load todos from localStorage on initial render, or use empty array if none
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAdd = (e) => {
    if (task.trim() !== "") {
      settodos([...todos, { id: uuidv4(), text: task, isCompleted: false }]);
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (task.trim() !== "") {
        settodos([...todos, { id: uuidv4(), text: task, isCompleted: false }]);
        setTask("");
      }
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="heading">
          <h2>
            Todo App
            <span
              className="material-symbols-outlined bounce-animation"
              style={{ color: "black", fontSize: "30px" }}
            >
              list_alt
            </span>
          </h2>
        </div>
        <div
          className="sub-container"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "max-content",
          }}
        >
          <div className="input-field">
            <input
              type="text"
              value={task}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Add your task"
            />
            <button onClick={handleAdd}>
              <span className="material-symbols-outlined ">add</span>
            </button>
          </div>
          <div className="list-container">
            {todos.map((lists) => (
              <TodoList
                key={lists.id}
                todoList={lists}
                settodos={settodos}
                todos={todos}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
