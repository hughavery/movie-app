import axios from 'axios';
import {API_URL} from "../CONSTANTS";
import { Review } from '../../types/review';

export async function getReviews(filmId: string) {
  try {
    const response = await axios.get(`${API_URL}/films/${filmId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSimilarFilms(
  genreId: number,
  directorId: number,
  currentFilmId: number
) {
    try {
      const url1 = `${API_URL}/films?genreIds=${genreId}`
      const response1 = await axios.get(url1);
      const filmsWithSameGenre = response1.data.films;

      const url2 = `${API_URL}/films?directorId=${directorId}`
      const response2 = await axios.get(url2);
      const filmsWithSameDirector = response2.data.films;
      
      const similarFilms = [
        ...filmsWithSameGenre,
        ...filmsWithSameDirector,
      ].filter(
        (film, index, self) =>
          film.filmId !== currentFilmId &&
          index === self.findIndex((f) => f.filmId === film.filmId)
      );
      
      return similarFilms;
    } catch (error) {
      console.error(error);
      return null;
    }
  }