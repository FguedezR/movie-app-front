const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=es-ES`,
  fetchDisneyPlus: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=2739`,
  fetchAction: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchDrama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchStarWars: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=161166|208535&language=es-ES`,
  fetchMarvel: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=420&language=es-ES`,
  fetchSeries: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`,
};

export default requests;
