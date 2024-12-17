import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import notificationsIcon from '../../assets/icons/notification.svg';
import userImage from '../../assets/images/user.png';
import { useAuthStore } from '../../stores/auth/auth.store';
import logoSvg from '../../assets/images/logo.svg';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import styles from './TopBar.module.scss';
import { useNotificationStore } from '../../stores/notification/notification.store';
import Notification from '../Notification/Notification';
import { routes } from '../../config/Router/routes';

export const TopBar = () => {
  const {
    fetchUnseenNotifications,
    unseenNotifications,
    unseenNotificationsIsUpdateNeeded,
  } = useNotificationStore();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuthStore();
  const { width } = useWindowSize();

  useEffect(() => {
    if (currentUser) {
      fetchUnseenNotifications();
    }
  }, [currentUser]);

  useEffect(() => {
    if (unseenNotificationsIsUpdateNeeded) {
      fetchUnseenNotifications();
    }
  }, [unseenNotificationsIsUpdateNeeded]);

  return (
    <div className={styles.topBarContainer}>
      {width < 800 && <ReactSVG src={logoSvg} />}
      <div className={styles.ctaContainer}>
        <div
          className={classNames(
            'dropdown dropdown-end',
            styles.notificationsDropdownContainer,
          )}
        >
          <div
            className={classNames('indicator', styles.indicator)}
            tabIndex={0}
          >
            <ReactSVG
              className={styles.notificationIcon}
              src={notificationsIcon}
            />
            <span
              className={classNames(
                'badge badge-xs badge-primary indicator-item',
                styles.indicatorItem,
              )}
            >
              {unseenNotifications?.length || 0}
            </span>
          </div>
          {unseenNotifications?.length !== 0 && (
            <div
              tabIndex={0}
              className={classNames(
                'menu menu-sm dropdown-content z-[1] shadow',
                styles.menuDropdown,
              )}
            >
              <div className={styles.notificationsDropdownContentContainer}>
                {unseenNotifications.map((unseenNotification) => (
                  <Notification notification={unseenNotification} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className={classNames(
            'dropdown dropdown-end',
            styles.userMenuDropdownContainer,
          )}
        >
          <img src={userImage} alt="" tabIndex={0} />
          <ul
            tabIndex={0}
            className={classNames(
              'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow',
              styles.userMenuDropdownContentContainer,
            )}
          >
            <li>
              <p onClick={() => navigate(routes.userPage)}>Settings</p>
            </li>
            <li>
              <p onClick={logout}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
