import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import notificationsIcon from '../../assets/icons/notification.svg';
import userImage from '../../assets/images/user.png';
import { useAuthStore } from '../../stores/auth/auth.store';
import logoSvg from '../../assets/images/logo.svg';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import styles from './TopBar.module.scss';

export const TopBar = () => {
  const { logout } = useAuthStore();
  const { width } = useWindowSize();

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
              4
            </span>
          </div>
          <div
            tabIndex={0}
            className={classNames(
              'menu menu-sm dropdown-content z-[1] shadow',
              styles.menuDropdown,
            )}
          >
            <div className={styles.notificationsDropdownContentContainer}>
              <div className={styles.notificationItem}>
                <img src={userImage} alt="" tabIndex={0} />
                <div className={styles.ctaNameContainer}>
                  <p className={styles.fullName}>Julius Truksinas</p>
                  <div className={styles.notificationCtaContainer}>
                    <button
                      className={classNames(
                        styles.notificationCtaBtn,
                        styles.acceptBtn,
                      )}
                    >
                      Accept
                    </button>
                    <button
                      className={classNames(
                        styles.notificationCtaBtn,
                        styles.dismissBtn,
                      )}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <p>Profile</p>
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
