import { HttpError } from '../../config/Axios/axios-instance';
import { BasicUserInfo } from '../../domain/common';
import { create } from 'zustand';
import {
  UpdateUserInfoRequestDto,
  findUsers,
  FindUsersRequestDto,
  getFriends,
  updateUserInfo,
} from './user.service';

export interface UserStore {
  foundUsers: BasicUserInfo[];
  foundUsersIsLoading: boolean;
  foundUsersIsSuccess: boolean;
  foundUsersError: HttpError;
  findUsers: (inputs: FindUsersRequestDto) => void;
  friends: BasicUserInfo[];
  friendsIsLoading: boolean;
  friendsIsSuccess: boolean;
  friendsError: HttpError;
  getFriends: () => void;
  userUpdateInfoIsLoading: boolean;
  userUpdateInfoIsSuccess: boolean;
  userUpdateInfoIsError: HttpError;
  updateUserInfo: (inputs: UpdateUserInfoRequestDto) => void;
  resetUserStore: () => void;
  foundUsersIsUpdateNeeded: boolean;
  setFoundUsersIsUpdateNeeded: (value: boolean) => void;
}

const initialDataState = {
  foundUsers: [],
  foundUsersIsLoading: false,
  foundUsersIsSuccess: false,
  foundUsersError: null,
  friends: [],
  friendsIsLoading: false,
  friendsIsSuccess: false,
  friendsError: null,
  foundUsersIsUpdateNeeded: true,
  userUpdateInfoIsLoading: false,
  userUpdateInfoIsSuccess: false,
  userUpdateInfoIsError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  findUsers: (inputs: FindUsersRequestDto) => findUsers(set, get, inputs),
  getFriends: () => getFriends(set, get),
  setFoundUsersIsUpdateNeeded: (value: boolean) =>
    set({ foundUsersIsUpdateNeeded: value }),
  updateUserInfo: (inputs: UpdateUserInfoRequestDto) =>
    updateUserInfo(set, get, inputs),
  resetUserStore: () => set(initialDataState),
});

export const useUserStore = create<UserStore>((set, get) =>
  getInitialState(set, get),
);
