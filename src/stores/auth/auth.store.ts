import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import {
  login,
  LoginRequestDto,
  logout,
  register,
  RegisterRequestDto,
} from './auth.service';

export interface AuthStore {
  isUserAuthenticated: boolean;
  loginIsLoading: boolean;
  loginError: HttpError;
  registerIsLoading: boolean;
  registerError: HttpError;
  register: (inputs: RegisterRequestDto) => void;
  login: (inputs: LoginRequestDto) => void;
  logout: () => void;
  resetAuthStore: () => void;
}

const initialDataState = {
  isUserAuthenticated: false,
  loginIsLoading: false,
  loginError: null,
  registerIsLoading: false,
  registerError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  register: (inputs: RegisterRequestDto) => register(set, get, inputs),
  login: (inputs: LoginRequestDto) => login(set, get, inputs),
  logout: () => logout(set, get),
  resetAuthStore: () => set(initialDataState),
});

export const useAuthStore = create<AuthStore>((set, get) =>
  getInitialState(set, get),
);
