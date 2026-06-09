import { Link } from "react-router-dom";
import { ArrowLeft, Users, Star } from "lucide-react";

const reviews = [
  { initials: "AK", name: "Ashan K.", color: "bg-[#e50914]/15 text-[#e50914]", movie: "Inception", stars: 5, text: "One of the most mind-bending films ever made. Nolan at his absolute best. The ending still keeps me up at night." },
  { initials: "NF", name: "Nimal F.",  color: "bg-blue-500/15 text-blue-400",   movie: "Parasite",  stars: 5, text: "A masterpiece of storytelling. The way it shifts tone halfway through is pure genius. Deserved every Oscar." },
  { initials: "SR", name: "Sithma R.", color: "bg-emerald-500/15 text-emerald-400", movie: "Dune: Part Two", stars: 4, text: "Visually stunning and epic in scale. Zendaya finally gets her moment and absolutely delivers." },
];

const polls = [
  {
    question: "Best Christopher Nolan film?",
    votes: 218, daysLeft: 3,
    options: [
      { label: "Inception", pct: 42 },
      { label: "The Dark Knight", pct: 38 },
      { label: "Interstellar", pct: 14 },
      { label: "Oppenheimer", pct: 6 },
    ],
  },
  {
    question: "Most overhyped movie of 2023?",
    votes: 154, daysLeft: 5,
    options: [
      { label: "Oppenheimer", pct: 31 },
      { label: "Barbie", pct: 45 },
      { label: "Spider-Verse", pct: 24 },
    ],
  },
];

const leaderboard = [
  { rank: 1, initials: "AK", name: "Ashan K.",  color: "bg-yellow-500/12 text-yellow-400", reviews: 84, avg: 4.2, badge: "Top critic",  badgeColor: "bg-yellow-500/12 text-yellow-400" },
  { rank: 2, initials: "NF", name: "Nimal F.",  color: "bg-blue-500/12 text-blue-400",    reviews: 61, avg: 4.5, badge: "Active",     badgeColor: "bg-blue-500/12 text-blue-400" },
  { rank: 3, initials: "SR", name: "Sithma R.", color: "bg-emerald-500/12 text-emerald-400", reviews: 47, avg: 3.9, badge: "Rising", badgeColor: "bg-emerald-500/12 text-emerald-400" },
  { rank: 4, initials: "KP", name: "Kasun P.",  color: "bg-orange-500/12 text-orange-400", reviews: 39, avg: 4.1, badge: "Active",    badgeColor: "bg-orange-500/12 text-orange-400" },
];

const stats = [
  { num: "1.2k", label: "Members" },
  { num: "3.8k", label: "Reviews" },
  { num: "12",   label: "Active polls" },
  { num: "9.4k", label: "Ratings given" },
];

function StarRow({ count }) {
  return (
    <span className="text-[#f5c518] text-xs tracking-wide">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function Community() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-25 px-8 md:px-16 py-14">

      {/* Header */}
      <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/25 text-[#e50914] mb-4">
        <Users size={13} /> Community
      </div>
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Where film lovers connect.</h1>
      <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-lg">
        Rate movies, share reviews, vote on polls and see what others think about the films you love.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {stats.map(s => (
          <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl p-4 text-center">
            <p className="text-2xl font-medium mb-1">{s.num}</p>
            <p className="text-xs text-white/35">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Reviews + Polls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        {/* Reviews */}
        <div>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Recent reviews</p>
          <div className="flex flex-col gap-3">
            {reviews.map(r => (
              <div key={r.name} className="bg-white/4 border border-white/8 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-white/35">{r.movie} · <StarRow count={r.stars} /></p>
                  </div>
                </div>
                <p className="text-xs text-white/55 leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Polls */}
        <div>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Active polls</p>
          <div className="flex flex-col gap-4">
            {polls.map(p => (
              <div key={p.question} className="bg-white/4 border border-white/8 rounded-xl p-5">
                <p className="text-sm font-medium mb-4">{p.question}</p>
                <div className="flex flex-col gap-3">
                  {p.options.map(o => (
                    <div key={o.label}>
                      <div className="flex justify-between text-xs text-white/55 mb-1">
                        <span>{o.label}</span>
                        <span>{o.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/7 rounded-full overflow-hidden">
                        <div className="h-full bg-[#e50914] rounded-full" style={{ width: `${o.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/25 mt-3">{p.votes} votes · {p.daysLeft} days left</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <hr className="border-white/7 mb-10" />

      {/* Leaderboard */}
      <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Top reviewers</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {leaderboard.map(l => (
          <div key={l.name} className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className={`text-sm font-medium w-5 text-center ${l.rank === 1 ? "text-yellow-400" : "text-white/30"}`}>
              {l.rank}
            </span>
            <div className={`w-9 h-9 rounded-full ${l.color} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
              {l.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{l.name}</p>
              <p className="text-xs text-white/35">{l.reviews} reviews · avg ★ {l.avg}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full ${l.badgeColor}`}>{l.badge}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Community;