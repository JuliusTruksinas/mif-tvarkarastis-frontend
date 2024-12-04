import { HttpError } from '../../config/Axios/axios-instance';
import { BasicUserInfo } from '../../domain/common';
import { create } from 'zustand';
import { findUsers, FindUsersRequestDto, getFriends } from './user.service';

export interface UserStore {
  foundUsers: BasicUserInfo[];
  foundUsersIsLoading: boolean;
  foundUsersError: HttpError;
  findUsers: (inputs: FindUsersRequestDto) => void;
  friends: BasicUserInfo[];
  friendsIsLoading: boolean;
  friendsError: HttpError;
  getFriends: () => void;
  resetUserStore: () => void;
  foundUsersIsUpdateNeeded: boolean;
  setFoundUsersIsUpdateNeeded: (value: boolean) => void;
}

const initialDataState = {
  foundUsers: [],
  foundUsersIsLoading: false,
  foundUsersError: null,
  friends: [],
  friendsIsLoading: false,
  friendsError: null,
  foundUsersIsUpdateNeeded: true,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  findUsers: (inputs: FindUsersRequestDto) => findUsers(set, get, inputs),
  getFriends: () => getFriends(set, get),
  setFoundUsersIsUpdateNeeded: (value: boolean) =>
    set({ foundUsersIsUpdateNeeded: value }),
  resetUserStore: () => set(initialDataState),
});

export const useUserStore = create<UserStore>((set, get) =>
  getInitialState(set, get),
);
