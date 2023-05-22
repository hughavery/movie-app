import React, { useState, useEffect } from 'react';
import { getFilmsPage } from '../api/films/getFilms';
import { getGenres } from '../api/films/getGenres'
import { Film } from '../types/film';
import { Genre } from '../types/genre'
import {API_URL, AGE_RATINGS, SORT_BY} from "../api/CONSTANTS";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Route } from "react-router-dom";




function Films() {
  const [films, setFilms] = useState([] as Film[]);
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCountFilms, setTotalCountFilms] = useState(0)
  const filmsPerPage = 8;
  const maxPageNumber = Math.ceil(totalCountFilms / filmsPerPage);
  const [genres, setGenres] = useState([] as Genre[])
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilters, setGenreFilter] = useState([] as number[]);
  const [ageFilters, setAgeFilters] = useState([] as string[])
  const [sortOption, setSortOption] = useState('');
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchFilms() {
      const response = await getFilmsPage(pageNumber,filmsPerPage,searchQuery,sortOption,genreFilters,ageFilters); 
      setTotalCountFilms(response.count);
      setFilms(response.films);
    }
    async function fetchGenres() {
      const response = await getGenres()
      setGenres(response)
    }
    fetchGenres();
    fetchFilms();
  }, [pageNumber,searchQuery,genreFilters,ageFilters,sortOption]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setPageNumber(0);
  }

  function handleGenreSelection(genreId: number) {
    setPageNumber(0)
    if (genreFilters.includes(genreId)) {
      // Genre already selected, remove it from filters
      setGenreFilter(genreFilters.filter((id) => id !== genreId));
    } else {
      // Genre not selected, add it to filters
      setGenreFilter([...genreFilters, genreId]);
    }
  }

  function handleAgeSelection(ageRating: string) {
    setPageNumber(0)
    if (ageFilters.includes(ageRating)) {
      // Age rating already selected, remove it from filters
      setAgeFilters(ageFilters.filter((rating) => rating !== ageRating));
    } else {
      // Age rating not selected, add it to filters
      setAgeFilters([...ageFilters, ageRating]);
    }
  }

  function handleSortSelection(option: string) {
    setPageNumber(0)
    setSortOption(option);
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

  function toggleGenreDropdown() {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  }

  function toggleAgeDropdown() {
    setIsAgeDropdownOpen(!isAgeDropdownOpen);
  }

  function toggleSortDropdown() {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  }

  // Rest of the code...

  return (
    <div className="container">
      <h1 className="text-center">Explore Films</h1>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Filters</a>

        <div className={`dropdown ${isGenreDropdownOpen ? 'show' : ''}`}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleGenreDropdown}
          >
            Genres
          </button>
          <div className={`dropdown-menu ${isGenreDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
          {genres.map((genre) => (
          <button
            key={genre.genreId}
            className={`dropdown-item ${genreFilters.includes(genre.genreId) ? 'bg-danger' : ''}`}
            onClick={() => {
              handleGenreSelection(genre.genreId);
              toggleGenreDropdown();
            }}
          >
            {genre.name}
          </button>
        ))}

        </div>
        </div>

        <div className={`dropdown ${isAgeDropdownOpen ? 'show' : ''}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="ageDropdownMenuButton"
          onClick={toggleAgeDropdown}
        >
          Age Ratings
        </button>
        <div className={`dropdown-menu ${isAgeDropdownOpen ? 'show' : ''}`} aria-labelledby="ageDropdownMenuButton">
          {AGE_RATINGS.map((rating) => (
            <button
              key={rating}
              className={`dropdown-item ${ageFilters.includes(rating) ? 'bg-danger' : ''}`}
              onClick={() => {
                handleAgeSelection(rating);
                toggleAgeDropdown();
              }}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>

      <div className={`dropdown ${isSortDropdownOpen ? "show" : ""}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="sortDropdownMenuButton"
          onClick={toggleSortDropdown}
        >
          Sort By
        </button>
        <div
          className={`dropdown-menu ${isSortDropdownOpen ? "show" : ""}`}
          aria-labelledby="sortDropdownMenuButton"
        >
          {SORT_BY.map((option) => (
            <button
              key={option}
              className={`dropdown-item ${sortOption === option ? "bg-danger" : ""}`}
              onClick={() => {
                handleSortSelection(option);
                toggleSortDropdown();
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
        
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
          <img src={`${API_URL}/films/${film.filmId}/image`} alt="Photo" />        
            <h3>{film.title}</h3>         
            <p>Director: {film.directorFirstName} {film.directorLastName}</p>
            <img src={`${API_URL}/users/${film.directorId}/image`} alt="Photo" width={40} onError={e => (e.target as HTMLImageElement).src = "https://avatar.vercel.sh/cookie"}/>
            <p>Release Date: {film.releaseDate}</p>
            <p>Genre: {genres.find((genre) => genre.genreId === film.genreId)?.name}</p>
            <p>Age Rating: {film.ageRating}</p>
            <p>User Ratings: {film.rating}</p>
            <Link to={`/films/${film.filmId}`}>More Info</Link>
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
      <a className="page-link" >{pageNumber + 1}|{maxPageNumber} <span className="sr-only"></span></a>
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
