import Select from '../../../../common/Select/Select';
import styles from './UserCalendarController.module.scss';

import { USER_CALENDAR_OPTIONS } from '../CalendarControllersConstants';

const UserCalendarController = () => {
  return (
    <Select
      onChange={() => {}}
      options={USER_CALENDAR_OPTIONS}
      elementClassName={styles.userCalendarControllerRoot}
    />
  );
};

export default UserCalendarController;
