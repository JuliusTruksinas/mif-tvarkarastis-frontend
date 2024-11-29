import FullCalendar from '@fullcalendar/react';
import { CALENDAR_VIEW_OPTIONS } from '../CalendarControllersConstants';
import { CalendarView } from '../../../../domain/calendar';
import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './ViewController.module.scss';
import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (title: string) => void;
};

const ViewController = ({ calendarRef, setTitle }: Props) => {
  const { setCalendarView, calendarView } = useCalendarControlStore();

  const handleChangeView = (newView: CalendarView) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.changeView(newView);
      setTitle(calendarApi.view.title);
      setCalendarView(newView);
    }
  };

  return (
    <>
      <SelectTextField
        key={'viewController'}
        name={'viewController'}
        value={calendarView}
        options={CALENDAR_VIEW_OPTIONS}
        onChange={(e) => {
          handleChangeView(e.target.value as CalendarView);
        }}
        elementClassName={styles.viewControllerRoot}
      />
    </>
  );
};

export default ViewController;
