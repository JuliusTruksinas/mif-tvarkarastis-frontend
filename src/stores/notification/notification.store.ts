import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { Notification } from '../../domain/notification';
import {
  fetchUnseenNotifications,
  setNotificationToSeen,
} from './notification.service';

export interface NotificationStore {
  unseenNotifications: Notification[];
  unseenNotificationsIsLoading: boolean;
  unseenNotificationsIsSuccess: boolean;
  unseenNotificationsError: HttpError;
  unseenNotificationsIsUpdateNeeded: boolean;
  fetchUnseenNotifications: () => void;
  setNotificationToSeenIsLoading: boolean;
  setNotificationToSeenIsSuccess: boolean;
  setNotificationToSeenError: HttpError;
  setNotificationToSeen: (notificationId: string) => void;
  resetNotificationsStore: () => void;
  setUnseenNotificationsIsUpdateNeeded: (value: boolean) => void;
}

const initialDataState = {
  unseenNotifications: [],
  unseenNotificationsIsLoading: false,
  unseenNotificationsIsSuccess: false,
  unseenNotificationsError: null,
  unseenNotificationsIsUpdateNeeded: false,
  setNotificationToSeenIsLoading: false,
  setNotificationToSeenIsSuccess: false,
  setNotificationToSeenError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchUnseenNotifications: () => fetchUnseenNotifications(set, get),
  setNotificationToSeen: (notificationId: string) =>
    setNotificationToSeen(set, get, notificationId),
  resetNotificationsStore: () => set(initialDataState),
  setUnseenNotificationsIsUpdateNeeded: (value: boolean) =>
    set({ unseenNotificationsIsUpdateNeeded: value }),
});

export const useNotificationStore = create<NotificationStore>((set, get) =>
  getInitialState(set, get),
);
