import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';
import styles from './AreWeekendsIncludedController.module.scss';

const AreWeekendsIncludedController = () => {
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
        }}
      />
    </div>
  );
};

export default AreWeekendsIncludedController;
