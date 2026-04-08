import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LogOut,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const token = localStorage.getItem("disney_token");
        const res = await fetch("http://localhost:5001/api/reviews/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setMyReviews(data);
      } catch (err) {
        console.error("Error cargando mis reseñas:", err);
      }
    };

    if (user) fetchMyReviews();
  }, [user]);

  if (!user) return <div className="h-screen bg-[#040714]" />;

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-24 pb-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* COLUMNA IZQUIERDA: INFO USUARIO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#131313] p-8 rounded-2xl border border-gray-800 flex flex-col items-center shadow-2xl">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 bg-[#1a1a1a]"
              alt="Avatar"
            />
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white py-3 rounded-xl transition-all font-bold text-xs tracking-widest uppercase"
            >
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: MIS RESEÑAS */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <MessageSquare className="text-blue-500" /> Mis Actividad (
            {myReviews.length})
          </h3>

          <div className="grid gap-4">
            {myReviews.length === 0 ? (
              <div className="bg-[#131313] p-10 rounded-2xl border border-dashed border-gray-800 text-center">
                <p className="text-gray-500">
                  Aún no has escrito ninguna reseña.
                </p>
              </div>
            ) : (
              myReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-[#131313] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-blue-400">
                        {rev.movieTitle}
                      </h4>
                      <div className="flex text-yellow-500 text-xs mt-1">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                    </div>

                    {/* Badge de Estado */}
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        rev.status === "approved"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {rev.status === "approved" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {rev.status === "approved" ? "Aprobada" : "Pendiente"}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "{rev.comment}"
                  </p>
                  <p className="text-[10px] text-gray-600 mt-4 uppercase">
                    Publicado el: {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;