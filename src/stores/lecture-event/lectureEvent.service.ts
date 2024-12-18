import axios from '../../config/Axios/axios-instance';

const API_URL = '/lecture-events';

export interface GetUserLectureEventsRequestDto {
  startDateTime: string;
  endDateTime: string;
  userId: string;
}

export const fetchLectureEvents = async (
  set: any,
  get: any,
  inputs: GetUserLectureEventsRequestDto,
): Promise<void> => {
  set({
    lectureEventsIsLoading: true,
    lectureEventsIsSuccess: false,
    lectureEventsError: null,
  });
  try {
    const response = await axios.post(`${API_URL}`, { ...inputs });
    const responseData = response.data?.data;

    set({ lectureEventsIsSuccess: true, lectureEvents: responseData });
  } catch (error) {
    set({
      lectureEventsError: error?.response?.data?.data,
      lectureEventsIsSuccess: false,
    });
  } finally {
    set({ lectureEventsIsLoading: false });
  }
};
