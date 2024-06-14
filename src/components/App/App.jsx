import './App.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '../Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
import { fetchTrendingMovies } from '../../fetch';

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieId, setMovieId] = useState(0);
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
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage movies={trendingMovies} getMovieId={setMovieId} />
            }
          />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
