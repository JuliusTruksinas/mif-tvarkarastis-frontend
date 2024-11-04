import FullCalendar from '@fullcalendar/react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import leftIcon from '../../../../assets/icons/left.svg';
import rightIcon from '../../../../assets/icons/right.svg';
import styles from './MovementController.module.scss';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (string) => void;
};

const MovementController = ({ calendarRef, setTitle }: Props) => {
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setTitle(calendarApi.view.title);
    }
  };

  const handlePrevClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setTitle(calendarApi.view.title);
    }
  };

  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setTitle(calendarApi.view.title);
    }
  };

  return (
    <div className={styles.movementControllerContainer}>
      <button
        className={classNames('btn', styles.movementBtn)}
        onClick={handlePrevClick}
      >
        <ReactSVG src={leftIcon} />
      </button>

      <button
        className={classNames('btn', styles.movementBtn, styles.todayBtn)}
        onClick={handleTodayClick}
      >
        Today
      </button>

      <button
        className={classNames('btn', styles.movementBtn)}
        onClick={handleNextClick}
      >
        <ReactSVG src={rightIcon} />
      </button>
    </div>
  );
};

export default MovementController;
