import axios from '../../config/Axios/axios-instance';

const API_URL = '/notifications';

export const fetchUnseenNotifications = async (
  set: any,
  get: any,
): Promise<void> => {
  set({
    unseenNotificationsIsLoading: true,
    unseenNotificationsIsSuccess: false,
    unseenNotificationsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}`);
    const responseData = response.data?.data;

    set({
      unseenNotificationsIsSuccess: true,
      unseenNotifications: responseData,
      unseenNotificationsIsUpdateNeeded: false,
    });
  } catch (error) {
    set({
      unseenNotificationsIsSuccess: false,
      unseenNotificationsError: error?.response?.data?.data,
    });
  } finally {
    set({ unseenNotificationsIsLoading: false });
  }
};

export const setNotificationToSeen = async (
  set: any,
  get: any,
  notificationId: string,
): Promise<void> => {
  set({
    setNotificationToSeenIsLoading: true,
    setNotificationToSeenIsSuccess: false,
    setNotificationToSeenError: null,
  });
  try {
    await axios.patch(`${API_URL}/${notificationId}/seen`);

    set({
      setNotificationToSeenIsSuccess: true,
      unseenNotificationsIsUpdateNeeded: true,
    });
  } catch (error) {
    set({
      setNotificationToSeenIsSuccess: false,
      setNotificationToSeenError: error?.response?.data?.data,
    });
  } finally {
    set({ unseenNotificationsIsLoading: false });
  }
};
