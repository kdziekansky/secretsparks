
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Komponent ScrollToTop przewija stronę do góry przy każdej zmianie ścieżki.
 * Umieszczony wewnątrz Router w App.tsx.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Dodane logowanie dla debugowania
    console.log("ScrollToTop: scrolled to top for path:", pathname);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
