import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { LectureEvent } from '../../domain/lectureEvent';
import { fetchLectureEvents } from './lectureEvent.service';

export interface LectureEventStore {
  lectureEvents: LectureEvent[] | null;
  lectureEventsIsLoading: boolean;
  lectureEventsIsSuccess: boolean;
  lectureEventsError: HttpError;
  fetchLectureEvents: () => Promise<void>;
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
  fetchLectureEvents: () => fetchLectureEvents(set, get),
  resetLectureEventStore: () => set(initialDataState),
});

export const useLectureEventStore = create<LectureEventStore>((set, get) =>
  getInitialState(set, get),
);
