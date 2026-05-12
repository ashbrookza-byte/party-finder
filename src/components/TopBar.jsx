import { Link, useLocation } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'

const TITLES = {
  '/': 'For you',
  '/venues': 'Venues',
  '/clubs': 'Clubs',
  '/djs': 'DJs',
}

export function TopBar() {
  const { pathname } = useLocation()
  const title = TITLES[pathname]

  return (
    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-md border-b border-border pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-xl h-12 flex items-center justify-between px-4">
        <Link to="/" className="font-serif text-lg tracking-[0.18em] text-sand">
          PartyFinder<span className="text-gold">.</span>
        </Link>
        {title && (
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-sand/55">
            {title}
          </span>
        )}
        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="p-1 text-sand/60 hover:text-sand"
          >
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button
            aria-label="Notifications"
            className="p-1 text-sand/60 hover:text-sand"
          >
            <Bell size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  )
}
