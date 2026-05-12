import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-sand">
      <NavBar />
      <main className="pt-14">
        <Outlet />
      </main>
      <footer className="mt-24 border-t border-border/60 py-8 text-center text-xs tracking-[0.3em] uppercase text-muted">
        Cape Town · Built for the night
      </footer>
    </div>
  )
}
