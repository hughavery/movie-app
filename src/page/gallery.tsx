import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import CreateFilmModal from './createFilmModal';
import EditFilmModal from './editFilmModal';
import { getFilmsByDirectorId } from '../api/films/getFilms';
import { Film } from '../types/film';
import { API_URL } from "../api/CONSTANTS";

function Gallery() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    async function fetchFilms() {
      const filmsData = await getFilmsByDirectorId();
      if (filmsData) {
        setFilms(filmsData);
      }
    }

    fetchFilms();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="display-4">Your Gallery</h1>
          <CreateFilmModal />
        </div>
        <div className="row">
          {/* Display the films */}
          <div className="col-md-12 border p-3 mb-4">
            <p>Directed</p>
            <div className="row">
              {films.length > 0 ? (
                films.map((film) => (
                  <div className="col-md-3" key={film.filmId}>
                    <div className="card mb-3">
                      <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" />
                      <div className="card-body">
                        <h6 className="card-subtitle">{film.title}</h6>
                        <p className="card-text">{film.description}</p>
                        <p>Release Date: {new Date(film.releaseDate).toLocaleDateString()}</p>
                        {/* <p>Genre: {genres.find((genre) => genre.genreId === film.genreId)?.name}</p> */}
                        <p>Age Rating: {film.ageRating}</p>
                        <p>User Ratings: {film.rating}</p>
                        <Link to={`/films/${film.filmId}`}>More Info</Link>
                        <EditFilmModal filmId={film.filmId} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No films found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
