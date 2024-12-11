import axios from '../../config/Axios/axios-instance';
import { showToast } from '../../utils/toast';

const API_URL = '/users';

export interface FindUsersRequestDto {
  searchQuery: string;
}

export interface UpdateUserInfoRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studyType: number;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
}

export const findUsers = async (
  set: any,
  get: any,
  inputs: FindUsersRequestDto,
): Promise<void> => {
  set({
    foundUsersIsLoading: true,
    foundUsersIsSuccess: false,
    foundUsersError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query: inputs.searchQuery },
    });
    const responseData = response.data?.data;

    set({
      foundUsersIsSuccess: true,
      foundUsers: responseData,
      foundUsersIsUpdateNeeded: false,
    });
  } catch (error) {
    set({
      foundUsersIsSuccess: false,
      foundUsersError: error?.response?.data?.data,
    });
  } finally {
    set({ foundUsersIsLoading: false });
  }
};

export const getFriends = async (set: any, get: any): Promise<void> => {
  set({
    friendsIsLoading: true,
    friendsIsSuccess: false,
    friendsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/friends`);
    const responseData = response.data?.data;

    set({
      friendsIsSuccess: true,
      friends: responseData,
    });
  } catch (error) {
    set({
      friendsIsSuccess: false,
      friendsError: error?.response?.data?.data,
    });
  } finally {
    set({ friendsIsLoading: false });
  }
};

export const updateUserInfo = async (
  set: any,
  get: any,
  inputs: UpdateUserInfoRequestDto,
): Promise<void> => {
  set({
    userUpdateInfoIsLoading: true,
    userUpdateInfoIsSuccess: false,
    userUpdateInfoIsError: null,
  });
  try {
    await axios.patch(API_URL, {
      ...inputs,
    });

    set({
      userUpdateInfoIsSuccess: true,
    });
    showToast('successfully updated user info', 'success');
  } catch (error) {
    set({
      userUpdateInfoIsSuccess: false,
      userUpdateInfoIsError: error?.response?.data?.data,
    });
    showToast(error?.response?.data?.message, 'error');
  } finally {
    set({ userUpdateInfoIsLoading: false });
  }
};
