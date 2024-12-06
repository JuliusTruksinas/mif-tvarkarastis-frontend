export enum NotificationType {
  friendRequestNotification = 'FriendRequestNotification',
  friendRequestAcceptedNotification = 'FriendRequestAcceptedNotification',
  friendRequestDeclinedNotification = 'FriendRequestDeclinedNotification',
}

export interface Notification {
  _id: string;
  notificationType: NotificationType;
  data: any;
  isSeen: boolean;
  createdAt: string;
}
