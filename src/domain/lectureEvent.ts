export interface LectureEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  groups: number[];
  subgroup?: number;
  lecturer: string;
  lectureTypes: string[];
  comment?: string;
  location: string;
  room?: number;
}
