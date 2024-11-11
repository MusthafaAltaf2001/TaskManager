import React from "react";
import TaskListCard from "./TaskListCard";
import { Task } from "@/lib/task";

type TaskListProps = {
  tasks: Task[];
  openEditModal?: (task: Task) => void;
  editTask: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  openEditModal,
  editTask,
}) => {

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {sortedTasks.map((task) => (
        <div key={task._id} className="w-full">
          <TaskListCard
            task={task}
            editTask={editTask}
            openEditModal={openEditModal}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
