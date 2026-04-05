import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/movieApi";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error cargando pelis", error);
      }
    };
    loadMovies();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#141414",
        minHeight: "100-vh",
        color: "white",
      }}
    >
      <h1>Populares en MovieApp</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #333",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <p style={{ padding: "10px", textAlign: "center" }}>
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
