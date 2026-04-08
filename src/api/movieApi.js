import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "http://localhost:5001/api",
});

export const getPopularMovies = async () => {
  const response = await api.get("/movies/popular");
  return response.data;
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/movies/search`, {
      params: { query: query }, // axios se encarga de ponerlo como ?query=batman
    });
    return response.data; // array de resultados
  } catch (error) {
    console.error("Error en searchMovies:", error);
    return [];
  }
};

// página detalles
export const getMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};
