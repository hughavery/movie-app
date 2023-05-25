import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

interface FilmData {
    title: string;
    description: string;
    releaseDate?: string;
    genreId: number;
    ageRating?: string;
    runtime?: number;
  }
  
export function PatchFilms(filmData: FilmData,filmId: string) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios.patch(`${API_URL}/films/${filmId}`, filmData, {
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
