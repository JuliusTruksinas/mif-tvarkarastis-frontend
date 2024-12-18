export interface FetchedUserEvent {
  startDateTime: string;
  endDateTime: string;
  id: string;
  title: string;
  user: string;
  location?: string;
  note?: string;
}

export interface FetchedLectureEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  group: number;
  subgroup?: number;
  lecturer: string;
  lectureTypes: string[];
  comment?: string;
  location: string;
  room?: number;
}
