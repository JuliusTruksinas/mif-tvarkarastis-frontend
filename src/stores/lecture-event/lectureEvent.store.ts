import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { LectureEvent } from '../../domain/lectureEvent';
import {
  fetchLectureEvents,
  GetUserLectureEventsRequestDto,
} from './lectureEvent.service';

export interface LectureEventStore {
  lectureEvents: LectureEvent[] | null;
  lectureEventsIsLoading: boolean;
  lectureEventsIsSuccess: boolean;
  lectureEventsError: HttpError;
  fetchLectureEvents: (inputs: GetUserLectureEventsRequestDto) => Promise<void>;
  resetLectureEventStore: () => void;
}

const initialDataState = {
  lectureEvents: [],
  lectureEventsIsLoading: false,
  lectureEventsIsSuccess: false,
  lectureEventsError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchLectureEvents: (inputs: GetUserLectureEventsRequestDto) =>
    fetchLectureEvents(set, get, inputs),
  resetLectureEventStore: () => set(initialDataState),
});

export const useLectureEventStore = create<LectureEventStore>((set, get) =>
  getInitialState(set, get),
);
