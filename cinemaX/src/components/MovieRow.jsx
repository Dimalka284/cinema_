import { useState, useEffect } from "react";
import { Play, Star } from "lucide-react";
import { Link } from "react-router-dom";

function MovieRow({ title, searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=70243319`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          const validMovies = data.Search.filter(m => m.Poster !== "N/A");
          setMovies(validMovies);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) return (
    <div className="px-4 md:px-16 py-8 animate-pulse">
      <div className="h-8 w-48 bg-white/10 rounded-md mb-6"></div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[140px] md:w-[200px] lg:w-[240px] shrink-0 aspect-[2/3] bg-white/5 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
  if (movies.length === 0) return null;

  return (
    <div className="px-4 md:px-16 py-6 md:py-8 group/row">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="w-1.5 h-6 md:h-8 bg-gradient-to-b from-[#e50914] to-[#ff4b4b] rounded-full inline-block"></span>
          {title}
        </h2>
        <button className="text-sm font-medium text-white/50 hover:text-white transition-colors opacity-0 group-hover/row:opacity-100 hidden md:block">
          Explore All
        </button>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {movies.map((movie) => (
          <Link to={`/movies/${movie.Title}`} key={movie.imdbID} className="shrink-0 snap-start">
            <div 
              className="relative w-[140px] md:w-[200px] lg:w-[240px] aspect-[2/3] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(229,9,20,0.15)] hover:z-20 border border-white/5 hover:border-white/20"
            >
              {/* Poster Image */}
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Permanent subtle gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>

              {/* Hover Overlay Container (Glassmorphism) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-5 backdrop-blur-[2px]">
                
                {/* Play Button - Scales in */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 delay-75">
                  <button className="bg-white/20 hover:bg-[#e50914] backdrop-blur-md text-white rounded-full p-4 md:p-5 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                </div>

                {/* Movie Info - Slides up */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1.5 drop-shadow-md">
                    {movie.Title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
                    <span className="text-[#4ade80]">{movie.Year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    <span className="text-white/70 uppercase tracking-wider text-[10px] md:text-xs bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {movie.Type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
