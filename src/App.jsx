import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes temporales (luego los moverás a src/pages/)
const Home = () => (
  <h1 className="text-white">🎬 Catálogo de Películas (Home)</h1>
);
const Login = () => <h1 className="text-white">🔐 Iniciar Sesión</h1>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Aquí podrías poner un <Navbar /> que sea común a todas las páginas */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
