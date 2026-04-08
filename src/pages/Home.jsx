import Banner from "../components/Banner"; // El componente del trailer/poster principal
import MovieRow from "../components/MovieRow";
import requests from "../utils/requests";

const Home = () => {
  return (
    <div className="bg-[#040714] min-h-screen text-white pb-20">
      {/* 1. Banner Principal (Hero) */}
      <Banner fetchUrl={requests.fetchTrending} />

      {/* 2. Categorías por Marcas (Opcional, estilo Disney) */}
      {/* Aquí podrías poner los logos de Marvel, Pixar, Star Wars... */}

      {/* 3. Filas de Contenido */}
      <div className="flex flex-col gap-4 -mt-20 relative z-20">
        <MovieRow title="Novedades en Disney+" fetchUrl={requests.fetchDisneyPlus} />
        <MovieRow title="Saga Star Wars" fetchUrl={requests.fetchStarWars} />
        <MovieRow title="Universo Marvel" fetchUrl={requests.fetchMarvel} />
        <MovieRow title="Series Populares" fetchUrl={requests.fetchSeries} />
        <MovieRow title="Acción Adrenalina" fetchUrl={requests.fetchAction} />
        <MovieRow title="Dramas que Conmueven" fetchUrl={requests.fetchDrama} />
        <MovieRow title="Documentales Reales" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
};

export default Home;