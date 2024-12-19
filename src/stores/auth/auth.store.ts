import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import {
  checkResetPasswordToken,
  getCurrentUser,
  login,
  LoginRequestDto,
  logout,
  register,
  RegisterRequestDto,
  remindPassword,
  RemindPasswordRequestDto,
  resetPassword,
  ResetPasswordRequestDto,
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
  passwordRemindIsLoading: boolean;
  passwordRemindIsSuccess: boolean;
  passwordRemindError: HttpError;
  remindPassword: (inputs: RemindPasswordRequestDto) => void;
  passwordResetIsLoading: boolean;
  passwordResetIsSuccess: boolean;
  passwordResetError: HttpError;
  resetPassword: (inputs: ResetPasswordRequestDto) => void;
  resetPasswordTokenExists: boolean;
  resetPasswordTokenExistsIsLoading: boolean;
  resetPasswordTokenExistsIsSuccess: boolean;
  resetPasswordTokenExistsError: HttpError;
  checkResetPasswordToken: (resetPasswordToken: string) => void;
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
  passwordRemindIsLoading: false,
  passwordRemindIsSuccess: false,
  passwordRemindError: null,
  passwordResetIsLoading: false,
  passwordResetIsSuccess: false,
  passwordResetError: null,
  resetPasswordTokenExists: false,
  resetPasswordTokenExistsIsLoading: false,
  resetPasswordTokenExistsIsSuccess: false,
  resetPasswordTokenExistsError: null,
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
  remindPassword: (inputs: RemindPasswordRequestDto) =>
    remindPassword(set, get, inputs),
  resetPassword: (inputs: ResetPasswordRequestDto) =>
    resetPassword(set, get, inputs),
  checkResetPasswordToken: (resetPasswordToken: string) =>
    checkResetPasswordToken(set, get, resetPasswordToken),
  resetAuthStore: () => set(initialDataState),
});

export const useAuthStore = create<AuthStore>((set, get) =>
  getInitialState(set, get),
);
