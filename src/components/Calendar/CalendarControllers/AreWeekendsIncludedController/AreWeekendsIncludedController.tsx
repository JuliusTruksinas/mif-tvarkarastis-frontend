import FullCalendar from '@fullcalendar/react';
import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';
import styles from './AreWeekendsIncludedController.module.scss';

type Props = {
  setTitle: (title: string) => void;
  calendarRef: React.RefObject<FullCalendar>;
};

const AreWeekendsIncludedController = ({ setTitle, calendarRef }: Props) => {
  const { includeWeekends, setIncludeWeekends } = useCalendarControlStore();

  return (
    <div className={styles.areWeekendsIncludedContainer}>
      <label>Include weekends?</label>
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={includeWeekends}
        onChange={() => {
          setIncludeWeekends(!includeWeekends);

          const calendarApi = calendarRef.current.getApi();
          calendarApi.setOption('weekends', !includeWeekends);
          setTitle(calendarApi.view.title);
        }}
      />
    </div>
  );
};

export default AreWeekendsIncludedController;
