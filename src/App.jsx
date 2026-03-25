import { useState, useEffect } from 'react'
import './App.css'
import InputForm from './components/InputForm'

const TITLES = ["Drama", "Thriller", "Dark Comedy", "Mystery", "Crime Saga"]

function App() {
  const [genre, setGenre] = useState(0)
  const [visible, setVisible] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setGenre(g => (g + 1) % TITLES.length)
        setVisible(true)
      }, 400)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="netlife-root">
      <div className="grain" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <nav className="nav">
        <div className="logo"><span className="logo-n">N</span>ETLIFE</div>
        <div className="nav-right">
          <span className="nav-tag">★ ORIGINAL SERIES</span>
        </div>
      </nav>

      <main className="hero">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          NOW STREAMING YOUR LIFE
          <span className="eyebrow-dot" />
        </div>
        <h1 className="headline">
          <span className="headline-top">Your Life as a</span>
          <span className="headline-bottom">
            <span className="red-stroke">Netflix</span> Series
          </span>
        </h1>
        <div className="genre-ticker">
          A{" "}
          <span className={`genre-word ${visible ? 'genre-in' : 'genre-out'}`}>
            {TITLES[genre]}
          </span>
          {" "}in the making
        </div>
        <p className="description">
          Drop a few details about your life. Our local AI transforms it into<br />
          a full Netflix concept — title, cast, episode guide, trailer script.
        </p>
        <div className="cta-group">
          <button className="cta-primary" onClick={() => setShowForm(true)}>
            <span className="cta-icon">▶</span>
            Create My Show
          </button>
          <button className="cta-secondary">See an Example</button>
        </div>
        <div className="trust-bar">
          <span>🔒 Runs 100% locally</span>
          <span className="trust-divider">·</span>
          <span>⚡ Powered by Mistral 7B</span>
          <span className="trust-divider">·</span>
          <span>🎬 No data leaves your device</span>
        </div>
      </main>

      <div className="filmstrip">
        {Array.from({length: 20}).map((_, i) => (
          <div key={i} className="film-hole" />
        ))}
      </div>

      {showForm && <InputForm onSubmit={() => {}} />}
    </div>
  )
}

export default App