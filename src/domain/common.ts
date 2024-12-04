export interface SimpleOption {
  label: string;
  value: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  programName: string;
  group: number;
  subgroup: number;
  course: number;
  events: string[];
  friends: string[];
  sentFriendRequests: string[];
  notifications: string[];
}

export interface BasicUserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  programName: string;
  course: number;
}

export interface Tab {
  name: string;
  label: string;
}
