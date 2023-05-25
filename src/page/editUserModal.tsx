import React, { useState} from 'react';
import { USER_ID, API_URL } from '../api/CONSTANTS';
import { User } from '../types/user';
import { PatchUser } from '../api/user/patchUser';

interface EditUserModalProps {
  user: User;
}

function EditUserModal(props: EditUserModalProps) {
  const { user } = props;
  const currentUserId = localStorage.getItem(USER_ID);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      email: String(formData.get('email')),
      currentPassword: formData.get('currentPassword') ? String(formData.get('currentPassword')) : undefined,
      newPassword: formData.get('newPassword') ? String(formData.get('newPassword')) : undefined
    };

    if (currentUserId) {
      try {
        console.log(userData);
        await PatchUser(userData, currentUserId);
        window.location.reload();
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to register user');
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#editUserModal"
      >
        Edit User
      </button>
      <div
        className="modal fade"
        id="editUserModal"
        tabIndex={-1}
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">
                Edit User
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    defaultValue={user.firstName}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    defaultValue={user.lastName}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    defaultValue={user.email}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                  />
                </div>

                <button type="submit" className="btn btn-warning">
                  Edit User
                </button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
