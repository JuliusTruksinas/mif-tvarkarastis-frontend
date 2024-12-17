import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import {
  getCurrentUser,
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
  isUserAuthenticationLoading: boolean;
  loginIsLoading: boolean;
  loginIsSuccess: boolean;
  loginError: HttpError;
  login: (inputs: LoginRequestDto) => void;
  registerIsLoading: boolean;
  registerIsSuccess: boolean;
  registerError: HttpError;
  register: (inputs: RegisterRequestDto) => void;
  currentUser: User | null;
  currentUserIsLoading: boolean;
  currentUserIsSuccess: boolean;
  currentUserIsUpdateNeeded: boolean;
  currentUserError: HttpError;
  setCurrentUserIsUpdateNeeded: (value: boolean) => void;
  getCurrentUser: () => void;
  tryAutoLogin: () => void;
  logout: () => void;
  resetAuthStore: () => void;
}

const initialDataState = {
  isUserAuthenticated: false,
  isUserAuthenticationLoading: true,
  loginIsLoading: false,
  loginIsSuccess: false,
  loginError: null,
  registerIsLoading: false,
  registerIsSuccess: false,
  registerError: null,
  currentUser: null,
  currentUserIsLoading: false,
  currentUserIsSuccess: false,
  currentUserError: null,
  currentUserIsUpdateNeeded: false,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  register: (inputs: RegisterRequestDto) => register(set, get, inputs),
  login: (inputs: LoginRequestDto) => login(set, get, inputs),
  logout: () => logout(set, get),
  getCurrentUser: () => getCurrentUser(set, get),
  tryAutoLogin: () => tryAutoLogin(set, get),
  setCurrentUserIsUpdateNeeded: (value: boolean) =>
    set({ currentUserIsUpdateNeeded: value }),
  resetAuthStore: () => set(initialDataState),
});

export const useAuthStore = create<AuthStore>((set, get) =>
  getInitialState(set, get),
);
