import { showToast } from '../../utils/toast';
import axios from '../../config/Axios/axios-instance';

const API_URL = '/user-events';

export interface CreateUserRequestDto {
  startDateTime: string;
  endDateTime: string;
  title: string;
  note?: string;
  location?: string;
}

export interface UpdateUserRequestDto {
  startDateTime?: string;
  endDateTime?: string;
  title?: string;
  note?: string;
  location?: string;
}

export interface FetchUserEventsRequestDto {
  startDateTime: string;
  endDateTime: string;
  userId: string;
}

export const fetchUserEvents = async (
  set: any,
  get: any,
  inputs: FetchUserEventsRequestDto,
): Promise<void> => {
  set({
    userEventsIsLoading: true,
    userEventsIsSuccess: false,
    userEventsFetchError: null,
  });
  try {
    const response = await axios.patch(`${API_URL}`, { ...inputs });
    const responseData = response.data?.data;
    set({
      userEventsIsSuccess: true,
      userEvents: responseData,
      isUserEventsUpdateNeeded: false,
    });
  } catch (error) {
    set({
      userEventsIsSuccess: false,
      userEventsFetchError: error?.response?.data?.data,
    });
  } finally {
    set({ userEventsIsLoading: false });
  }
};

export const createUserEvent = async (
  set: any,
  get: any,
  inputs: CreateUserRequestDto,
): Promise<void> => {
  set({
    userEventCreateIsLoading: true,
    userEventCreateIsSuccess: false,
    userEventCreateError: null,
  });
  try {
    const response = await axios.post(`${API_URL}`, { ...inputs });
    const responseData = response.data?.data;

    set({
      userEventCreateIsSuccess: true,
      userEvent: responseData,
      isUserEventsUpdateNeeded: true,
    });
    showToast('Successfully created a new event', 'success');
  } catch (error) {
    set({
      userEventCreateIsSuccess: false,
      userEventCreateError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ userEventCreateIsLoading: false });
  }
};

export const updateUserEvent = async (
  set: any,
  get: any,
  id: string,
  inputs: UpdateUserRequestDto,
): Promise<void> => {
  set({
    userEventUpdateIsLoading: true,
    userEventUpdateIsSuccess: false,
    userEventUpdateError: null,
  });
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { ...inputs });
    const responseData = response.data?.data;

    set({
      userEventUpdateIsSuccess: true,
      userEvent: responseData,
      isUserEventsUpdateNeeded: true,
    });
    showToast('Successfully updated an event', 'success');
  } catch (error) {
    set({
      userEventUpdateIsSuccess: false,
      userEventUpdateError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ userEventUpdateIsLoading: false });
  }
};

export const deleteUserEvent = async (
  set: any,
  get: any,
  id: string,
): Promise<void> => {
  set({
    userEventDeleteIsLoading: true,
    userEventDeleteIsSuccess: false,
    userEventDeleteError: null,
  });
  try {
    await axios.delete(`${API_URL}/${id}`);

    set({ userEventDeleteIsSuccess: true, isUserEventsUpdateNeeded: true });
    showToast('Successfully deleted the event', 'success');
  } catch (error) {
    set({
      userEventDeleteIsSuccess: false,
      userEventDeleteError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ userEventDeleteIsLoading: false });
  }
};
