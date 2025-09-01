import type { Task } from "../types";
import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
}

function TaskList({ tasks, toggleTask, deleteTask, editTask }: Props) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No hay tareas aún</p>;
  }

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TaskList;
