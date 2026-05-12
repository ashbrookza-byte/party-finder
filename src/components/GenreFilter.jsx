import { GENRES } from '../data'

export function GenreFilter({ value, onChange, className = '' }) {
  return (
    <div
      className={
        'flex gap-2 overflow-x-auto -mx-4 px-4 py-3 no-scrollbar ' + className
      }
    >
      <Chip active={value === null} onClick={() => onChange(null)}>
        All
      </Chip>
      {GENRES.map((g) => (
        <Chip
          key={g.id}
          active={value === g.id}
          onClick={() => onChange(g.id)}
        >
          {g.label}
        </Chip>
      ))}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        'shrink-0 px-3.5 py-1.5 rounded-full text-[0.55rem] tracking-[0.25em] uppercase border transition ' +
        (active
          ? 'bg-gold/20 border-gold/50 text-gold-light'
          : 'border-sand/15 text-sand/60 hover:text-sand hover:border-sand/30')
      }
    >
      {children}
    </button>
  )
}
