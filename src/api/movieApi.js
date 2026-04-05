import axios from "axios";

const api = axios.create({
  baseURL: "http//localhost/5001/api",
});

export const getPopularMovies = async () => {
  const reponse = await api.get("/movies/popular");
  return reponse.data;
};

