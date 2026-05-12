import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Users } from 'lucide-react'
import { getGenre } from '../data'
import { formatCount } from '../lib/format'

// Used in Venues/Clubs/DJs feeds to surface the entity itself.
export function EntityCard({ entity, kind }) {
  const [followed, setFollowed] = useState(false)
  const route = `/${kind}s/${entity.id}`

  const subtitle =
    kind === 'dj'
      ? entity.genres.map((g) => getGenre(g)?.label).filter(Boolean).join(' · ')
      : entity.area || ''

  return (
    <article className="border-b border-border/60">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link to={route} className="shrink-0">
          <img
            src={entity.avatar}
            alt={entity.name}
            className="h-11 w-11 rounded-full object-cover"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={route}
            className="font-medium text-sand text-sm truncate hover:text-gold-light flex items-center gap-2"
          >
            {entity.name}
          </Link>
          <p className="text-xs text-muted truncate">{subtitle}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setFollowed((f) => !f)
          }}
          className={
            'px-3 py-1.5 rounded-full text-[0.55rem] tracking-[0.25em] uppercase border transition ' +
            (followed
              ? 'border-sand/15 text-sand/60'
              : 'bg-gold/15 border-gold/40 text-gold-light hover:bg-gold/25')
          }
        >
          {followed ? 'Following' : 'Follow'}
        </button>
      </header>

      <Link to={route}>
        <img
          src={entity.cover}
          alt=""
          className="block w-full aspect-square object-cover bg-surface"
          loading="lazy"
        />
      </Link>

      <div className="px-4 py-4">
        <p className="text-sm text-sand/90">{entity.blurb || entity.bio}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          {entity.rating != null && (
            <span className="flex items-center gap-1">
              <Star size={12} fill="currentColor" className="text-gold" />
              {entity.rating.toFixed(1)}
              <span className="text-sand/40">
                ({formatCount(entity.ratingCount)})
              </span>
            </span>
          )}
          {entity.followerCount != null && (
            <span className="flex items-center gap-1">
              <Users size={12} />
              {formatCount(entity.followerCount)} followers
            </span>
          )}
          {entity.address && (
            <span className="flex items-center gap-1 truncate min-w-0">
              <MapPin size={12} />
              <span className="truncate">{entity.area || entity.address}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
