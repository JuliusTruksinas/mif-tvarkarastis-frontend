import axios from '../../config/Axios/axios-instance';

const API_URL = '/lecture-events';

export const fetchLectureEvents = async (set: any, get: any): Promise<void> => {
  set({
    lectureEventsIsLoading: true,
    lectureEventsIsSuccess: false,
    lectureEventsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}`);
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
