import FullCalendar from '@fullcalendar/react';
import { CALENDAR_VIEW_OPTIONS } from '../CalendarControllersConstants';
import { CalendarView } from '../../../../domain/calendar';
import Select from '../../../../common/Select/Select';
import styles from './ViewController.module.scss';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (string) => void;
};

const ViewController = ({ calendarRef, setTitle }: Props) => {
  const handleChangeView = (newView: CalendarView) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView);
      setTitle(calendarApi.view.title);
    }
  };

  return (
    <Select
      onChange={(e) => {
        handleChangeView(e.target.value as CalendarView);
      }}
      options={CALENDAR_VIEW_OPTIONS}
      elementClassName={styles.viewControllerRoot}
    />
  );
};

export default ViewController;
