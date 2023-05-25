import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { GetUser } from '../api/user/getUser';
import { API_URL, USER_ID } from '../api/CONSTANTS';
import { User } from '../types/user';
import EditUserModal from './editUserModal';
import EditPhotoModal from './editPhotoModal';

function Profile() {
  const [userData, setUserData] = useState<User | null>(null);
  const currentUserId = localStorage.getItem(USER_ID);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUserId) {
          const user = await GetUser(Number(currentUserId));
          setUserData(user);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="mt-4">Profile</h1>
        {userData && (
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">User Details</h2>
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <div className="rounded-circle overflow-hidden" style={{ width: '150px', height: '150px' }}>
                    <img
                      src={`${API_URL}/users/${currentUserId}/image`}
                      alt="Photo"
                      onError={(e) => ((e.target as HTMLImageElement).src = 'https://avatar.vercel.sh/cookie')}
                      className="img-fluid"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="mt-2">
                    <EditPhotoModal user={userData} />
                  </div>
                </div>
                <div className="col-md-8">
                  <p className="card-text">
                    <strong>First name:</strong> {userData.firstName}
                  </p>
                  <p className="card-text">
                    <strong>Last name:</strong> {userData.lastName}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <div className="mt-2">
                    <EditUserModal user={userData} />
                  </div>
                  {/* Display other user details here */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
