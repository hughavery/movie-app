
import 'bootstrap/dist/js/bootstrap.bundle';
import React, { useState, useEffect } from 'react';
import { getGenres } from '../api/films/getGenres';
import { Genre } from '../types/genre';
import { AGE_RATINGS } from '../api/CONSTANTS';

function CreateFilmModal() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAgeRating, setSelectedAgeRating] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        New Film
      </button>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Film</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" placeholder="Provide a title" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} placeholder="Provide a description"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <select className="form-control" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.genreId} value={genre.name}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Age Rating</label>
                  <select className="form-control" value={selectedAgeRating} onChange={(e) => setSelectedAgeRating(e.target.value)}>
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
                  <input className="form-control" placeholder="Runtime" type="number" max="300" />
                </div>         
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Publish Movie
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFilmModal;
