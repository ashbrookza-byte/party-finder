import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="px-6 py-32 max-w-3xl mx-auto text-center">
      <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-3">
        404
      </p>
      <h1 className="font-serif text-5xl">Nothing here.</h1>
      <p className="text-muted mt-4">The party moved.</p>
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 rounded-full text-[0.6rem] tracking-[0.3em] uppercase border border-gold/40 text-gold-light hover:bg-gold/10 transition"
      >
        Back to home
      </Link>
    </div>
  )
}
