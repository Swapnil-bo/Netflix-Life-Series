import { useState } from 'react'

function ShowCard({ data, onReset }) {
  const [copiedTrailer, setCopiedTrailer] = useState(false)

  const copyTrailer = () => {
    navigator.clipboard.writeText(data.trailer_script)
    setCopiedTrailer(true)
    setTimeout(() => setCopiedTrailer(false), 2000)
  }

  const castColors = [
    'linear-gradient(135deg, #1a0a2e, #3d1a6e)',
    'linear-gradient(135deg, #0a1a2e, #1a4a6e)',
    'linear-gradient(135deg, #2e0a0a, #6e1a1a)',
  ]

  return (
    <div className="sc-root">

      {/* ── BANNER ── */}
      <div className="sc-banner">
        <div className="sc-banner-bg" />
        <div className="sc-banner-noise" />
        <div className="sc-banner-grad" />

        <div className="sc-banner-body">
          <div className="sc-banner-left">
            <p className="sc-eyebrow">
              <span className="sc-eyebrow-dot" />
              Netflix Original Series
              <span className="sc-eyebrow-dot" />
            </p>

            <h1 className="sc-title">{data.show_title}</h1>

            <p className="sc-tagline">"{data.tagline}"</p>

            <div className="sc-badges">
              <span className="sc-badge sc-badge-red">{data.netflix_rating}</span>
              <span className="sc-badge sc-badge-dim">{data.genre}</span>
              <span className="sc-badge sc-badge-dim">8 Episodes</span>
              <span className="sc-badge sc-badge-dim">Season 1</span>
            </div>

            <p className="sc-warnings">Content advisory: {data.content_warnings}</p>

            <button className="cta-primary sc-cta" onClick={onReset}>
              <span className="cta-icon">＋</span>
              Create Another Show
            </button>
          </div>

          <div className="sc-banner-right">
            <div className="sc-poster">
              <div className="sc-poster-letter">
                {data.show_title.charAt(0)}
              </div>
              <div className="sc-poster-shine" />
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="sc-body">

        {/* Divider label */}
        <div className="sc-divider">
          <span className="sc-divider-line" />
          <span className="sc-divider-text">PRESS KIT</span>
          <span className="sc-divider-line" />
        </div>

        {/* ── LOGLINE ── */}
        <section className="sc-section">
          <p className="sc-section-label">The Story</p>
          <blockquote className="sc-logline">
            <span className="sc-quote-mark">"</span>
            {data.logline}
            <span className="sc-quote-mark sc-quote-close">"</span>
          </blockquote>
        </section>

        {/* ── PROTAGONIST ── */}
        <section className="sc-section">
          <p className="sc-section-label">Protagonist</p>
          <div className="sc-proto">
            <div className="sc-proto-avatar">
              <span>{data.protagonist.name.charAt(0)}</span>
              <div className="sc-proto-ring" />
            </div>
            <div className="sc-proto-details">
              <div className="sc-proto-top">
                <h3 className="sc-proto-name">{data.protagonist.name}</h3>
                <span className="sc-badge sc-badge-dim">Age {data.protagonist.age}</span>
              </div>
              <div className="sc-proto-stats">
                <div className="sc-stat">
                  <span className="sc-stat-label">Fatal Flaw</span>
                  <span className="sc-stat-value">{data.protagonist.flaw}</span>
                </div>
                <div className="sc-stat-divider" />
                <div className="sc-stat">
                  <span className="sc-stat-label">Dark Secret</span>
                  <span className="sc-stat-value">{data.protagonist.secret}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SUPPORTING CAST ── */}
        <section className="sc-section">
          <p className="sc-section-label">Supporting Cast</p>
          <div className="sc-cast">
            {data.supporting_cast.map((c, i) => (
              <div className="sc-cast-card" key={i}>
                <div className="sc-cast-avatar" style={{background: castColors[i]}}>
                  {c.name.charAt(0)}
                </div>
                <div className="sc-cast-info">
                  <h4 className="sc-cast-name">{c.name}</h4>
                  <p className="sc-cast-role">{c.role}</p>
                  <p className="sc-cast-desc">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEASON ARC ── */}
        <section className="sc-section">
          <p className="sc-section-label">Season 1 Arc</p>
          <div className="sc-arc">
            {[
              { label: 'Act I',   sub: 'Setup',      text: data.season_arc.act1, num: '01' },
              { label: 'Act II',  sub: 'Confrontation', text: data.season_arc.act2, num: '02' },
              { label: 'Act III', sub: 'Resolution', text: data.season_arc.act3, num: '03' },
            ].map((act, i) => (
              <div className="sc-arc-card" key={i}>
                <div className="sc-arc-num">{act.num}</div>
                <div className="sc-arc-content">
                  <div className="sc-arc-top">
                    <span className="sc-arc-label">{act.label}</span>
                    <span className="sc-arc-sub">{act.sub}</span>
                  </div>
                  <p className="sc-arc-text">{act.text}</p>
                </div>
                {i < 2 && <div className="sc-arc-arrow">→</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── EPISODES ── */}
        <section className="sc-section">
          <p className="sc-section-label">Episode Guide</p>
          <div className="sc-episodes">
            {data.episodes.map((ep, i) => (
              <div className="sc-ep" key={i}>
                <div className="sc-ep-num">
                  {String(ep.number).padStart(2, '0')}
                </div>
                <div className="sc-ep-body">
                  <h4 className="sc-ep-title">"{ep.title}"</h4>
                  <p className="sc-ep-desc">{ep.description}</p>
                </div>
                <div className="sc-ep-play">▶</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRAILER SCRIPT ── */}
        <section className="sc-section">
          <div className="sc-trailer-header">
            <p className="sc-section-label">Official Trailer Script</p>
            <button className="sc-copy-btn" onClick={copyTrailer}>
              {copiedTrailer ? '✓ Copied!' : '⎘ Copy Script'}
            </button>
          </div>
          <div className="sc-trailer">
            <div className="sc-trailer-bar">
              <span className="sc-trailer-dot sc-td-red" />
              <span className="sc-trailer-dot sc-td-yellow" />
              <span className="sc-trailer-dot sc-td-green" />
              <span className="sc-trailer-filename">trailer_v1_final_FINAL.fdx</span>
            </div>
            <pre className="sc-trailer-text">{data.trailer_script}</pre>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="sc-footer">
          <p className="sc-footer-brand"><span className="logo-n">N</span>ETLIFE</p>
          <p className="sc-footer-sub">Generated locally · No data left your device · Powered by Mistral 7B</p>
          <button className="cta-secondary" onClick={onReset} style={{marginTop:'16px'}}>
            ＋ Create Another Show
          </button>
        </div>

      </div>
    </div>
  )
}

export default ShowCard