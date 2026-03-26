import { useState } from 'react'
import { getShows, deleteShow } from '../utils/storage'

function MyShows({ onClose, onView }) {
  const [shows, setShows] = useState(getShows())

  const handleDelete = (id) => {
    deleteShow(id)
    setShows(getShows())
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="ms-overlay">
      <div className="ms-backdrop" onClick={onClose} />
      <div className="ms-panel">

        {/* Side accent */}
        <div className="ms-side-accent" />

        {/* Header */}
        <div className="ms-header">
          <div className="ms-header-left">
            <p className="ms-eyebrow">
              <span className="ms-eyebrow-dot" />
              Your Collection
            </p>
            <h2 className="ms-title">My Shows</h2>
            <p className="ms-subtitle">
              {shows.length === 0
                ? 'No shows generated yet.'
                : `${shows.length} show${shows.length > 1 ? 's' : ''} in your collection`}
            </p>
          </div>
          <button className="ms-close" onClick={onClose}>✕</button>
        </div>

        {/* Divider */}
        <div className="ms-divider">
          <span className="ms-divider-line" />
          <span className="ms-divider-text">All Episodes of Your Life</span>
          <span className="ms-divider-line" />
        </div>

        {/* Empty state */}
        {shows.length === 0 && (
          <div className="ms-empty">
            <p className="ms-empty-icon">🎬</p>
            <p className="ms-empty-title">No Shows Yet</p>
            <p className="ms-empty-sub">
              Generate your first show and it'll appear here automatically.
            </p>
            <button className="ms-empty-cta" onClick={onClose}>
              ▶ Create My First Show
            </button>
          </div>
        )}

        {/* Shows grid */}
        {shows.length > 0 && (
          <div className="ms-grid">
            {shows.map((show, i) => (
              <div
                className="ms-card"
                key={show.id}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Poster */}
                <div className="ms-card-poster">
                  <div className="ms-card-letter">
                    {show.data.show_title.charAt(0)}
                  </div>
                  <div className="ms-card-shine" />
                  <span className="ms-card-rating">{show.data.netflix_rating}</span>
                </div>

                {/* Info */}
                <div className="ms-card-info">
                  <p className="ms-card-title">{show.data.show_title}</p>
                  <p className="ms-card-genre">{show.data.genre}</p>
                  <p className="ms-card-tagline">"{show.data.tagline}"</p>
                  <p className="ms-card-date">Saved {formatDate(show.savedAt)}</p>
                </div>

                {/* Actions */}
                <div className="ms-card-actions">
                  <button
                    className="ms-card-view"
                    onClick={() => onView(show.data)}
                  >
                    ▶ View Full Show
                  </button>
                  <button
                    className="ms-card-delete"
                    onClick={() => handleDelete(show.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default MyShows