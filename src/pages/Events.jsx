import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS, GENRES, getGenre } from '../data/mockData'

export default function Events() {
  const [genreFilter, setGenreFilter] = useState(null)

  const filtered = useMemo(() => {
    const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date))
    if (!genreFilter) return sorted
    return sorted.filter((e) => e.genres.includes(genreFilter))
  }, [genreFilter])

  return (
    <div className="px-6 sm:px-12 py-16 max-w-6xl mx-auto">
      <header className="mb-10">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">
          {EVENTS.length} listed
        </p>
        <h1 className="font-serif text-5xl">Events</h1>
        <p className="text-muted mt-3 max-w-xl">
          Festivals, anniversaries, and one-off nights — across Cape Town.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
        <FilterChip
          active={genreFilter === null}
          onClick={() => setGenreFilter(null)}
        >
          All
        </FilterChip>
        {GENRES.map((g) => (
          <FilterChip
            key={g.id}
            active={genreFilter === g.id}
            onClick={() => setGenreFilter(g.id)}
          >
            {g.label}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No events match that genre yet.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-4 py-2 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border transition ' +
        (active
          ? 'bg-gold/20 border-gold/50 text-gold-light'
          : 'border-sand/15 text-sand/60 hover:text-sand hover:border-sand/30')
      }
    >
      {children}
    </button>
  )
}

function EventRow({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col sm:flex-row gap-4 rounded-lg overflow-hidden bg-surface border border-border hover:border-gold/40 transition"
    >
      <div
        className="h-40 sm:h-auto sm:w-56 sm:shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${event.image}')` }}
      />
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold">
              {formatDate(event.date)}
            </span>
            <span className="text-sand/30">·</span>
            <span className="text-xs text-muted">{event.location}</span>
          </div>
          <h3 className="font-serif text-3xl group-hover:text-gold-light transition">
            {event.name}
          </h3>
          <p className="text-sm text-sand/70 mt-2">{event.blurb}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {event.genres.map((id) => (
            <span
              key={id}
              className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-1 rounded border border-border text-sand/60"
            >
              {getGenre(id)?.label ?? id}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
