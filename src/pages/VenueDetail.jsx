import { Link, useParams } from 'react-router-dom'
import { EVENTS, getGenre, getVenue } from '../data/mockData'

export default function VenueDetail() {
  const { id } = useParams()
  const venue = getVenue(id)

  if (!venue) {
    return (
      <div className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl">Venue not found</h1>
        <Link to="/venues" className="inline-block mt-6 text-gold">
          ← Back to venues
        </Link>
      </div>
    )
  }

  const events = EVENTS.filter((e) => e.venueId === venue.id)

  return (
    <div>
      <div
        className="h-[45vh] min-h-[280px] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,8,7,0.2), rgba(10,8,7,0.95)), url('${venue.image}')`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-8 max-w-6xl mx-auto">
          <Link
            to="/venues"
            className="inline-block mb-4 text-[0.55rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand"
          >
            ← All venues
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-5xl sm:text-7xl uppercase tracking-[0.04em]">
              {venue.name}
            </h1>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-gold">
              ★ {venue.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-sand/70 mt-2">{venue.location}</p>
        </div>
      </div>

      <div className="px-6 sm:px-12 py-12 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              About
            </h2>
            <p className="font-serif italic text-2xl text-sand/85 leading-snug">
              {venue.blurb}
            </p>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
              Floors
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {venue.floors.map((f) => (
                <div
                  key={f.name}
                  className="p-4 rounded-lg bg-surface border border-border"
                >
                  <p className="font-serif text-xl">{f.name}</p>
                  <p className="text-sm text-muted mt-1">{f.vibe}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
              Weekly programme
            </h2>
            <div className="space-y-2">
              {venue.schedule.map((s) => (
                <div
                  key={s.day}
                  className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-surface border border-border"
                >
                  <span className="text-[0.55rem] tracking-[0.3em] uppercase text-sand/50 w-24">
                    {s.day}
                  </span>
                  <span className="font-serif text-xl flex-1">{s.name}</span>
                  <div className="flex gap-2">
                    {s.genres.map((id) => (
                      <span
                        key={id}
                        className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-1 rounded border border-border text-sand/60"
                      >
                        {getGenre(id)?.label ?? id}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {events.length > 0 && (
            <section>
              <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
                Upcoming events here
              </h2>
              <div className="space-y-2">
                {events.map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
                  >
                    <div>
                      <p className="font-serif text-xl">{e.name}</p>
                      <p className="text-sm text-muted">{formatDate(e.date)}</p>
                    </div>
                    <span className="text-gold">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="p-5 rounded-lg bg-surface border border-border">
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-2">
              Location
            </p>
            <p className="text-sand/80">{venue.location}</p>
            <p className="text-xs text-muted mt-3">
              {venue.coords.lat.toFixed(4)}, {venue.coords.lng.toFixed(4)}
            </p>
            <div className="mt-4 h-32 rounded bg-surface-2 border border-border flex items-center justify-center text-xs text-muted">
              Map preview
            </div>
          </div>

          <button className="w-full px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-gold/40 text-gold-light hover:bg-gold/10 transition">
            Follow venue
          </button>
        </aside>
      </div>
    </div>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
