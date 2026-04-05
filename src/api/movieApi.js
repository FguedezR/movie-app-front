import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const getPopularMovies = async () => {
  const response = await api.get("/movies/popular");
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await api.get(`/movies/search?query=${query}`);
  return response.data;
};

// página detalles
export const getMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};
