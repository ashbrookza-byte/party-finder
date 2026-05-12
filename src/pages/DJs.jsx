import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DJS, GENRES, getGenre } from '../data/mockData'

export default function DJs() {
  const [genreFilter, setGenreFilter] = useState(null)

  const filtered = useMemo(() => {
    if (!genreFilter) return DJS
    return DJS.filter((d) => d.genres.includes(genreFilter))
  }, [genreFilter])

  return (
    <div className="px-6 sm:px-12 py-16 max-w-6xl mx-auto">
      <header className="mb-10">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">
          {DJS.length} artists
        </p>
        <h1 className="font-serif text-5xl">DJs</h1>
        <p className="text-muted mt-3 max-w-xl">
          Browse artists, follow your favourites, see where they're booked.
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
        <p className="text-muted">No artists in that genre yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <DJCard key={d.id} dj={d} />
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

function DJCard({ dj }) {
  return (
    <Link
      to={`/djs/${dj.id}`}
      className="group block rounded-lg overflow-hidden bg-surface border border-border hover:border-gold/40 transition"
    >
      <div
        className="h-56 bg-cover bg-center"
        style={{ backgroundImage: `url('${dj.image}')` }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl group-hover:text-gold-light transition">
            {dj.name}
          </h3>
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold whitespace-nowrap">
            ★ {dj.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {dj.genres.map((id) => (
            <span
              key={id}
              className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-1 rounded border border-border text-sand/60"
            >
              {getGenre(id)?.label ?? id}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">
          {dj.upcoming.length} upcoming{' '}
          {dj.upcoming.length === 1 ? 'gig' : 'gigs'}
        </p>
      </div>
    </Link>
  )
}
