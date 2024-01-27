// import React from "react";
// import Header from "../components/Home/ToListHeader/ToDoListHeader";
// import ToDoList from "../components/ToDoList";

// function Home() {
//   return (
//     <>
//       <Header />
//       <ToDoList />
//     </>
//   );
// }

// export default Home;
// src/App.js
import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState("");

  const openPopup = (taskIndex) => {
    setSelectedTask(taskIndex);
    setShowPopup(true);
    setTaskInput(taskIndex !== null ? tasks[taskIndex] : ""); // If editing, pre-fill the textfield
    setError("");
  };

  const closePopup = () => {
    setShowPopup(false);
    setTaskInput("");
    setError("");
  };

  const saveTask = () => {
    const trimmedInput = taskInput.trim();

    if (!trimmedInput) {
      setError("To-Do is required");
      return;
    }

    const updatedTasks = [...tasks];

    if (selectedTask !== null) {
      // Editing existing task
      updatedTasks[selectedTask] = trimmedInput;
    } else {
      // Adding new task
      updatedTasks.push(trimmedInput);
    }

    setTasks(updatedTasks);
    closePopup();
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className="header">
        <h2>To-Do List</h2>
        <button onClick={() => openPopup(null)}>Add New To-Do</button>
      </div>

      {tasks.length === 0 && (
        <p className="empty-message">Please add a To-Do.</p>
      )}

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <div className="actions">
              <button onClick={() => openPopup(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={closePopup}>
              &times;
            </button>
            <h3>{selectedTask !== null ? "Edit To-Do" : "Add New To-Do"}</h3>
            <input
              type="text"
              value={taskInput}
              onChange={(e) => {
                setTaskInput(e.target.value);
                setError("");
              }}
            />
            {error && <p className="error-message">{error}</p>}
            <div className="popup-actions">
              <button onClick={saveTask}>Save</button>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
