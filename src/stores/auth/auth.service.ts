import { User } from 'src/domain/common';
import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';

const API_URL = '/auth';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  firstName: string;
  lastName: string;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
}

export interface GetCurrentUserDto {
  token: string;
}

export const login = async (
  set: any,
  get: any,
  inputs: LoginRequestDto,
): Promise<void> => {
  set({
    loginIsLoading: true,
    loginError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/login`, { ...inputs });
    const responseData = response.data?.data;

    localStorage.setItem('token', responseData.token);

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
  localStorage.removeItem('token');

  set({
    isUserAuthenticated: false,
  });
};

export const getCurrentUser = async (
  set: any,
  get: any,
  inputs: GetCurrentUserDto,
): Promise<User | null> => {
  set({
    currentUserIsLoading: true,
    currentUserError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/me`, { ...inputs });
    const responseData: User | null = response.data?.data;

    set({
      currentUser: responseData,
    });

    return responseData;
  } catch (error) {
    set({
      currentUserError: error?.response?.data?.data,
    });

    return null;
  } finally {
    set({ currentUserIsLoading: false });
  }
};

export const tryAutoLogin = async (set: any, get: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    logout(set, get);
    return;
  }

  const currentUser = await getCurrentUser(set, get, { token });

  if (!currentUser) {
    logout(set, get);
    return;
  }

  set({ isUserAuthenticated: true });
};
