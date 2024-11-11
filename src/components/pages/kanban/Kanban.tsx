"use client";

import React, { useState, useCallback } from "react";
import TaskList from "./components/TaskList";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import { TaskFormValues } from "@/lib/task";
import { taskSchema } from "@/lib/taskValidationSchema";
import { useToast } from "@/hooks/use-toast";
import TaskCreationForm from "./components/TaskCreationForm";
import { Task } from "@/lib/task";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { addTask, updateTask } from "@/app/store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { undo } from "redux-undo-action";
import { Player } from '@lottiefiles/react-lottie-player';

const Kanban = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<{
    sortBy: string;
    filterByStatus: string;
    filterByPriority: string;
  }>({
    sortBy: "dueDate",
    filterByStatus: "All",
    filterByPriority: "All",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch()

  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });
  const selectedDate = watch("dueDate");

  console.log("formState error - ", errors);
  console.log(selectedDate);

  const addOrUpdateTask = async (data: TaskFormValues) => {
    let newTask: Task;
    if (editingTask) {
      // console.log("Tak update data - ", data);
      // Update existing task
      newTask = {
        ...editingTask, // Start from the editing task
        title: data.title,
        description: data.description,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"],
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };
      const updateTaskAction = updateTask(newTask)
      dispatch(updateTaskAction)

      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${newTask._id}`,
          newTask,
          {
            withCredentials: true
          }
        )
        toast({
          title: "Success",
          description: "Successfully updated task",
          variant: "default",
        });
      } catch (error) {
        // Todo: if task update failed, revert to previous state
        console.log(error)
        toast({
          title: "Error",
          description: "Failed to update task",
          variant: "destructive",
        });
        dispatch(undo(updateTaskAction))
      }

    } else {
      // Add new task
      newTask = {
        _id: Date.now().toString(),
        title: data.title,
        description: data.description,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"],
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };

      const addTaskAction = addTask(newTask)
      dispatch(addTaskAction)

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
          newTask,
          {
            withCredentials: true
          }
        )
        toast({
          title: "Success",
          description: "Successfully added task",
          variant: "default",
        });
      } catch (error) {
        // Todo: if task update failed, revert to previous state
        console.log(error)
        toast({
          title: "Error",
          description: "Failed to add task",
          variant: "destructive",
        });
        dispatch(undo(addTaskAction))
      }
    }

    reset();
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Sorting and filtering logic based on filterCriteria
  // Sorting and filtering logic based on filterCriteria
  const sortedTasks = tasks
    .filter((task: Task) => {
      if (
        filterCriteria.filterByStatus !== "All" &&
        task.status !== filterCriteria.filterByStatus
      ) {
        return false;
      }
      if (
        filterCriteria.filterByPriority !== "All" &&
        task.priority !== filterCriteria.filterByPriority
      ) {
        return false;
      }
      return true;
    })
    .sort((a: Task, b: Task) => {
      if (filterCriteria.sortBy === "priority-low") {
        const priorityMap = { Low: 1, Medium: 2, High: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else if (filterCriteria.sortBy === "priority-high") {
        const priorityMap = { Low: 3, Medium: 2, High: 1 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else if (filterCriteria.sortBy === "dueDate") {
        // Ensure that tasks without a due date appear last
        const aDue =
          a.dueDate instanceof Date && !isNaN(a.dueDate.getTime())
            ? a.dueDate.getTime()
            : Infinity;
        const bDue =
          b.dueDate instanceof Date && !isNaN(b.dueDate.getTime())
            ? b.dueDate.getTime()
            : Infinity;
        return aDue - bDue;
      }
      return 0;
    });


  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    // Populate the form with the task data
    setValue("title", task.title);
    setValue("description", task.description || "");
    setValue("status", task.status);
    setValue("priority", task.priority);
    setValue("dueDate", task.dueDate);
  };

  /* const saveEditedTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  }; */

  const editTask = useCallback(
    (task: Task) => {
      setEditingTask(task);
      setIsModalOpen(true);
      Object.keys(task).forEach((key) => {
        setValue(
          key as keyof TaskFormValues,
          task[key as keyof Task] as string
        );
      });
    },
    [setValue]
  );


  return (
    <div className="transition-all ease-in-out duration-500 padding-horizontal">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-800 dark:text-white transition-colors duration-300">
          Task Manager
        </h1>

        <TaskCreationForm
          onSubmit={addOrUpdateTask}
          setEditingTask={setEditingTask}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingTask={editingTask}
        />

        <div>
          {tasks.length === 0 ?
            <div className="">
              <Player
                autoplay
                loop
                src="/emptyListAnimation.json"
                style={{ height: '50%', width: '50%', marginTop: 0, paddingTop: 0 }}
              >
              </Player>
            </div>
            :
            <TaskList
              tasks={sortedTasks}
              openEditModal={openEditModal}
              editTask={editTask}
            />
          }

        </div>
      </div>
    </div>
  );
};

export default Kanban;
