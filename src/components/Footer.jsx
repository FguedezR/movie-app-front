const Footer = () => (
  <footer className="bg-[#040714] py-10 flex flex-col items-center border-t border-gray-800 mt-auto">
    <span className="text-2xl md:text-3xl font-black tracking-tighter italic mb-1.5">
      <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-white bg-clip-text text-transparent">
        Film
      </span>
      <span className="text-white">Point</span>
    </span>
    <div className="flex flex-wrap justify-center gap-6 text-[11px] text-gray-400 font-medium mb-4 px-6 text-center uppercase tracking-widest">
      <span>Política de privacidad</span>
      <span>Acuerdo de suscripción</span>
      <span>Ayuda</span>
      <span>Dispositivos compatibles</span>
    </div>
    <p className="text-[10px] text-gray-500">
      © Fernando Guedez. Todos los derechos reservados.
    </p>
  </footer>
);

export default Footer;
