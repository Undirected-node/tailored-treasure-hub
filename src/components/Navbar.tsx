
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Shirt, Ruler, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Orders", path: "/orders", icon: <Shirt className="h-4 w-4 mr-2" /> },
    { name: "Measurements", path: "/measurements", icon: <Ruler className="h-4 w-4 mr-2" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4 mr-2" /> },
  ];
  
  return (
    <nav className="glass-morphism sticky top-0 z-50 w-full px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold">Tailor Hub</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-md flex items-center transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "hover:bg-secondary"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-morphism animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "p-3 rounded-md flex items-center",
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
