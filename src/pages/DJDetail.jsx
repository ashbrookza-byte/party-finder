import { Link, useParams } from 'react-router-dom'
import { getDJ, getEvent, getGenre } from '../data/mockData'

export default function DJDetail() {
  const { id } = useParams()
  const dj = getDJ(id)

  if (!dj) {
    return (
      <div className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl">DJ not found</h1>
        <Link to="/djs" className="inline-block mt-6 text-gold">
          ← Back to DJs
        </Link>
      </div>
    )
  }

  const upcoming = dj.upcoming.map(getEvent).filter(Boolean)

  return (
    <div className="px-6 sm:px-12 py-12 max-w-6xl mx-auto">
      <Link
        to="/djs"
        className="inline-block mb-6 text-[0.55rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand"
      >
        ← All DJs
      </Link>

      <div className="grid lg:grid-cols-3 gap-10">
        <aside className="space-y-6">
          <div
            className="w-full aspect-square rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url('${dj.image}')` }}
          />
          <div className="space-y-2">
            <button className="w-full px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase bg-gold/20 border border-gold/50 text-gold-light hover:bg-gold/30 transition">
              Follow
            </button>
            <button className="w-full px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-sand/15 text-sand/70 hover:text-sand hover:border-sand/30 transition">
              Book this DJ
            </button>
          </div>

          <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold">
              Links
            </p>
            {dj.instagram && (
              <a
                href={dj.instagram}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-sand/80 hover:text-gold-light"
              >
                Instagram ↗
              </a>
            )}
            {dj.facebook && (
              <a
                href={dj.facebook}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-sand/80 hover:text-gold-light"
              >
                Facebook ↗
              </a>
            )}
            {dj.mixUrl && (
              <a
                href={dj.mixUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-sand/80 hover:text-gold-light"
              >
                Latest mix ↗
              </a>
            )}
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-12">
          <section>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              ★ {dj.rating.toFixed(1)} · attended-event ratings
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl uppercase tracking-[0.04em]">
              {dj.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {dj.genres.map((id) => (
                <span
                  key={id}
                  className="text-[0.55rem] tracking-[0.3em] uppercase px-3 py-1.5 rounded border border-border text-sand/70"
                >
                  {getGenre(id)?.label ?? id}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">
              About
            </h2>
            <p className="font-serif italic text-2xl text-sand/85 leading-snug">
              {dj.bio}
            </p>
          </section>

          <section>
            <h2 className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-4">
              Upcoming gigs
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-muted">Nothing announced yet.</p>
            ) : (
              <div className="space-y-2">
                {upcoming.map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
                  >
                    <div className="min-w-0">
                      <p className="font-serif text-xl truncate">{e.name}</p>
                      <p className="text-sm text-muted truncate">
                        {formatDate(e.date)} · {e.location}
                      </p>
                    </div>
                    <span className="text-gold shrink-0">→</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
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
