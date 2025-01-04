import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { exportCalendar, ExportCalendarRequestDto } from './calendar.service';

export interface CalendarStore {
  exportCalendarIsLoading: boolean;
  exportCalendarIsSuccess: boolean;
  exportCalendarError: HttpError;
  exportCalendar: (inputs: ExportCalendarRequestDto) => void;
  resetCalendarStore: () => void;
}

const initialDataState = {
  exportCalendarIsLoading: false,
  exportCalendarIsSuccess: false,
  exportCalendarError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  exportCalendar: (inputs: ExportCalendarRequestDto) =>
    exportCalendar(set, get, inputs),
  resetCalendarStore: () => set(initialDataState),
});

export const useCalendarStore = create<CalendarStore>((set, get) =>
  getInitialState(set, get),
);
