import FullCalendar from '@fullcalendar/react';
import { CALENDAR_VIEW_OPTIONS } from '../CalendarControllersConstants';
import { CalendarView } from '../../../../domain/calendar';
import SelectTextField from '../../../../common/TextField/SelectTextField/SelectTextField';
import styles from './ViewController.module.scss';
import { useForm } from '../../../../hooks/useForm';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (title: string) => void;
};

const INPUTS = [
  {
    name: 'viewController',
    type: 'select',
    value: '',
  },
];

const ViewController = ({ calendarRef, setTitle }: Props) => {
  const { inputs, onInputChange } = useForm(INPUTS);

  const handleChangeView = (newView: CalendarView) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView);
      setTitle(calendarApi.view.title);
    }
  };

  return (
    <>
      {inputs.map((input) => (
        <SelectTextField
          key={input.name}
          name={input.name}
          value={input.value}
          options={CALENDAR_VIEW_OPTIONS}
          onChange={(e) => {
            onInputChange(e);
            handleChangeView(e.target.value as CalendarView);
          }}
          elementClassName={styles.viewControllerRoot}
        />
      ))}
    </>
  );
};

export default ViewController;
