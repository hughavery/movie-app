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

export async function getFilmsPage(startIndex: number) {
    try {
      const response = await axios.get(`${API_URL}/films`);
      const films = response.data.films;
  
      // Use the slice method to get the next five films starting at startIndex
      const filmsPage = films.slice(startIndex, startIndex + 5);
  
      return filmsPage;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

