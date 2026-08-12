import React from 'react';
import { motion } from 'framer-motion';
import EmailCTA from './EmailCTA';

const HERO_KEYFRAMES = `
@media (prefers-reduced-motion: reduce) {
  .hero5b * { animation: none !important; }
}
`;

const stats = [
    { value: '8M+', label: 'Companies' },
    { value: '3,000+', label: 'Sectors' },
    { value: '30+', label: 'Geographies' },
    { value: '1,000+', label: 'Customers' },
];

const segments = [
    'VC',
    'PE',
    'Investment banks',
    'Banks & NBFCs',
    'Corporates',
    'Government & academia',
];

const ease = [0.22, 1, 0.36, 1];

// v7e: light mode only — the dark/light toggle and its stacked dark layer were
// removed. The hero is the light blue-gradient panel at all times.
const HeroEditorial = () => {
    return (
        <section style={styles.section} className="hero-editorial hero5b" id="top">
            <style>{HERO_KEYFRAMES}</style>

            <div style={styles.panel} className="hero5b-panel">
                {/* The bottom-left glow used to hit the white logo strip as a
                    hard edge while the right side already faded out. This carries
                    the whole bottom edge to white so the hero dissolves into the
                    next section everywhere, not just right. */}
                <div style={styles.bottomScrim} aria-hidden="true" />

                <div style={styles.inner} className="hero5b-inner">
                    {/* Top: two columns — copy on the left, curation video on the
                        right. Grows to fill the panel, vertically centred. */}
                    <div style={styles.topRow} className="hero5b-top-row">
                        <div style={styles.top}>
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.05, ease }}
                                style={styles.headline}
                            >
                                Technology +
                                <br />
                                Human-in-the-Loop
                                <br />
                                for Deal Discovery
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.16, ease }}
                                style={styles.subhead}
                            >
                                Access private company profiles, evaluate financials, and track market trends with verified accuracy.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.26, ease }}
                                style={styles.ctaRow}
                                className="hero5b-cta"
                            >
                                <EmailCTA tone="light" id="hero-demo" />
                            </motion.div>
                        </div>

                        {/* Hero banner — a self-contained isometric illustration served
                            from /public. Fully transparent background (the grey oval was
                            removed), so it sits directly on the hero gradient with no card
                            chrome (no white well, border or shadow) and blends in. */}
                        <motion.div
                            initial={{ opacity: 0, y: 18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease }}
                            style={styles.media}
                            className="hero5b-media"
                        >
                            <img
                                src="/herobanner.svg"
                                alt="Analysts exploring private-market company data, dashboards and reports"
                                style={styles.bannerImg}
                                loading="eager"
                            />
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.36, ease }}
                        style={styles.divider}
                    />

                    {/* Bottom: stats + segments */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.42, ease }}
                    >
                        <div style={styles.statsRow} className="hero5b-stats">
                            {stats.map((s) => (
                                <div key={s.label} style={styles.stat}>
                                    <div style={styles.statValue}>{s.value}</div>
                                    <div style={styles.statLabel}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.segmentsRow} className="hero5b-segments">
                            <span style={styles.segmentsLabel}>Built for:</span>
                            <div style={styles.chips}>
                                {segments.map((seg) => (
                                    <span key={seg} style={styles.chip} className="hero5b-chip">
                                        {seg}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const NAVY = '#0a1f44';
const NAVY_MUTED = 'rgba(10, 31, 68, 0.66)';

const styles = {
    section: {
        position: 'relative',
        width: '100%',
        // v7b: no outer strip — the hero background bleeds to the viewport edges.
        padding: 0,
        background: '#FFFFFF',
        fontFamily: '"Roboto", -apple-system, sans-serif',
    },
    panel: {
        position: 'relative',
        width: '100%',
        // v7b: full-bleed — no box. The colour stretches edge to edge, so drop
        // the max-width, rounded corners and shadow. The header is now a solid
        // sticky bar in normal flow, so the hero fills the remaining viewport.
        maxWidth: 'none',
        margin: 0,
        // Reserve for the ~64px sticky header plus a ~20px cushion. Because the
        // inner uses space-between, the "Built for" chips are pinned to the panel
        // bottom; this cushion keeps them ~30px inside the fold even while the
        // entrance animation nudges them down, so they never crop.
        minHeight: 'calc(100dvh - 84px)',
        borderRadius: 0,
        overflow: 'hidden',
        // v5d: soft blue gradients fill the hero box — strongest toward the
        // top-right and a second softer glow in the bottom-left, both fading
        // toward white in the middle so the navy headline/stats stay legible.
        background:
            'radial-gradient(120% 115% at 100% 0%, rgba(156,188,255,0.95) 0%, rgba(202,221,255,0.62) 30%, rgba(234,242,255,0) 60%), ' +
            'radial-gradient(115% 110% at 0% 100%, rgba(156,188,255,0.78) 0%, rgba(202,221,255,0.45) 30%, rgba(234,242,255,0) 58%), ' +
            '#ffffff',
        boxShadow: 'none',
        border: 'none',
        display: 'flex',
    },
    bottomScrim: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 'clamp(140px, 22vh, 260px)',
        zIndex: 1,
        pointerEvents: 'none',
        background:
            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 52%, #ffffff 100%)',
    },
    inner: {
        position: 'relative',
        zIndex: 3,
        width: '100%',
        // Keep the copy + video from stretching edge to edge on wide screens
        // even though the background is now full-bleed.
        maxWidth: '1760px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 'clamp(14px, 2vh, 32px)',
        // Tightened so the full hero — copy, illustration, stats AND the "Built
        // for" chips — clears the first fold on shorter laptop viewports, not
        // just tall ones.
        padding: 'clamp(14px, 2vh, 40px) clamp(28px, 5vw, 72px) clamp(14px, 2vh, 26px)',
    },
    topRow: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(28px, 4vw, 64px)',
        minHeight: 0,
    },
    top: {
        flex: '1 1 56%',
        minWidth: 0,
        maxWidth: '780px',
    },
    media: {
        flex: '1 1 44%',
        minWidth: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bannerImg: {
        // Height-capped in vh so the illustration shrinks on short viewports
        // instead of forcing the hero taller and pushing the chips below the
        // fold. width:auto keeps it proportional under the height cap.
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        // Bumped up after the grey oval was removed — the artwork's visual
        // footprint shrank, so it can carry more height inside the same fold.
        maxHeight: 'min(54vh, 540px)',
        objectFit: 'contain',
        display: 'block',
        marginLeft: 'auto',
    },
    headline: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 500,
        fontSize: 'clamp(32px, 4.2vw, 60px)',
        lineHeight: 1.06,
        letterSpacing: '-0.025em',
        margin: '0 0 clamp(8px, 1.2vw, 14px)',
        color: NAVY,
    },
    subhead: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(16px, 1.5vw, 21px)',
        lineHeight: 1.55,
        color: 'rgba(10, 31, 68, 0.78)',
        maxWidth: '520px',
        margin: '0 0 clamp(12px, 1.5vw, 20px)',
    },
    ctaRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
    },
    divider: {
        height: '1px',
        width: '100%',
        background: 'rgba(10,31,68,0.16)',
        transformOrigin: 'left center',
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 'clamp(16px, 3vw, 48px)',
        marginBottom: 'clamp(6px, 1vw, 12px)',
    },
    stat: {},
    statValue: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(26px, 3vw, 40px)',
        lineHeight: 1.05,
        color: NAVY,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
    },
    statLabel: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(13px, 1.1vw, 16px)',
        color: NAVY_MUTED,
        marginTop: '4px',
    },
    segmentsRow: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px 14px',
    },
    segmentsLabel: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 600,
        // v7e: bumped up from 14px so the "Built for:" label reads a touch
        // stronger against the chips.
        fontSize: 'clamp(15px, 1.3vw, 18px)',
        color: NAVY,
        marginRight: '2px',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    chip: {
        fontFamily: '"Roboto", -apple-system, sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        color: NAVY,
        background: 'rgba(255,255,255,0.5)',
        border: '1px solid rgba(10,31,68,0.2)',
        borderRadius: '999px',
        padding: '8px 16px',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        whiteSpace: 'nowrap',
    },
};

export default HeroEditorial;
