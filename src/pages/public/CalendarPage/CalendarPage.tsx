import { useState } from 'react';
import classNames from 'classnames';
import Calendar from '../../../components/Calendar/Calendar';
import styles from './CalendarPage.module.scss';
import addIcon from '../../../assets/icons/add.svg';
import { ReactSVG } from 'react-svg';
import CustomEventModal from '../../../components/UserEventModal/UserEventModal';

const CalendarPage = () => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.calendarPageContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.pageTitle}>Welcome back, Marius</h1>
            <p className={styles.pageSubtitle}>
              View both your personal and friends’ calendars, and create custom
              events
            </p>
          </div>
          <button
            className={classNames('btn', styles.addEventBtn)}
            onClick={() => setIsCustomModalOpen(true)}
          >
            <ReactSVG src={addIcon} />
            <p>Add event</p>
          </button>
        </div>
        <Calendar />
      </div>
      {isCustomModalOpen && (
        <CustomEventModal onClose={() => setIsCustomModalOpen(false)} />
      )}
    </>
  );
};

export default CalendarPage;
