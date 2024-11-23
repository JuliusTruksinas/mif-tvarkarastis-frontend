import { useForm } from '../../../../hooks/useForm';
import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './UserCalendarController.module.scss';
import { USER_CALENDAR_OPTIONS } from '../CalendarControllersConstants';

const INPUTS = [
  {
    name: 'userCalendarController',
    type: 'select',
    value: '',
  },
];

const UserCalendarController = () => {
  const { inputs, onInputChange } = useForm(INPUTS);

  return (
    <>
      {inputs.map((input) => (
        <SelectTextField
          key={input.name}
          name={input.name}
          value={input.value}
          options={USER_CALENDAR_OPTIONS}
          onChange={onInputChange}
          elementClassName={styles.userCalendarControllerRoot}
        />
      ))}
    </>
  );
};

export default UserCalendarController;
