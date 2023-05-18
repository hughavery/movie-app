import axios from 'axios';
import {API_URL} from "../URL";
import { Film } from '../../types/film';

export async function getGenres() {
  try {
    const response = await axios.get(`${API_URL}/films/genres`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}