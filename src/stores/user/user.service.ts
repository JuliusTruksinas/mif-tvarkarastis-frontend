import axios from '../../config/Axios/axios-instance';

const API_URL = '/users';

export interface FindUsersRequestDto {
  searchQuery: string;
}

export const findUsers = async (
  set: any,
  get: any,
  inputs: FindUsersRequestDto,
): Promise<void> => {
  set({
    foundUsersIsLoading: true,
    foundUsersError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query: inputs.searchQuery },
    });
    const responseData = response.data?.data;

    set({
      foundUsers: responseData,
      foundUsersIsUpdateNeeded: false,
    });
  } catch (error) {
    set({
      foundUsersError: error?.response?.data?.data,
    });
  } finally {
    set({ foundUsersIsLoading: false });
  }
};

export const getFriends = async (set: any, get: any): Promise<void> => {
  set({
    friendsIsLoading: true,
    friendsError: null,
  });
  try {
    const response = await axios.get(`${API_URL}/friends`);
    const responseData = response.data?.data;

    set({
      friends: responseData,
    });
  } catch (error) {
    set({
      friendsError: error?.response?.data?.data,
    });
  } finally {
    set({ friendsIsLoading: false });
  }
};
