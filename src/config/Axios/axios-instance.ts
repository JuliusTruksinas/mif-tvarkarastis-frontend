import axios, { HttpStatusCode } from 'axios';
import moment from 'moment-timezone';
import { useAuthStore } from '../../stores/auth/auth.store';

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      const { logout } = useAuthStore.getState();
      logout();
    }
  },
);

export default instance;
