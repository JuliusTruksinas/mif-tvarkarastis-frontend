import {
  FetchedLectureEvent,
  FetchedUserEvent,
} from '../domain/dto/calendarDtos';

const isFetchedLectureEvent = (
  event: FetchedUserEvent | FetchedLectureEvent,
): event is FetchedLectureEvent => {
  return (event as FetchedLectureEvent).lecturer !== undefined;
};

export const fetchedEventToCalendarEvent = (
  fetchedEvent: FetchedUserEvent | FetchedLectureEvent,
) => {
  return {
    start: fetchedEvent.startDateTime,
    end: fetchedEvent.endDateTime,
    title: fetchedEvent.title,
    editable: !isFetchedLectureEvent(fetchedEvent),
    backgroundColor: isFetchedLectureEvent(fetchedEvent)
      ? '#273469'
      : '#e063ae',
    borderColor: isFetchedLectureEvent(fetchedEvent) ? '#273469' : '#e063ae',
    textColor: '#ffffff',
    eventData: fetchedEvent,
  };
};
