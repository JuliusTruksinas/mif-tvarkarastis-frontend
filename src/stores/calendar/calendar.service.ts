import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';

const API_URL = '/calendar';

export interface ExportCalendarRequestDto {
  userId: string;
  fromDate: string;
  toDate: string;
  areUserEventsIncluded: boolean;
  areHiddenLecturesExcluded: boolean;
}

export const exportCalendar = async (
  set: any,
  get: any,
  inputs: ExportCalendarRequestDto,
): Promise<void> => {
  set({
    exportCalendarIsLoading: true,
    exportCalendarIsSuccess: false,
    exportCalendarError: null,
  });
  try {
    const response = await axios.post(
      `${API_URL}/export`,
      { ...inputs },
      { responseType: 'blob' },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calendar.ics');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    set({ exportCalendarIsSuccess: true });
    showToast('successfully exported your calendar', 'success');
  } catch (error) {
    set({
      exportCalendarIsSuccess: false,
      exportCalendarError: error?.response?.data?.data,
    });
    showToast('Failed to export the calendar, please try again', 'error');
  } finally {
    set({ exportCalendarIsLoading: false });
  }
};
