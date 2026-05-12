import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Venues from './pages/Venues.jsx'
import VenueDetail from './pages/VenueDetail.jsx'
import Clubs from './pages/Clubs.jsx'
import ClubDetail from './pages/ClubDetail.jsx'
import DJs from './pages/DJs.jsx'
import DJDetail from './pages/DJDetail.jsx'
import EventDetail from './pages/EventDetail.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<Venues />} />
          <Route path="venues/:id" element={<VenueDetail />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="clubs/:id" element={<ClubDetail />} />
          <Route path="djs" element={<DJs />} />
          <Route path="djs/:id" element={<DJDetail />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
