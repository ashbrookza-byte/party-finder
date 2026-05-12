import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/venues', label: 'Venues' },
  { to: '/events', label: 'Events' },
  { to: '/djs', label: 'DJs' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBase =
    'text-[0.6rem] tracking-[0.3em] uppercase transition-colors py-1'
  const linkInactive = 'text-sand/50 hover:text-sand'
  const linkActive = 'text-gold'

  return (
    <>
      <nav
        className={
          'fixed inset-x-0 top-0 z-50 h-14 flex items-center justify-between px-6 transition-all ' +
          (scrolled || open
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent')
        }
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-lg tracking-[0.18em] text-sand"
        >
          PartyFinder<span className="text-gold">.</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="sm:hidden text-sand/70 text-xl leading-none px-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-14 z-40 bg-bg/95 backdrop-blur-md border-b border-border flex flex-col items-center py-4 sm:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive} py-3 w-full text-center`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}
