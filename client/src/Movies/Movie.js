import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
    console.log('current page id:', params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const pushEdit = () => {
    push(`/update-movie/${params.id}`);
  };

  const deleteMovie = () => {
    const result = window.confirm('Delete?');
    if (result) {
      axios
        .delete(`http://localhost:5000/api/movies/${params.id}`, params.id)
        .then((res) => {
          push('/');
          getMovieList();
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={pushEdit}>Edit</button>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
