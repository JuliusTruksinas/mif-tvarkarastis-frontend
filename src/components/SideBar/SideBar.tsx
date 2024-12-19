import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import logoSvg from '../../assets/images/logo.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import calendarIcon from '../../assets/icons/calendar-icon.svg';
import { routes } from '../../config/Router/routes';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import styles from './SideBar.module.scss';

const SIDEBAR_ITEMS = [
  {
    label: 'Friends',
    icon: searchIcon,
    navLink: routes.friendsPage,
  },
  {
    label: 'Calendar',
    icon: calendarIcon,
    navLink: routes.calendar,
  },
];

const SideBar = () => {
  const { width } = useWindowSize();

  return (
    <div
      className={classNames(styles.sideBarContainer, {
        [styles.bottomNavbar]: width < 800,
      })}
    >
      {width > 800 && (
        <NavLink to={routes.homePage}>
          <ReactSVG src={logoSvg} className={styles.logo} />
        </NavLink>
      )}
      <div className={styles.sideBarItemsContainer}>
        {SIDEBAR_ITEMS.map((sideBarItem) => (
          <NavLink to={sideBarItem.navLink}>
            <div className={styles.sideBarItem}>
              <ReactSVG
                src={sideBarItem.icon}
                className={styles.sideBarItemIcon}
              />
              <p className={styles.sideBarItemText}>{sideBarItem.label}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
