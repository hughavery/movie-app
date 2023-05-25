import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    currentPassword?: string;
  }
  
export function PatchUser(userData: UserData,userId: string) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios.patch(`${API_URL}/users/${userId}`, userData, {
    headers: {
        'X-Authorization': userToken
    },
  })
    .then((response) => {
      console.log(response.status);
      console.log(response.data.userId);
      return response.data.userId;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to create user');
    });
}
