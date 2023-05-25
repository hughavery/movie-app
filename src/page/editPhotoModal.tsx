import React, { useState } from 'react';
import { USER_ID, API_URL } from '../api/CONSTANTS';
import { User } from '../types/user';
import { PutUserImage } from '../api/images/putUserImage';
import { DeleteUserImage } from '../api/images/deleteUserImage';

interface EditPhotoModalProps {
  user: User;
}

function EditPhotoModal(props: EditPhotoModalProps) {
  const { user } = props;
  const currentUserId = localStorage.getItem(USER_ID);
  const [error, setError] = useState('');

  const handleUpdatePhoto = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageFile = (event.target as HTMLFormElement).image.files[0];
    if (imageFile && currentUserId) {
      try {
        await PutUserImage(currentUserId, imageFile);
        setError('');
        window.location.reload();
      } catch (error) {
        setError('An error occurred while updating the photo. Please try again.');
      }
    } else {
      setError('Please select a photo');
    }
  };

  const handleDeletePhoto = async () => {
    if (currentUserId) {
      try {
        await DeleteUserImage(currentUserId);
        setError('');
        window.location.reload();
      } catch (error: any) {
        console.log(error.message)
        setError(error.message || 'An error occurred while deleting the photo. Please try again.');
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#editPhotoModal"
      >
        Edit Photo
      </button>
      <div
        className="modal fade"
        id="editPhotoModal"
        tabIndex={-1}
        aria-labelledby="editPhotoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editPhotoModalLabel">
                Edit Picture
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdatePhoto}>
                <div className="text-center mb-3">
                  <div
                    className="rounded-circle overflow-hidden d-inline-block"
                    style={{ width: '120px', height: '120px' }}
                  >
                    <img
                      src={`${API_URL}/users/${currentUserId}/image`}
                      alt="Photo"
                      onError={(e) => ((e.target as HTMLImageElement).src = 'https://avatar.vercel.sh/cookie')}
                      className="img-fluid"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Profile Image
                  </label>
                  <input type="file" className="form-control" id="image" name="image" accept=".jpg, .jpeg, .png, .gif" />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">
                    Update Pic
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDeletePhoto}>
                    Delete Pic
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPhotoModal;