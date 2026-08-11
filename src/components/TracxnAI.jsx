import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Search } from 'lucide-react';

// v7d: cards 1 and 3 are live mockups that actually run (see
// AiSuiteCardVisuals). Card 2 keeps the supplied "Tracxn integration" artwork —
// the original 6.2MB SVG was a wrapper around 16 embedded PNGs, so it ships as
// an 800px WebP (14KB).
import cardImg2 from '../assets/ai-suite-mcp.webp';
import {
    CARD_VISUAL_STYLES,
    ChatCardVisual,
    FilterCardVisual,
} from './AiSuiteCardVisuals';

const queries = [
    'List of companies specialized in Automotive interior',
    'Profitable Crypto Companies in UAE & USA',
    'Military Tech Companies in India with EBITDA > $1M',
    'Apparel Brands with $50-100M Annual Revenue',
];

const aiFeatures = [
    {
        title: 'AI Assistant',
        subtitle: 'Ask in plain English, get a tailored company list back',
        description: 'Natural-language research powered by 100M+ data points',
        Visual: ChatCardVisual,
    },
    {
        title: 'Tracxn MCP',
        subtitle: 'Use Tracxn inside Claude, Gemini, and other AI tools',
        description: 'Real-time, structured, ready-to-use data on demand',
        image: cardImg2,
    },
    {
        title: 'AI Filter',
        subtitle: 'Turn a query into precise, structured filters',
        description: 'Refine company and investor lists in seconds',
        Visual: FilterCardVisual,
    },
];

const AI_STYLES = `
@keyframes ai5b-caret { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.ai5b-caret {
    display: inline-block; width: 2px; height: 1.05em; margin-left: 2px;
    background: #1a73e8; vertical-align: -2px; animation: ai5b-caret 1s step-end infinite;
}
.ai5b-card {
    position: relative;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
    will-change: transform;
    --ai5b-mx: 50%;
    --ai5b-my: 0%;
}
/* Spotlight border glow that follows the cursor - only the border segment
   nearest the pointer lights up, mirroring the tracxn-ai-suite card hover
   (a blurred blob tracking the mouse behind the card face). */
.ai5b-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 26px;
    padding: 2px;
    background: radial-gradient(circle 200px at var(--ai5b-mx) var(--ai5b-my), #4CC2FF 0%, rgba(26,115,232,0.72) 40%, rgba(102,204,255,0) 72%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
}
/* A soft bloom that also tracks the cursor, so the glow reads on the light card. */
.ai5b-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: radial-gradient(circle 130px at var(--ai5b-mx) var(--ai5b-my), rgba(102,204,255,0.16), rgba(102,204,255,0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
}
.ai5b-card:hover::before,
.ai5b-card:hover::after { opacity: 1; }
.ai5b-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 46px -22px rgba(102, 204, 255, 0.5), 0 8px 20px -14px rgba(26, 115, 232, 0.28);
}
@media (prefers-reduced-motion: reduce) {
    .ai5b-card { transition: none; }
    .ai5b-card:hover { transform: none; }
    .ai5b-caret { animation: none; }
}
`;

const ease = [0.22, 1, 0.36, 1];

// Typewriter that types a query, pauses, deletes, then moves to the next.
const useTypewriter = (active) => {
    const [text, setText] = useState('');
    const state = useRef({ q: 0, i: 0, deleting: false });

    useEffect(() => {
        if (!active) return;
        let timer;
        const tick = () => {
            const s = state.current;
            const full = queries[s.q];
            if (!s.deleting) {
                s.i += 1;
                setText(full.slice(0, s.i));
                if (s.i >= full.length) {
                    s.deleting = true;
                    timer = setTimeout(tick, 1600); // hold the finished query
                    return;
                }
                timer = setTimeout(tick, 45 + Math.random() * 45);
            } else {
                s.i -= 1;
                setText(full.slice(0, s.i));
                if (s.i <= 0) {
                    s.deleting = false;
                    s.q = (s.q + 1) % queries.length;
                    timer = setTimeout(tick, 350);
                    return;
                }
                timer = setTimeout(tick, 22);
            }
        };
        timer = setTimeout(tick, 500);
        return () => clearTimeout(timer);
    }, [active]);

    return text;
};

