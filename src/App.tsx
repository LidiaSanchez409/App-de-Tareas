import { useEffect, useState } from "react";
import type { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Background from "./components/Background"; // 👈 importa el fondo

type Filter = "all" | "completed" | "pending";

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // Cargar desde LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="relative min-h-screen">
      <Background />
      {/* Overlay para legibilidad del contenido sobre la imagen */}
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="bg-white/90 rounded-xl shadow-md p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">App de Tareas</h1>

            <TaskForm addTask={addTask} />

            {/* Filtros */}
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg ${
                  filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-lg ${
                  filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded-lg ${
                  filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Completadas
              </button>
            </div>

            <TaskList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


