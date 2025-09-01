import { useState } from "react";

interface Props {
  addTask: (title: string) => void;
}

function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // evitar tareas vacías
    addTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded-lg p-2"
        placeholder="Escribe una tarea..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Añadir
      </button>
    </form>
  );
}

export default TaskForm;
