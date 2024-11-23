import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';

const API_URL = '/study-options';

export interface GetAllProgramsOptionsDto {
  studyTypeId: number;
}

export interface GetAllCoursesOptionsDto extends GetAllProgramsOptionsDto {
  studyProgramName: string;
}

export interface GetAllGroupsOptionsDto extends GetAllCoursesOptionsDto {
  course: number;
}

export const getAllStudyTypesOptions = async (
  set: any,
  get: any,
): Promise<void> => {
  set({
    studyTypesOptionsIsLoading: true,
    studyTypesOptionsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/types-options`);
    const responseData = response.data?.data;

    set({ studyTypesOptions: responseData });
  } catch (error) {
    set({
      studyTypesOptionsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ studyTypesOptionsIsLoading: false });
  }
};

export const getAllProgramsOptions = async (
  set: any,
  get: any,
  inputs: GetAllProgramsOptionsDto,
): Promise<void> => {
  set({
    programsOptionsIsLoading: true,
    programsOptionsError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/programs-options`, {
      ...inputs,
    });
    const responseData = response.data?.data;

    set({ programsOptions: responseData });
  } catch (error) {
    set({
      programsOptionsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ programsOptionsIsLoading: false });
  }
};

export const getAllCoursesOptions = async (
  set: any,
  get: any,
  inputs: GetAllCoursesOptionsDto,
): Promise<void> => {
  set({
    coursesOptionsIsLoading: true,
    coursesOptionsError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/courses-options`, {
      ...inputs,
    });
    const responseData = response.data?.data;

    set({ coursesOptions: responseData });
  } catch (error) {
    set({
      coursesOptionsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ coursesOptionsIsLoading: false });
  }
};

export const getAllGroupsOptions = async (
  set: any,
  get: any,
  inputs: GetAllGroupsOptionsDto,
): Promise<void> => {
  set({
    groupsOptionsIsLoading: true,
    groupsOptionsError: null,
  });
  try {
    const response = await axios.post(`${API_URL}/groups-options`, {
      ...inputs,
    });
    const responseData = response.data?.data;

    set({ groupsOptions: responseData });
  } catch (error) {
    set({
      groupsOptionsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ groupsOptionsIsLoading: false });
  }
};

export const getAllSubgroupsOptions = async (
  set: any,
  get: any,
): Promise<void> => {
  set({
    subgroupsOptionsIsLoading: true,
    subgroupsOptionsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/subgroups-options`);
    const responseData = response.data?.data;

    set({ subgroupsOptions: responseData });
  } catch (error) {
    set({
      subgroupsOptionsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ subgroupsOptionsIsLoading: false });
  }
};
