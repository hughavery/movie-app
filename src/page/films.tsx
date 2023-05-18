import React, { useState, useEffect } from 'react';
import { getFilmsPage } from '../api/films/getFilms';
import { getGenres } from '../api/films/getGenres'
import { Film } from '../types/film';
import { Genre } from '../types/genre'
import 'bootstrap/dist/css/bootstrap.css';

function Films() {
  const [films, setFilms] = useState([] as Film[]);
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCountFilms, setTotalCountFilms] = useState(0)
  const filmsPerPage = 8;
  const maxPageNumber = Math.ceil(totalCountFilms / filmsPerPage);
  const [genres, setGenres] = useState([] as Genre[])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchFilms() {
      const response = await getFilmsPage(pageNumber,filmsPerPage,searchQuery); 
      setTotalCountFilms(response.count);
      setFilms(response.films);
    }
    async function fetchGenres() {
      const response = await getGenres()
      setGenres(response)
    }
    fetchGenres();
    fetchFilms();
  }, [pageNumber,searchQuery]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setPageNumber(0);
  }

  function firstPage() {
    setPageNumber(0)
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function prevPage() {
    setPageNumber(pageNumber - 1)
  }

  function lastPage() {
    setPageNumber(maxPageNumber - 1) 
  }

  function disableNext() {
    return pageNumber + 1 >= maxPageNumber;
  }

  return (
    <div className="container">
      <h1 className="text-center">Films</h1>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Navbar</a>
        <form className="form-inline">
          <div>
          <input className="form-control mr-sm-2" 
          type="search" 
          placeholder="Search" 
          aria-label="Search"
          value={searchQuery} onChange={handleSearchQueryChange}/>
          </div>
        </form>
      </nav>
      <ul className="row">
        {films.map((film) => (
          <li key={film.filmId} className="col-sm-3">
            <div className="card mx-auto">
            <img src={`https://seng365.csse.canterbury.ac.nz/api/v1/films/${film.filmId}/image`} alt="Photo" />
              <h3>{film.title}</h3>
              {/* <img src={`https://seng365.csse.canterbury.ac.nz/api/v1/films/${film.filmId}/image`} alt="Photo" /> */}
              <p>Director: {film.directorFirstName} {film.directorLastName}</p>
              <p>Release Date: {film.releaseDate}</p>
              {/* help from chatgpt */}
              <p>Genre: {genres.find((genre) => genre.genreId === film.genreId)?.name}</p>
              <p>Age Rating: {film.ageRating}</p>
              <p>User Ratings: {film.rating}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination justify-content-center">
        <ul className="pagination">
        <li className="page-item">
        <button className="page-link" onClick={firstPage} disabled={pageNumber === 0}> First Page </button>
        </li>
        <li className="page-item">
        <button className="page-link" onClick={prevPage} disabled={pageNumber === 0}> previous page</button>
        </li>
        <a className="page-link" >{pageNumber + 1} <span className="sr-only"></span></a>
        <li className="page-item">
        <button className="page-link" onClick={nextPage} disabled={disableNext()}> next page</button>
        </li>
        <li className="page-item">
        <button className="page-link" onClick={lastPage} disabled={disableNext()}> Last Page</button>
        </li>
        </ul>
      </div>
    </div>
  );
}

export default Films;
