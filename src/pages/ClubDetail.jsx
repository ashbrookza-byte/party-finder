import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Clock,
  Shield,
  Shirt,
  Wallet,
  ChevronRight,
} from 'lucide-react'
import { getClub, getDJ, EVENTS, POSTS, getGenre } from '../data'
import { formatCount, formatDate } from '../lib/format'

export default function ClubDetail() {
  const { id } = useParams()
  const club = getClub(id)
  const [followed, setFollowed] = useState(false)

  if (!club) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">Club not found</h1>
        <Link to="/clubs" className="inline-block mt-6 text-gold">
          ← Back to clubs
        </Link>
      </div>
    )
  }

  const upcoming = EVENTS.filter(
    (e) => e.host.type === 'club' && e.host.id === club.id && e.status !== 'past',
  ).sort((a, b) => a.date.localeCompare(b.date))

  const residents = club.residentIds.map(getDJ).filter(Boolean)
  const posts = POSTS.filter(
    (p) => p.author.type === 'club' && p.author.id === club.id,
  ).slice(0, 6)

  return (
    <div className="pb-6">
      <Cover club={club} />

      <div className="px-4 pt-4">
        <Link
          to="/clubs"
          className="inline-flex items-center gap-1 text-[0.55rem] tracking-[0.3em] uppercase text-sand/60 hover:text-sand mb-3"
        >
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="flex items-start gap-4">
          <img
            src={club.avatar}
            alt=""
            className="h-16 w-16 rounded-full object-cover border-2 border-bg -mt-12 shadow-lg"
          />
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="font-serif text-3xl uppercase tracking-[0.04em] leading-none">
              {club.name}
            </h1>
            <p className="text-xs text-muted mt-1">{club.handle}</p>
          </div>
        </div>

        <p className="text-sm text-sand/85 mt-4">{club.blurb}</p>

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
          <a
            href={`https://maps.apple.com/?q=${encodeURIComponent(club.address)}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-sand/15 text-sand/70 hover:text-sand hover:border-sand/30 transition"
          >
            Directions
          </a>
        </div>

        <StatsRow club={club} />

        <Facts club={club} />
      </div>

      <Section title="Weekly programme">
        <div className="space-y-2 px-4">
          {club.schedule.map((s) => (
            <div
              key={s.day}
              className="flex flex-wrap items-center gap-3 p-3.5 rounded-lg bg-surface border border-border"
            >
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-sand/50 w-20 shrink-0">
                {s.day}
              </span>
              <span className="font-serif text-lg flex-1 min-w-0">{s.name}</span>
              <div className="flex gap-1.5 flex-wrap">
                {s.genres.map((id) => (
                  <span
                    key={id}
                    className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-0.5 rounded border border-border text-sand/60"
                  >
                    {getGenre(id)?.label ?? id}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Floors">
        <div className="px-4 space-y-2">
          {club.floors.map((f) => (
            <div
              key={f.name}
              className="p-3.5 rounded-lg bg-surface border border-border"
            >
              <p className="font-serif text-lg">{f.name}</p>
              <p className="text-sm text-muted mt-0.5">{f.vibe}</p>
            </div>
          ))}
        </div>
      </Section>

      {residents.length > 0 && (
        <Section title="Residents">
          <div className="px-4 grid grid-cols-2 gap-2">
            {residents.map((d) => (
              <Link
                key={d.id}
                to={`/djs/${d.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
              >
                <img
                  src={d.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm text-sand truncate">{d.name}</p>
                  <p className="text-xs text-muted truncate">
                    {d.genres.map((g) => getGenre(g)?.label).join(' · ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {upcoming.length > 0 && (
        <Section title="Upcoming">
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
                    {formatDate(e.date, { weekday: 'short' })} · {e.startTime}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gold shrink-0" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section title="Recent posts">
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

      <Section title="Location">
        <div className="px-4">
          <div className="p-3.5 rounded-lg bg-surface border border-border">
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-2 flex items-center gap-1">
              <MapPin size={11} /> Address
            </p>
            <p className="text-sand text-sm">{club.address}</p>
            <p className="text-xs text-muted mt-2">
              {club.coords.lat.toFixed(4)}, {club.coords.lng.toFixed(4)}
            </p>
            <div className="mt-3 h-32 rounded bg-surface-2 border border-border flex items-center justify-center text-xs text-muted">
              Map preview
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Cover({ club }) {
  return (
    <div
      className="h-40 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,8,7,0.2), rgba(10,8,7,0.9)), url('${club.cover}')`,
      }}
    />
  )
}

function StatsRow({ club }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
      <span className="flex items-center gap-1">
        <Star size={12} className="text-gold" fill="currentColor" />
        {club.rating.toFixed(1)}
        <span className="text-sand/40">({formatCount(club.ratingCount)})</span>
      </span>
      <span className="flex items-center gap-1">
        <Users size={12} />
        {formatCount(club.followerCount)} followers
      </span>
      <span className="flex items-center gap-1">
        <MapPin size={12} />
        {club.area}
      </span>
    </div>
  )
}

function Facts({ club }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2">
      <Fact icon={Clock} label="Hours" value={club.openHours} />
      <Fact icon={Users} label="Capacity" value={`${club.capacity}`} />
      <Fact icon={Shirt} label="Dress code" value={club.dressCode} />
      <Fact icon={Shield} label="Age" value={`${club.ageRestriction}+`} />
      <Fact icon={Wallet} label="Prices" value={club.priceLevel} />
    </div>
  )
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="p-3 rounded-lg bg-surface border border-border">
      <div className="flex items-center gap-1.5 text-[0.55rem] tracking-[0.25em] uppercase text-gold mb-1">
        <Icon size={11} />
        {label}
      </div>
      <p className="text-sm text-sand">{value}</p>
    </div>
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
