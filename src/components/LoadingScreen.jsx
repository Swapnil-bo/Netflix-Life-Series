import { useState, useEffect } from 'react'

const STAGES = [
  { code: 'PRE-PROD', label: 'Bribing the writers room...',       pct: 12  },
  { code: 'CASTING',  label: 'Casting your demons...',            pct: 24  },
  { code: 'SCRIPTING',label: 'Drafting the pilot episode...',     pct: 38  },
  { code: 'LOCATION', label: 'Scouting dramatic locations...',    pct: 51  },
  { code: 'DIRECTING',label: 'Negotiating with the director...',  pct: 63  },
  { code: 'EDITING',  label: 'Adding unnecessary plot twists...', pct: 75  },
  { code: 'MUSIC',    label: 'Composing your theme song...',      pct: 86  },
  { code: 'GREENLIT', label: 'Greenlit. Rolling cameras...',      pct: 96  },
]

function LoadingScreen() {
  const [stage, setStage]       = useState(0)
  const [visible, setVisible]   = useState(true)
  const [clap, setClap]         = useState(false)
  const [scanLine, setScanLine] = useState(0)
  const [tick, setTick]         = useState(0)

  // Stage cycling
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setClap(true)
      setTimeout(() => setClap(false), 300)
      setTimeout(() => {
        setStage(s => Math.min(s + 1, STAGES.length - 1))
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  // Scan line
  useEffect(() => {
    const t = setInterval(() => {
      setScanLine(v => (v + 1) % 100)
    }, 30)
    return () => clearInterval(t)
  }, [])

  // Timecode tick
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 1000 / 24)
    return () => clearInterval(t)
  }, [])

  const frames   = tick % 24
  const seconds  = Math.floor(tick / 24) % 60
  const minutes  = Math.floor(tick / 24 / 60) % 60
  const fmt = (n) => String(n).padStart(2, '0')
  const timecode = `${fmt(minutes)}:${fmt(seconds)}:${fmt(frames)}`

  const current = STAGES[stage]

  return (
    <div className="ls-root">
      {/* Scan line effect */}
      <div className="ls-scanline" style={{ top: `${scanLine}%` }} />
      <div className="ls-scanlines-static" />

      {/* Vignette */}
      <div className="ls-vignette" />

      {/* Clapperboard flash */}
      {clap && <div className="ls-clap-flash" />}

      {/* Top HUD bar */}
      <div className="ls-hud-top">
        <div className="ls-hud-left">
          <span className="ls-rec-dot" />
          <span className="ls-rec-text">REC</span>
        </div>
        <div className="ls-hud-center">
          <span className="ls-timecode">{timecode}</span>
        </div>
        <div className="ls-hud-right">
          <span className="ls-hud-tag">24fps · 4K · DOLBY</span>
        </div>
      </div>

      {/* Main center content */}
      <div className="ls-center">

        {/* Clapperboard */}
        <div className="ls-clapper">
          <div className="ls-clapper-top">
            <div className="ls-clapper-stripes">
              {Array.from({length: 8}).map((_, i) => (
                <div key={i} className={`ls-stripe ${i % 2 === 0 ? 'ls-stripe-b' : 'ls-stripe-w'}`} />
              ))}
            </div>
          </div>
          <div className="ls-clapper-body">
            <div className="ls-clapper-row">
              <div className="ls-clapper-cell">
                <span className="ls-clapper-label">PRODUCTION</span>
                <span className="ls-clapper-value">NETLIFE</span>
              </div>
              <div className="ls-clapper-cell">
                <span className="ls-clapper-label">SCENE</span>
                <span className="ls-clapper-value">{fmt(stage + 1)}</span>
              </div>
            </div>
            <div className="ls-clapper-row">
              <div className="ls-clapper-cell">
                <span className="ls-clapper-label">DIRECTOR</span>
                <span className="ls-clapper-value">MISTRAL 7B</span>
              </div>
              <div className="ls-clapper-cell">
                <span className="ls-clapper-label">TAKE</span>
                <span className="ls-clapper-value">01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage message */}
        <div className="ls-stage-wrap">
          <span className={`ls-stage-code ${visible ? 'ls-in' : 'ls-out'}`}>
            {current.code}
          </span>
          <p className={`ls-stage-msg ${visible ? 'ls-in' : 'ls-out'}`}>
            {current.label}
          </p>
        </div>

        {/* Progress track */}
        <div className="ls-progress-wrap">
          <div className="ls-progress-track">
            <div
              className="ls-progress-fill"
              style={{ width: `${current.pct}%` }}
            />
            <div
              className="ls-progress-glow"
              style={{ left: `${current.pct}%` }}
            />
          </div>
          <div className="ls-progress-pct">{current.pct}%</div>
        </div>

        {/* Stage checklist */}
        <div className="ls-checklist">
          {STAGES.map((s, i) => (
            <div key={i} className={`ls-check-item ${i < stage ? 'ls-done' : i === stage ? 'ls-active' : 'ls-pending'}`}>
              <span className="ls-check-icon">
                {i < stage ? '✓' : i === stage ? '▶' : '○'}
              </span>
              <span className="ls-check-label">{s.code}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom HUD bar */}
      <div className="ls-hud-bottom">
        <span className="ls-hud-tag">NETLIFE ORIGINAL · LOCAL AI · NO DATA LEAVES YOUR DEVICE</span>
      </div>
    </div>
  )
}

export default LoadingScreen