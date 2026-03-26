import { useState, useEffect, useRef } from 'react'
import './App.css'
import InputForm from './components/InputForm'
import LoadingScreen from './components/LoadingScreen'
import ShowCard from './components/ShowCard'
import { generateShowConcept } from './utils/ollama'

const GENRES = ["Drama", "Thriller", "Dark Comedy", "Mystery", "Crime Saga"]

const FAKE_SHOWS = [
  { title: "CTRL+ALT+DELETE",  genre: "Tech Thriller",    rating: "TV-MA", letter: "C", color: "#1a0a2e" },
  { title: "QUARTER LIFE",     genre: "Dark Comedy",      rating: "TV-14", letter: "Q", color: "#0a1a2e" },
  { title: "THE PIVOT",        genre: "Drama",            rating: "TV-MA", letter: "T", color: "#1a1a0a" },
  { title: "GHOST MODE",       genre: "Psychological",    rating: "TV-MA", letter: "G", color: "#0a2e1a" },
  { title: "SIDE HUSTLE",      genre: "Comedy Drama",     rating: "TV-14", letter: "S", color: "#2e0a1a" },
  { title: "DEEP WORK",        genre: "Thriller",         rating: "TV-MA", letter: "D", color: "#1a2e2e" },
  { title: "UNSUBSCRIBE",      genre: "Satire",           rating: "TV-14", letter: "U", color: "#2e1a0a" },
  { title: "LOCALHOST",        genre: "Sci-Fi Drama",     rating: "TV-MA", letter: "L", color: "#0a0a2e" },
]

const TRENDING = [
  "#1 in AI Engineer Shows Today",
  "Now Streaming: Your Life Story",
  "New Episode: The 3AM Debugging Session",
  "Coming Soon: Season 2 of Your Career",
  "Trending: Quit Job, Pursue Dreams",
  "Critics Pick: The Imposter Syndrome",
]

