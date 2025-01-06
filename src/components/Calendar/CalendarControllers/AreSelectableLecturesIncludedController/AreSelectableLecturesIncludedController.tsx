import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';
import styles from './AreSelectableLecturesIncludedController.module.scss';

const AreSelectableLecturesIncludedController = () => {
  const { includeSelectableLectures, setIncludeSelectableLectures } =
    useCalendarControlStore();

  return (
    <div className={styles.areHiddenLecturesExcludedContainer}>
      <label>Include selectable lectures?</label>
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={includeSelectableLectures}
        onChange={() => {
          setIncludeSelectableLectures(!includeSelectableLectures);
        }}
      />
    </div>
  );
};

export default AreSelectableLecturesIncludedController;
