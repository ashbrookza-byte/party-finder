import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  Users,
  MapPin,
  Music,
  ExternalLink,
  PlayCircle,
  ChevronRight,
  Mail,
  Wallet,
} from 'lucide-react'
import { getDJ, getClub, getEvent, getGenre, POSTS } from '../data'
import { formatCount, formatDate } from '../lib/format'

export default function DJDetail() {
  const { id } = useParams()
  const dj = getDJ(id)
  const [followed, setFollowed] = useState(false)

  if (!dj) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">DJ not found</h1>
        <Link to="/djs" className="inline-block mt-6 text-gold">
          ← Back to DJs
        </Link>
      </div>
    )
  }

  const upcoming = dj.upcoming.map(getEvent).filter(Boolean)
  const residentAt = dj.residentAt.map(getClub).filter(Boolean)
  const posts = POSTS.filter(
    (p) => p.author.type === 'dj' && p.author.id === dj.id,
  ).slice(0, 6)

  return (
    <div className="pb-6">
      <div
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,8,7,0.2), rgba(10,8,7,0.9)), url('${dj.cover}')`,
        }}
      />

      <div className="px-4 pt-4">
        <Link
          to="/djs"
          className="inline-flex items-center gap-1 text-[0.55rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand mb-3"
        >
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="flex items-start gap-4">
          <img
            src={dj.avatar}
            alt=""
            className="h-20 w-20 rounded-full object-cover border-2 border-bg -mt-12 shadow-lg"
          />
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="font-serif text-3xl uppercase tracking-[0.04em] leading-none">
              {dj.name}
            </h1>
            <p className="text-xs text-muted mt-1">{dj.handle}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {dj.genres.map((id) => (
                <span
                  key={id}
                  className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-0.5 rounded border border-border text-sand/60"
                >
                  {getGenre(id)?.label ?? id}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-sand/85 mt-4">{dj.bio}</p>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setFollowed((f) => !f)}
            className={
              'flex-1 px-4 py-2.5 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border transition ' +
              (followed
                ? 'border-sand/15 text-sand/60'
                : 'bg-gold/20 border-gold/50 text-gold-light hover:bg-gold/30')
            }
          >
            {followed ? 'Following' : 'Follow'}
          </button>
          <button className="flex-1 px-4 py-2.5 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-sand/15 text-sand/70 hover:text-sand hover:border-sand/30 transition">
            Book this DJ
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-gold" fill="currentColor" />
            {dj.rating.toFixed(1)}
            <span className="text-sand/40">
              ({formatCount(dj.ratingCount)})
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {formatCount(dj.followerCount)} followers
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {dj.hometown}
          </span>
          <span className="flex items-center gap-1">
            <Music size={12} />
            {dj.yearsActive} yrs
          </span>
        </div>
      </div>

      {dj.mixes.length > 0 && (
        <Section title="Mixes">
          <div className="px-4 space-y-2">
            {dj.mixes.map((m) => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
              >
                <PlayCircle size={28} className="text-gold shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sand truncate">{m.title}</p>
                  <p className="text-xs text-muted">{m.length}</p>
                </div>
              </a>
            ))}
          </div>
        </Section>
      )}

      {upcoming.length > 0 && (
        <Section title="Upcoming gigs">
          <div className="px-4 space-y-2">
            {upcoming.map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
              >
                <img
                  src={e.cover}
                  alt=""
                  className="h-12 w-12 rounded object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sand truncate">{e.name}</p>
                  <p className="text-xs text-muted truncate">
                    {formatDate(e.date)} · {e.startTime}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gold shrink-0" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      {residentAt.length > 0 && (
        <Section title="Resident at">
          <div className="px-4 grid grid-cols-2 gap-2">
            {residentAt.map((c) => (
              <Link
                key={c.id}
                to={`/clubs/${c.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
              >
                <img
                  src={c.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm text-sand truncate">{c.name}</p>
                  <p className="text-xs text-muted truncate">{c.area}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section title="Posts">
          <div className="px-4 grid grid-cols-3 gap-0.5">
            {posts.map((p) => (
              <div
                key={p.id}
                className="aspect-square bg-cover bg-center bg-surface"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
            ))}
          </div>
        </Section>
      )}

      <Section title="Booking">
        <div className="px-4 space-y-2">
          <div className="p-3.5 rounded-lg bg-surface border border-border">
            <p className="text-[0.55rem] tracking-[0.25em] uppercase text-gold flex items-center gap-1 mb-1">
              <Wallet size={11} /> Price range
            </p>
            <p className="text-sand text-sm">{dj.bookingPriceRange}</p>
          </div>
          <a
            href={`mailto:${dj.bookingEmail}`}
            className="p-3.5 rounded-lg bg-surface border border-border flex items-center gap-2 hover:border-gold/40 transition"
          >
            <Mail size={14} className="text-gold" />
            <span className="text-sand text-sm break-all">{dj.bookingEmail}</span>
          </a>
        </div>
      </Section>

      <Section title="Links">
        <div className="px-4 flex flex-wrap gap-2">
          {dj.socials.instagram && (
            <SocialLink href={dj.socials.instagram} label="Instagram" />
          )}
          {dj.socials.facebook && (
            <SocialLink href={dj.socials.facebook} label="Facebook" />
          )}
          {dj.socials.soundcloud && (
            <SocialLink href={dj.socials.soundcloud} label="SoundCloud" />
          )}
        </div>
      </Section>
    </div>
  )
}

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface border border-border hover:border-gold/40 text-sand/80 hover:text-gold-light text-xs transition"
    >
      <ExternalLink size={14} />
      {label}
    </a>
  )
}

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="px-4 mb-2 text-[0.6rem] tracking-[0.3em] uppercase text-gold">
        {title}
      </h2>
      {children}
    </section>
  )
}
