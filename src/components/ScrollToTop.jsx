import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // fuerza el scroll al inicio cada vez que cambie la ruta
  }, [pathname]);

  return null;
}
