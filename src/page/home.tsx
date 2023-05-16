import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  
  return (
    <div>
      <h1>Films</h1>
      <Link to={"/films"}>Go to movies</Link>
    </div>
  );
}

export default Home;
