import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from './friend.service';

export interface FriendStore {
  friendRequestIsLoading: boolean;
  friendRequestIsSuccess: boolean;
  friendRequestError: HttpError;
  sendFriendRequest: (id: string) => void;
  acceptFriendRequestIsLoading: boolean;
  acceptFriendRequestIsSuccess: boolean;
  acceptFriendRequestError: HttpError;
  acceptFriendRequest: (senderId: string) => void;
  declineFriendRequestIsLoading: boolean;
  declineFriendRequestIsSuccess: boolean;
  declineFriendRequestError: HttpError;
  declineFriendRequest: (senderId: string) => void;
  removeFriendIsLoading: boolean;
  removeFriendIsSuccess: boolean;
  removeFriendError: HttpError;
  removeFriend: (senderId: string) => void;
  resetFriendStore: () => void;
}

const initialDataState = {
  friendRequestIsSuccess: false,
  friendRequestIsLoading: false,
  friendRequestError: null,
  acceptFriendRequestIsLoading: false,
  acceptFriendRequestIsSuccess: false,
  acceptFriendRequestError: null,
  declineFriendRequestIsLoading: false,
  declineFriendRequestIsSuccess: false,
  declineFriendRequestError: null,
  removeFriendIsLoading: false,
  removeFriendIsSuccess: false,
  removeFriendError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  sendFriendRequest: (id: string) => sendFriendRequest(set, get, id),
  acceptFriendRequest: (senderId: string) =>
    acceptFriendRequest(set, get, senderId),
  declineFriendRequest: (senderId: string) =>
    declineFriendRequest(set, get, senderId),
  removeFriend: (senderId: string) => removeFriend(set, get, senderId),
  resetFriendStore: () => set(initialDataState),
});

export const useFriendStore = create<FriendStore>((set, get) =>
  getInitialState(set, get),
);
