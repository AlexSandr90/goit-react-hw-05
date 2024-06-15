import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies?.map(({ title, id }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
};
