import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

interface FilmData {
    title: string;
    description: string;
    releaseDate?: string;
    genreId: number;
    ageRating: string;
    runtime: number;
  }
  
export function PostFilms(filmData: FilmData) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios.post(`${API_URL}/films`, filmData, {
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
