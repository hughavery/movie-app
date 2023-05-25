import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export function DeleteFilm(filmId: string) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios.delete(`${API_URL}/films/${filmId}`, {
    headers: {
      'X-Authorization': userToken
    },
  })
    .then((response) => {
      console.log(response.status);
      console.log(response.data.filmId);
      return response.data.filmId;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to create film');
    });
}
