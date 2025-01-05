import classNames from 'classnames';
import styles from './Notification.module.scss';
import { NotificationType, type Notification } from '../../domain/notification';
import { useFriendStore } from '../../stores/friend/friend.store';
import { useNotificationStore } from '../../stores/notification/notification.store';
import { FALLBACK_PROFILE_PHOTO_URL } from '../../constants';

type Props = {
  notification: Notification;
};

const Notification = ({ notification }: Props) => {
  const { acceptFriendRequest, declineFriendRequest } = useFriendStore();
  const { setNotificationToSeen } = useNotificationStore();

  if (
    notification.notificationType === NotificationType.friendRequestNotification
  ) {
    return (
      <div className={styles.notificationItem}>
        <div className="avatar">
          <div className="mask mask-circle h-11 w-11">
            <img
              className="object-cover object-center"
              src={
                notification.data?.user?.profilePhotoUrl ||
                FALLBACK_PROFILE_PHOTO_URL
              }
              alt=""
              tabIndex={0}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PROFILE_PHOTO_URL;
              }}
            />
          </div>
        </div>

        <div className={styles.ctaNameContainer}>
          <p
            className={styles.fullName}
          >{`${notification?.data?.user?.firstName} ${notification?.data?.user?.lastName}`}</p>
          <div className={styles.notificationCtaContainer}>
            <button
              className={classNames(
                styles.notificationCtaBtn,
                styles.acceptBtn,
              )}
              onClick={() => {
                acceptFriendRequest(notification?.data?.user?.id);
                setNotificationToSeen(notification._id);
              }}
            >
              Accept
            </button>
            <button
              className={classNames(
                styles.notificationCtaBtn,
                styles.dismissBtn,
              )}
              onClick={() => {
                declineFriendRequest(notification?.data?.user?.id);
                setNotificationToSeen(notification._id);
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (
    notification.notificationType ===
    NotificationType.friendRequestAcceptedNotification
  ) {
    return (
      <div
        className={styles.notificationItem}
        onClick={() => setNotificationToSeen(notification._id)}
      >
        <div className="avatar">
          <div className="mask mask-circle h-11 w-11">
            <img
              className="object-cover object-center"
              src={
                notification.data?.user?.profilePhotoUrl ||
                FALLBACK_PROFILE_PHOTO_URL
              }
              alt=""
              tabIndex={0}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PROFILE_PHOTO_URL;
              }}
            />
          </div>
        </div>
        <p>{`${notification?.data?.user?.firstName} ${notification?.data?.user?.lastName} accepted your friend request`}</p>
      </div>
    );
  }

  if (
    notification.notificationType ===
    NotificationType.friendRequestDeclinedNotification
  ) {
    return (
      <div
        className={styles.notificationItem}
        onClick={() => setNotificationToSeen(notification._id)}
      >
        <div className="avatar">
          <div className="mask mask-circle h-11 w-11">
            <img
              className="object-cover object-center"
              src={
                notification.data?.user?.profilePhotoUrl ||
                FALLBACK_PROFILE_PHOTO_URL
              }
              alt=""
              tabIndex={0}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PROFILE_PHOTO_URL;
              }}
            />
          </div>
        </div>
        <p>{`${notification?.data?.user?.firstName} ${notification?.data?.user?.lastName} declined your friend request`}</p>
      </div>
    );
  }

  return (
    <div
      className={styles.notificationItem}
      onClick={() => setNotificationToSeen(notification._id)}
    >
      <p>{notification?.data?.message}</p>
    </div>
  );
};

export default Notification;
