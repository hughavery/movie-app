import axios from 'axios';
import {API_URL} from "../URL";

export async function getFilmsImage(filmId: number) {
    try {
      const response = await axios.get(`${API_URL}/films/${filmId}/index`);
      const image = response.data; 
      return image;
    } catch (error) {
      console.error(error);
      return null;
    }
  }