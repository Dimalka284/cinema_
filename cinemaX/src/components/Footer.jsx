import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/7 px-8 md:px-16 pt-12 pb-7">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center text-sm">
              🎬
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-red-700">CinemaX</h1>
          </div>
          <p className="text-xs text-white/40 leading-relaxed mb-4 max-w-[200px]">
            Discover movies, explore cast details, and check ratings — all in one place.
          </p>
          <div className="flex gap-2">
            {[
              { label: "GitHub", href: "https://github.com/yourusername", icon: "🐙" },
              { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "💼" },
              { label: "Email", href: "mailto:you@email.com", icon: "✉️" },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Browse */}
        <div>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Browse</p>
          <div className="flex flex-col gap-3">
            {["Action", "Drama", "Sci-Fi", "Horror", "Animation"].map(g => (
              <Link key={g} to={`/?genre=${g}`}
                className="text-sm text-white/50 hover:text-white transition-colors">
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Pages</p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", to: "/" },
              { label: "About us", to: "/about" },
              { label: "My watchlist", to: "/watchlist" },
              { label: "Top rated", to: "/top-rated" },
            ].map(l => (
              <Link key={l.label} to={l.to}
                className="text-sm text-white/50 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Legal</p>
          <div className="flex flex-col gap-3">
            {["Disclaimer", "Privacy policy", "Terms of use"].map(l => (
              <Link key={l} to="/about"
                className="text-sm text-white/50 hover:text-white transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-white/7">
        <p className="text-xs text-white/25">
          © 2026 CinemaX. Built by Your Name · For educational purposes only.
        </p>
        
         <a href="https://www.omdbapi.com"
          target="_blank"
          className="inline-flex items-center gap-2 text-xs text-white/25 bg-white/4 border border-white/8 px-3 py-1.5 rounded-lg hover:text-white/50 transition-colors"
        >
          Powered by OMDb API
        </a>
      </div>

    </footer>
  );
}

export default Footer;