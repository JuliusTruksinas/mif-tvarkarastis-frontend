import {
  CalendarViewOption,
  CalendarEventFilterOption,
  UserCalendarOption,
} from '../../../domain/calendar';

export const CALENDAR_VIEW_OPTIONS: CalendarViewOption[] = [
  {
    label: 'Week',
    value: 'timeGridWeek',
    selected: true,
  },
  {
    label: 'Month',
    value: 'dayGridMonth',
  },
  {
    label: 'Day',
    value: 'timeGridDay',
  },
];

export const EVENT_FILTER_OPTIONS: CalendarEventFilterOption[] = [
  {
    label: 'All events',
    value: 'All events',
    selected: true,
  },
  {
    label: 'Lectures',
    value: 'Lectures',
  },
  {
    label: 'Created events',
    value: 'Created events',
  },
];

export const USER_CALENDAR_OPTIONS: UserCalendarOption[] = [
  {
    label: 'My calendar',
    value: 'My calendar',
    selected: true,
  },
];
