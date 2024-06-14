import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org';
const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTAxYTY0Yjc0ZTU3NDQ2MjhkNzBlOTU4MTE1NjRjYiIsInN1YiI6IjY2NjIzMmNkNDI0NTU0YTFjODlmODM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.heO_-shIZ4PzL8QE-apBRsZ8sprThubyMQreHgUDW_0';

export const fetchMoviesByQuery = async (query = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/3/search/movie`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}//3/trending/movie/day?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieById = async (id = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCast = async (id = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/3/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('fetchMovieCast error', error);
  }
};

export const fetchMovieReviews = async (id = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/3/movie/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('fetchMovieCast error', error);
  }
};
