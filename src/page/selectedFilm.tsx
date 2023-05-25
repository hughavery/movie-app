import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFilm } from '../api/films/getFilms';
import { Film } from '../types/film';
import { Review } from '../types/review';
import 'bootstrap/dist/css/bootstrap.css';
import {API_URL, USER_ID} from "../api/CONSTANTS";
import { Genre } from '../types/genre'
import ReviewFilmModal from "./reviewFilmModal"
import { getGenres } from '../api/films/getGenres'
import { getReviews, getSimilarFilms} from '../api/films/getReviews'
import Navbar from './navbar';


function SelectedFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [genres, setGenres] = useState([] as Genre[])
  const [reviews, setReviews] = useState([] as Review[])
  const [similarFilms, setSimilarFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    async function fetchFilm() {
      if (id) {
        const filmData = await getFilm(id);
        setFilm(filmData);
      }
    }
  
    async function fetchGenres() {
      const response = await getGenres();
      setGenres(response);
    }
  
    async function fetchReviews() {
      if (id) {
        const response = await getReviews(id);
        setReviews(response);
      }
    }
  
    fetchFilm();
    fetchGenres();
    fetchReviews();
  }, [id]);
  
  useEffect(() => {
    async function fetchSimilarFilms() {
      if (film) {
        const response = await getSimilarFilms(film.genreId, film.directorId, film.filmId);
        setSimilarFilms(response);
      }
    }
  
    fetchSimilarFilms();
  }, [film]);
  


  if (film === null) {
    return (
      <div>
        <p>No film Found</p>
      </div>
    );
  }

  function displayReviewModal(date: string) {
    const releaseDate = new Date(date);
    const currentDate = new Date();
    const currentUserId = localStorage.getItem(USER_ID) 
    console.log(currentUserId)
    console.log(reviews)
    if (releaseDate > currentDate) {
      console.log("Cannot review a film that has not been released.");
      return false;
    }

    if (currentUserId && reviews.some((review) => review.reviewerId === Number(currentUserId))) {
      return false;
    }

  
    return true;
  }
  
  
  


  return (
    <div>
      <Navbar />
    <div className="d-flex justify-content-center">
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-4 mt-1">
          <div className="card" style={{ width: '30rem' }}>
            <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" />
            <div className="card-body">
              <h5 className="card-title">Film info</h5>
              <p className="card-title">{film.title}</p>
              <p className="card-text">{film.description}</p>
              <p>Release Date: {new Date(film.releaseDate).toLocaleDateString()}</p>
              <p>Genre: {genres.find((genre) => genre.genreId === film.genreId)?.name}</p>
              <p>Age Rating: {film.ageRating}</p>
              <p>User Ratings: {film.rating}</p>
              {displayReviewModal(film.releaseDate) && <ReviewFilmModal filmId={film.filmId} />}
            </div>
          </div>
        </div>
  
        <div className="col-md-6 offset-md-3 mb-3">
          <div className="card" style={{ width: '30rem' }}>
            <h5 className="card-title">Director info</h5>
            <div className="card-body">
              <p>Directed by: {film.directorFirstName} {film.directorLastName}</p>
              <img src={`${API_URL}/users/${film.directorId}/image`} alt="Photo" width={40} onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"} />
            </div>
          </div>
        </div>
  
        <div className="col-md-6 offset-md-3 mb-3">
          <div className="card" style={{ width: '30rem' }}>
            <h5 className="card-title">Reviews and Ratings</h5>
            <div className="card-body">
              <p className="rating">Rating: <span className="text-success ">{film.rating}</span>/10</p>
              <p>Number of Reviews: {reviews.length}</p>
  
              {/* Loop through reviews and create cards */}
              {reviews.map((review, index) => (
                <div className="card mb-3" key={index}>
                  <div className="card-body">
                    <h6 className="card-subtitle">Review #{index + 1}</h6>
                    <p className="card-text">reviewer: {review.reviewerFirstName} {review.reviewerLastName}</p>
                    <img src={`${API_URL}/users/${review.reviewerId}/image`} alt="Photo" width={40} onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"} />
                    <p className="card-text">Review: {review.review ? review.review : "N/A"}</p>
                    <p className="card-text">{review.reviewerFirstName} Reviewed {film.title} a {review.rating}/10</p>
                    <p className="card-text">Time of Review: {new Date(review.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
  
            </div>
          </div>
        </div>
  
        <div className="col-md-12 mb-3">
          <div className="card" style={{ width: '100%' }}>
            <h5 className="card-title">Similar Films</h5>
            <div className="card-body">
              {similarFilms === null ? (
                <p>Loading similar films...</p>
              ) : similarFilms.length > 0 ? (
                <div className="row">
                  {similarFilms.slice(0, 3).map((similarFilm) => (
                    <div className="col-md-2" key={similarFilm.filmId}>
                      <div className="card mb-3">
                        <img src={`${API_URL}/films/${similarFilm.filmId}/image`} alt="Photo" />  
                        <div className="card-body">
                          <h6 className="card-subtitle">{similarFilm.title}</h6>
                          <p className="card-text">{similarFilm.description}</p>
                          <p>Release Date: {new Date(similarFilm.releaseDate).toLocaleDateString()}</p>
                          <p>Genre: {genres.find((genre) => genre.genreId === similarFilm.genreId)?.name}</p>
                          <p>Age Rating: {similarFilm.ageRating}</p>
                          <p>User Ratings: {similarFilm.rating}</p>
                          <Link to={`/films/${similarFilm.filmId}`}>More Info</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No similar films found.</p>
              )}
            </div>
          </div>
        </div>
  
      </div>
    </div>
    </div>
  );
  
  
  
  
}

export default SelectedFilm;

