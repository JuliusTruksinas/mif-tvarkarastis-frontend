import { create } from 'zustand';
import { HttpError } from '../../config/Axios/axios-instance';
import { SimpleOption } from '../../domain/common';
import {
  getAllCoursesOptions,
  GetAllCoursesOptionsDto,
  getAllGroupsOptions,
  GetAllGroupsOptionsDto,
  getAllProgramsOptions,
  GetAllProgramsOptionsDto,
  getAllStudyTypesOptions,
  getAllSubgroupsOptions,
} from './studyOptions.service';

export interface StudyOptionsStore {
  studyTypesOptions: SimpleOption[];
  studyTypesOptionsIsLoading: boolean;
  studyTypesOptionsIsSuccess: boolean;
  studyTypesOptionsError: HttpError;
  getAllStudyTypesOptions: () => void;
  programsOptions: SimpleOption[];
  programsOptionsIsLoading: boolean;
  programsOptionsIsSuccess: boolean;
  programsOptionsError: HttpError;
  getAllProgramsOptions: (inputs: GetAllProgramsOptionsDto) => void;
  coursesOptions: SimpleOption[];
  coursesOptionsIsLoading: boolean;
  coursesOptionsIsSuccess: boolean;
  coursesOptionsError: HttpError;
  getAllCoursesOptions: (inputs: GetAllCoursesOptionsDto) => void;
  groupsOptions: SimpleOption[];
  groupsOptionsIsLoading: boolean;
  groupsOptionsIsSuccess: boolean;
  groupsOptionsError: HttpError;
  getAllGroupsOptions: (inputs: GetAllGroupsOptionsDto) => void;
  subgroupsOptions: SimpleOption[];
  subgroupsOptionsIsLoading: boolean;
  subgroupsOptionsIsSuccess: boolean;
  subgroupsOptionsError: HttpError;
  getAllSubgroupsOptions: () => void;
  resetStudyOptionsStore: () => void;
}

const initialDataState = {
  studyTypesOptions: [],
  studyTypesOptionsIsLoading: false,
  studyTypesOptionsIsSuccess: false,
  studyTypesOptionsError: null,
  programsOptions: [],
  programsOptionsIsLoading: false,
  programsOptionsIsSuccess: false,
  programsOptionsError: null,
  coursesOptions: [],
  coursesOptionsIsLoading: false,
  coursesOptionsIsSuccess: false,
  coursesOptionsError: null,
  groupsOptions: [],
  groupsOptionsIsLoading: false,
  groupsOptionsIsSuccess: false,
  groupsOptionsError: null,
  subgroupsOptions: [],
  subgroupsOptionsIsLoading: false,
  subgroupsOptionsIsSuccess: false,
  subgroupsOptionsError: null,
};

const getInitialState = (set, get) => ({
  ...initialDataState,
  getAllStudyTypesOptions: () => getAllStudyTypesOptions(set, get),
  getAllProgramsOptions: (inputs: GetAllProgramsOptionsDto) =>
    getAllProgramsOptions(set, get, inputs),
  getAllCoursesOptions: (inputs: GetAllCoursesOptionsDto) =>
    getAllCoursesOptions(set, get, inputs),
  getAllGroupsOptions: (inputs: GetAllGroupsOptionsDto) =>
    getAllGroupsOptions(set, get, inputs),
  getAllSubgroupsOptions: () => getAllSubgroupsOptions(set, get),
  resetStudyOptionsStore: () => set(initialDataState),
});

export const useStudyOptionsStore = create<StudyOptionsStore>((set, get) =>
  getInitialState(set, get),
);
