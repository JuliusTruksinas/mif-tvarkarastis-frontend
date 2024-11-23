import { useForm } from '../../../../hooks/useForm';
import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './EventFilteringController.module.scss';
import { EVENT_FILTER_OPTIONS } from '../CalendarControllersConstants';

const INPUTS = [
  {
    name: 'eventFilteringController',
    type: 'select',
    value: '',
  },
];

const EventFilteringController = () => {
  const { inputs, onInputChange } = useForm(INPUTS);

  return (
    <>
      {inputs.map((input) => (
        <SelectTextField
          key={input.name}
          name={input.name}
          value={input.value}
          options={EVENT_FILTER_OPTIONS}
          onChange={onInputChange}
          elementClassName={styles.eventFilteringControllerRoot}
        />
      ))}
    </>
  );
};

export default EventFilteringController;
