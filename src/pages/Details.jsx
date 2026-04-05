import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movieApi";
import MovieCard from "../components/MovieCard"; // Extrae tu MovieCard a un componente separado para reutilizarlo

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("sugerencias");

  useEffect(() => {
    window.scrollTo(0, 0); // Volver arriba al cambiar de película
    getMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return <div className="pt-32 px-12 text-white">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#040714] text-white pb-20">
      {/* SECCIÓN HERO (FONDO) */}
      <div className="relative h-[80vh] w-full">
        <img
          src={movie.backdrop}
          className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/20 to-transparent z-10" />

        {/* INFO PRINCIPAL */}
        <div className="relative z-20 pt-52 px-12 md:px-20 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase italic">
            {movie.title}
          </h1>

          {/* METADATOS REQUERIDOS */}
          <div className="flex items-center gap-4 mb-6 text-sm font-bold text-gray-300">
            <span className="border border-gray-500 px-1.5 rounded uppercase text-[10px]">
              {movie.adult}
            </span>
            <span>{movie.year}</span>
            <span>{movie.runtime} min</span>
            <span className="text-blue-400">{movie.genres.join(" • ")}</span>
          </div>

          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-lg">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black px-8 py-3 rounded font-black hover:bg-opacity-80 transition flex items-center"
              >
                ▶ REPRODUCIR TRÁILER
              </a>
            )}
            <button className="bg-black/60 border border-white px-8 py-3 rounded font-black hover:bg-white hover:text-black transition">
              + MI LISTA
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE PESTAÑAS (TABS) */}
      <div className="px-12 md:px-20 mt-10">
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab("sugerencias")}
            className={`pb-4 px-6 font-bold tracking-[2px] text-xs transition-all ${activeTab === "sugerencias" ? "border-b-2 border-white text-white" : "text-gray-500"}`}
          >
            SUGERENCIAS
          </button>
          <button
            onClick={() => setActiveTab("detalles")}
            className={`pb-4 px-6 font-bold tracking-[2px] text-xs transition-all ${activeTab === "detalles" ? "border-b-2 border-white text-white" : "text-gray-500"}`}
          >
            DETALLES ADICIONALES
          </button>
        </div>

        {/* CONTENIDO DE LAS PESTAÑAS */}
        {activeTab === "sugerencias" ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 animate-fadeIn">
            {movie.recommendations?.map((rec) => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 max-w-2xl space-y-4">
            <p>
              <span className="text-white font-bold">Título original:</span>{" "}
              {movie.title}
            </p>
            <p>
              <span className="text-white font-bold">Géneros:</span>{" "}
              {movie.genres.join(", ")}
            </p>
            <p>
              <span className="text-white font-bold">Clasificación:</span>{" "}
              {movie.adult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
