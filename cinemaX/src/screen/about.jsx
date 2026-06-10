import { Link } from "react-router-dom";
import { ArrowLeft, Search, Info, Star, List, Database, ExternalLink, AlertCircle } from "lucide-react";

function About() {
  return (
    
        <div className="min-h-screen bg-[#0a0a0a] text-white px-8 md:px-16 py-16">
      {/* Hero */}
      <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/25 text-[#e50914] mb-5">
        About us
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4 max-w-xl">
        Your universe of movies, all in one place.
      </h1>
      <p className="text-white/50 text-base leading-relaxed max-w-lg mb-14">
        A modern movie browsing experience built for film lovers. Discover titles, explore cast details,
        check ratings, and find where to watch — all without the clutter.
      </p>

      {/* Features */}
      <p className="text-xs uppercase tracking-widest text-white/30 mb-4">What you can do</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[
          { icon: <Search size={20} />, title: "Browse & search", desc: "Find movies by title, genre, or keyword instantly." },
          { icon: <Info size={20} />, title: "Detailed info", desc: "Plot, cast, director, runtime and ratings." },
          { icon: <Star size={20} />, title: "Ratings at a glance", desc: "IMDb, Rotten Tomatoes & Metacritic together." },
          { icon: <List size={20} />, title: "Curated rows", desc: "Hand-picked categories from action to animation." },
        ].map(f => (
          <div key={f.title} className="bg-white/4 border border-white/8 rounded-xl p-4">
            <div className="text-white/40 mb-3">{f.icon}</div>
            <p className="text-sm font-medium mb-1">{f.title}</p>
            <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <hr className="border-white/8 mb-10" />

      {/* Tech stack */}
      <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Built with</p>
      <div className="flex flex-wrap gap-2 mb-10">
        {["React", "Tailwind CSS", "MongoDB", "Node.js", "Express"].map(t => (
          <span key={t} className="text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
            {t}
          </span>
        ))}
      </div>

      {/* Data source */}
      <p className="text-xs uppercase tracking-widest text-white/30 mb-3">Data source</p>
      
       <a href="https://www.themoviedb.org/"
        target="_blank"
        className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/4 border border-white/8 px-4 py-2.5 rounded-lg hover:text-white transition-colors mb-10"
      >
        <Database size={14} />
        Movie data powered by TMDB API
        <ExternalLink size={12} />
      </a>

      <hr className="border-white/8 mb-10" />

      {/* Developer */}
      <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Made by</p>
      <div className="flex items-center gap-4 bg-white/4 border border-white/8 rounded-xl p-5 max-w-md mb-10">
        <div className="w-12 h-12 rounded-full bg-[#e50914]/15 border border-[#e50914]/30 flex items-center justify-center text-[#e50914] font-medium text-base flex-shrink-0">
          DF
        </div>
        <div>
          <p className="text-sm font-medium mb-0.5">Dimalka Fernando</p>
          <p className="text-xs text-white/40 mb-3">Full-stack developer · Sri Lanka</p>
          <div className="flex gap-2">
            {[
              { label: "GitHub", href: "https://github.com/Dimalka284" },
              { label: "LinkedIn", href: "#" },
              { label: "Contact", href: "dimalkafernando33@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank"
                className="text-xs px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-white/60 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 bg-white/3 border border-white/7 rounded-xl p-4 max-w-2xl">
        <AlertCircle size={16} className="text-white/30 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/35 leading-relaxed">
          This site is for browsing and discovery purposes only. We do not host, stream, or distribute
          any movies or copyrighted content. All movie data is provided by the OMDb API.
          All rights belong to their respective owners.
        </p>
      </div>

    </div>
  );
}

export default About;