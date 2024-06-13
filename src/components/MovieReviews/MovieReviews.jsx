import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../fetch';
import classes from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentReviews = await fetchMovieReviews(movieId);
        console.log('currentCast: ', currentReviews);
        setReviews(currentReviews.results);
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
    <div>
      {error && <p>Failed to fetch cast details.</p>}
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
