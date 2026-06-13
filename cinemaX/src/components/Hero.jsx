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
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading Movies...
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentMovie.image_url})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-12">
        <div className="max-w-3xl text-white">
          <div className="flex gap-4 items-center mb-4 text-lg">
            <span>{currentMovie.release_year}</span>

            <span>•</span>

            <span>{currentMovie.category}</span>

            <span>•</span>

            <div className="flex items-center gap-2 text-yellow-400">
              <Star size={18} fill="currentColor" />
              {currentMovie.rating}
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-4">
            {currentMovie.name}
          </h1>

          <p className="text-xl italic text-gray-300 mb-8">
            "{currentMovie.quote}"
          </p>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold">
              <Play size={18} fill="white" />
              Watch Now
            </button>

            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold">
              <Info size={18} />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-12 flex gap-3 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-10 rounded-full ${
              index === currentIndex
                ? "bg-red-600"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;