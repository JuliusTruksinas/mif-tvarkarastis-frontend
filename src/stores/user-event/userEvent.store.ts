import { create } from 'zustand';
import { UserEvent } from '../../domain/userEvent';
import {
  createUserEvent,
  CreateUserRequestDto,
  deleteUserEvent,
  fetchUserEvents,
  updateUserEvent,
  UpdateUserRequestDto,
} from './userEvent.service';
import { HttpError } from '../../config/Axios/axios-instance';

export interface UserEventStore {
  userEvents: UserEvent[];
  userEventsFetchIsLoading: boolean;
  userEventsFetchError: HttpError;
  fetchUserEvents: () => Promise<void>;
  userEvent: UserEvent | null;
  userEventCreateIsLoading: boolean;
  userEventCreateError: HttpError;
  createUserEvent: (inputs: CreateUserRequestDto) => void;
  userEventUpdateIsLoading: boolean;
  userEventUpdateError: HttpError;
  updateUserEvent: (id: string, inputs: UpdateUserRequestDto) => void;
  userEventDeleteIsLoading: boolean;
  userEventDeleteError: HttpError;
  deleteUserEvent: (id: string) => void;
  isUserEventsUpdateNeeded: boolean;
  resetUserEventStore: () => void;
}

const initialDataState = {
  userEvents: [],
  userEventsFetchIsLoading: false,
  userEventsFetchError: null,
  userEvent: null,
  userEventCreateIsLoading: false,
  userEventCreateError: null,
  userEventUpdateIsLoading: false,
  userEventUpdateError: null,
  userEventDeleteIsLoading: false,
  userEventDeleteError: null,
  isUserEventsUpdateNeeded: false,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchUserEvents: () => fetchUserEvents(set, get),
  createUserEvent: (inputs: CreateUserRequestDto) =>
    createUserEvent(set, get, inputs),
  updateUserEvent: (id: string, inputs: UpdateUserRequestDto) =>
    updateUserEvent(set, get, id, inputs),
  deleteUserEvent: (id: string) => deleteUserEvent(set, get, id),
  resetUserEventStore: () => set(initialDataState),
});

export const useUserEventStore = create<UserEventStore>((set, get) =>
  getInitialState(set, get),
);
