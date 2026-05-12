import { Link, useParams } from 'react-router-dom'
import { getDJ, getEvent, getGenre, getVenue } from '../data/mockData'

export default function EventDetail() {
  const { id } = useParams()
  const event = getEvent(id)

  if (!event) {
    return (
      <div className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl">Event not found</h1>
        <Link to="/events" className="inline-block mt-6 text-gold">
          ← Back to events
        </Link>
      </div>
    )
  }

  const venue = event.venueId ? getVenue(event.venueId) : null
  const lineup = event.lineup.map(getDJ).filter(Boolean)

  return (
    <div>
      <div
        className="h-[50vh] min-h-[320px] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,8,7,0.2), rgba(10,8,7,0.95)), url('${event.image}')`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 max-w-6xl mx-auto">
          <Link
            to="/events"
            className="inline-block mb-4 text-[0.55rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand"
          >
            ← All events
          </Link>
          <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-3">
            {formatDate(event.date)}
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl uppercase tracking-[0.04em]">
            {event.name}
          </h1>
          <p className="text-sand/70 mt-3">{event.location}</p>
        </div>
      </div>

      <div className="px-6 sm:px-12 py-12 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              About
            </h2>
            <p className="font-serif italic text-2xl text-sand/85 leading-snug">
              {event.blurb}
            </p>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
              Line-up
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {lineup.map((d) => (
                <Link
                  key={d.id}
                  to={`/djs/${d.id}`}
                  className="group flex items-center gap-4 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
                >
                  <div
                    className="h-14 w-14 rounded-full bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url('${d.image}')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xl group-hover:text-gold-light transition truncate">
                      {d.name}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {d.genres.map((g) => getGenre(g)?.label).join(' · ')}
                    </p>
                  </div>
                  <span className="text-gold">→</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
              Genres
            </h2>
            <div className="flex flex-wrap gap-2">
              {event.genres.map((id) => (
                <span
                  key={id}
                  className="text-[0.55rem] tracking-[0.3em] uppercase px-3 py-1.5 rounded border border-border text-sand/70"
                >
                  {getGenre(id)?.label ?? id}
                </span>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="p-5 rounded-lg bg-surface border border-border">
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-2">
              When & where
            </p>
            <p className="font-serif text-2xl">{formatDate(event.date)}</p>
            <p className="text-sm text-sand/70 mt-2">{event.location}</p>
            {venue && (
              <Link
                to={`/venues/${venue.id}`}
                className="block mt-3 text-xs text-gold hover:text-gold-light"
              >
                View {venue.name} →
              </Link>
            )}
            <div className="mt-4 h-32 rounded bg-surface-2 border border-border flex items-center justify-center text-xs text-muted">
              Map preview
            </div>
          </div>

          <button className="w-full px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase bg-gold/20 border border-gold/50 text-gold-light hover:bg-gold/30 transition">
            Get tickets
          </button>
          <button className="w-full px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-sand/15 text-sand/70 hover:text-sand hover:border-sand/30 transition">
            Save for later
          </button>
        </aside>
      </div>
    </div>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
