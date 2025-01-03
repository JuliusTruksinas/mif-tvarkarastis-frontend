import { PreferredNavigationApp } from './navigation';

export interface SimpleOption {
  label: string;
  value: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studyType: number;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
  preferredNavigationApp: PreferredNavigationApp;
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
