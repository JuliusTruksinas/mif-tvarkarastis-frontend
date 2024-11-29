import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { LectureEvent } from '../../domain/lectureEvent';
import { fetchLectureEvents } from './lectureEvent.service';

export interface LectureEventStore {
  lectureEvents: LectureEvent[] | null;
  lectureEventsIsLoading: boolean;
  lectureEventsError: HttpError;
  fetchLectureEvents: () => Promise<void>;
}

const initialDataState = {
  lectureEvents: [],
  lectureEventsIsLoading: false,
  lectureEventsError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchLectureEvents: () => fetchLectureEvents(set, get),
});

export const useLectureEventStore = create<LectureEventStore>((set, get) =>
  getInitialState(set, get),
);
