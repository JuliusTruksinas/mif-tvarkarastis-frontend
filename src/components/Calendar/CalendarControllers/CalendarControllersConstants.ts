import { CalendarViewOption } from '../../../domain/calendar';

export const CALENDAR_VIEW_OPTIONS: CalendarViewOption[] = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    selected: true,
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
  },
  {
    label: 'Day',
    value: 'timeGridDay',
  },
];
