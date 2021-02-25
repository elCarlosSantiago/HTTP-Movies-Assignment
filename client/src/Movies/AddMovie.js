import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
  id: '',
};

const AddMovie = ({ getMovieList }) => {
  const [movie, setMovie] = useState(initialMovie);
  const { push } = useHistory();

  const handleChange = (evt) => {
    let value = evt.target.value;
    if (evt.target.name === 'metascore') {
      value = parseInt(value, 10);
    } else if (evt.target.name === 'stars') {
      value = evt.target.value.split(',');
    }
    setMovie({
      ...movie,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        console.log(res);
        push('/');
        getMovieList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={movie.title}
          type="text"
          onChange={handleChange}
          placeholder="Movie Title"
        />
        <input
          name="director"
          value={movie.director}
          type="text"
          onChange={handleChange}
          placeholder="Director"
        />
        <input
          name="metascore"
          value={movie.metascore}
          type="number"
          onChange={handleChange}
          placeholder="Metascore"
        />
        <input
          name="stars"
          value={movie.stars}
          type="text"
          onChange={handleChange}
          placeholder="Cast"
        />
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
