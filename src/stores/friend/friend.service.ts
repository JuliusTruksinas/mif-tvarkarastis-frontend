import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';
import { useAuthStore } from '../auth/auth.store';
import { useCalendarControlStore } from '../calendar-control/calendarControl.store';
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
  const setFriendsIsUpdateNeeded =
    useUserStore.getState().setFriendsIsUpdateNeeded;

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
    setFriendsIsUpdateNeeded(true);
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

export const removeFriend = async (
  set: any,
  get: any,
  friendToRemoveId: string,
): Promise<void> => {
  const setFriendsIsUpdateNeeded =
    useUserStore.getState().setFriendsIsUpdateNeeded;

  const currentUser = useAuthStore.getState().currentUser;
  const setUserIdCalendar =
    useCalendarControlStore.getState().setUserIdCalendar;
  const userIdCalendar = useCalendarControlStore.getState().userIdCalendar;

  set({
    removeFriendIsLoading: true,
    removeFriendIsSuccess: false,
    removeFriendError: null,
  });
  try {
    await axios.delete(`${API_URL}/remove/${friendToRemoveId}`);

    set({
      removeFriendIsSuccess: true,
    });
    setFriendsIsUpdateNeeded(true);

    if (friendToRemoveId === userIdCalendar) {
      setUserIdCalendar(currentUser.id);
    }

    showToast('friend removed successfully', 'success');
  } catch (error) {
    set({
      removeFriendIsSuccess: false,
      removeFriendError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ removeFriendIsLoading: false });
  }
};

export const fetchFriendsOptions = async (
  set: any,
  get: any,
): Promise<void> => {
  const setFriendsIsUpdateNeeded =
    useUserStore.getState().setFriendsIsUpdateNeeded;

  set({
    friendsOptionsIsLoading: true,
    friendsOptionsIsSuccess: false,
    friendsOptionsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/options`);
    const responseData = response.data?.data;

    set({
      friendsOptionsIsSuccess: true,
      friendsOptions: responseData,
    });
    setFriendsIsUpdateNeeded(true);
  } catch (error) {
    set({
      friendsOptionsIsSuccess: false,
      friendsOptionsError: error?.response?.data?.data,
    });
  } finally {
    set({ friendsOptionsIsLoading: false });
  }
};
