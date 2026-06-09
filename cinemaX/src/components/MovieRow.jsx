import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

function MovieRow({ title, searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=70243319`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          // Filter out movies without posters
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

  if (loading) return <div className="px-16 py-8 text-white">Loading {title}...</div>;
  if (movies.length === 0) return null;

  return (
    <div className="px-16 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#e50914] pl-3">
        {title}
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {movies.map((movie) => (
          <Link to={`/movies/${movie.Title}`}>
          <div 
            key={movie.imdbID} 
            className="relative min-w-[200px] h-[300px] rounded-lg overflow-hidden cursor-pointer group snap-start transition-transform duration-300 hover:scale-105 hover:z-10"
          >
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <button className="bg-[#e50914] text-white rounded-full p-3 mb-3 w-fit hover:scale-110 transition-transform">
                <Play size={16} fill="white" />
              </button>
              <h3 className="text-white font-semibold text-sm truncate">{movie.Title}</h3>
              <p className="text-gray-400 text-xs mt-1">{movie.Year} • {movie.Type}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
