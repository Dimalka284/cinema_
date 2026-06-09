import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Plus, Share2, ArrowLeft, Star } from "lucide-react";

function MoviesDetails() {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=70243319&plot=full`)
      .then(res => res.json())
      .then(data => { setMovie(data); setLoading(false); });
  }, [title]);

  if (loading) return (
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white/40 text-lg animate-pulse">Loading...</p>
    </div>
  );

  if (!movie || movie.Response === "False") return (
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white/40 text-lg">Movie not found</p>
    </div>
  );

  const poster = movie.Poster !== "N/A" ? movie.Poster.replace("SX300", "SX1000") : "";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="relative h-[90vh] w-full overflow-hidden">

        {poster && (
          <img
            src={poster}
            alt={movie.Title}
            className="absolute inset-0 w-[100%] h-full object-cover object-top"
          />
        )}

        {/* Left-to-right dark overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/10" />
        {/* Bottom fade into page bg */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <Link
          to="/"
          className="absolute top-16 left-6 z-10 flex items-center gap-2 text-white/70 hover:text-white text-sm bg-black/40 px-4 py-2 rounded-full border border-white/15 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* Content sitting on top of image */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 max-w-2xl">

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.Genre?.split(",").map(g => (
              <span key={g} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">
                {g.trim()}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-4">
            {movie.Title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-white/50 mb-6 flex-wrap">
            <span>{movie.Year}</span>
            <span>·</span>
            <span>{movie.Runtime}</span>
            <span>·</span>
            <span>{movie.Rated}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#f5c518] font-medium text-base">
              <Star size={15} fill="#f5c518" /> {movie.imdbRating}
            </span>
          </div>

          {/* Plot */}
          <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
            {movie.Plot}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-[#e50914] hover:bg-[#c40812] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 border-none cursor-pointer">
              <Play size={18} fill="white" /> Watch trailer
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium border border-white/15 transition-all hover:scale-105 cursor-pointer">
              <Plus size={18} /> Add to list
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 transition-all hover:scale-105 cursor-pointer">
              <Share2 size={18} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Info Section below hero ── */}
      <div className="px-8 md:px-14 py-10 max-w-4xl space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Director", value: movie.Director },
            { label: "Released", value: movie.Released },
            { label: "Box office", value: movie.BoxOffice || "N/A" },
            { label: "Language", value: movie.Language?.split(",")[0] },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-4">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-sm font-medium">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Cast */}
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Cast</p>
          <div className="flex flex-wrap gap-2">
            {movie.Actors?.split(",").map(a => (
              <span key={a} className="text-sm bg-white/7 border border-white/10 px-4 py-2 rounded-xl text-white/80 hover:bg-white/15 transition-colors cursor-pointer">
                {a.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Ratings */}
        {movie.Ratings?.length > 0 && (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Ratings</p>
            <div className="flex flex-col gap-2">
              {movie.Ratings.map(r => (
                <div key={r.Source} className="flex justify-between items-center bg-white/4 border border-white/7 rounded-xl px-5 py-3">
                  <span className="text-sm text-white/50">{r.Source}</span>
                  <span className="text-sm font-medium">{r.Value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default MoviesDetails;