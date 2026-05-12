import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { VENUES, GENRES, getGenre } from '../data/mockData'

export default function Venues() {
  const [genreFilter, setGenreFilter] = useState(null)

  const filtered = useMemo(() => {
    if (!genreFilter) return VENUES
    return VENUES.filter((v) =>
      v.schedule.some((s) => s.genres.includes(genreFilter)),
    )
  }, [genreFilter])

  return (
    <div className="px-6 sm:px-12 py-16 max-w-6xl mx-auto">
      <header className="mb-10">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">
          Cape Town · {VENUES.length} spots
        </p>
        <h1 className="font-serif text-5xl">Venues</h1>
        <p className="text-muted mt-3 max-w-xl">
          Regular nights, weekly programmes, and the rooms that always deliver
          a known sound.
        </p>
      </header>

      {/* Genre filter */}
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

      {/* Map placeholder */}
      <div className="mb-10 rounded-lg border border-border bg-surface h-48 sm:h-64 flex items-center justify-center text-muted text-sm">
        <div className="text-center">
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-1">
            Map
          </p>
          <p>Interactive venue map — coming soon</p>
        </div>
      </div>

      {/* Venue grid */}
      {filtered.length === 0 ? (
        <p className="text-muted">No venues match that genre yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <VenueCard key={v.id} venue={v} />
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

function VenueCard({ venue }) {
  const allGenres = Array.from(
    new Set(venue.schedule.flatMap((s) => s.genres)),
  ).slice(0, 3)

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group block rounded-lg overflow-hidden bg-surface border border-border hover:border-gold/40 transition"
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${venue.image}')` }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl group-hover:text-gold-light transition">
            {venue.name}
          </h3>
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold whitespace-nowrap">
            ★ {venue.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-muted mt-1">{venue.location}</p>
        <p className="text-sm text-sand/70 mt-3 line-clamp-2">{venue.blurb}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {allGenres.map((id) => (
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
