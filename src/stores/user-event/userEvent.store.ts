import { create } from 'zustand';
import { UserEvent } from '../../domain/userEvent';
import {
  createUserEvent,
  CreateUserEventRequestDto,
  deleteUserEvent,
  DeleteUserEventOptions,
  fetchUserEvents,
  FetchUserEventsRequestDto,
  updateUserEvent,
  UpdateUserEventRequestDto,
} from './userEvent.service';
import { HttpError } from '../../config/Axios/axios-instance';

export interface UserEventStore {
  userEvents: UserEvent[];
  userEventsFetchIsLoading: boolean;
  userEventsFetchIsSuccess: boolean;
  userEventsFetchError: HttpError;
  fetchUserEvents: (inputs: FetchUserEventsRequestDto) => Promise<void>;
  userEvent: UserEvent | null;
  userEventCreateIsLoading: boolean;
  userEventCreateIsSuccess: boolean;
  userEventCreateError: HttpError;
  createUserEvent: (inputs: CreateUserEventRequestDto) => void;
  userEventUpdateIsLoading: boolean;
  userEventUpdateIsSuccess: boolean;
  userEventUpdateError: HttpError;
  updateUserEvent: (id: string, inputs: UpdateUserEventRequestDto) => void;
  userEventDeleteIsLoading: boolean;
  userEventDeleteIsSuccess: boolean;
  userEventDeleteError: HttpError;
  deleteUserEvent: (id: string, options: DeleteUserEventOptions) => void;
  isUserEventsUpdateNeeded: boolean;
  resetUserEventStore: () => void;
}

const initialDataState = {
  userEvents: [],
  userEventsFetchIsLoading: false,
  userEventsFetchIsSuccess: false,
  userEventsFetchError: null,
  userEvent: null,
  userEventCreateIsLoading: false,
  userEventCreateIsSuccess: false,
  userEventCreateError: null,
  userEventUpdateIsLoading: false,
  userEventUpdateIsSuccess: false,
  userEventUpdateError: null,
  userEventDeleteIsLoading: false,
  userEventDeleteIsSuccess: false,
  userEventDeleteError: null,
  isUserEventsUpdateNeeded: false,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchUserEvents: (inputs: FetchUserEventsRequestDto) =>
    fetchUserEvents(set, get, inputs),
  createUserEvent: (inputs: CreateUserEventRequestDto) =>
    createUserEvent(set, get, inputs),
  updateUserEvent: (id: string, inputs: UpdateUserEventRequestDto) =>
    updateUserEvent(set, get, id, inputs),
  deleteUserEvent: (id: string, options: DeleteUserEventOptions) =>
    deleteUserEvent(set, get, id, options),
  resetUserEventStore: () => set(initialDataState),
});

export const useUserEventStore = create<UserEventStore>((set, get) =>
  getInitialState(set, get),
);
