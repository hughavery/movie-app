import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export async function updateUserImage(userId: number, imageFile: File): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const userToken = localStorage.getItem(USER_TOKEN);
    await axios.put(`${API_URL}/users/${userId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
