import { ReactNode } from 'react';
import SideBar from '../SideBar/SideBar';
import { TopBar } from '../TopBar/TopBar';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainer}>
      <SideBar />
      <div className={styles.mainContentContainer}>
        <TopBar />
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
