import axios from 'axios';

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
  }

  return config;
});

export default instance;
