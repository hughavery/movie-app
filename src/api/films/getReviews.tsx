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