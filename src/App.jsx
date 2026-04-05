import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from './pages/Search';
import Home from './pages/Home';
import Details from "./pages/Details";

const Login = () => <h1 className="text-white p-24">Iniciar Sesión</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      {/* El div envuelve las rutas para dar el fondo oscuro global */}
      <div className="min-h-screen bg-[#040714] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<Details />} />
          
          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<h2 className="p-24">404 - Página no encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;