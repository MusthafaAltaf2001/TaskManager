import axios from 'axios'

/**
 * Setting default axios configurations
 * Make sure only one instance of axios is created for one url
 * If another API is used, create another instance here
 */

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.withCredentials = true // Setting with credentials to true will send the cookies with every request

export const axiosInstance = axios.create();
