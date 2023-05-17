import React, { useState, useEffect } from 'react';
import { getFilmsPage } from '../api/films/getFilms';
import { getFilmsImage } from '../api/images/getFilmsImage'
import { Film } from '../types/film';
import 'bootstrap/dist/css/bootstrap.css';

function Films() {
  const [films, setFilms] = useState([] as Film[]);
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCountFilms, setTotalCountFilms] = useState(0)
  const filmsPerPage = 6;
  const maxPageNumber = Math.ceil(totalCountFilms / filmsPerPage);

  useEffect(() => {
    async function fetchFilms() {
      const response = await getFilmsPage(pageNumber,filmsPerPage); 
      setTotalCountFilms(response.count);
      setFilms(response.films);
    }
    fetchFilms();
  }, [pageNumber]);

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
      <ul className="row">
        {films.map((film) => (
          <li key={film.filmId} className="col-sm-6">
            <div className="card mx-auto">
              <h2>{film.title}</h2>
              {/* <img src={getFilmsImage(film.filmId)} alt="Photo" /> */}
              <p>Director: {film.directorFirstName} {film.directorLastName}</p>
              <p>Release Date: {film.releaseDate}</p>
              <p>Age Rating: {film.ageRating}</p>
              <p>Critic Rating: {film.rating}</p>
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
