import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { events } from '../../development/data/calendarEvents';
import CalendarControllers from './CalendarControllers/CalendarControllers';
import './Calendar.scss';

const Calendar = () => {
  const [areWeekendsShown, setAreWeekendsShown] = useState<boolean>(true);
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
        initialView="dayGridMonth"
        eventDisplay="block"
        slotDuration="01:00:00"
        firstDay={1}
        rerenderDelay={10}
        weekends={areWeekendsShown}
        ref={calendarRef}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        headerToolbar={false}
        allDaySlot={false}
      />
    </>
  );
};

export default Calendar;
