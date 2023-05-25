import axios from 'axios';
import { API_URL, USER_TOKEN } from '../CONSTANTS';

export async function DeleteUserImage(userId: string): Promise<void> {
  try {
    const userToken = localStorage.getItem(USER_TOKEN);
    await axios.delete(`${API_URL}/users/${userId}/image`, {
      headers: {
        'X-Authorization': userToken
      }
    });

    // Image update successful
    console.log('User image deleted successfully');
  } catch (error) {
    console.log(error)
    console.log("why")
    console.error('Failed to delete user image:', error);
    throw new Error("Can not delete default image");
  }
}
