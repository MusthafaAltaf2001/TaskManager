import { LoginFormValues } from '@/types';
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