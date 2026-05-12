import { NavLink } from 'react-router-dom'
import { Home, MapPin, Disc3, Headphones } from 'lucide-react'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/venues', label: 'Venues', icon: MapPin },
  { to: '/clubs', label: 'Clubs', icon: Disc3 },
  { to: '/djs', label: 'DJs', icon: Headphones },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-bg/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-xl grid grid-cols-4">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ' +
              (isActive ? 'text-gold' : 'text-sand/50 hover:text-sand/80')
            }
          >
            <Icon size={22} strokeWidth={1.6} />
            <span className="text-[0.55rem] tracking-[0.2em] uppercase">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
