import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './EventFilteringController.module.scss';
import { EVENT_FILTER_OPTIONS } from '../CalendarControllersConstants';
import { useCalendarControlStore } from '../../../../stores/calendar-control/calendarControl.store';
import { CalendarEventFilter } from 'src/domain/calendar';

const EventFilteringController = () => {
  const { setCalendarEventFilter, calendarEventFilter } =
    useCalendarControlStore();

  return (
    <>
      <SelectTextField
        key={'eventFilteringController'}
        name={'eventFilteringController'}
        value={calendarEventFilter}
        options={EVENT_FILTER_OPTIONS}
        onChange={(e) => {
          setCalendarEventFilter(e.target.value as CalendarEventFilter);
        }}
        elementClassName={styles.eventFilteringControllerRoot}
      />
    </>
  );
};

export default EventFilteringController;
