import { showToast } from '../../utils/toast';
import axios from '../../config/Axios/axios-instance';
import {
  OccurrenceType,
  RepeatableUserEventUpdateType,
} from '../../components/UserEventModal/UserEventModal';
import { convertObjectToQueryParams } from '../../helpers/url';

const API_URL = '/user-events';

export interface CreateUserEventRequestDto {
  startDateTime: string;
  endDateTime: string;
  title: string;
  isPrivate: boolean;
  isRepeatable: boolean;
  note?: string;
  location?: string;
  occurrenceType?: OccurrenceType;
  repeatableUntil?: string;
}

export interface UpdateUserEventRequestDto {
  startDateTime?: string;
  endDateTime?: string;
  title?: string;
  note?: string;
  location?: string;
  isPrivate: boolean;
  repeatableUserEventUpdateType: RepeatableUserEventUpdateType;
}

export interface FetchUserEventsRequestDto {
  startDateTime: string;
  endDateTime: string;
  userId: string;
}

export interface DeleteUserEventOptions {
  repeatableUserEventUpdateType: RepeatableUserEventUpdateType;
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
  inputs: CreateUserEventRequestDto,
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
  inputs: UpdateUserEventRequestDto,
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
  options: DeleteUserEventOptions,
): Promise<void> => {
  set({
    userEventDeleteIsLoading: true,
    userEventDeleteIsSuccess: false,
    userEventDeleteError: null,
  });
  try {
    const queryParams = convertObjectToQueryParams(options);
    await axios.delete(`${API_URL}/${id}?${queryParams}`);

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
