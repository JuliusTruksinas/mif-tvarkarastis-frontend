import axios from '../../config/Axios/axios-instance';

const API_URL = '/lecture-events';

export const fetchLectureEvents = async (set: any, get: any): Promise<void> => {
  set({
    lectureEventsIsLoading: true,
    lectureEventsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}`);
    const responseData = response.data?.data;

    set({ lectureEvents: responseData });
  } catch (error) {
    set({
      lectureEventsError: error?.response?.data?.data,
    });
  } finally {
    set({ lectureEventsIsLoading: false });
  }
};