const TracxnAI = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    // A second, non-once observer drives the card mockups, so they run while
    // the cards are on screen and idle once they scroll away. The entrance
    // animation above still uses the triggerOnce observer.
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.15 });
    const typed = useTypewriter(inView);

    // Track the pointer inside each card so the border glow can light up only
    // the segment nearest the cursor (see the .ai5b-card::before radial glow).
    const handleCardMove = (e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--ai5b-mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--ai5b-my', `${e.clientY - r.top}px`);
    };

    return (
        <section ref={ref} style={sty.section}>
            <style>{AI_STYLES}</style>
            <style>{CARD_VISUAL_STYLES}</style>

            {/* The whole panel pops up from below when scrolled into view */}
            <motion.div
                style={sty.panel}
                className="ai5b-panel"
                initial={{ opacity: 0, y: 90, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease }}
            >
                {/* Title */}
                <motion.div
                    style={sty.titleBlock}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.18, ease }}
                >
                    <span style={sty.eyebrow}>Say hello to</span>
                    <h2 style={sty.mainTitle}>Tracxn AI Suite</h2>
                    <p style={sty.claim}>Research that took hours now takes minutes.</p>
                </motion.div>

                {/* Search box with typing animation + AI button */}
                <motion.div
                    style={sty.searchWrap}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease }}
                >
                    <div style={sty.searchBox} className="ai5b-search">
                        <Search size={20} color="#9aa1ad" style={{ flexShrink: 0 }} />
                        <span style={sty.searchText}>
                            {typed}
                            <span className="ai5b-caret" />
                        </span>
                        <span style={sty.aiButton}>
                            <Sparkles size={15} color="#1a73e8" />
                            AI
                        </span>
                    </div>
                </motion.div>

                {/* Feature cards */}
                <div style={sty.grid} className="ai5b-grid" ref={gridRef}>
                    {aiFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="ai5b-card"
                            style={sty.card}
                            onMouseMove={handleCardMove}
                            initial={{ opacity: 0, y: 36 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.42 + index * 0.12, ease }}
                        >
                            <div style={sty.cardImageWrap} className="ai5b-card-visual">
                                {feature.Visual
                                    ? <feature.Visual active={gridInView} />
                                    : <img src={feature.image} alt={feature.title} style={sty.cardImage} loading="lazy" />}
                            </div>
                            <h3 style={sty.cardTitle}>{feature.title}</h3>
                            <p style={sty.cardSubtitle}>{feature.subtitle}</p>
                            <p style={sty.cardDesc}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

const sty = {
    section: {
        position: 'relative',
        background: '#FAF9F8',
        padding: 'clamp(8px, 1vw, 16px)',
    },
    panel: {
        position: 'relative',
        maxWidth: '1760px',
        margin: '0 auto',
        background:
            'radial-gradient(1200px 520px at 50% -12%, rgba(102,204,255,0.30), transparent 62%), linear-gradient(165deg, #F3F8FE 0%, #E8F1FB 55%, #E0ECF9 100%)',
        border: '1px solid rgba(0,51,102,0.08)',
        borderRadius: 'clamp(20px, 3vw, 40px)',
        padding: 'clamp(44px, 6vw, 110px) clamp(24px, 5vw, 90px)',
        boxShadow: '0 40px 90px -50px rgba(10,40,90,0.30)',
        overflow: 'hidden',
    },
    titleBlock: {
        textAlign: 'center',
        marginBottom: 'clamp(32px, 4vw, 52px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    eyebrow: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#1a73e8',
        marginBottom: '14px',
    },
    mainTitle: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: 'clamp(40px, 6vw, 80px)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: '#0a2540',
        margin: 0,
        lineHeight: 1.02,
    },
    claim: {
        fontFamily: '"Roboto", sans-serif',
        color: '#5f6368',
        fontSize: 'clamp(15px, 1.4vw, 18px)',
        margin: '18px 0 0',
        maxWidth: '520px',
    },
    searchWrap: {
        maxWidth: '860px',
        margin: '0 auto clamp(36px, 5vw, 60px)',
        width: '100%',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: '#ffffff',
        border: '1px solid rgba(0,51,102,0.12)',
        borderRadius: '999px',
        padding: '14px 16px 14px 26px',
        height: '68px',
        boxShadow: '0 20px 45px -24px rgba(10,40,90,0.25)',
    },
    searchText: {
        flex: 1,
        fontFamily: '"Roboto", sans-serif',
        fontSize: 'clamp(16px, 1.6vw, 20px)',
        color: '#202124',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        textAlign: 'left',
    },
    aiButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(26,115,232,0.12)',
        color: '#1557b0',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 600,
        fontSize: '15px',
        padding: '10px 18px',
        borderRadius: '999px',
        flexShrink: 0,
        letterSpacing: '0.02em',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(16px, 2vw, 28px)',
    },
    card: {
        background: '#ffffff',
        borderRadius: '24px',
        padding: 'clamp(20px, 2vw, 28px)',
        border: '1px solid #E4ECF5',
        boxShadow: '0 1px 2px rgba(10,40,90,0.06), 0 10px 28px -18px rgba(10,40,90,0.20)',
        display: 'flex',
        flexDirection: 'column',
    },
    cardImageWrap: {
        // `position: relative` anchors the live visual, which fills the well
        // absolutely so its internal layout can use the full square.
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #ffffff 0%, #f1f6fe 100%)',
        border: '1px solid #E4ECF5',
        marginBottom: '22px',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
    },
    cardTitle: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '1.4rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: '#0a2540',
        margin: '0 0 10px',
    },
    cardSubtitle: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '1rem',
        color: '#3c4858',
        lineHeight: 1.45,
        margin: '0 0 12px',
    },
    cardDesc: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '0.9rem',
        color: '#6b7280',
        lineHeight: 1.55,
        margin: 0,
    },
};

export default TracxnAI;
