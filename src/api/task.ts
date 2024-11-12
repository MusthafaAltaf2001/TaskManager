import { Task, TaskFormValues } from '../types';
import axios from 'axios'

export const addTaskApi = async (newTask: TaskFormValues) => {
    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
            newTask,
            {
                withCredentials: true
            }
        )
    } catch (error) {
        throw error
    }
};

export const updateTaskApi = async (newTask: Task) => {
    try {
        await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${newTask._id}`,
            newTask,
            {
                withCredentials: true
            }
        )
    } catch (error) {
        throw error
    }
}

export const deleteTaskApi = async (task: Task) => {
    try {
        await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${task._id}`,
            {
                withCredentials: true
            }
        )
    } catch (error) {
        throw error
    }
}

