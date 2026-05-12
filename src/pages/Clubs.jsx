import { useMemo, useState } from 'react'
import { POSTS, CLUBS, EVENTS } from '../data'
import { PostCard } from '../components/PostCard'
import { EntityCard } from '../components/EntityCard'
import { GenreFilter } from '../components/GenreFilter'

function clubMatchesGenre(club, genre) {
  if (!genre) return true
  return club.schedule.some((s) => s.genres.includes(genre))
}

export default function Clubs() {
  const [genre, setGenre] = useState(null)

  const feed = useMemo(() => {
    const clubs = CLUBS.filter((c) => clubMatchesGenre(c, genre))

    const posts = POSTS.filter((p) => p.author.type === 'club').filter((p) => {
      if (!genre) return true
      const club = CLUBS.find((c) => c.id === p.author.id)
      if (!club) return false
      if (!clubMatchesGenre(club, genre)) return false
      // also filter by linked event genre if present
      if (p.eventId) {
        const e = EVENTS.find((ev) => ev.id === p.eventId)
        if (e && !e.genres.includes(genre)) return false
      }
      return true
    })

    const entityItems = clubs.map((c, i) => ({
      type: 'entity',
      id: 'c-' + c.id,
      sortKey: new Date(Date.now() - (i * 3 + 2) * 24 * 3600 * 1000).toISOString(),
      data: c,
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
        <h1 className="font-serif text-3xl">Clubs</h1>
        <p className="text-sm text-muted mt-1">
          Regular nights, weekly residents, the rooms that always deliver.
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
            No clubs match that genre yet.
          </p>
        ) : (
          feed.map((item) =>
            item.type === 'post' ? (
              <PostCard key={item.id} post={item.data} />
            ) : (
              <EntityCard key={item.id} entity={item.data} kind="club" />
            ),
          )
        )}
      </section>
    </div>
  )
}
