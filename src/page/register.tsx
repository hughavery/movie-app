import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user/registerUser';
import { loginUser } from '../api/user/loginUser';
import { PutUserImage } from '../api/images/putUserImage';
import Navbar from './navbar';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get the form data
    const userData = {
      firstName: (e.target as HTMLFormElement).firstName.value,
      lastName: (e.target as HTMLFormElement).lastName.value,
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    try {
      const registeredUserId = await registerUser(userData);
      setErrorMessage('');

      // Log in the user
      const loginData = {
        email: userData.email,
        password: userData.password,
      };

      const userId = await loginUser(loginData);
      if (userId) {
        // Check if the user uploaded a photo
        const imageFile = (e.target as HTMLFormElement).image.files[0];
        if (imageFile) {
            PutUserImage(userId, imageFile)
        }

        // Redirect to the films page or any other desired page upon successful login
        navigate('/films');
      } else {
        throw new Error('Failed to log in user');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to register user');
    }

    setLoading(false);
  };
   

  return (
    <div>
    <Navbar />

    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Profile Image</label>
                  <input type="file" className="form-control" id="image" accept=".jpg, .jpeg, .png, .gif" />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                  {errorMessage && <p className="text-danger">{String(errorMessage)}</p>}
                </div>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
