import { Outlet } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { TopBar } from './components/TopBar'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-sand flex flex-col">
      <TopBar />
      <main className="flex-1 mx-auto w-full max-w-xl pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
