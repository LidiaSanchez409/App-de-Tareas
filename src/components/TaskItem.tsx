import { useState } from "react";
import type { Task } from "../types";
import { Edit, Trash2, Save } from "lucide-react";

interface Props {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
}

function TaskItem({ task, toggleTask, deleteTask, editTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    editTask(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow">
      {isEditing ? (
        <form onSubmit={handleEdit} className="flex-1 flex gap-2 items-center">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 border rounded-lg p-1"
          />
          <button type="submit" className="text-green-600 hover:text-green-800">
            <Save size={18} />
          </button>
        </form>
      ) : (
        <>
          <div
            onClick={() => toggleTask(task.id)}
            className="flex-1 cursor-pointer"
          >
            <span
              className={`${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
              title="Editar"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-600 hover:text-red-800"
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
