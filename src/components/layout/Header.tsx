
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#05050a]/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" 
            alt="Secret Sparks Logo" 
            className="h-14"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="nav-link">
            O nas
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link flex items-center">
              Więcej <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/survey" className="w-full">Ankieta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/blog" className="w-full">Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Button className="btn-primary">
              Rozpocznij Grę
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pb-6 border-t border-border/40 bg-[#05050a]">
          <nav className="flex flex-col space-y-4">
            <Link to="/about" className="nav-link-mobile">
              O nas
            </Link>
            <Link to="/faq" className="nav-link-mobile">
              FAQ
            </Link>
            <Link to="/survey" className="nav-link-mobile">
              Ankieta
            </Link>
            <Link to="/blog" className="nav-link-mobile">
              Blog
            </Link>
            <Link to="/survey">
              <Button className="w-full rounded-full bg-primary hover:bg-primary/80 mt-2">
                Rozpocznij Grę
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
