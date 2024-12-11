import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';
import { useNotificationStore } from '../notification/notification.store';
import { useUserStore } from '../user/user.store';

const API_URL = '/friends';

export const sendFriendRequest = async (
  set: any,
  get: any,
  friendId: string,
): Promise<void> => {
  const setFoundUsersIsUpdateNeeded =
    useUserStore.getState().setFoundUsersIsUpdateNeeded;

  set({
    friendRequestIsLoading: true,
    friendRequestIsSuccess: false,
    friendRequestError: null,
  });
  try {
    await axios.post(`${API_URL}/request/${friendId}`);

    set({
      friendRequestIsSuccess: true,
    });
    showToast('friend request sent successfully', 'success');
    setFoundUsersIsUpdateNeeded(true);
  } catch (error) {
    set({
      friendRequestIsSuccess: false,
      friendRequestError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ friendRequestIsLoading: false });
  }
};

export const acceptFriendRequest = async (
  set: any,
  get: any,
  senderId: string,
): Promise<void> => {
  const setUnseenNotificationsIsUpdateNeeded =
    useNotificationStore.getState().setUnseenNotificationsIsUpdateNeeded;
  set({
    acceptFriendRequestIsLoading: true,
    declineFriendRequestIsSuccess: false,
    acceptFriendRequestError: null,
  });
  try {
    await axios.post(`${API_URL}/accept/${senderId}`);

    set({
      acceptFriendRequestIsSuccess: true,
    });
    setUnseenNotificationsIsUpdateNeeded(true);
    showToast('friend request accepted successfully', 'success');
  } catch (error) {
    set({
      acceptFriendRequestIsSuccess: false,
      acceptFriendRequestError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ acceptFriendRequestIsLoading: false });
  }
};

export const declineFriendRequest = async (
  set: any,
  get: any,
  senderId: string,
): Promise<void> => {
  const setUnseenNotificationsIsUpdateNeeded =
    useNotificationStore.getState().setUnseenNotificationsIsUpdateNeeded;
  set({
    declineFriendRequestIsLoading: true,
    declineFriendRequestIsSuccess: false,
    declineFriendRequestError: null,
  });
  try {
    await axios.post(`${API_URL}/decline/${senderId}`);

    set({
      declineFriendRequestIsSuccess: true,
    });
    setUnseenNotificationsIsUpdateNeeded(true);
    showToast('friend request declined successfully', 'success');
  } catch (error) {
    set({
      declineFriendRequestIsSuccess: false,
      declineFriendRequestError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ declineFriendRequestIsLoading: false });
  }
};
