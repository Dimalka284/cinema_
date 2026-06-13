import { useState, useEffect } from "react";
import { Play, Info, Star } from "lucide-react";

function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch movies from FastAPI
  useEffect(() => {
    fetch("https://cinemax-backend-284.fly.dev/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  // Auto change movie every 5 seconds
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // Loading screen
  if (movies.length === 0) {
    return (
      <div className="h-[80vh] md:h-screen flex items-center justify-center bg-[#0f1014] text-white/50 text-xl md:text-2xl animate-pulse">
        Loading Featured...
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[85vh] md:h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        key={currentIndex}
        className="absolute inset-0 bg-cover bg-top md:bg-center transition-all duration-1000 scale-105 animate-ken-burns"
        style={{
          backgroundImage: `url(${currentMovie.image_url})`,
        }}
      />

      {/* Dark Overlays for text readability and blending into the page below */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014]/90 via-[#0f1014]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center px-6 md:px-16 pb-24 md:pb-0">
        <div className="max-w-3xl text-white w-full animate-fade-in-up">
          <div className="flex flex-wrap gap-2 md:gap-4 items-center mb-3 md:mb-4 text-xs md:text-lg font-medium text-white/80">
            <span className="bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">{currentMovie.release_year}</span>

            <span className="hidden md:inline">•</span>

            <span className="bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">{currentMovie.category}</span>

            <span className="hidden md:inline">•</span>

            <div className="flex items-center gap-1.5 text-yellow-400 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
              <Star size={14} fill="currentColor" className="md:w-4 md:h-4" />
              {currentMovie.rating}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-4 tracking-tight drop-shadow-lg leading-tight">
            {currentMovie.name}
          </h1>

          <p className="text-sm md:text-xl italic text-gray-300 mb-6 md:mb-8 line-clamp-2 md:line-clamp-none max-w-2xl drop-shadow-md border-l-2 border-[#e50914] pl-3">
            "{currentMovie.quote}"
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="flex items-center justify-center gap-2 bg-[#e50914] hover:bg-[#ff1f2e] transition-colors px-6 py-3 md:py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] w-full sm:w-auto text-sm md:text-base">
              <Play size={20} fill="white" />
              Watch Now
            </button>

            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors px-6 py-3 md:py-4 rounded-xl font-bold border border-white/10 w-full sm:w-auto text-sm md:text-base">
              <Info size={20} />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-16 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-[#e50914] w-8 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                : "bg-white/30 w-2 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;