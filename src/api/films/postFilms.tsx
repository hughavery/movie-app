import axios from 'axios';
import { API_URL } from '../CONSTANTS';

interface FilmData {
    title: string;
    description: string;
    releaseDate: string;
    genre: string;
    ageRating: string;
    runtime: number;
  }
  
export function PostFilms(filmData: FilmData) {
  return axios.post(`${API_URL}/films`, filmData)
    .then((response) => {
      console.log(response.status);
      console.log(response.data.filmId);
      return response.data.filmId;
    })
    .catch((error) => {
      throw new Error(error.response?.statusText || 'Failed to create film');
    });
}
