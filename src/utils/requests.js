const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const PROXY = `${API_URL}/api/movies/proxy`;

const requests = {
  fetchTrending: `${PROXY}/trending/all/week`,
  fetchDisneyPlus: `${PROXY}/discover/movie?with_networks=2739`,
  fetchAction: `${PROXY}/discover/movie?with_genres=28`,
  fetchDrama: `${PROXY}/discover/movie?with_genres=18`,
  fetchDocumentaries: `${PROXY}/discover/movie?with_genres=99`,
  fetchStarWars: `${PROXY}/discover/movie?with_keywords=161166|208535`,
  fetchMarvel: `${PROXY}/discover/movie?with_companies=420`,
  fetchSeries: `${PROXY}/tv/popular`,
};

export default requests;
