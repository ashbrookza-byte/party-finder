import { Link } from 'react-router-dom'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { authorRoute, getAuthor, getDJ, getGenre } from '../data'
import { formatDate, formatPrice } from '../lib/format'

export function EventCard({ event, compact = false }) {
  const host = getAuthor(event.host)
  const lineup = event.lineup.map(getDJ).filter(Boolean).slice(0, 3)

  return (
    <Link
      to={`/events/${event.id}`}
      className="block border-b border-border/60"
    >
      <div className="relative">
        <img
          src={event.cover}
          alt=""
          className={
            'block w-full object-cover bg-surface ' +
            (compact ? 'aspect-[16/9]' : 'aspect-[4/5]')
          }
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold mb-2 flex items-center gap-2">
            <Calendar size={12} strokeWidth={2} />
            {formatDate(event.date, { weekday: 'short' })} · {event.startTime}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
            {event.name}
          </h3>
          {host && (
            <p className="text-xs text-sand/70 mt-1 flex items-center gap-1">
              <MapPin size={11} strokeWidth={2} />
              {host.name}
            </p>
          )}
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {lineup.map((d) => (
            <img
              key={d.id}
              src={d.avatar}
              alt=""
              className="h-7 w-7 rounded-full border-2 border-bg object-cover"
              loading="lazy"
            />
          ))}
        </div>
        <p className="text-xs text-muted flex-1 truncate">
          {lineup.map((d) => d.name).join(' · ')}
          {event.lineup.length > lineup.length &&
            ` +${event.lineup.length - lineup.length}`}
        </p>
        <span
          className={
            'text-[0.55rem] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ' +
            (event.status === 'past'
              ? 'border border-sand/15 text-sand/40'
              : event.ticketPriceFrom === 0
                ? 'border border-emerald-500/30 text-emerald-300'
                : 'border border-gold/40 text-gold-light')
          }
        >
          <Ticket size={11} strokeWidth={2} />
          {event.status === 'past' ? 'Past' : `From ${formatPrice(event.ticketPriceFrom)}`}
        </span>
      </div>
      <div className="px-4 pb-4 flex flex-wrap gap-1.5">
        {event.genres.slice(0, 4).map((id) => (
          <span
            key={id}
            className="text-[0.5rem] tracking-[0.25em] uppercase px-2 py-0.5 rounded border border-border text-sand/60"
          >
            {getGenre(id)?.label ?? id}
          </span>
        ))}
      </div>
    </Link>
  )
}
