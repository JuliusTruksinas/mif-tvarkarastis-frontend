import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { LectureEvent } from '../../domain/lectureEvent';
import {
  fetchLectureEvents,
  fetchUniqueLectureTitles,
  GetUserLectureEventsRequestDto,
} from './lectureEvent.service';

export interface LectureEventStore {
  lectureEvents: LectureEvent[] | null;
  lectureEventsIsLoading: boolean;
  lectureEventsIsSuccess: boolean;
  lectureEventsError: HttpError;
  fetchLectureEvents: (inputs: GetUserLectureEventsRequestDto) => Promise<void>;
  uniqueLectureTitles: Record<string, boolean>;
  uniqueLectureTitlesIsLoading: boolean;
  uniqueLectureTitlesIsSuccess: boolean;
  uniqueLectureTitlesError: HttpError;
  fetchUniqueLectureTitles: (userId: string) => Promise<void>;
  resetLectureEventStore: () => void;
}

const initialDataState = {
  lectureEvents: [],
  lectureEventsIsLoading: false,
  lectureEventsIsSuccess: false,
  lectureEventsError: null,
  uniqueLectureTitles: {},
  uniqueLectureTitlesIsLoading: false,
  uniqueLectureTitlesIsSuccess: false,
  uniqueLectureTitlesError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  fetchLectureEvents: (inputs: GetUserLectureEventsRequestDto) =>
    fetchLectureEvents(set, get, inputs),
  fetchUniqueLectureTitles: (userId: string) =>
    fetchUniqueLectureTitles(set, get, userId),
  resetLectureEventStore: () => set(initialDataState),
});

export const useLectureEventStore = create<LectureEventStore>((set, get) =>
  getInitialState(set, get),
);
