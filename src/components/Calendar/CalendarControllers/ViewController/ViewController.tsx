import FullCalendar from '@fullcalendar/react';
import { CALENDAR_VIEW_OPTIONS } from '../CalendarControllersConstants';
import { CalendarView } from '../../../../domain/calendar';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  setTitle: (string) => void;
};

const ViewController = ({ calendarRef, setTitle }: Props) => {
  const handleChangeView = (newView: CalendarView) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView);
      setTitle(calendarApi.view.title);
    }
  };

  return (
    <select
      className="select select-bordered"
      onChange={(e) => {
        handleChangeView(e.target.value as CalendarView);
      }}
    >
      {CALENDAR_VIEW_OPTIONS.map((viewOption, i) => (
        <option
          key={`calendar-view-option-${i}`}
          selected={viewOption.selected}
          value={viewOption.value}
        >
          {viewOption.label}
        </option>
      ))}
    </select>
  );
};

export default ViewController;
