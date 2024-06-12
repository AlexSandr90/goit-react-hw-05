import './App.css';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import { fetchTrendingMovies } from '../../fetch';

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieId, setMovieId] = useState(0)
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies.results);

      } catch (error) {
        setError(true);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage movies={trendingMovies} getMovieId={setMovieId} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
