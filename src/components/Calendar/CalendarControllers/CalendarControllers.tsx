import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import MovementController from './MovementController/MovementController';
import ViewController from './ViewController/ViewController';
import AreWeekendsIncludedController from './AreWeekendsIncludedController/AreWeekendsIncludedController';
import styles from './CalendarControllers.module.scss';

type Props = {
  areWeekendsShown: boolean;
  setAreWeekendsShown: (boolean) => void;
  calendarRef: React.RefObject<FullCalendar>;
};

const CalendarControlls = ({
  areWeekendsShown,
  setAreWeekendsShown,
  calendarRef,
}: Props) => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTitle(calendarApi.view.title);
    }
  }, [calendarRef]);

  return (
    <div className={styles.container}>
      <div className={styles.calendarControllersContainer}>
        <MovementController calendarRef={calendarRef} setTitle={setTitle} />
        <ViewController calendarRef={calendarRef} setTitle={setTitle} />
        <AreWeekendsIncludedController
          areWeekendsShown={areWeekendsShown}
          setAreWeekendsShown={setAreWeekendsShown}
        />
      </div>
      <h1 className={styles.calendarTitle}>{title}</h1>
    </div>
  );
};

export default CalendarControlls;
