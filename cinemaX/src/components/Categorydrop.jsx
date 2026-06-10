import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const GENRES = [
  { name: "Action",    emoji: "💥", slug: "action" },
  { name: "Drama",     emoji: "🎭", slug: "drama" },
  { name: "Horror",    emoji: "👻", slug: "horror" },
  { name: "Sci-Fi",    emoji: "🚀", slug: "sci-fi" },
  { name: "Animation", emoji: "🎨", slug: "animation" },
  { name: "Thriller",  emoji: "🔪", slug: "thriller" },
  { name: "Comedy",    emoji: "😂", slug: "comedy" },
  { name: "Romance",   emoji: "❤️", slug: "romance" },
];

// Replace your Categories Link with this:
function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center gap-1 text-lg font-medium text-white hover:text-[#e50914] transition-colors relative group bg-transparent border-none cursor-pointer">
        Categories
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-3 w-52 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          
          <div className="p-2">
            {GENRES.map(g => (
              <button
                key={g.slug}
                onClick={() => { navigate(`/category/${g.slug}`); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors cursor-pointer text-left group bg-transparent border-none"
              >
                <span className="text-base">{g.emoji}</span>
                <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                  {g.name}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom link */}
          <div className="border-t border-white/8 p-2">
            <button
              onClick={() => { navigate("/category/action"); setOpen(false); }}
              className="w-full text-xs text-center text-[#e50914] hover:text-[#ff1f2e] py-2 transition-colors bg-transparent border-none cursor-pointer"
            >
              Browse all categories →
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CategoriesDropdown;