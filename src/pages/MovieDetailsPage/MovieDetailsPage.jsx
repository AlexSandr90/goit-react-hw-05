import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../fetch';
import { Link } from 'react-router-dom';
import classes from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  console.log('movieId', movieId);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentMovie = await fetchMovieById(movieId);
        console.log('currentMovie: ', currentMovie);
        setMovie(currentMovie);
      } catch (error) {
        setError(true);
      }
    };

    if (movieId) {
      getData();
    }
  }, [movieId]);

  const { backdrop_path, title, overview, genres } = movie;

  return (
    <div>
      {error && <p>Failed to fetch movie details.</p>}
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt={title}
          />
          <h1>{title}</h1>
          {/* <p>User Score: {} %</p> */}
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul>
            {genres &&
              genres.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
          </ul>
          <p>Additional information</p>
          <nav>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
