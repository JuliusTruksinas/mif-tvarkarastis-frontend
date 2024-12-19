export interface LectureEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  programName: string;
  course: number;
  group: number;
  lecturer: string;
  lectureTypes: string[];
  location: string;
  subgroup?: number;
  comment?: string;
}
