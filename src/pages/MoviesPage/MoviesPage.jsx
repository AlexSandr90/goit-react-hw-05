import { useState } from 'react';
import classes from './MoviesPage.module.css';
import { Link } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../fetch';
import GoBack from '../../components/GoBack/GoBack';

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue === '') {
      setMovies([]);
      return;
    }
    try {
      const datas = await fetchMoviesByQuery(trimmedSearchValue);
      console.log('datas: ', datas.results);
      setMovies(datas.results);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setMovies([]);
    } finally {
      setSearchValue('');
    }
  };

 

  console.log('movies: ', movies);

  return (
    <div className={classes.moviePage}>
      <GoBack />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies && movies.length > 0 ? (
          movies.map(({ title, id }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
};

export default MoviesPage;
