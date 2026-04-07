import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, LogOut, Calendar } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714] text-white">
        <p>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-32 px-8 flex justify-center">
      <div className="max-w-2xl w-full">
        {/* Encabezado de Perfil */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative group">
            <img
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
              }
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-2xl mb-4"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="text-xs font-bold">Cambiar</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{user.username}</h1>
          <p className="text-gray-400 text-sm mt-1">Miembro de Disney+ Clone</p>
        </div>

        {/* Tarjetas de Información */}
        <div className="grid gap-4">
          <div className="bg-[#131313] p-6 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 p-3 rounded-lg text-blue-500">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                  Username
                </p>
                <p className="text-lg">{user.username}</p>
              </div>
            </div>
            <ShieldCheck className="text-green-500 opacity-50" size={20} />
          </div>

          <div className="bg-[#131313] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
            <div className="bg-purple-600/20 p-3 rounded-lg text-purple-500">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                Email
              </p>
              <p className="text-lg">{user.email || "No disponible"}</p>
            </div>
          </div>

          {/* Botón Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="mt-8 flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white py-4 rounded-xl border border-red-600/20 transition-all font-bold uppercase text-xs tracking-[2px]"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
