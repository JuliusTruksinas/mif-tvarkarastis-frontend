import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { events } from '../../development/data/calendarEvents';
import CalendarControllers from './CalendarControllers/CalendarControllers';
import './CalendarOverride.scss';
import styles from './Calendar.module.scss';

const renderHeader = (args) => {
  if (args.view.type === 'timeGridWeek' || args.view.type === 'timeGridDay') {
    return (
      <div className={styles.dayHeaderContainer}>
        <span className={styles.dayName}>
          {args.date.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
        <span className={styles.monthDay}>
          {args.date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    );
  }

  return <span className={styles.defaultText}>{args.text}</span>;
};

const Calendar = () => {
  const [areWeekendsShown, setAreWeekendsShown] = useState<boolean>(false);
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <>
      <CalendarControllers
        areWeekendsShown={areWeekendsShown}
        setAreWeekendsShown={setAreWeekendsShown}
        calendarRef={calendarRef}
      />
      <FullCalendar
        eventResizableFromStart
        nowIndicator
        editable
        selectable
        initialView="timeGridWeek"
        eventDisplay="block"
        slotDuration="01:00:00"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false,
          hour12: false,
        }}
        firstDay={1}
        rerenderDelay={10}
        weekends={areWeekendsShown}
        ref={calendarRef}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        headerToolbar={false}
        allDaySlot={false}
        dayHeaderContent={renderHeader}
      />
    </>
  );
};

export default Calendar;
