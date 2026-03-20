import { useEffect, useRef, useState } from "react";
import "./App.css";
import Task from "./components/Task/Task";

export default function App() {
  // State
  const [tasks, setTasks] = useState(() => {
    // récupération d'une potentielle liste en cours
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [error, setError] = useState("");

  // Variables
  const content = useRef();

  // Functions
  const doneClickHandler = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const setNewTask = (e) => {
    e.preventDefault();

    const value = content.current.value.trim();
    // Gestion du message d'erreur en cas de tache "vide"
    if (!value) {
      setError("Veuillez saisir une tache");
      return;
    }

    setTasks([...tasks, { content: value, done: false }]);

    setError("");
  };

  // Cycle
  useEffect(() => {
    // focus sur l'input
    content.current.focus();
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // remise à vide de l'input
    content.current.value = "";
  }, [tasks]);

  // partie HTML
  return (
    <div className="App">
      <header>
        <span>TO-DO</span>
      </header>

      <div className="add">
        <form
          onSubmit={(event) => {
            setNewTask(event);
          }}
        >
          <input
            type="text"
            placeholder="Que souhaitez-vous ajouter ?"
            ref={content}
            onChange={() => setError("")}
          />
          <button type="submit">Ajouter</button>
        </form>
        {/* Message Erreur en cas de tache vide */}
        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
            {error}
          </p>
        )}
      </div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          content={task.content}
          done={task.done}
          doneClicked={() => doneClickHandler(index)}
          remTask={() => removeTask(index)}
        />
      ))}
    </div>
  );
}
