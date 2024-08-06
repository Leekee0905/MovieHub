const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWQ2MTA2NWIwOWVhN2I1YTU0YTI4ZDNjZWVhNzJlNiIsIm5iZiI6MTcyMTYxNTQ4My4xNDU4MTgsInN1YiI6IjY2OWRhYWYwZmZlYzQxZWExMzRiY2JlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vN9DGB3FAge_69w5AMXHuyAOuyBNdRJzzoRQWyt0FUY";

const OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_KEY
  }
};

const fetchData = async (url) => {
  const response = await fetch(url, OPTION);
  return response.json();
};

const getLanguage = () => {
  const language = localStorage.getItem("language") || "en-US";
  console.log(`Current language: ${language}`);
  return language;
};

export const getTopRatedMoviesList = async (params) => {
  const language = getLanguage();
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${params}`;
  return fetchData(url);
};

export const getPlayingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US`;
  return fetchData(url);
};

export const getSearchData = async (keyword, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${keyword}&page=${page}`;
  return fetchData(url);
};

export const getUpcomeList = async () => {
  const language = getLanguage();
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=1`;
  return fetchData(url);
};

export const getRecommendationsMovieData = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
  return fetchData(url);
};

export const getMovieDetail = async (id) => {
  const language = getLanguage();
  const url = `https://api.themoviedb.org/3/movie/${id}?language=${language}`;
  return fetchData(url);
};

export const getMovieImages = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;
  return fetchData(url);
};
