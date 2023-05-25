import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import filmBackground from '../icons/film.png'; // Import the PNG image

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${filmBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const titleStyle = {
    color: '#fff', // Set text color to white
  };

  const descriptionStyle = {
    color: '#fff', // Set text color to white
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title" style={titleStyle}>Welcome to FilmFlix</h1>
        <p className="home-description" style={descriptionStyle}>Discover the world of movies</p>
      </div>
    </div>
  );
}

export default Home;
