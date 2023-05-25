import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import CreateFilmModal from './createFilmModal';
import EditFilmModal from './editFilmModal';
import { getFilmsByDirectorId, getReviewedFilmsByDirectorId } from '../api/films/getFilms';
import { Film } from '../types/film';
import { API_URL } from "../api/CONSTANTS";
import { getReviews } from '../api/films/getReviews';
import { DeleteFilm } from '../api/films/deleteFilm';

function Gallery() {
  const [films, setFilms] = useState<Film[]>([]);
  const [reviewedFilms, setReviewedFilms] = useState<Film[]>([]);
  const [hasReviews, setHasReviews] = useState<boolean[]>([]);

  useEffect(() => {
    async function fetchFilms() {
      const filmsData = await getFilmsByDirectorId();
      if (filmsData) {
        setFilms(filmsData);
        checkReviews(filmsData);
      }
    }

    async function fetchReviewedFilms() {
      const reviewedFilmsData = await getReviewedFilmsByDirectorId();
      if (reviewedFilmsData) {
        setReviewedFilms(reviewedFilmsData);
      }
    }

    fetchFilms();
    fetchReviewedFilms();
  }, []);

  async function checkReviews(filmsData: Film[]) {
    const reviewsData = await Promise.all(filmsData.map(film => getReviews(String(film.filmId))));
    const reviewsExist = reviewsData.map(reviews => reviews.length > 0);
    setHasReviews(reviewsExist);
  }

  async function handleDeleteFilm(filmId: string) {
    const confirmed = window.confirm('Are you sure you want to delete this film?');
    if (confirmed) {
      try {
        await DeleteFilm(filmId);

        // Remove the deleted film from the films state
        setFilms(prevFilms => prevFilms.filter(film => String(film.filmId) !== filmId));
      } catch (error) {
        console.error(error);
      }
    }
  }

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
                films.map((film, index) => (
                  <div className="col-md-3" key={film.filmId}>
                    <div className="card mb-3">
                      <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"} />
                      <div className="card-body">
                        <h6 className="card-subtitle">{film.title}</h6>
                        <p className="card-text">{film.description}</p>
                        <p>Release Date: {new Date(film.releaseDate).toLocaleDateString()}</p>
                        <p>Age Rating: {film.ageRating}</p>
                        <p>User Ratings: {film.rating}</p>
                        <p>{film.filmId}</p>
                        <Link to={`/films/${film.filmId}`}>More Info</Link>
                        {!hasReviews[index] && (
                          <div>
                            <p>No reviews for this film</p>
                            <EditFilmModal filmId={film.filmId} />
                          </div>
                        )}
                        <button className="btn btn-danger" onClick={() => handleDeleteFilm(String(film.filmId))}>Delete</button>
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
        <div className="row">
          {/* Display the reviewed films without edit modal and delete buttons */}
          <div className="col-md-12 border p-3 mb-4">
            <p>Reviewed</p>
            <div className="row">
              {reviewedFilms.length > 0 ? (
                reviewedFilms.map((film) => (
                  <div className="col-md-3" key={film.filmId}>
                    <div className="card mb-3">
                      <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"} />
                      <div className="card-body">
                        <h6 className="card-subtitle">{film.title}</h6>
                        <p className="card-text">{film.description}</p>
                        <p>Release Date: {new Date(film.releaseDate).toLocaleDateString()}</p>
                        <p>Age Rating: {film.ageRating}</p>
                        <p>User Ratings: {film.rating}</p>
                        <p>{film.filmId}</p>
                        <Link to={`/films/${film.filmId}`}>More Info</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviewed films found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
