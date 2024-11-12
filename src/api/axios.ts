import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.withCredentials = true // Setting with credentials to true will send the cookies with every request

export const axiosInstance = axios.create();
