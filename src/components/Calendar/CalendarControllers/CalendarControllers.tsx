import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import MovementController from './MovementController/MovementController';
import ViewController from './ViewController/ViewController';
import EventFilteringController from './EventFilteringController/EventFilteringController';
import UserCalendarController from './UserCalendarController/UserCalendarController';
import AreWeekendsIncludedController from './AreWeekendsIncludedController/AreWeekendsIncludedController';
import styles from './CalendarControllers.module.scss';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
};

const CalendarControlls = ({ calendarRef }: Props) => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTitle(calendarApi.view.title);
    }
  }, [calendarRef]);

  return (
    <div className={styles.calendarControllersContainer}>
      <div className={styles.calendarViewControllers}>
        <ViewController calendarRef={calendarRef} setTitle={setTitle} />
        <EventFilteringController />
        <UserCalendarController />
        <AreWeekendsIncludedController />
      </div>
      <div className={styles.movementControllers}>
        <p className={styles.calendarTitle}>{title}</p>
        <MovementController calendarRef={calendarRef} setTitle={setTitle} />
      </div>
    </div>
  );
};

export default CalendarControlls;
