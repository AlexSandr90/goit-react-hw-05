import { useState } from 'react';
import classes from './MoviesPage.module.css';
import { fetchMoviesByQuery } from '../../fetch';
import GoBack from '../../components/GoBack/GoBack';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedSearchValue = searchValue.trim();
    console.log('searchParams: ', searchParams);
    if (trimmedSearchValue === '') {
      setMovies([]);
      return;
    }
    try {
      const datas = await fetchMoviesByQuery(trimmedSearchValue);
      setMovies(datas.results);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setMovies([]);
    } finally {
      setSearchValue('');
    }
  };

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

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
