import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import notificationsIcon from '../../assets/icons/notification.svg';
import { useAuthStore } from '../../stores/auth/auth.store';
import logoSvg from '../../assets/images/logo.svg';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import styles from './TopBar.module.scss';
import { useNotificationStore } from '../../stores/notification/notification.store';
import Notification from '../Notification/Notification';
import { routes } from '../../config/Router/routes';
import { NavLink } from 'react-router-dom';

export const TopBar = () => {
  const {
    fetchUnseenNotifications,
    unseenNotifications,
    unseenNotificationsIsUpdateNeeded,
  } = useNotificationStore();
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const { logout, currentUser, getCurrentUser, currentUserIsUpdateNeeded } =
    useAuthStore();
  const { width } = useWindowSize();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUnseenNotifications();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

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

  const handleDownloadApp = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();

      // if the user agrees the outcome value will be 'accepted'
      // const { outcome } = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
    }
  };

  return (
    <div className={styles.topBarContainer}>
      {width < 800 && (
        <NavLink to={routes.aboutUs}>
          <ReactSVG src={logoSvg} />
        </NavLink>
      )}
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
          <img
            src="https://th.bing.com/th/id/R.9002144c9ad458b687e5aeb4bdb4e0bf?rik=s4enLQDyyN6m7A&pid=ImgRaw&r=0"
            alt=""
            tabIndex={0}
          />
          <ul
            tabIndex={0}
            className={classNames(
              'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow',
              styles.userMenuDropdownContentContainer,
            )}
          >
            <li onClick={() => navigate(routes.userSettingsPage)}>
              <p>Settings</p>
            </li>
            <li onClick={logout}>
              <p>Logout</p>
            </li>

            <li onClick={handleDownloadApp}>
              <p>Download app</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
