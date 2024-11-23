import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import {
  getCurrentUser,
  GetCurrentUserDto,
  login,
  LoginRequestDto,
  logout,
  register,
  RegisterRequestDto,
  tryAutoLogin,
} from './auth.service';
import { User } from '../../domain/common';

export interface AuthStore {
  isUserAuthenticated: boolean;
  loginIsLoading: boolean;
  loginError: HttpError;
  login: (inputs: LoginRequestDto) => void;
  registerIsLoading: boolean;
  registerError: HttpError;
  register: (inputs: RegisterRequestDto) => void;
  currentUser: User | null;
  currentUserIsLoading: boolean;
  currentUserError: HttpError;
  getCurrentUser: (inputs: GetCurrentUserDto) => void;
  tryAutoLogin: () => void;
  logout: () => void;
  resetAuthStore: () => void;
}

const initialDataState = {
  isUserAuthenticated: false,
  loginIsLoading: false,
  loginError: null,
  registerIsLoading: false,
  registerError: null,
  currentUser: null,
  currentUserIsLoading: false,
  currentUserError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  register: (inputs: RegisterRequestDto) => register(set, get, inputs),
  login: (inputs: LoginRequestDto) => login(set, get, inputs),
  logout: () => logout(set, get),
  getCurrentUser: (inputs: GetCurrentUserDto) =>
    getCurrentUser(set, get, inputs),
  tryAutoLogin: () => tryAutoLogin(set, get),
  resetAuthStore: () => set(initialDataState),
});

export const useAuthStore = create<AuthStore>((set, get) =>
  getInitialState(set, get),
);
