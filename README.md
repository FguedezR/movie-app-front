# 🎬 Movie App - Frontend (Disney+ Clone)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

¡Bienvenido al código fuente de la interfaz de usuario de **Movie App**! Una plataforma de streaming y gestión de películas inspirada en las principales plataformas del mercado. Este proyecto despliega una interfaz completamente responsiva e interactiva consumiendo datos cinematográficos y comunicándose de forma segura a través de una arquitectura Proxy orientada a microservicios.

👁️ **Demo en Vivo:** [https://movie-app-front-nu.vercel.app](https://movie-app-front-nu.vercel.app)

---

## 🌟 Características Principales

- **📱 Diseño 100% Responsivo:** Interfaz adaptable (Mobile-first) con scrolls horizontales táctiles (sin barras invasivas) permitiendo la mejor visualización de películas y series en cualquier dispositivo.
- **🔐 Autenticación Completa:** Inicio de sesión y Registro controlados por JWT con un Contexto global de Auth integrado en Vite.
- **🛡️ Proxy de TMDB Integrado:** Separación segura por Backend; toda la obtención de películas de TMDB pasa por una red anónima segura local que inyecta la API Key en el subnivel del servidor para evitar exposición de credenciales en el navegador público.
- **📝 Sistema de Reseñas y Moderación:** Visualiza, crea y administra reseñas de películas. Incorpora el panel **Admin Dashboard** para moderar la actividad de la comunidad, así como tu historial propio como usuario.
- **🔖 Mi Lista (Watchlist):** Funcionalidad para agregar y eliminar películas a un listado personalizado sincronizado en vivo con la base de datos de MongoDB.

---

## 🛠️ Tecnologías

- **Librería Core:** [React 18](https://react.dev/)
- **Empaquetador:** [Vite](https://vitejs.dev/) - Para una HMR (Hot Module Replacement) instantánea.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) - Uso de clases utilitarias altamente personalizables para un diseño ágil y atractivo.
- **Iconos:** [Lucide React](https://lucide.dev/) - Paquete de iconografía ultra ligera.
- **Enrutamiento:** React Router DOM V6.

---

## 🚦 Primeros Pasos (Local)

### Requisitos Previos
- Node.js versión `v18.x` o superior
- Tener configurado y activo el proyecto **movie-app-back** (Servidor Backend) en paralelo.

### Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   git clone <tu-repositorio> frontend
   cd frontend
   npm install
   ```

2. Configura las Variables de Entorno.
   Crea un archivo llamado `.env` en la raíz (a nivel del package.json) definiendo el puerto de tu Backend en local:
   ```env
   # Archivo .env
   VITE_API_URL=http://localhost:5001
   ```
   *(Nota: Puedes ver un ejemplo detallado en el archivo `.env.example` proporcionado en el proyecto).*

3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El proyecto estará corriendo y actualizándose en vivo en [http://localhost:5173](http://localhost:5173).

---

## 🚀 Despliegue en Producción

Este frontend está configurado y altamente optimizado para ser desplegado en **Vercel**. 

Pasos vitales para la puesta en producción:
1. Conecta tu repositorio de GitHub directamente a Vercel.
2. Dentro del panel de administración del proyecto (en Settings > Environment Variables), tienes que añadir:
   - `VITE_API_URL` -> *(La URL oficial pública de tu servidor de Render)* Ej: `https://movie-app-backend-u8pm.onrender.com`
3. ¡No necesitas añadir tu clave de TMDB de TheMovieDB! Todas las credenciales ahora viajan y se firman en la ruta proxy `/proxy/` del Backend, salvaguardándolas totalmente.
4. Reinicia tu Build (Redeploy) cada vez que modifiques las variables estáticas `VITE_`.

---

## 📂 Organización del Código Fuente

```text
src/
├── api/          # Middlewares funcionales de Axios e interacciones del backend
├── components/   # Elementos visuales reutilizables (Banner, MovieRow, Nav...)
├── context/      # Contextos Globales (Ej: AuthContext para la sesión JWT)
├── pages/        # Vistas completas de la aplicación (Home, Login, Watchlist...)
├── utils/        # Funciones auxiliares y direcciones pre-configuradas (API Proxy)
├── index.css     # Hoja de estilos principal e inyecciones de utilidades root y Tailwind
└── App.jsx       # Interconexionador de Rutas y Punto de entrada del Router
```

❤️ Proyecto desarrollado meticulosamente con énfasis en FullStack UX/UI.
