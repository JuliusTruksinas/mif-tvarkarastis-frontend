export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

export type CalendarEventFilter = 'All events' | 'Lectures' | 'Created events';

export type CalendarViewOption = {
  label: string;
  value: string;
  selected?: boolean;
};

export type CalendarEventFilterOption = {
  label: string;
  value: string;
  selected?: boolean;
};

export type UserCalendarOption = {
  label: string;
  value: string;
  selected?: boolean;
};
