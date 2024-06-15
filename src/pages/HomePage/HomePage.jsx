import classes from './HomePage.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = ({ movies, getMovieId }) => {
  const handleMovieId = (id) => {
    getMovieId(id);
  };

  return (
    <div >
      <h1>Trending today</h1>
      <ul>
        {movies.map(({ title, id }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} onClick={() => handleMovieId(id)}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;

HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
  getMovieId: PropTypes.func.isRequired,
};
