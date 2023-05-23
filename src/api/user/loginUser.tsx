import axios from 'axios';
import { API_URL, USER_TOKEN} from '../CONSTANTS';


interface User {
  email: string;
  password: string;
}

export function loginUser(userData: User): Promise<string> {
  return axios
    .post(`${API_URL}/users/login`, userData)
    .then((response) => {
      console.log(response.status);
      console.log('Login successful');
      console.log(response.data);
      localStorage.setItem(USER_TOKEN,response.data.token)
      return response.data.userId;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to login');
    });
}
