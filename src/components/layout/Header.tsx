import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#05050a]/80 backdrop-blur">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" 
            alt="Secret Sparks Logo" 
            className="h-10 sm:h-14"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link to="/o-nas" className="nav-link">
            O nas
          </Link>
          <Link to="/zasady" className="nav-link">
            Zasady
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <Link to="/bezpieczenstwo" className="nav-link">
            Bezpieczeństwo
          </Link>
          <Link to="/secretai" className="nav-link">
            Secret AI
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-foreground p-2"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        <div className="hidden md:block">
          <Link to="/survey">
            <Button className="btn-primary text-sm">
              Zamów raport
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pb-6 border-t border-border/40 bg-[#05050a]">
          <nav className="flex flex-col space-y-4">
            <Link to="/o-nas" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              O nas
            </Link>
            <Link to="/zasady" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Zasady
            </Link>
            <Link to="/faq" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            <Link to="/bezpieczenstwo" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Bezpieczeństwo
            </Link>
            <Link to="/secretai" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Secret AI
            </Link>
            <Link to="/regulamin" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Regulamin
            </Link>
            <Link to="/survey" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full rounded-full bg-primary hover:bg-primary/80 mt-2 text-sm">
                Zamów raport
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
