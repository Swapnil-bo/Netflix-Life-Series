const STORAGE_KEY = 'netlife_shows'

export function saveShow(showData, fields) {
  const shows = getShows()
  const newShow = {
    id: Date.now(),
    savedAt: new Date().toISOString(),
    fields,
    data: showData,
  }
  shows.unshift(newShow) // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shows))
  return newShow
}

export function getShows() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function deleteShow(id) {
  const shows = getShows().filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shows))
}

export function clearShows() {
  localStorage.removeItem(STORAGE_KEY)
}