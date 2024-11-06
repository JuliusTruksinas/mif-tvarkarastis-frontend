import Select from '../../../../common/Select/Select';
import styles from './EventFilteringController.module.scss';

import { EVENT_FILTER_OPTIONS } from '../CalendarControllersConstants';

const EventFilteringController = () => {
  return (
    <Select
      onChange={() => {}}
      options={EVENT_FILTER_OPTIONS}
      elementClassName={styles.eventFilteringControllerRoot}
    />
  );
};

export default EventFilteringController;
