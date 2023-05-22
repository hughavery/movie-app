import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilm } from '../api/films/getFilms';
import { Film } from '../types/film';
import 'bootstrap/dist/css/bootstrap.css';
import {API_URL} from "../api/CONSTANTS";
import { Genre } from '../types/genre'
import { getGenres } from '../api/films/getGenres'

function SelectedFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [genres, setGenres] = useState([] as Genre[])

  useEffect(() => {
    async function fetchFilm() {
      if (id) {
        const filmData = await getFilm(id);
        setFilm(filmData);
      }
    }
    async function fetchGenres() {
      const response = await getGenres()
      setGenres(response)
    }
    fetchGenres();
    fetchFilm();
  }, [id]);
  if (film === null) {
    return (
      <div>
        <p>No film Found</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-4 mt-1">
          <div className="card" style={{ width: '30rem' }}>
            <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" />
            <div className="card-body">
              <h5 className="card-title">Film info</h5>
              <p className="card-title">{film.title}</p>
              <p className="card-text">{film.description}</p>
              <p>Release Date: {film.releaseDate}</p>
              <p>Genre: {genres.find((genre) => genre.genreId === film.genreId)?.name}</p>
              <p>Age Rating: {film.ageRating}</p>
              <p>User Ratings: {film.rating}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 offset-md-3 mb-3">
          <div className="card" style={{ width: '30rem' }}>
            <div className="card-body">
              <p>Directed by: {film.directorFirstName} {film.directorLastName}</p>
              <img src={`${API_URL}/users/${film.directorId}/image`} alt="Photo" width={40} onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default SelectedFilm;

