import { useRef, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { DatesSetArg, EventChangeArg } from '@fullcalendar/core';
import CalendarControllers from './CalendarControllers/CalendarControllers';
import './CalendarOverride.scss';
import styles from './Calendar.module.scss';
import { useUserEventStore } from '../../stores/user-event/userEvent.store';
import { fetchedEventToCalendarEvent } from '../../utils/calendarEventFormatter';
import { useLectureEventStore } from '../../stores/lecture-event/lectureEvent.store';
import { useCalendarControlStore } from '../../stores/calendar-control/calendarControl.store';
import { UserEvent } from '../../domain/userEvent';
import { LectureEvent } from '../../domain/lectureEvent';
import { useAuthStore } from '../../stores/auth/auth.store';

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
  setIsViewUserEventModalOpen: (isViewUserEventModalOpen: boolean) => void;
  setSelectedLectureEvent: (lectureEvent: LectureEvent) => void;
  setIsLectureEventModalOpen: (isLectureEventModalOpen: boolean) => void;
};

interface ShownInterval {
  startDateTime: string;
  endDateTime: string;
}

const Calendar = ({
  setSelectedUserEvent,
  setIsUserEventModalOpen,
  setIsViewUserEventModalOpen,
  setSelectedLectureEvent,
  setIsLectureEventModalOpen,
}: Props) => {
  const [shownInterval, setShownInterval] = useState<ShownInterval | null>(
    null,
  );
  const { fetchLectureEvents, lectureEvents, resetLectureEventStore } =
    useLectureEventStore();

  const {
    userEvents,
    fetchUserEvents,
    isUserEventsUpdateNeeded,
    updateUserEvent,
    resetUserEventStore,
  } = useUserEventStore();

  const {
    includeWeekends,
    calendarView,
    calendarEventFilter,
    userIdCalendar,
    includeSelectableLectures,
  } = useCalendarControlStore();

  const { currentUser, currentUserIsUpdateNeeded, getCurrentUser } =
    useAuthStore();

  useEffect(() => {
    if (!currentUser || currentUserIsUpdateNeeded) {
      getCurrentUser();
    }
  }, [currentUser, currentUserIsUpdateNeeded]);

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

    // TODO: think of a better way to distinguish between users and his friends custom events
    if (eventData?.user) {
      // another users event
      setSelectedUserEvent({
        ...eventData,
        startDateTime: clickedEvent.start,
        endDateTime: clickedEvent.end,
      });
      setIsViewUserEventModalOpen(true);
      return;
    }

    // lecture event

    setSelectedLectureEvent(eventData);
    setIsLectureEventModalOpen(true);
  };

  const handleEventChange = (info: EventChangeArg) => {
    const droppedEvent = info.event;
    const { eventData } = droppedEvent._def.extendedProps;

    updateUserEvent(eventData.id, {
      startDateTime: droppedEvent.start.toISOString(),
      endDateTime: droppedEvent.end.toISOString(),
      title: eventData.title,
      note: eventData?.note,
      location: eventData?.location,
      isPrivate: eventData?.isPrivate,
      repeatableUserEventUpdateType: 'single',
    });
  };

  const handleDatesSet = (info: DatesSetArg) => {
    setShownInterval({
      startDateTime: info.startStr,
      endDateTime: info.endStr,
    });
  };

  const calendarRef = useRef<FullCalendar>(null);

  const filterLectures = (
    lectures: LectureEvent[],
    includeSelectableLectures: boolean,
  ) => {
    if (includeSelectableLectures) {
      return lectures;
    }

    return lectures.filter(
      (lecture) =>
        lecture.lectureTypes.includes('egzaminas') ||
        lecture.lectureTypes.includes('privalomasis'),
    );
  };

  const calendarEvents = useMemo(() => {
    if (calendarEventFilter === 'Lectures') {
      return filterLectures(lectureEvents, includeSelectableLectures).map(
        (event) => fetchedEventToCalendarEvent(event, currentUser),
      );
    }

    if (calendarEventFilter === 'Created events') {
      return userEvents.map((event) =>
        fetchedEventToCalendarEvent(event, currentUser),
      );
    }

    return [
      ...filterLectures(lectureEvents, includeSelectableLectures).map((event) =>
        fetchedEventToCalendarEvent(event, currentUser),
      ),
      ...userEvents.map((event) =>
        fetchedEventToCalendarEvent(event, currentUser),
      ),
    ];
  }, [
    lectureEvents,
    userEvents,
    calendarEventFilter,
    includeSelectableLectures,
  ]);

  useEffect(() => {
    if (shownInterval && userIdCalendar) {
      fetchLectureEvents({
        startDateTime: shownInterval.startDateTime,
        endDateTime: shownInterval.endDateTime,
        userId: userIdCalendar,
      });
      fetchUserEvents({
        startDateTime: shownInterval.startDateTime,
        endDateTime: shownInterval.endDateTime,
        userId: userIdCalendar,
      });
    }
  }, [shownInterval, userIdCalendar]);

  useEffect(() => {
    if (
      isUserEventsUpdateNeeded &&
      shownInterval &&
      (userIdCalendar || currentUser.id)
    ) {
      fetchUserEvents({
        startDateTime: shownInterval.startDateTime,
        endDateTime: shownInterval.endDateTime,
        userId: userIdCalendar || currentUser.id,
      });
    }
  }, [isUserEventsUpdateNeeded, shownInterval, userIdCalendar]);

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
        timeZone="local"
        datesSet={handleDatesSet}
        locale="en"
      />
    </>
  );
};

export default Calendar;
