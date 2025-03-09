
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-panel p-8 max-w-xl w-full text-center animate-scale-in">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Ta strona nie istnieje
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-full transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Powrót do strony głównej</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
