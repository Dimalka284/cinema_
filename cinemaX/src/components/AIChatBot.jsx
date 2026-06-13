import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Film } from "lucide-react";

// Renders simple markdown: **bold** and bullet points
function RenderMarkdown({ text }) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const isBullet = line.trim().startsWith("-") || line.trim().startsWith("•");
        const content = line.replace(/^[-•]\s*/, "");
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} className="text-white font-semibold">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{p}</span>
          )
        );
        return isBullet ? (
          <div key={i} className="flex gap-2">
            <span className="text-[#e50914] mt-1 shrink-0">▸</span>
            <span>{rendered}</span>
          </div>
        ) : (
          <p key={i}>{rendered}</p>
        );
      })}
    </div>
  );
}

const SUGGESTIONS = [
  "Recommend a thriller 🎬",
  "Best sci-fi of all time?",
  "Movies like Interstellar?",
  "Top rated horror films",
];

export default function AIChatBot({ movieTitle = null }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey there! I'm **CineBot** 🎬 Your personal AI movie expert. Ask me anything — recommendations, plot spoilers, cast info, or just what to watch tonight!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setHasNewMsg(false);
    }
  }, [open]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("https://cinemax-backend-284.fly.dev/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          movie_title: movieTitle,
        }),
      });

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "⚠️ **API quota exhausted.** The Gemini free-tier limit has been reached for today. Please wait a few minutes and try again, or use a fresh API key.",
          },
        ]);
        return;
      }

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      if (!open) setHasNewMsg(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Oops! Looks like my popcorn got stuck in the projector 🍿 Make sure the backend is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Floating bubble ── */}
      <button
        id="cinebot-toggle"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[999] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #e50914 0%, #ff4d4d 100%)",
          boxShadow: "0 8px 32px rgba(229,9,20,0.5)",
        }}
        aria-label="Open CineBot"
      >
        {open ? (
          <X size={24} color="white" />
        ) : (
          <>
            <MessageCircle size={24} color="white" />
            {hasNewMsg && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-black animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        id="cinebot-panel"
        className="fixed bottom-20 right-4 sm:bottom-28 sm:right-8 z-[998] flex flex-col transition-all duration-300 origin-bottom-right w-[calc(100vw-32px)] sm:w-[380px] h-[calc(100dvh-100px)] sm:h-[560px] max-h-[800px]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.8)",
          pointerEvents: open ? "auto" : "none",
          borderRadius: "20px",
          background: "linear-gradient(180deg, #141414 0%, #0d0d0d 100%)",
          border: "1px solid rgba(229,9,20,0.3)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4 shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(229,9,20,0.15) 0%, rgba(229,9,20,0.05) 100%)",
            borderBottom: "1px solid rgba(229,9,20,0.2)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #e50914, #ff4d4d)" }}
          >
            <Bot size={20} color="white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-base tracking-wide">CineBot</span>
              <Sparkles size={13} className="text-yellow-400" />
            </div>
            <span className="text-xs text-white/40">Powered by Gemini AI</span>
          </div>
          {movieTitle && (
            <div
              className="ml-auto flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-white/60"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Film size={11} />
              <span className="truncate max-w-[90px]">{movieTitle}</span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background:
                    msg.role === "bot"
                      ? "linear-gradient(135deg, #e50914, #ff4d4d)"
                      : "rgba(255,255,255,0.12)",
                }}
              >
                {msg.role === "bot" ? (
                  <Bot size={14} color="white" />
                ) : (
                  <User size={14} color="white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-tr-sm"
                    : "text-white/85 rounded-tl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #e50914 0%, #c40812 100%)",
                        boxShadow: "0 4px 12px rgba(229,9,20,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }
                }
              >
                <RenderMarkdown text={msg.text} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #e50914, #ff4d4d)" }}
              >
                <Bot size={14} color="white" />
              </div>
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-2 h-2 rounded-full bg-white/50"
                    style={{ animation: `bounce 1.2s ease-in-out ${d * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips — only show on first load */}
        {messages.length === 1 && !loading && (
          <div
            className="px-4 pb-3 flex gap-2 flex-wrap shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full text-white/70 hover:text-white transition-all hover:scale-105 cursor-pointer"
                style={{
                  background: "rgba(229,9,20,0.12)",
                  border: "1px solid rgba(229,9,20,0.3)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div
          className="px-4 py-4 shrink-0 flex gap-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <input
            ref={inputRef}
            id="cinebot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about any movie..."
            disabled={loading}
            className="flex-1 text-sm text-white placeholder-white/30 bg-transparent outline-none"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
              padding: "10px 14px",
            }}
          />
          <button
            id="cinebot-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #e50914, #c40812)",
              boxShadow: "0 4px 12px rgba(229,9,20,0.4)",
            }}
          >
            <Send size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Bounce keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
