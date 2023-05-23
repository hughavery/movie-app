import 'bootstrap/dist/js/bootstrap.bundle';
import React, { useState, useEffect } from 'react';
import { getGenres } from '../api/films/getGenres';
import { Genre } from '../types/genre';
import { AGE_RATINGS } from '../api/CONSTANTS';
import { PostFilms } from '../api/films/postFilms';

function CreateFilmModal() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAgeRating, setSelectedAgeRating] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error);
        // Handle error state or display an error message
        setErrorMessage('Failed to fetch genres');
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const filmData = {
      title: String(formData.get('title')),
      description: String(formData.get('description')),
      releaseDate: String(formData.get('releaseDate')),
      genre: selectedGenre,
      ageRating: selectedAgeRating,
      runtime: Number(formData.get('runtime')),
    };
  

    try {
      const response = await PostFilms(filmData);
      console.log('Film created:', response);
      // Add any success message or redirect to a different page after successful submission
    } catch (error) {
      console.error('Error creating film:', error);
      // Handle error state or display an error message
      setErrorMessage('Failed to create film');
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input name="title" className="form-control" placeholder="Provide a title" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows={3} placeholder="Provide a description"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <input name="releaseDate" type="date" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <select className="form-control" name="genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
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
                  <input name="runtime" className="form-control" placeholder="Runtime" type="number" max="300" />
                </div>  
                <button type="submit" className="btn btn-primary">
                  Publish Movie
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

export default CreateFilmModal;
