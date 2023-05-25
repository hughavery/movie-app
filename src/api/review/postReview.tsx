import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

interface ReviewData {
    rating: number;
    review?: string;
  }
  
export function PostReview(filmReview: ReviewData, filmId: Number) {
  const userToken = localStorage.getItem(USER_TOKEN);
  return axios.post(`${API_URL}/films/${filmId}/reviews`, filmReview, {
    headers: {
        'X-Authorization': userToken
    },
  })
    .then((response) => {
      console.log("succes in reviewing film")
      console.log(response.data)
      return response.data.filmId;
    })
    .catch((error) => {
      console.log("no succes in reviewing film")
      throw new Error(error.response?.statusText || 'Failed to create film');
    });
}
