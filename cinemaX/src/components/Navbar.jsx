import { Link } from "react-router-dom"
import Categorydrop from "../components/Categorydrop"

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-16 py-6 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
      <Link to="/" className="text-3xl font-extrabold text-[#e50914] tracking-wide hover:text-[#e50914]">CinemaX</Link>
      <div className="flex gap-10 items-center">
        <Link to="/" className="text-lg font-medium text-white hover:text-[#e50914] transition-colors relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Categorydrop />
        <Link to="/community" className="text-lg font-medium text-white hover:text-[#e50914] transition-colors relative group">
          Community
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/about_us" className="text-lg font-medium text-white hover:text-[#e50914] transition-colors relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;