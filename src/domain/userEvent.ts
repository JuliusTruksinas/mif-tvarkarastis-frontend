export interface UserEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  user: string;
  isPrivate: boolean;
  note?: string;
  location?: string;
  repeatableUserEventsGroupId?: string;
}
