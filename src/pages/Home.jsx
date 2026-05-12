import { Link } from 'react-router-dom'
import { EVENTS, VENUES, DJS } from '../data/mockData'

export default function Home() {
  const upcoming = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden flex items-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(10,8,7,0.6), rgba(10,8,7,0.85)), url('https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1800')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 px-6 sm:px-12 max-w-4xl">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold mb-4">
            Cape Town nightlife
          </p>
          <h1 className="font-serif text-6xl sm:text-8xl font-light leading-[0.95] uppercase tracking-[0.04em]">
            Find your
            <br />
            <em className="text-gold-light not-italic font-light">night.</em>
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl text-sand/60 mt-6 max-w-xl">
            Venues, events, DJs — all in one place. Filter by genre, follow
            artists, never miss a set.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/events"
              className="px-6 py-3 rounded-full text-[0.6rem] tracking-[0.3em] uppercase bg-gold/15 border border-gold/40 text-gold-light hover:bg-gold/25 transition"
            >
              What's on
            </Link>
            <Link
              to="/venues"
              className="px-6 py-3 rounded-full text-[0.6rem] tracking-[0.3em] uppercase border border-sand/20 text-sand/70 hover:text-sand hover:border-sand/40 transition"
            >
              Browse venues
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats / tiles */}
      <section className="px-6 sm:px-12 py-16 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          <TileLink
            to="/venues"
            kicker={`${VENUES.length} venues`}
            title="Venues"
            sub="Where the regulars go. Halo, Modular, Village Idiot…"
          />
          <TileLink
            to="/events"
            kicker={`${EVENTS.length} upcoming`}
            title="Events"
            sub="Festivals, anniversaries, one-offs — across the city."
          />
          <TileLink
            to="/djs"
            kicker={`${DJS.length} artists`}
            title="DJs"
            sub="Follow your favourites. Book them for your room."
          />
        </div>
      </section>

      {/* Upcoming */}
      <section className="px-6 sm:px-12 pb-20 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">
              Coming up
            </p>
            <h2 className="font-serif text-4xl">Next on the calendar</h2>
          </div>
          <Link
            to="/events"
            className="text-[0.6rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand"
          >
            See all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {upcoming.map((e) => (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="group block rounded-lg overflow-hidden bg-surface border border-border hover:border-gold/40 transition"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url('${e.image}')` }}
              />
              <div className="p-4">
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-2">
                  {formatDate(e.date)}
                </p>
                <h3 className="font-serif text-xl group-hover:text-gold-light transition">
                  {e.name}
                </h3>
                <p className="text-sm text-muted mt-1">{e.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function TileLink({ to, kicker, title, sub }) {
  return (
    <Link
      to={to}
      className="group block p-6 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
    >
      <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-3">
        {kicker}
      </p>
      <h3 className="font-serif text-3xl group-hover:text-gold-light transition">
        {title}
      </h3>
      <p className="text-sm text-muted mt-2">{sub}</p>
    </Link>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
