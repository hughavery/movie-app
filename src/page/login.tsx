import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/user/loginUser';
import Navbar from './navbar';
import CreateFilmModal from './createFilmModal'

function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    try {
      const userId = await loginUser(userData);
      setErrorMessage('');

    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to login');
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
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  </div>
                </form>
                <p className="text-center mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                <CreateFilmModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
