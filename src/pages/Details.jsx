import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Star, Play, Plus, Info } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("sugerencias");
  const [reviews, setReviews] = useState([]);

  const API_KEY = "592645d02224a086ee675ff498e545ca";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  // Cargar Película y Reseñas
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar Película
        const movieRes = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`,
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        // Cargar Reseñas Aprobadas
        const reviewRes = await fetch(
          `http://localhost:5001/api/reviews/${id}`,
        );
        const reviewData = await reviewRes.json();
        setReviews(reviewData);

        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) return alert("Debes iniciar sesión");
    if (rating === 0 || !comment.trim())
      return alert("Completa todos los campos");

    try {
      const token = localStorage.getItem("disney_token");
      const res = await fetch("http://localhost:5001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: id,
          movieTitle: movie.title,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        alert("¡Gracias! Tu reseña ha sido enviada para moderación.");
        setComment("");
        setRating(0);
      } else {
        alert("Error al enviar la reseña");
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  };

  if (!movie)
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714] text-white">
        Cargando...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#040714] text-white overflow-x-hidden">
      {/* Fondo de pantalla */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-0 opacity-30">
        <img
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 pt-32 px-8 md:px-16 lg:px-24">
        {/* Cabecera */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition font-bold uppercase text-sm">
            <Play fill="black" size={20} /> Ver Ahora
          </button>
          <button className="p-3 rounded-full border-2 border-white bg-black/40 hover:bg-white/10 transition">
            <Plus size={24} />
          </button>
        </div>

        {/* Info Película */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-bold text-gray-400 mb-4 flex gap-2">
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
            <span>•</span>
            <span className="text-white">
              {movie.genres?.map((g) => g.name).join(", ")}
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-200 line-clamp-3 md:line-clamp-none italic">
            {movie.overview || "Sin sinopsis disponible."}
          </p>
        </div>

        {/* Pestañas */}
        <div className="mt-16 border-b border-gray-800 flex gap-8">
          {["sugerencias", "detalles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-[2px] uppercase relative transition-all ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h[2px] bg-white animate-in" />
              )}
            </button>
          ))}
        </div>

        {/* Contenido Pestañas */}
        <div className="py-10 min-h-50">
          {activeTab === "detalles" ? (
            <div className="animate-fadeIn max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-2">
                  Sinopsis
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-1">
                    Puntuación TMDB
                  </h3>
                  <p className="text-xl font-bold text-yellow-500">
                    {movie.vote_average?.toFixed(1)}{" "}
                    <span className="text-xs text-gray-500">/ 10</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-1">
                    Idioma Original
                  </h3>
                  <p className="text-sm uppercase">{movie.original_language}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              Cargando recomendaciones...
            </p>
          )}
        </div>

        {/* SECCIÓN RESEÑAS */}
        <div className="mt-10 max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Formulario */}
          <div className="bg-[#131313]/80 p-8 rounded-xl border border-gray-800 self-start">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={20} /> Deja tu opinión
            </h3>

            {user ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={24}
                      onClick={() => setRating(s)}
                      className={`cursor-pointer transition-all ${rating >= s ? "text-yellow-400 fill-yellow-400 scale-110" : "text-gray-600 hover:text-gray-400"}`}
                    />
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe aquí tu reseña..."
                  className="w-full bg-black/40 border border-gray-800 p-4 rounded-lg text-sm focus:border-blue-500 outline-none h-32 transition-colors"
                />
                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold text-xs tracking-widest transition-all uppercase"
                >
                  Enviar Reseña
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-4 italic">
                  Debes iniciar sesión para comentar.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-black px-6 py-2 rounded font-bold text-xs uppercase"
                >
                  Ir al Login
                </button>
              </div>
            )}
          </div>

          {/* Lista de Opiniones */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              Comentarios{" "}
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                {reviews.length}
              </span>
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {reviews.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 border border-dashed border-gray-800 rounded-xl">
                  <Info size={30} className="text-gray-700" />
                  <p className="text-gray-500 text-xs italic text-center px-4">
                    No hay reseñas aprobadas todavía. ¡Sé el primero!
                  </p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-[#1a1a1a]/40 p-5 rounded-xl border border-gray-800 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            rev.userId?.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.userId?.username}`
                          }
                          className="w-8 h-8 rounded-full border border-gray-700"
                          alt="user"
                        />
                        <span className="font-bold text-[13px] text-blue-400 tracking-wide">
                          {rev.userId?.username || "Usuario"}
                        </span>
                      </div>
                      <div className="flex text-yellow-500 text-[10px] gap-0.5">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                    </div>
                    <p className="text-gray-300 text-[13px] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
