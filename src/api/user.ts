import { LoginFormValues, SignUpFormValues } from '@/types';

import { axiosInstance } from './axios';

export const loginUserApi = async (data: LoginFormValues) => {
    try {
        const response = await axiosInstance.post(
            `/api/users/login`,
            data,
        );
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserProfileApi = async () => {
    try {
        const response = await axiosInstance.get(`/api/users/profile`);
        const { user, tasks } = response.data
        return { user, tasks }
    } catch (error) {
        throw error
    }
}

export const forgotPasswordApi = async (data: string) => {
    try {
        const response = await axiosInstance.post(`api/users/forgotPassword`, data);
        return response.data
    } catch (error) {
        throw error
    }
}

export const resetPasswordApi = async (data: LoginFormValues) => {
    try {
        const response = await axiosInstance.post(`/api/users/resetPassword`, data);
        return response.data
    } catch (error) {
        throw error
    }
}

export const signoutApi = async () => {
    try {
        const response = await axiosInstance.get(`api/users/signout`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const signupApi = async (data: SignUpFormValues) => {
    try {
        const response = await axiosInstance.post(`api/users/signup`, data);
        return response.data
    } catch (error) {
        throw error
    }
}
