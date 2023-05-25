import axios from 'axios';
import {API_URL,USER_ID} from "../CONSTANTS";


export async function getFilm(filmId: string) {
  try {
    const response = await axios.get(`${API_URL}/films/${filmId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFilmsByDirectorId() {
  try {
    const directorId = localStorage.getItem(USER_ID)
    const response = await axios.get(`${API_URL}/films?directorId=${directorId}`);
    const {films} = response.data;
    return films;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReviewedFilmsByDirectorId() {
  try {
    const directorId = localStorage.getItem(USER_ID)
    const response = await axios.get(`${API_URL}/films?reviewerId=${directorId}`);
    const {films} = response.data;
    return films;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function getFilmsPage(
  pageNumber: number,
  pageCount: number,
  searchQuery?: string,
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
  

