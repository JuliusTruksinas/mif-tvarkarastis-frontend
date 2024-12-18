import { User } from '../domain/common';
import {
  FetchedLectureEvent,
  FetchedUserEvent,
} from '../domain/dto/calendarDtos';

const isFetchedLectureEvent = (
  event: FetchedUserEvent | FetchedLectureEvent,
): event is FetchedLectureEvent => {
  return (event as FetchedLectureEvent).lecturer !== undefined;
};

const getColor = (fetchedEvent: FetchedUserEvent | FetchedLectureEvent) => {
  // exam color
  if (
    isFetchedLectureEvent(fetchedEvent) &&
    fetchedEvent.lectureTypes.includes('egzaminas')
  ) {
    return '#bf0a30';
  }

  // regular lecture event
  if (isFetchedLectureEvent(fetchedEvent)) {
    return '#273469';
  }

  return '#e063ae';
};

export const fetchedEventToCalendarEvent = (
  fetchedEvent: FetchedUserEvent | FetchedLectureEvent,
  currentUser: User,
) => {
  return {
    start: fetchedEvent.startDateTime,
    end: fetchedEvent.endDateTime,
    title: fetchedEvent.title,
    editable:
      !isFetchedLectureEvent(fetchedEvent) &&
      fetchedEvent.user === currentUser.id,
    backgroundColor: getColor(fetchedEvent),
    borderColor: getColor(fetchedEvent),
    textColor: '#ffffff',
    eventData: fetchedEvent,
  };
};
