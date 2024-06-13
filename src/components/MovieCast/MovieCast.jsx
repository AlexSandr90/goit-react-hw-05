import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../fetch';
import classes from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  console.log('MovieCast movieId', movieId);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentCast = await fetchMovieCast(movieId);
        console.log('currentCast: ', currentCast);
        setCast(currentCast.cast);
      } catch (error) {
        setError(true);
        console.log('error', error);
      }
    };

    if (movieId) {
      getData();
    }
  }, [movieId]);

  return (
    <div className={classes.movieCast}>
      {error && <p>Failed to fetch cast details.</p>}
      {cast && (
        <ul>
          {cast.map(({ id, name, character }) => (
            <li key={id}>
              <p>{name}</p>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
