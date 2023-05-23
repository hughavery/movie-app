import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Films</h1>
      <div>
        <Link to="/films">Go to movies</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
