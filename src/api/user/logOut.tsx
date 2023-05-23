import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export function signOutUser(): Promise<void> {
  const userToken = localStorage.getItem(USER_TOKEN);

  if (!userToken) {
    return Promise.reject(new Error('User token not found'));
  }

  return axios
    .post(`${API_URL}/users/logout`, null, {
      headers: {
        'X-Authorization': userToken
      },
    })
    .then(() => {
      console.log('Sign out successful');
      localStorage.removeItem(USER_TOKEN);
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message || 'Failed to sign out');
    });
}
