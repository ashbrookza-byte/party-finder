import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Shield,
  Users,
  ChevronRight,
} from 'lucide-react'
import { getEvent, getDJ, getAuthor, getGenre, authorRoute } from '../data'
import { formatCount, formatLongDate, formatPrice } from '../lib/format'

export default function EventDetail() {
  const { id } = useParams()
  const event = getEvent(id)
  const [saved, setSaved] = useState(false)

  if (!event) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">Event not found</h1>
        <Link to="/" className="inline-block mt-6 text-gold">
          ← Back to home
        </Link>
      </div>
    )
  }

  const host = getAuthor(event.host)
  const lineup = event.lineup.map(getDJ).filter(Boolean)

  return (
    <div className="pb-6">
      <div className="relative">
        <img
          src={event.cover}
          alt=""
          className="block w-full aspect-square object-cover bg-surface"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/20 to-transparent pointer-events-none" />
        <Link
          to="/"
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur text-[0.55rem] tracking-[0.3em] uppercase text-sand/80 hover:text-sand flex items-center gap-1"
        >
          <ArrowLeft size={12} /> Back
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-1">
            {formatLongDate(event.date)}
          </p>
          <h1 className="font-serif text-3xl uppercase tracking-[0.04em] leading-tight">
            {event.name}
          </h1>
        </div>
      </div>

      <div className="px-4 pt-4">
        {host && (
          <Link
            to={authorRoute(event.host)}
            className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:border-gold/40 transition"
          >
            <img
              src={host.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[0.5rem] tracking-[0.25em] uppercase text-gold">
                {event.host.type === 'club' ? 'At club' : 'At venue'}
              </p>
              <p className="text-sm text-sand truncate">{host.name}</p>
              <p className="text-xs text-muted truncate">{host.address}</p>
            </div>
            <ChevronRight size={16} className="text-gold shrink-0" />
          </Link>
        )}

        <p className="text-sm text-sand/85 mt-4">{event.blurb}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Fact icon={Calendar} label="Date" value={formatLongDate(event.date)} />
          <Fact icon={Clock} label="Time" value={`${event.startTime} – ${event.endTime}`} />
          <Fact
            icon={Ticket}
            label="Tickets"
            value={event.ticketPriceFrom === 0 ? 'Free' : `From ${formatPrice(event.ticketPriceFrom)}`}
          />
          <Fact icon={Shield} label="Age" value={event.ageRestriction === 0 ? 'All ages' : `${event.ageRestriction}+`} />
          {event.attendeeCount > 0 && (
            <Fact icon={Users} label="Expected" value={`${formatCount(event.attendeeCount)} people`} />
          )}
          {host && (
            <Fact icon={MapPin} label="Where" value={host.area || host.address} />
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          {event.status === 'past' ? (
            <span className="flex-1 px-4 py-3 text-center rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-sand/15 text-sand/50">
              Past event
            </span>
          ) : event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-4 py-3 text-center rounded-full text-[0.55rem] tracking-[0.3em] uppercase bg-gold/20 border border-gold/50 text-gold-light hover:bg-gold/30 transition"
            >
              Get tickets
            </a>
          ) : (
            <span className="flex-1 px-4 py-3 text-center rounded-full text-[0.55rem] tracking-[0.3em] uppercase border border-gold/40 text-gold-light">
              At the door
            </span>
          )}
          <button
            onClick={() => setSaved((s) => !s)}
            className={
              'px-4 py-3 rounded-full text-[0.55rem] tracking-[0.3em] uppercase border transition ' +
              (saved
                ? 'border-gold/50 text-gold-light bg-gold/10'
                : 'border-sand/15 text-sand/70 hover:text-sand hover:border-sand/30')
            }
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <Section title="Line-up">
        <div className="px-4 grid grid-cols-2 gap-2">
          {lineup.map((d) => (
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

      <Section title="Genres">
        <div className="px-4 flex flex-wrap gap-1.5">
          {event.genres.map((id) => (
            <span
              key={id}
              className="text-[0.55rem] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full border border-border text-sand/70"
            >
              {getGenre(id)?.label ?? id}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Location">
        <div className="px-4">
          <div className="p-3.5 rounded-lg bg-surface border border-border">
            <p className="text-sand text-sm">
              {host?.address || 'Location TBA'}
            </p>
            <p className="text-xs text-muted mt-2">
              {event.coords.lat.toFixed(4)}, {event.coords.lng.toFixed(4)}
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
