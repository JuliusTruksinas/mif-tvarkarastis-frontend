import { User } from '../../domain/common';
import axios, { HttpError } from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';
import { useAuthStore } from './auth.store';
import { useCalendarControlStore } from '../calendar-control/calendarControl.store';
import { useFriendStore } from '../friend/friend.store';
import { useLectureEventStore } from '../lecture-event/lectureEvent.store';
import { useNotificationStore } from '../notification/notification.store';
import { useStudyOptionsStore } from '../study-options/studyOptions.store';
import { useUserStore } from '../user/user.store';
import { useUserEventStore } from '../user-event/userEvent.store';

const API_URL = '/auth';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  firstName: string;
  lastName: string;
  studyType: number;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
}

export interface GetCurrentUserDto {
  token: string;
}

export interface RemindPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  resetPasswordToken: string;
  newPassword: string;
  repeatedPassword: string;
}

export const login = async (
  set: any,
  get: any,
  inputs: LoginRequestDto,
): Promise<void> => {
  set({
    loginIsLoading: true,
    loginIsSuccess: false,
    loginError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/login`, { ...inputs });
    const responseData = response.data?.data;

    localStorage.setItem('token', responseData.token);

    await getCurrentUser(set, get);

    set({ isUserAuthenticated: true, loginIsSuccess: true });
  } catch (error) {
    set({
      loginIsSuccess: false,
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
    registerIsSuccess: false,
    registerError: null,
  });
  try {
    await axios.post(`${API_URL}/register`, { ...inputs });
    set({ registerIsSuccess: true });
    showToast('successfully registered', 'success');
  } catch (error) {
    set({
      registerIsSuccess: false,
      registerError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ registerIsLoading: false });
  }
};

export const logout = (set: any, get: any): void => {
  localStorage.removeItem('token');

  const resetAuthStore = useAuthStore.getState().resetAuthStore;
  const resetCalendarControlStore =
    useCalendarControlStore.getState().resetCalendarControlStore;
  const resetFriendStore = useFriendStore.getState().resetFriendStore;
  const resetLectureEventStore =
    useLectureEventStore.getState().resetLectureEventStore;
  const resetNotificationStore =
    useNotificationStore.getState().resetNotificationsStore;
  const resetStudyOptionsStore =
    useStudyOptionsStore.getState().resetStudyOptionsStore;
  const resetUserStore = useUserStore.getState().resetUserStore;
  const resetUserEventStore = useUserEventStore.getState().resetUserEventStore;

  resetAuthStore();
  resetCalendarControlStore();
  resetFriendStore();
  resetLectureEventStore();
  resetNotificationStore();
  resetStudyOptionsStore();
  resetUserStore();
  resetUserEventStore();
  set({ isUserAuthenticationLoading: false });
};

export const getCurrentUser = async (
  set: any,
  get: any,
): Promise<User | HttpError> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      logout(set, get);
      return;
    }

    const response = await axios.post(`${API_URL}/me`, { token });
    const currentUser = response.data?.data;

    set({ currentUser, currentUserIsUpdateNeeded: false });

    return currentUser;
  } catch (error) {
    return error?.response?.data?.data || null;
  }
};

export const tryAutoLogin = async (set: any, get: any) => {
  set({
    currentUserIsLoading: true,
  });

  const token = localStorage.getItem('token');
  if (!token) {
    logout(set, get);
    return;
  }

  await getCurrentUser(set, get);

  set((state) => ({
    ...state,
    isUserAuthenticated: true,
    isUserAuthenticationLoading: false,
    currentUserIsLoading: false,
    currentUserIsSuccess: true,
  }));
};

export const remindPassword = async (
  set: any,
  get: any,
  inputs: RemindPasswordRequestDto,
): Promise<void> => {
  set({
    passwordRemindIsLoading: true,
    passwordRemindIsSuccess: false,
    passwordRemindError: null,
  });
  try {
    await axios.post(`${API_URL}/remind-password`, { ...inputs });
    set({ passwordRemindIsSuccess: true });

    showToast(`successfully sent an email to ${inputs.email}`, 'success');
  } catch (error) {
    set({
      passwordRemindIsSuccess: false,
      passwordRemindError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ passwordRemindIsLoading: false });
  }
};

export const resetPassword = async (
  set: any,
  get: any,
  inputs: ResetPasswordRequestDto,
): Promise<void> => {
  set({
    passwordResetIsLoading: true,
    passwordResetIsSuccess: false,
    passwordResetError: null,
  });
  try {
    await axios.post(`${API_URL}/reset-password`, { ...inputs });
    set({ passwordResetIsSuccess: true });

    showToast(`successfully reset your password`, 'success');
  } catch (error) {
    set({
      passwordResetIsSuccess: false,
      passwordResetError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ passwordResetIsLoading: false });
  }
};

export const checkResetPasswordToken = async (
  set: any,
  get: any,
  resetPasswordToken: string,
): Promise<void> => {
  set({
    resetPasswordTokenExistsIsLoading: true,
    resetPasswordTokenExistsIsSuccess: false,
    resetPasswordTokenExistsError: null,
  });
  try {
    const response = await axios.get(
      `${API_URL}/check-reset-password-token/${resetPasswordToken}`,
    );
    const responseData = response.data?.data;
    set({
      resetPasswordTokenExistsIsSuccess: true,
      resetPasswordTokenExists: responseData,
    });
  } catch (error) {
    set({
      resetPasswordTokenExistsIsSuccess: false,
      resetPasswordTokenExistsError: error?.response?.data?.data,
      resetPasswordTokenExists: false,
    });
  } finally {
    set({ resetPasswordTokenExistsIsLoading: false });
  }
};
