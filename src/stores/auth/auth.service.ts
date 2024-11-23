import { useNavigate } from 'react-router-dom';
import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';
import { routes } from '../../config/Router/routes';

const API_URL = '/auth';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  firtsName: string;
  lastName: string;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
}

export const login = async (
  set: any,
  get: any,
  inputs: LoginRequestDto,
): Promise<void> => {
  const navigate = useNavigate();

  set({
    loginIsLoading: true,
    loginError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/login`, { ...inputs });
    const responseData = response.data?.data;

    localStorage.setItem('token', responseData.token);
    navigate(routes.calendar);
    set({ isUserAuthenticated: true });
  } catch (error) {
    set({
      loginError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ loginIsLoading: false });
  }
};

export const register = async (
  set: any,
  get: any,
  inputs: RegisterRequestDto,
): Promise<void> => {
  set({
    registerIsLoading: true,
    registerError: null,
  });
  try {
    await axios.post(`${API_URL}/register`, { ...inputs });
    showToast('successfully registered', 'success');
  } catch (error) {
    set({
      registerError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ registerIsLoading: false });
  }
};

export const logout = (set: any, get: any): void => {
  const navigate = useNavigate();

  localStorage.removeItem('token');

  set({
    isUserAuthenticated: false,
  });

  navigate(routes.loginPage);
};
