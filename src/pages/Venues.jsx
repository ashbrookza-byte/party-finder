import { useMemo, useState } from 'react'
import { POSTS, VENUES, EVENTS } from '../data'
import { PostCard } from '../components/PostCard'
import { EntityCard } from '../components/EntityCard'
import { EventCard } from '../components/EventCard'
import { GenreFilter } from '../components/GenreFilter'

// Returns set of venue ids that host any event in the chosen genre.
function venueIdsForGenre(genre) {
  if (!genre) return null
  const set = new Set()
  for (const e of EVENTS) {
    if (e.host.type === 'venue' && e.genres.includes(genre)) {
      set.add(e.host.id)
    }
  }
  return set
}

export default function Venues() {
  const [genre, setGenre] = useState(null)

  const feed = useMemo(() => {
    const ids = venueIdsForGenre(genre)
    const venues = ids ? VENUES.filter((v) => ids.has(v.id)) : VENUES

    const posts = POSTS.filter((p) => p.author.type === 'venue').filter((p) => {
      if (!genre) return true
      if (!p.eventId) return true
      const e = EVENTS.find((ev) => ev.id === p.eventId)
      return e ? e.genres.includes(genre) : true
    })

    const entityItems = venues.map((v, i) => ({
      type: 'entity',
      id: 'v-' + v.id,
      sortKey: new Date(Date.now() - (i * 3 + 2) * 24 * 3600 * 1000).toISOString(),
      data: v,
    }))
    const postItems = posts.map((p) => ({
      type: 'post',
      id: p.id,
      sortKey: p.postedAt,
      data: p,
    }))

    return [...entityItems, ...postItems].sort((a, b) =>
      b.sortKey.localeCompare(a.sortKey),
    )
  }, [genre])

  return (
    <div>
      <section className="px-4 pt-4 pb-1">
        <h1 className="font-serif text-3xl">Venues</h1>
        <p className="text-sm text-muted mt-1">
          Event spaces — farms, estates, race courses, one-off rooms.
        </p>
      </section>

      <section className="border-b border-border/60">
        <div className="px-4">
          <GenreFilter value={genre} onChange={setGenre} />
        </div>
      </section>

      <section>
        {feed.length === 0 ? (
          <p className="px-4 py-16 text-center text-muted">
            No venues match that genre yet.
          </p>
        ) : (
          feed.map((item) => {
            if (item.type === 'post')
              return <PostCard key={item.id} post={item.data} />
            if (item.type === 'event')
              return <EventCard key={item.id} event={item.data} />
            return <EntityCard key={item.id} entity={item.data} kind="venue" />
          })
        )}
      </section>
    </div>
  )
}
