import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard"; // 1. IMPORTAR AQUÍ

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      setLoading(true);
      searchMovies(debouncedQuery).then((data) => {
        setResults(data);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="pt-28 px-12 min-h-screen bg-[#040714] text-white">
      {loading && (
        <div className="text-blue-400 animate-pulse mb-4">Buscando...</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // 2. USAR AQUÍ
        ))}
      </div>
    </div>
  );
};

export default Search;
