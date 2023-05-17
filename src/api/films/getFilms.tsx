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

export async function getFilmsPage(pageNumber: number, pageCount: number) {
    try {
      const pageIndex = pageNumber * pageCount
      const response = await axios.get(`${API_URL}/films?startIndex=${pageIndex}&count=${pageCount}`);
      const films = response.data;
  
      return films;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

