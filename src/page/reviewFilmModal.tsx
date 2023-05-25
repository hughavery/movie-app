import React, { useEffect, useState } from 'react';
import { Film } from '../types/film';
import 'bootstrap/dist/js/bootstrap.bundle';
import { getFilm } from '../api/films/getFilms';
import { PostReview } from '../api/review/postReview';

interface EditFilmModalProps {
  filmId: number;
}

function EditFilmModal({ filmId }: EditFilmModalProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [film, setFilm] = useState<Film | null>(null);
  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchFilm() {
      try {
        const numberFilmId = String(filmId);
        const fetchedFilm = await getFilm(numberFilmId);
        setFilm(fetchedFilm);
      } catch (error) {
        setErrorMessage('Failed to fetch film details');
      }
    }
    fetchFilm();
  }, [filmId, errorMessage]);

  if (!film) {
    return null; // Return null or a loading indicator while film is being fetched
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await PostReview({ rating: Number(rating), review: description || undefined }, filmId);
      
      // Reset form fields
      setRating('5');
      setDescription('');
      setErrorMessage("")
      window.location.reload();
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to register user');
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target={`#reviewFilmModal-${film.filmId}`}
      >
        Review Film
      </button>
      <div
        className="modal fade"
        id={`reviewFilmModal-${film.filmId}`}
        tabIndex={-1}
        aria-labelledby={`reviewFilmModalLabel-${film.filmId}`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`reviewFilmModalLabel-${film.filmId}`}>
                Review Film
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    name="rating"
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Review</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    placeholder="Provide a Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                  Submit Review
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
