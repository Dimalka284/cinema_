import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Categorydrop from "../components/Categorydrop";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4 shadow-lg shadow-black/20" : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl md:text-3xl font-extrabold text-[#e50914] tracking-wide hover:text-[#ff1f2e] transition-colors"
        >
          CinemaX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/" className="text-sm lg:text-lg font-medium text-white/90 hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Categorydrop />
          <Link to="/community" className="text-sm lg:text-lg font-medium text-white/90 hover:text-white transition-colors relative group">
            Community
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about_us" className="text-sm lg:text-lg font-medium text-white/90 hover:text-white transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-[#e50914] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#141414] border-t border-white/10 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
          mobileMenuOpen ? "max-h-96 py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-8">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-white hover:translate-x-2 transition-all"
          >
            Home
          </Link>
          
          {/* We reuse Categorydrop but inside mobile context, or explicitly link it */}
          <Link 
            to="/category/action" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-[#e50914] hover:translate-x-2 transition-all"
          >
            Categories
          </Link>

          <Link 
            to="/community" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-white hover:translate-x-2 transition-all"
          >
            Community
          </Link>
          
          <Link 
            to="/about_us" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-white hover:translate-x-2 transition-all"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;