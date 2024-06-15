import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../fetch';
import { Link } from 'react-router-dom';
import classes from './MovieDetailsPage.module.css';
import GoBack from '../../components/GoBack/GoBack';

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
    <>
      <GoBack />
      {error && <p>Failed to fetch movie details.</p>}
      {movie && (
        <div>
          <div className={classes.imgBlock}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
              alt={title}
            />
            <div>
              <h1>{title}</h1>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <ul className={classes.genresList}>
                {genres &&
                  genres.map(({ id, name }) => {
                    return <li key={id}>{name}</li>;
                  })}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <nav>
              <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </nav>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