function App() {
  const [genreIdx, setGenreIdx]   = useState(0)
  const [genreVis, setGenreVis]   = useState(true)
  const [trendIdx, setTrendIdx]   = useState(0)
  const [trendVis, setTrendVis]   = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [showData, setShowData]   = useState(null)
  const [error, setError]         = useState(null)
  const [mousePos, setMousePos]   = useState({ x: 50, y: 50 })
  const heroRef = useRef(null)

  // Genre ticker
  useEffect(() => {
    const t = setInterval(() => {
      setGenreVis(false)
      setTimeout(() => { setGenreIdx(g => (g + 1) % GENRES.length); setGenreVis(true) }, 400)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  // Trending ticker
  useEffect(() => {
    const t = setInterval(() => {
      setTrendVis(false)
      setTimeout(() => { setTrendIdx(i => (i + 1) % TRENDING.length); setTrendVis(true) }, 350)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  // Spotlight follow mouse
  useEffect(() => {
    const handler = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const handleFormSubmit = async (fields) => {
    setShowForm(false)
    setLoading(true)
    setError(null)
    try {
      const data = await generateShowConcept(fields)
      setShowData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => { setShowData(null); setError(null); setShowForm(false) }

  return (
    <div className="app-root">
      <div className="grain" />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="logo"><span className="logo-n">N</span>ETLIFE</div>
        <div className="nav-center">
          <span className="nav-link nav-link-active">Home</span>
          <span className="nav-link">My Shows</span>
          <span className="nav-link">New & Popular</span>
        </div>
        <div className="nav-right">
          {showData
            ? <button className="nav-cta" onClick={handleReset}>＋ New Show</button>
            : <button className="nav-cta" onClick={() => setShowForm(true)}>▶ Get Started</button>
          }
        </div>
      </nav>

      {/* ── ERROR ── */}
      {error && (
        <div className="error-banner">
          <span>⚠ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ══ HERO ══ */}
      {!showData && (
        <main className="hero-root" ref={heroRef}>

          {/* Spotlight */}
          <div className="hero-spotlight" style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(229,9,20,0.07) 0%, transparent 55%)`
          }} />

          {/* Ambient blobs */}
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />

          {/* Floating posters */}
          <div className="posters-bg">
            {FAKE_SHOWS.map((show, i) => (
              <div
                key={i}
                className="poster-float"
                style={{
                  '--delay': `${i * 1.1}s`,
                  '--duration': `${14 + i * 1.7}s`,
                  '--x': `${8 + (i % 4) * 24}%`,
                  '--drift': `${(i % 2 === 0 ? 1 : -1) * (10 + i * 3)}px`,
                }}
              >
                <div className="poster-card" style={{ background: show.color }}>
                  <div className="poster-letter">{show.letter}</div>
                  <div className="poster-info">
                    <p className="poster-title">{show.title}</p>
                    <p className="poster-genre">{show.genre}</p>
                  </div>
                  <div className="poster-rating">{show.rating}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trending ticker */}
          <div className="trending-bar">
            <span className="trending-label">
              <span className="trending-dot" />
              TRENDING
            </span>
            <span className={`trending-text ${trendVis ? 'tick-in' : 'tick-out'}`}>
              {TRENDING[trendIdx]}
            </span>
          </div>

          {/* Hero content */}
          <div className="hero-content">
            <div className="hero-left">

              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                <span>Netflix Original Series</span>
                <span className="hero-eyebrow-dot" />
              </div>

              <h1 className="hero-headline">
                <span className="hero-hl-top">Your Life as a</span>
                <span className="hero-hl-bottom">
                  <span className="hero-stroke">Netflix</span>
                  <span className="hero-white"> Series</span>
                </span>
              </h1>

              <div className="hero-genre-wrap">
                <span className="hero-genre-pre">A</span>
                <span className={`hero-genre-word ${genreVis ? 'genre-in' : 'genre-out'}`}>
                  {GENRES[genreIdx]}
                </span>
                <span className="hero-genre-pre">in the making</span>
              </div>

              <p className="hero-desc">
                Drop a few details. Our local AI transforms your life into
                a full Netflix concept — title, cast, episodes, trailer and all.
              </p>

              <div className="hero-actions">
                <button className="hero-cta-primary" onClick={() => setShowForm(true)}>
                  <span className="hero-play-icon">▶</span>
                  Create My Show
                </button>
                <div className="hero-meta">
                  <span className="hero-meta-item">🔒 100% Local</span>
                  <span className="hero-meta-dot">·</span>
                  <span className="hero-meta-item">⚡ Mistral 7B</span>
                  <span className="hero-meta-dot">·</span>
                  <span className="hero-meta-item">🎬 Free Forever</span>
                </div>
              </div>

            </div>

            {/* Right: featured card */}
            <div className="hero-right">
              <div className="hero-featured">
                <div className="hf-glow" />
                <div className="hf-card">
                  <div className="hf-top">
                    <span className="hf-badge">YOUR STORY</span>
                    <span className="hf-badge hf-badge-dim">COMING SOON</span>
                  </div>
                  <div className="hf-letter">?</div>
                  <div className="hf-bottom">
                    <p className="hf-title">Untitled Series</p>
                    <p className="hf-sub">Starring: You</p>
                    <div className="hf-bar">
                      <div className="hf-bar-fill" />
                    </div>
                    <p className="hf-bar-label">Your story is waiting...</p>
                  </div>
                </div>
                <p className="hf-number">#1</p>
                <p className="hf-number-sub">in your life today</p>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="hero-bottom-row">
            <div className="hero-scroll-shows">
              {FAKE_SHOWS.slice(0, 6).map((s, i) => (
                <div className="hbs-chip" key={i}>
                  <span className="hbs-letter" style={{background: s.color}}>{s.letter}</span>
                  <span className="hbs-title">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filmstrip */}
          <div className="filmstrip">
            {Array.from({length: 28}).map((_, i) => (
              <div key={i} className="film-hole" />
            ))}
          </div>

        </main>
      )}

      {/* ══ OUTPUT ══ */}
      {showData && <ShowCard data={showData} onReset={handleReset} />}

      {showForm    && <InputForm onSubmit={handleFormSubmit} />}
      {loading     && <LoadingScreen />}
    </div>
  )
}

export default App