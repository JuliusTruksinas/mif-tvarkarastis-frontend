import { CalendarEventFilter, CalendarView } from '../../domain/calendar';
import { create } from 'zustand';

export interface CalendarControlStore {
  calendarView: CalendarView;
  setCalendarView: (calendarView: CalendarView) => void;
  calendarEventFilter: CalendarEventFilter;
  setCalendarEventFilter: (calendarEventFilter: CalendarEventFilter) => void;
  includeWeekends: boolean;
  setIncludeWeekends: (includeWeekends: boolean) => void;
  includeSelectableLectures: boolean;
  setIncludeSelectableLectures: (includeSelectableLectures: boolean) => void;
  userIdCalendar: string;
  setUserIdCalendar: (userId: string) => void;
  setUserCalendar: (userId: string) => void;
  resetCalendarControlStore: () => void;
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
  includeSelectableLectures: true,
  setIncludeSelectableLectures: (includeSelectableLectures: boolean) =>
    set(() => ({ includeSelectableLectures })),
  userIdCalendar: '',
  setUserIdCalendar: (userId: string) => set({ userIdCalendar: userId }),
  setUserCalendar: (userId: string) => {},
  resetCalendarControlStore: () =>
    set({
      calendarView: 'timeGridWeek',
      calendarEventFilter: 'All events',
      includeWeekends: false,
      userIdCalendar: '',
    }),
}));
