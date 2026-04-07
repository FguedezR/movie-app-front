const Footer = () => (
  <footer className="bg-[#040714] py-10 flex flex-col items-center border-t border-gray-800 mt-auto">
    <img src="/logo.svg" className="w-20 mb-6 opacity-80" alt="Logo" />
    <div className="flex flex-wrap justify-center gap-6 text-[11px] text-gray-400 font-medium mb-4 px-6 text-center uppercase tracking-widest">
      <span>Política de privacidad</span>
      <span>Acuerdo de suscripción</span>
      <span>Ayuda</span>
      <span>Dispositivos compatibles</span>
    </div>
    <p className="text-[10px] text-gray-500">© Fernando Guedez. Todos los derechos reservados.</p>
  </footer>
);

export default Footer;