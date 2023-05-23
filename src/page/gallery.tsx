import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import CreateFilmModal from './createFilmModal'

function Gallery() {

  return (
    <div>
      <Navbar />
      gallery
      <CreateFilmModal />
      </div>
  );
}

export default Gallery;
