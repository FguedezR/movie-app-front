import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Info } from "lucide-react";

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setMovie(randomMovie);
    };
    fetchBanner();
  }, [fetchUrl]);

  if (!movie) return <div className="h-[70vh] bg-[#040714]" />;

  return (
    <header 
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative h-[80vh] cursor-pointer group overflow-hidden transition-all duration-500"
    >
      {/* Imagen con zoom suave al hacer hover en el header */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")` }}
      />
      
      {/* Degradados para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {movie?.title || movie?.name}
        </h1>
        <p className="text-lg text-gray-200 mb-8 line-clamp-3 drop-shadow-md italic">
          {movie?.overview}
        </p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-opacity-80 transition">
            <Play fill="black" /> Ver Ahora
          </button>
          <button className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/80 transition backdrop-blur-md">
            <Info /> Detalles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Banner;
