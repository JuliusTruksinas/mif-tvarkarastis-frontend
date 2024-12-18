export interface UserEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  user: string;
  note?: string;
  location?: string;
}
