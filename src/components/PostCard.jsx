import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'
import { authorRoute, getAuthor, getEvent } from '../data'
import { formatCount, formatRelative } from '../lib/format'

const KIND_LABEL = {
  announcement: 'Announcement',
  recap: 'Recap',
  'mix-drop': 'New mix',
  lineup: 'Lineup',
  throwback: 'Throwback',
}

const AUTHOR_BADGE = {
  club: 'CLUB',
  venue: 'VENUE',
  dj: 'DJ',
}

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const author = getAuthor(post.author)
  const event = post.eventId ? getEvent(post.eventId) : null
  const route = authorRoute(post.author)

  if (!author) return null

  return (
    <article className="border-b border-border/60">
      {/* Author header */}
      <header className="flex items-center gap-3 px-4 py-3">
        <Link to={route} className="shrink-0">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to={route}
              className="font-medium text-sand text-sm truncate hover:text-gold-light"
            >
              {author.name}
            </Link>
            <span className="text-[0.5rem] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded border border-border text-sand/50">
              {AUTHOR_BADGE[post.author.type]}
            </span>
          </div>
          <p className="text-xs text-muted truncate">
            {author.area || author.hometown || ''} · {formatRelative(post.postedAt)}
          </p>
        </div>
        <span className="text-[0.5rem] tracking-[0.2em] uppercase text-gold whitespace-nowrap">
          {KIND_LABEL[post.kind]}
        </span>
      </header>

      {/* Image */}
      <Link to={event ? `/events/${event.id}` : route}>
        <img
          src={post.image}
          alt=""
          className="block w-full aspect-square object-cover bg-surface"
          loading="lazy"
        />
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 pt-3">
        <button
          onClick={() => setLiked((l) => !l)}
          aria-label="Like"
          className={liked ? 'text-rose-400' : 'text-sand/70 hover:text-sand'}
        >
          <Heart size={22} strokeWidth={1.6} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button aria-label="Comment" className="text-sand/70 hover:text-sand">
          <MessageCircle size={22} strokeWidth={1.6} />
        </button>
        <button aria-label="Share" className="text-sand/70 hover:text-sand">
          <Share2 size={22} strokeWidth={1.6} />
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save"
          className={
            'ml-auto ' + (saved ? 'text-gold' : 'text-sand/70 hover:text-sand')
          }
        >
          <Bookmark
            size={22}
            strokeWidth={1.6}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Counts + caption */}
      <div className="px-4 pt-2 pb-4">
        <p className="text-sm text-sand">
          {formatCount(post.likes + (liked ? 1 : 0))} likes
        </p>
        <p className="text-sm text-sand/90 mt-1">
          <Link to={route} className="font-medium mr-2 hover:text-gold-light">
            {author.name}
          </Link>
          {post.caption}
        </p>
        {event && (
          <Link
            to={`/events/${event.id}`}
            className="mt-3 flex items-center gap-3 p-3 rounded-md bg-surface border border-border hover:border-gold/40 transition"
          >
            <img
              src={event.cover}
              alt=""
              className="h-12 w-12 rounded object-cover shrink-0"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[0.55rem] tracking-[0.25em] uppercase text-gold">
                Event
              </p>
              <p className="text-sm text-sand truncate">{event.name}</p>
              <p className="text-xs text-muted truncate">
                {new Date(event.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <span className="text-gold shrink-0">→</span>
          </Link>
        )}
        {post.comments > 0 && (
          <button className="mt-2 text-xs text-muted hover:text-sand/70">
            View all {post.comments} comments
          </button>
        )}
      </div>
    </article>
  )
}
