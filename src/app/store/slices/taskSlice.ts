import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UniqueIdentifier } from "@dnd-kit/core";

export type Task = {
  _id: UniqueIdentifier;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      console.log("setting tasks - ", action.payload);
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      console.log("adding task - ", action.payload);
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<UniqueIdentifier>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: UniqueIdentifier;
        newStatus: Task["status"];
      }>
    ) => {
      const task = state.tasks.find((t) => t._id === action.payload.taskId);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
