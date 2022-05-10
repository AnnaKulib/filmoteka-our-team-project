import axios from 'axios';
import { failure } from '../notification';
import { renderMovieDetails } from '../render-movie-details';
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `76293c6bcb8bbcc89a96d2b767d5c3a3`;

axios.defaults.baseURL = BASE_URL;

export const fetchPopularMovies = async page => {
  const response = await axios.get(
    `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&per_page=5`,
  );
  const popularMoviesData = response.data;
  return popularMoviesData;
};

export const fetchTrendingMovies = async time => {
  const response = await axios.get(`/trending/movie/${time}?api_key=${API_KEY}`);
  const trandingMoviesData = await response.data;
  return trandingMoviesData;
};

export const fetchMoviesSearchQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=${page}&language=en&query=${searchQuery}`,
  );
  const popularMoviesData = await response.data;
  if (popularMoviesData.results.length === 0) {
    throw new Error(failure());
    // throw new Error(`Not found ${searchQuery}`);
  }
  return popularMoviesData;
};

export const fetchMovieDetails = async id => {
  const response = await axios.get(`movie/${id}?api_key=${API_KEY}&language=en-US`);
  const movieDetails = await response.data;
  return movieDetails;
};

export const fetchMoviePoster = async id => {
  const response = await axios.get(`movie/${id}/images?api_key=${API_KEY}&language=en-US`);
  const moviePoster = await response.data;
  return moviePoster;
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = {};
    response.data.genres.forEach(({ id, name }) => {
      genres[id] = name;
    });

    return genres;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieTrailer = async id => {
  const response = await axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
  const videos = await response.data.results;
  const onlyTrailer = videos.filter(video => video.type === 'Trailer').pop();

  return onlyTrailer;
};
