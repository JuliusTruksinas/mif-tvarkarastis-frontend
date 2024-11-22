import { FetchedUser } from '../domain/dto/calendarDtos';
export const fetchedUserEventToCalendarEvent = (fetchedUser: FetchedUser) => {
  return {
    id: fetchedUser.id,
    start: fetchedUser.startDateTime,
    end: fetchedUser.endDateTime,
    title: fetchedUser.title,
    editable: false,
    backgroundColor: '#e063ae',
    borderColor: '#e063ae',
    textColor: '#fff',
  };
};
