import { useRef, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import CalendarControllers from './CalendarControllers/CalendarControllers';
import './CalendarOverride.scss';
import styles from './Calendar.module.scss';
import { useUserEventStore } from '../../stores/user-event/userEvent.store';
import { fetchedEventToCalendarEvent } from '../../utils/calendarEventFormatter';
import { useLectureEventStore } from '../../stores/lecture-event/lectureEvent.store';
import { useCalendarControlStore } from '../../stores/calendar-control/calendarControl.store';
import { UserEvent } from '../../domain/userEvent';
import { LectureEvent } from 'src/domain/lectureEvent';

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

type Props = {
  setSelectedUserEvent: (userEvent: UserEvent) => void;
  setIsUserEventModalOpen: (isUserEventModalOpen: boolean) => void;
  setSelectedLectureEvent: (lectureEvent: LectureEvent) => void;
  setIsLectureEventModalOpen: (isLectureEventModalOpen: boolean) => void;
};

const Calendar = ({
  setSelectedUserEvent,
  setIsUserEventModalOpen,
  setSelectedLectureEvent,
  setIsLectureEventModalOpen,
}: Props) => {
  const { fetchLectureEvents, lectureEvents, resetLectureEventStore } =
    useLectureEventStore();

  const {
    userEvents,
    fetchUserEvents,
    isUserEventsUpdateNeeded,
    updateUserEvent,
    resetUserEventStore,
  } = useUserEventStore();

  const { includeWeekends, calendarView, calendarEventFilter } =
    useCalendarControlStore();

  const handleEventClick = (info) => {
    const clickedEvent = info.event;
    const { eventData } = clickedEvent._def.extendedProps;

    if (clickedEvent.startEditable) {
      // user event
      setSelectedUserEvent({
        ...eventData,
        startDateTime: clickedEvent.start,
        endDateTime: clickedEvent.end,
      });
      setIsUserEventModalOpen(true);
      return;
    }

    setSelectedLectureEvent(eventData);
    setIsLectureEventModalOpen(true);
  };

  const handleEventChange = (info) => {
    const droppedEvent = info.event;
    const { eventData } = droppedEvent._def.extendedProps;

    updateUserEvent(eventData.id, {
      startDateTime: droppedEvent.start.toISOString(),
      endDateTime: droppedEvent.end.toISOString(),
    });
  };

  const calendarRef = useRef<FullCalendar>(null);

  const calendarEvents = useMemo(() => {
    if (calendarEventFilter == 'Lectures') {
      return lectureEvents.map((event) => fetchedEventToCalendarEvent(event));
    }

    if (calendarEventFilter == 'Created events') {
      return userEvents.map((event) => fetchedEventToCalendarEvent(event));
    }

    return [
      ...lectureEvents.map((event) => fetchedEventToCalendarEvent(event)),
      ...userEvents.map((event) => fetchedEventToCalendarEvent(event)),
    ];
  }, [lectureEvents, userEvents, calendarEventFilter]);

  useEffect(() => {
    fetchLectureEvents();
    fetchUserEvents();
  }, []);

  useEffect(() => {
    if (isUserEventsUpdateNeeded) {
      fetchUserEvents();
    }
  }, [isUserEventsUpdateNeeded]);

  useEffect(() => {
    return () => {
      resetUserEventStore();
      resetLectureEventStore();
    };
  }, []);

  return (
    <>
      <CalendarControllers calendarRef={calendarRef} />
      <FullCalendar
        eventResizableFromStart
        nowIndicator
        editable
        selectable
        initialView={calendarView}
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
        weekends={includeWeekends}
        ref={calendarRef}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={calendarEvents}
        headerToolbar={false}
        allDaySlot={false}
        dayHeaderContent={renderHeader}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
      />
    </>
  );
};

export default Calendar;
