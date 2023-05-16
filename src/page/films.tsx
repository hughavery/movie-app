import React, { useState, useEffect } from 'react';
import { getFilms, getFilmsPage } from '../api/films/getFilms';
import { Film } from '../types/film';

function Films() {
  const [films, setFilms] = useState([] as Film[]);
  const [pageNumber, setPageNumber] = useState(0)
  
  useEffect(() => {
    async function fetchFilms() {
      const data = await getFilmsPage(pageNumber);
      setFilms(data);
    }
    fetchFilms();
  }, [pageNumber]);

  return (
    <div>
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
    </div>
  );
}

export default Films;
