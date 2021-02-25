import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const initialForm = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
  id: '',
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const [formValues, setFormValues] = useState(initialForm);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setFormValues({ ...formValues, id: id, stars: res.data.stars });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const changeHandler = (evt) => {
    let value = evt.target.value;
    if (evt.target.name === 'metascore') {
      value = parseInt(value, 10);
    } else if (evt.target.name === 'stars') {
      value = evt.target.value.split(',');
    }
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
    setError('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        push('/');
        props.getMovieList();
      })
      .catch((err) => {
        console.log('ERORR!', err.response);
        setError(err.response.data);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <div className="current-movie">
        <h2>Title: {movie.title}</h2>
        <h3>Director: {movie.director}</h3>
        <h4>Metascore: {movie.metascore}</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={changeHandler}
          placeholder="Set Movie Title"
        />
        <input
          type="text"
          name="director"
          value={formValues.director}
          onChange={changeHandler}
          placeholder="Set Director"
        />
        <input
          type="number"
          name="metascore"
          value={formValues.metascore}
          onChange={changeHandler}
          placeholder="Set Metascore"
        />
        <input
          name="stars"
          value={formValues.stars}
          type="text"
          onChange={changeHandler}
          placeholder="Cast"
        />
        <button>Update!</button>
      </form>
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default UpdateMovie;
