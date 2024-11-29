import { CalendarEventFilter, CalendarView } from '../../domain/calendar';
import { create } from 'zustand';

export interface CalendarControlStore {
  calendarView: CalendarView;
  setCalendarView: (calendarView: CalendarView) => void;
  calendarEventFilter: CalendarEventFilter;
  setCalendarEventFilter: (calendarEventFilter: CalendarEventFilter) => void;
  includeWeekends: boolean;
  setIncludeWeekends: (includeWeekends: boolean) => void;
}

export const useCalendarControlStore = create<CalendarControlStore>((set) => ({
  calendarView: 'timeGridWeek',
  setCalendarView: (calendarView: CalendarView) =>
    set(() => ({ calendarView })),
  calendarEventFilter: 'All events',
  setCalendarEventFilter: (calendarEventFilter: CalendarEventFilter) =>
    set(() => ({ calendarEventFilter })),
  includeWeekends: false,
  setIncludeWeekends: (includeWeekends: boolean) =>
    set(() => ({ includeWeekends })),
}));
