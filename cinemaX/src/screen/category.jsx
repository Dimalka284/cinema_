import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Star } from "lucide-react";

const GENRES = [
    { name: "Action", emoji: "💥", slug: "action" },
    { name: "Drama", emoji: "🎭", slug: "drama" },
    { name: "Horror", emoji: "👻", slug: "horror" },
    { name: "Sci-Fi", emoji: "🚀", slug: "sci-fi" },
    { name: "Animation", emoji: "🎨", slug: "animation" },
    { name: "Thriller", emoji: "🔪", slug: "thriller" },
    { name: "Comedy", emoji: "😂", slug: "comedy" },
    { name: "Romance", emoji: "❤️", slug: "romance" },
];

function Category() {
    const { genre } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const currentGenre = GENRES.find(g => g.slug === genre);

    useEffect(() => {
        setLoading(true);
        setMovies([]);
        fetch(`https://cinemax-backend-284.fly.dev/api/category/${genre}?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.movies || []);
                setTotalPages(data.total_pages || 1);
                setTotalResults(data.total_results || 0);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [genre, page]);

    // Reset page when genre changes
    useEffect(() => { setPage(1); }, [genre]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ── Header ── */}
            <div className="px-8 md:px-16 pt-24 pb-8">
                <Link to="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to home
                </Link>

                {/* Genre tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {GENRES.map(g => (
                        <button
                            key={g.slug}
                            onClick={() => navigate(`/category/${g.slug}`)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${genre === g.slug
                                    ? "bg-[#e50914] text-white border-[#e50914]"
                                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <span>{g.emoji}</span> {g.name}
                        </button>
                    ))}
                </div>

                {/* Title */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold mb-1">
                            {currentGenre?.emoji} {currentGenre?.name || genre} Movies
                        </h1>
                        {!loading && (
                            <p className="text-sm text-white/40">
                                {totalResults.toLocaleString()} movies found
                            </p>
                        )}
                    </div>

                    {/* Page info */}
                    {!loading && (
                        <p className="text-sm text-white/40 hidden md:block">
                            Page {page} of {Math.min(totalPages, 500)}
                        </p>
                    )}
                </div>
            </div>

            {/* ── Movie Grid ── */}
            <div className="px-8 md:px-16 pb-16">

                {loading ? (
                    // Skeleton loader
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-white/8 rounded-xl aspect-[2/3] mb-2" />
                                <div className="bg-white/8 rounded h-3 w-3/4 mb-1" />
                                <div className="bg-white/5 rounded h-2 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : movies.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-white/40">No movies found for this genre.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map(movie => (
                            <Link
                                key={movie.id}
                                to={`/movies/${encodeURIComponent(movie.title)}`}
                                className="group block"
                            >
                                {/* Poster */}
                                <div className="relative rounded-xl overflow-hidden aspect-[2/3] bg-white/5 mb-3">
                                    {movie.image_url ? (
                                        <img
                                            src={movie.image_url}
                                            alt={movie.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                                            No image
                                        </div>
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-xs font-medium bg-[#e50914] px-3 py-1.5 rounded-lg">
                                            View details
                                        </span>
                                    </div>

                                    {/* Rating badge */}
                                    {movie.rating > 0 && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <Star size={10} fill="#f5c518" className="text-[#f5c518]" />
                                            <span className="text-xs font-medium text-[#f5c518]">
                                                {Number(movie.rating).toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1">
                                    {movie.title}
                                </p>
                                <p className="text-xs text-white/40 mt-0.5">{movie.release_year}</p>
                            </Link>
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button
                            onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                            disabled={page === 1}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {/* Show nearby page numbers */}
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                const pageNum = Math.max(1, page - 2) + i;
                                if (pageNum > totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setPage(pageNum); window.scrollTo(0, 0); }}
                                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all cursor-pointer border ${page === pageNum
                                                ? "bg-[#e50914] text-white border-[#e50914]"
                                                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                            disabled={page === totalPages}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Category;