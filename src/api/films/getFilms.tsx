import axios from 'axios';
import {API_URL} from "../URL";
import { Film } from '../../types/film';

export async function getFilms() {
  try {
    const response = await axios.get(`${API_URL}/films`);
    return response.data.films;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFilmsPage(
  pageNumber: number,
  pageCount: number,
  searchQuery?: string,
  directorId?: number,
  reviewerId?: number,
  sortBy?: string,
  genreIds?: number[],
  ageRatings?: string[]
) {
    try {
      const pageIndex = pageNumber * pageCount
      let url = `${API_URL}/films?startIndex=${pageIndex}&count=${pageCount}`
      if (searchQuery) {
        url += `&q=${searchQuery}`;
      }
      if (directorId) {
        url += `&directorId=${directorId}`;
      }
      if (reviewerId) {
        url += `&reviewerId=${reviewerId}`;
      }
      if (sortBy) {
        url += `&sortBy=${sortBy}`;
      }
      if (genreIds && genreIds.length > 0) {
        genreIds.forEach((genreId) => {
          url += `&genreIds=${genreId}`;
        });
      }
      if (ageRatings && ageRatings.length > 0) {
        ageRatings.forEach((ageRating) => {
          url += `&ageRatings=${ageRating}`;
        });
      }
      const response = await axios.get(url);
      const films = response.data;
  
      return films;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

