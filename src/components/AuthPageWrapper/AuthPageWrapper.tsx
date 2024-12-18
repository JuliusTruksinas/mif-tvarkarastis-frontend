import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthPageWrapper.module.scss';
import logoSvg from '../../assets/images/logo.svg';
import { ReactSVG } from 'react-svg';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import { routes } from '../../config/Router/routes';

type Props = {
  children: ReactNode;
};

const MOBILE_BREAK_POINT = 600;

const AuthPageWrapper = ({ children }: Props) => {
  const { width } = useWindowSize();

  return (
    <div className={styles.authPageWrapperContainer}>
      {width >= MOBILE_BREAK_POINT && (
        <div className={styles.authSideBar}>
          <NavLink to={routes.loginPage}>
            <ReactSVG src={logoSvg} />
          </NavLink>
        </div>
      )}
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default AuthPageWrapper;
