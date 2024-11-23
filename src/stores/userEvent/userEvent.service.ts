import { showToast } from '../../utils/toast';
import axios from '../../config/Axios/axios-instance';

const API_URL = '/user-events';

export interface CreateUserRequestDto {
  startDateTime: string;
  endDateTime: string;
  title: string;
  notes?: string;
  location?: string;
}

export interface UpdateUserRequestDto {
  startDateTime?: string;
  endDateTime?: string;
  title?: string;
  notes?: string;
  location?: string;
}

export const fetchUserEvents = async (set: any, get: any): Promise<void> => {
  set({
    userEventsIsLoading: true,
    userEventsFetchError: null,
  });
  try {
    const response = await axios.get(`${API_URL}`);
    const responseData = response.data?.data;
    set({ userEvents: responseData });
  } catch (error) {
    set({
      userEventsFetchError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
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
    userEventCreateError: null,
  });
  try {
    const response = await axios.post(`${API_URL}`, { ...inputs });
    const responseData = response.data?.data;

    set({ userEvent: responseData, isUserEventsUpdateNeeded: true });
    showToast('Successfully created a new event', 'success');
  } catch (error) {
    set({
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
    userEventUpdateError: null,
  });
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { ...inputs });
    const responseData = response.data?.data;

    set({ userEvent: responseData, isUserEventsUpdateNeeded: true });
    showToast('Successfully updated a new event', 'success');
  } catch (error) {
    set({
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
    userEventDeleteError: null,
  });
  try {
    await axios.delete(`${API_URL}/${id}`);

    set({ isUserEventsUpdateNeeded: true });
    showToast('Successfully deleted the event', 'success');
  } catch (error) {
    set({
      userEventDeleteError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ userEventDeleteIsLoading: false });
  }
};
