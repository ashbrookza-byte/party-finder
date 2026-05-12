export { GENRES, getGenre } from './genres'
export { CLUBS, getClub } from './clubs'
export { VENUES, getVenue } from './venues'
export { DJS, getDJ } from './djs'
export { EVENTS, getEvent } from './events'
export { POSTS, getPost } from './posts'

import { CLUBS } from './clubs'
import { VENUES } from './venues'
import { DJS } from './djs'

// Resolve a post / event author to its underlying entity.
export function getAuthor(author) {
  if (!author) return null
  switch (author.type) {
    case 'club':
      return CLUBS.find((c) => c.id === author.id) || null
    case 'venue':
      return VENUES.find((v) => v.id === author.id) || null
    case 'dj':
      return DJS.find((d) => d.id === author.id) || null
    default:
      return null
  }
}

export function authorRoute(author) {
  if (!author) return '/'
  switch (author.type) {
    case 'club':
      return `/clubs/${author.id}`
    case 'venue':
      return `/venues/${author.id}`
    case 'dj':
      return `/djs/${author.id}`
    default:
      return '/'
  }
}
