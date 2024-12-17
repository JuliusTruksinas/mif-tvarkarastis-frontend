import axios from 'axios';
import moment from 'moment-timezone';

export type HttpError =
  | null
  | string
  | Array<{ [key: string]: string }>
  | Array<{ field: string; message: string }>;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['x-timezone'] = moment.tz.guess();
  }

  return config;
});

export default instance;
