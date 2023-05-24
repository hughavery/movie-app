import React, { useEffect, useState } from 'react';
import { Film } from '../types/film';
import 'bootstrap/dist/js/bootstrap.bundle';
import { getFilm } from '../api/films/getFilms';
import { getGenres } from '../api/films/getGenres';
import { Genre } from '../types/genre';
import { AGE_RATINGS } from '../api/CONSTANTS';

interface EditFilmModalProps {
  filmId: number;
}

function EditFilmModal({ filmId }: EditFilmModalProps) {
  const [film, setFilm] = useState<Film | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedAgeRating, setSelectedAgeRating] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function fetchFilm() {
      try {
        const numberFilmId = String(filmId);
        const fetchedFilm = await getFilm(numberFilmId);
        setFilm(fetchedFilm);
        setSelectedGenre(fetchedFilm.genreId);
      } catch (error) {
        setErrorMessage('Failed to fetch film details');
      }
    }

    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        setErrorMessage('Failed to fetch genres');
      }
    };

    fetchFilm();
    fetchGenres();

    if (film && film.ageRating) {
        setSelectedAgeRating(film.ageRating);
    } else {
    setSelectedAgeRating(''); // Set to empty string to select "Select an age rating"
    }

  }, [filmId]);

  if (!film) {
    // Render loading state or return null if you prefer
    return <div>Loading film...</div>;
  }

  function formatDateForInput(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  }
  console.log(film.releaseDate)
  console.log(formatDateForInput(film.releaseDate))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const imageFile = (e.target as HTMLFormElement).image.files[0];
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filmData = {
      title: String(formData.get('title')),
      description: String(formData.get('description')),
      releaseDate: formData.get('releaseDate') ? String(formData.get('releaseDate')).replace("T", " ") + ":00" : undefined,
      genreId: Number(selectedGenre),
      ageRating: selectedAgeRating ? selectedAgeRating : undefined,
      runtime: formData.get('runtime') ? Number(formData.get('runtime')) : undefined,
    };

    // try {
    //     const filmId = await PostFilms(filmData);
    //       putFilmImage(filmId, imageFile)
    //       cancelRef.current?.click()
  
    //   } catch (error: any) {
    //       setErrorMessage(error.message || 'Failed to register user');
    //       if (error.message === 'No genre with id') {
    //         setErrorMessage('Please select a genre')
    //       }

  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editFilmModal-${film.filmId}`}
      >
        Edit Film
      </button>
      <div
        className="modal fade"
        id={`editFilmModal-${film.filmId}`}
        tabIndex={-1}
        aria-labelledby={`editFilmModalLabel-${film.filmId}`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editFilmModalLabel-${film.filmId}`}>
                Edit Film
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Profile Image
                  </label>
                  <input type="file" className="form-control" id="image" accept=".jpg, .jpeg, .png, .gif" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input name="title" className="form-control" placeholder="Provide a title" defaultValue={film.title} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    placeholder="Provide a description"
                    defaultValue={film.description}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <input name="releaseDate" type="datetime-local" className="form-control" defaultValue={formatDateForInput(film.releaseDate)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <select
                    className="form-control"
                    name="genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.genreId} value={genre.genreId}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Age Rating</label>
                  <select className="form-control" name="ageRating" value={selectedAgeRating} onChange={(e) => setSelectedAgeRating(e.target.value)}>
                    <option value="">Select an age rating</option>
                    {AGE_RATINGS.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Runtime (minutes)</label>
                  <input name="runtime" className="form-control" placeholder="Add a Runtime" defaultValue={film.runtime} type="number" max="300" />
                </div> 
                <button type="submit" className="btn btn-primary">
                  Edit Movie
                </button>     
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFilmModal;
