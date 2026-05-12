// ════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// A full-viewport hero with a background image, title, tagline, and CTA.
// Replace the placeholder values and swap in your own image.
// ════════════════════════════════════════════════════════════════════════════

export function Hero() {
    return (
        <section style={styles.hero} id="hero">
            {/* Background image — add your image to /public and update the src */}
            <div style={styles.bg} />

            {/* Gradient vignette — darkens edges so text reads well */}
            <div style={styles.vignette} />

            {/* Content */}
            <div style={styles.content}>
                <p style={styles.eyebrow}>Your tagline here</p>
                <h1 style={styles.title}>
                    Project<br />
                    <em style={styles.titleEm}>Name</em>
                </h1>
                <p style={styles.sub}>A one-line description of what this is about.</p>
                <button
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    style={styles.cta}
                >
                    Get Started
                </button>
            </div>

            {/* Scroll hint */}
            <div style={styles.hint}>
                <span style={styles.hintText}>Scroll</span>
                <div style={styles.hintLine} />
            </div>
        </section>
    )
}

const styles = {
    hero: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 560,
        overflow: 'hidden',
        background: 'var(--bg)',
    },
    bg: {
        position: 'absolute',
        inset: 0,
        // backgroundImage: "url('/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'linear-gradient(135deg, #1a1208 0%, #0e0b07 100%)', // placeholder — replace with image
    },
    vignette: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(8,6,4,0.3) 0%, transparent 35%, transparent 55%, rgba(8,6,4,0.7) 100%)',
    },
    content: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 'clamp(5rem, 22vh, 9rem) clamp(1.5rem, 6vw, 4rem)',
    },
    eyebrow: {
        fontSize: '0.6rem',
        letterSpacing: '0.45em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: '1.2rem',
        opacity: 0,
        animation: 'riseIn 1s ease forwards 0.4s',
    },
    title: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(3.5rem, 11vw, 9rem)',
        fontWeight: 300,
        lineHeight: 0.9,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#fff',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        opacity: 0,
        animation: 'riseIn 1.2s ease forwards 0.6s',
    },
    titleEm: {
        display: 'block',
        fontStyle: 'italic',
        color: 'var(--gold-light)',
        fontSize: '0.55em',
        letterSpacing: '0.18em',
        marginTop: '0.1em',
    },
    sub: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1rem, 2vw, 1.4rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'rgba(237,232,223,0.5)',
        marginTop: '1.2rem',
        opacity: 0,
        animation: 'riseIn 1s ease forwards 1s',
    },
    cta: {
        marginTop: '2rem',
        background: 'rgba(184,152,106,0.1)',
        border: '1px solid rgba(184,152,106,0.35)',
        borderRadius: 'var(--radius-pill)',
        color: 'rgba(184,152,106,0.9)',
        fontSize: '0.52rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        padding: '0.65rem 1.8rem',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        opacity: 0,
        animation: 'riseIn 1s ease forwards 1.2s',
    },
    hint: {
        position: 'absolute',
        bottom: '2.5rem',
        left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        pointerEvents: 'none',
        opacity: 0,
        animation: 'riseIn 1s ease forwards 1.8s',
    },
    hintText: {
        fontSize: '0.52rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(184,152,106,0.4)',
    },
    hintLine: {
        width: 1,
        height: 40,
        background: 'linear-gradient(to bottom, var(--gold), transparent)',
    },
}
