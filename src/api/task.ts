import { Task, TaskFormValues } from '../types';

import { axiosInstance } from './axios';

/**
 * All api endpoints relating to the tasks endpoint
 * Consists of getting tasks, adding new tasks, updating tasks and deleting tasks
 */

export const getTasksApi = async () => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const addTaskApi = async (newTask: TaskFormValues) => {
    try {
        const response = await axiosInstance.post(`/api/tasks/`, newTask)
        return response.data
    } catch (error) {
        throw error
    }
};

export const updateTaskApi = async (newTask: Task) => {
    try {
        const response = await axiosInstance.put(`/api/tasks/${newTask._id}`, newTask)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteTaskApi = async (task: Task) => {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${task._id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

