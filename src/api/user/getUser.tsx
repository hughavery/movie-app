import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export function GetUser(userId: number) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios
    .get(`${API_URL}/users/${userId}`, {
      headers: {
        'X-Authorization': userToken,
      },
    })
    .then((response) => {
      console.log(response.status);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to register user');
    });
}
