import axios from 'axios';
import { API_URL } from '../CONSTANTS';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function registerUser(userData: User): Promise<string> {
  return axios
    .post(`${API_URL}/users/register`, userData)
    .then((response) => {
      console.log(response.status);
      console.log(response.data.userId);
      return response.data.userId;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to register user');
    });
}
