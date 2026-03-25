function ShowCard({ data, onReset }) {
    return (
      <div className="showcard-root">
  
        {/* Hero Banner */}
        <div className="showcard-banner">
          <div className="banner-overlay" />
          <div className="banner-content">
            <p className="banner-eyebrow">● NETFLIX ORIGINAL SERIES</p>
            <h1 className="banner-title">{data.show_title}</h1>
            <p className="banner-tagline">"{data.tagline}"</p>
  
            <div className="banner-meta">
              <span className="badge badge-red">{data.netflix_rating}</span>
              <span className="badge badge-outline">{data.genre}</span>
              <span className="badge badge-outline">Season 1</span>
            </div>
  
            <p className="banner-warnings">⚠ {data.content_warnings}</p>
  
            <div className="banner-actions">
              <button className="cta-primary" onClick={onReset}>
                <span className="cta-icon">▶</span>
                Create Another Show
              </button>
            </div>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="showcard-content">
  
          {/* Logline */}
          <section className="sc-section">
            <p className="sc-label">● THE STORY</p>
            <p className="sc-logline">"{data.logline}"</p>
          </section>
  
          {/* Protagonist */}
          <section className="sc-section">
            <p className="sc-label">● PROTAGONIST</p>
            <div className="protagonist-card">
              <div className="proto-avatar">
                {data.protagonist.name.charAt(0)}
              </div>
              <div className="proto-info">
                <h3 className="proto-name">{data.protagonist.name}</h3>
                <div className="proto-meta">
                  <span className="proto-tag">Age: {data.protagonist.age}</span>
                </div>
                <div className="proto-rows">
                  <div className="proto-row">
                    <span className="proto-row-label">FATAL FLAW</span>
                    <span className="proto-row-value">{data.protagonist.flaw}</span>
                  </div>
                  <div className="proto-row">
                    <span className="proto-row-label">DARK SECRET</span>
                    <span className="proto-row-value">{data.protagonist.secret}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
        </div>
  
      </div>
    )
  }
  
  export default ShowCard