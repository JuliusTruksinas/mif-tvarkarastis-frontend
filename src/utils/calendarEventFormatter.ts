import { User } from '../domain/common';
import { UserEvent } from '../domain/userEvent';
import { LectureEvent } from '../domain/lectureEvent';

const isLectureEvent = (
  event: UserEvent | LectureEvent,
): event is LectureEvent => {
  return (event as LectureEvent).lecturer !== undefined;
};

const getColor = (fetchedEvent: UserEvent | LectureEvent) => {
  // exam color
  if (
    isLectureEvent(fetchedEvent) &&
    fetchedEvent.lectureTypes.includes('egzaminas')
  ) {
    return '#bf0a30';
  }

  // regular lecture event
  if (isLectureEvent(fetchedEvent)) {
    return '#273469';
  }

  return '#e063ae';
};

export const fetchedEventToCalendarEvent = (
  fetchedEvent: UserEvent | LectureEvent,
  currentUser: User,
) => {
  return {
    start: fetchedEvent.startDateTime,
    end: fetchedEvent.endDateTime,
    title: fetchedEvent.title,
    editable:
      !isLectureEvent(fetchedEvent) && fetchedEvent.user === currentUser.id,
    backgroundColor: getColor(fetchedEvent),
    borderColor: getColor(fetchedEvent),
    textColor: '#ffffff',
    eventData: fetchedEvent,
  };
};
