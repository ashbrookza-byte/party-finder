import { useState, useEffect } from 'react'

// ── Nav links — edit labels and section IDs to match your page ──
const LINKS = [
    { label: 'About',   id: 'about'   },
    { label: 'Work',    id: 'work'    },
    { label: 'Contact', id: 'contact' },
]

export function NavBar() {
    const [scrolled, setScrolled] = useState(false)
    const [open,     setOpen]     = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 640) setOpen(false) }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setOpen(false)
    }

    const bg = scrolled || open ? 'rgba(10,8,5,0.92)' : 'transparent'

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                height: 52,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 1.6rem',
                background: bg,
                backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
                WebkitBackdropFilter: scrolled || open ? 'blur(14px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                transition: 'background 0.35s, border-color 0.35s',
            }}>
                {/* Logo / wordmark — replace with your own */}
                <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {/* <img src="/logo.png" alt="Logo" style={{ height: 22 }} /> */}
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', letterSpacing: '0.08em', color: 'var(--sand)', opacity: 0.9 }}>
                        Project Name
                    </span>
                </button>

                {/* Desktop links */}
                <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
                    {LINKS.map(l => (
                        <button key={l.id} onClick={() => scrollTo(l.id)} style={linkSt}>
                            {l.label}
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setOpen(o => !o)}
                    style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', color: 'rgba(237,232,223,0.7)', fontSize: '1.3rem', lineHeight: 1 }}
                    aria-label="Menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile drawer */}
            {open && (
                <div style={{
                    position: 'fixed', top: 52, left: 0, right: 0, zIndex: 199,
                    background: 'rgba(10,8,5,0.96)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '1.2rem 0 1.5rem',
                    gap: '0.2rem',
                }}>
                    {LINKS.map(l => (
                        <button key={l.id} onClick={() => scrollTo(l.id)} style={mobileLinkSt}>
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}

const linkSt = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase',
    color: 'rgba(237,232,223,0.5)',
    padding: '4px 0',
    transition: 'color 0.2s',
}

const mobileLinkSt = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase',
    color: 'rgba(237,232,223,0.5)',
    padding: '0.65rem 2rem',
    width: '100%', textAlign: 'center',
    transition: 'color 0.2s',
}
