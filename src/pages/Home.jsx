import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { POSTS, EVENTS } from '../data'
import { PostCard } from '../components/PostCard'
import { EventCard } from '../components/EventCard'
import { GenreFilter } from '../components/GenreFilter'
import { formatDate } from '../lib/format'

export default function Home() {
  const [genre, setGenre] = useState(null)

  // Sorted upcoming events for the horizontal strip.
  const upcomingThisMonth = useMemo(() => {
    return [...EVENTS]
      .filter((e) => e.status !== 'past')
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 8)
  }, [])

  // Interleave posts + a few featured events into the main feed.
  // Filter by genre when set (posts inherit their event's genres; events use their own).
  const feed = useMemo(() => {
    const matchesGenre = (genres) =>
      !genre || (genres && genres.includes(genre))

    const postItems = POSTS.filter((p) => {
      if (!genre) return true
      // a post matches if its linked event matches, or if the post has no event we let it through unfiltered
      if (!p.eventId) return true
      const e = EVENTS.find((ev) => ev.id === p.eventId)
      return e ? matchesGenre(e.genres) : true
    }).map((p) => ({ type: 'post', id: p.id, sortKey: p.postedAt, data: p }))

    const featuredEvents = upcomingThisMonth
      .filter((e) => matchesGenre(e.genres))
      .slice(0, 4)
      .map((e, i) => ({
        type: 'event',
        id: 'fe-' + e.id,
        // Sprinkle event cards through the feed at fixed positions
        sortKey: new Date(Date.now() - (i * 2 + 1) * 36 * 3600 * 1000).toISOString(),
        data: e,
      }))

    return [...postItems, ...featuredEvents].sort((a, b) =>
      b.sortKey.localeCompare(a.sortKey),
    )
  }, [genre, upcomingThisMonth])

  return (
    <div>
      {/* Hero strip — upcoming events as horizontal cards */}
      <section className="pt-2 pb-4 border-b border-border/60">
        <div className="px-4 flex items-center justify-between mb-2">
          <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold flex items-center gap-1.5">
            <Sparkles size={12} strokeWidth={2} /> This month
          </h2>
          <Link
            to="/venues"
            className="text-[0.55rem] tracking-[0.25em] uppercase text-sand/55 hover:text-sand"
          >
            All
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {upcomingThisMonth.map((e) => (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="shrink-0 w-40 rounded-lg overflow-hidden bg-surface border border-border hover:border-gold/40 transition"
            >
              <img
                src={e.cover}
                alt=""
                className="block w-full aspect-square object-cover"
                loading="lazy"
              />
              <div className="p-2.5">
                <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gold">
                  {formatDate(e.date, { weekday: 'short' })}
                </p>
                <p className="text-sm text-sand mt-1 line-clamp-2 leading-tight">
                  {e.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Genre filter */}
      <section className="border-b border-border/60">
        <div className="px-4">
          <GenreFilter value={genre} onChange={setGenre} />
        </div>
      </section>

      {/* Mixed feed */}
      <section>
        {feed.length === 0 ? (
          <p className="px-4 py-16 text-center text-muted">
            Nothing matches that genre right now.
          </p>
        ) : (
          feed.map((item) =>
            item.type === 'post' ? (
              <PostCard key={item.id} post={item.data} />
            ) : (
              <EventCard key={item.id} event={item.data} />
            ),
          )
        )}
      </section>
    </div>
  )
}
