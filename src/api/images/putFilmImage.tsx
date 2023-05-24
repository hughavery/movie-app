import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export async function putFilmImage(filmId: string, imageFile: File): Promise<void> {
  try {

    const userToken = localStorage.getItem(USER_TOKEN);
    await axios.put(`${API_URL}/users/${filmId}/image`, imageFile, {
      headers: {
        'Content-Type': imageFile.type,
        'X-Authorization': userToken
      },
    });

    // Image update successful
    console.log('User image updated successfully');
  } catch (error) {
    console.error('Failed to update user image:', error);
    throw new Error('Failed to update user image');
  }
}