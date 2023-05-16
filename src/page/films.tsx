import React, { useState, useEffect } from 'react';
import { getFilms, getFilmsPage } from '../api/films/getFilms';
import { Film } from '../types/film';

function Films() {
  const [films, setFilms] = useState([] as Film[]);
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCountFilms, setTotalCountFilms] = useState(0)
  const filmsPerPage = 5;

  useEffect(() => {
    async function fetchFilms() {
      const response = await getFilmsPage(pageNumber,filmsPerPage); 
      setTotalCountFilms(response.count);
      setFilms(response.films);
    }
    fetchFilms();
  }, [pageNumber]);

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function prevPage() {
    setPageNumber(pageNumber - 1)
  }

  function disableNext() {
    const maxPageNumber = totalCountFilms/filmsPerPage
    if (totalCountFilms < pageNumber * filmsPerPage) {

    }
  }

  return (
    <div>
      {totalCountFilms}
      <h1>Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <h2>{film.title}</h2>
            <p>Director: {film.director}</p>
            <p>Release Date: {film.releaseDate}</p>
          </li>
        ))}
      </ul>
      <button onClick={prevPage} disabled={pageNumber <= 0}> previous page</button>
      <p>Page {pageNumber + 1}</p>
      <button onClick={nextPage} disabled={disableNext}> next page</button>
    </div>
  );
}

export default Films;
