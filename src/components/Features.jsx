import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search, FileCheck2, BarChart3, GitBranch, Database,
    Building2, Users, TrendingUp, Landmark, Scale, ShieldCheck,
    LineChart, CalendarDays, Filter, Bell, Smartphone,
    Braces, Download, Server,
} from 'lucide-react';
import './FeaturesTabs.css';

/**
 * Offerings — v8 R4: the Apollo "Turn hours of prospecting into minutes"
 * section, rebuilt 1:1 from the screen recording — same layout, same colours
 * (sampled from the frames), our fonts (PT Serif headline, Roboto elsewhere).
 *
 * Full-width row of equal pills (uppercase, letter-spaced); the active pill
 * takes its offering's pastel colour. Below, a two-column body on white:
 * big serif headline + button pair top-left, icon bullets bottom-left, and a
 * large dark rounded media card on the right. Switching tabs crossfades the
 * body in place (no slide) — the transition visible in the recording. The
 * active pill carries a thin fill bar that auto-advances the cycle.
 */

const features = [
    {
        id: '01',
        title: 'Rich Firmographic Data',
        heading: '8M+ companies. One data layer deep enough to trust.',
        pill: '#F7FD26',        // Apollo neon yellow
        cardBg: '#3F3935',      // dark warm brown
        bullets: [
            { icon: Building2, text: '8M+ companies across 3,000+ sectors and 100+ countries' },
            { icon: Users, text: 'Full profiles: funding, cap tables, founders, and growth' },
            { icon: TrendingUp, text: 'Tracxn Score benchmarks every company against 1M+ peers' },
        ],
        media: { type: 'video', src: 'https://cdn.tracxn.com/marketing-campaigns/Homepage_illustrations_iYYiQe2VRsrWsrBtEFYTi.mp4' },
    },
    {
        id: '02',
        title: 'Deep Regulatory Data',
        heading: 'Every filing. Every registry. One searchable format.',
        pill: '#A8A0E6',        // periwinkle
        cardBg: '#363048',      // dark purple
        bullets: [
            { icon: Landmark, text: 'Sourced from official registries - MCA, Companies House, SEC' },
            { icon: Scale, text: 'Structured filings: financials, directors, and shareholding' },
            { icon: ShieldCheck, text: 'Standardized across jurisdictions for like-for-like comparison' },
        ],
        media: { type: 'image', src: '/images/feature-1.png' },
    },
    {
        id: '03',
        title: 'Markets move quarterly. So do our reports.',
        titleTab: 'Sector Market & Reports',
        heading: 'Markets move quarterly. So do our reports.',
        pill: '#FFB3F3',        // pink
        cardBg: '#4C2827',      // dark maroon
        bullets: [
            { icon: LineChart, text: 'Analyst intelligence on funding, market sizing, and exits' },
            { icon: BarChart3, text: 'Covers 2,500+ sectors and 30+ geographies, refreshed quarterly' },
            { icon: CalendarDays, text: 'Custom reports on niche or emerging themes, on request' },
        ],
        media: { type: 'image', src: '/images/feature-2.png' },
    },
    {
        id: '04',
        title: 'Workflow Solutions',
        heading: 'Stop juggling five tools to run one deal.',
        pill: '#C6DCFB',        // light blue
        cardBg: '#202929',      // near-black green
        bullets: [
            { icon: Filter, text: 'Source proactively - screen 7.7M+ companies across 100+ filters' },
            { icon: Bell, text: 'Track automatically - funding, M&A, and news roll in on their own' },
            { icon: Smartphone, text: 'Manage the full pipeline in one shared view, on web or mobile' },
        ],
        media: { type: 'image', src: '/images/feature-3.png' },
    },
    {
        id: '05',
        title: 'Data Solutions',
        heading: 'However you need it - API, export, or custom build.',
        pill: '#BFE8C5',        // pastel mint (5th, in the same family)
        cardBg: '#26332B',      // dark green
        bullets: [
            { icon: Braces, text: 'Full API access and bulk exports for your internal systems' },
            { icon: Download, text: 'Custom data slices built around your exact filters' },
            { icon: Server, text: 'Pre-built datasets and PoC packs to validate fit fast' },
        ],
        media: { type: 'image', src: '/images/feature-4.png' },
    },
];

// Tab labels: prefer the short tab title where the card heading is long.
const tabLabel = (f) => f.titleTab || f.title;

const DWELL_MS = 6500;

const Features = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = features.length;

    const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

    // Reduced-motion fallback: the pill fill bar can't animate, so cycle on a
    // plain timer instead.
    const reduced = useRef(false);
    useEffect(() => {
        reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
    useEffect(() => {
        if (!reduced.current || paused) return;
        const t = setTimeout(() => go(active + 1), DWELL_MS);
        return () => clearTimeout(t);
    }, [active, paused, go]);

    return (
        <section id="features" className="ftx">
            <div className="container">
                <div className="ftx-head">
                    <h2 className="ftx-h2">
                        Identify, analyze, and track <br />
                        the world's private markets
                    </h2>
                </div>

                <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Full-width pill row */}
                    <div className="ftx-tabs" role="tablist" aria-label="Tracxn offerings">
                        {features.map((f, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={f.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`ftx-panel-${f.id}`}
                                    id={`ftx-tab-${f.id}`}
                                    className={`ftx-tab${isActive ? ' is-active' : ''}`}
                                    style={isActive ? { background: f.pill } : undefined}
                                    onClick={() => go(i)}
                                    onFocus={() => setPaused(true)}
                                    onBlur={() => setPaused(false)}
                                >
                                    <span className="ftx-tab-title">{tabLabel(f)}</span>
                                    {isActive && (
                                        <span
                                            key={active}
                                            className="ftx-tab-bar run"
                                            style={{
                                                animationDuration: `${DWELL_MS}ms`,
                                                animationPlayState: paused ? 'paused' : 'running',
                                            }}
                                            onAnimationEnd={() => go(active + 1)}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Crossfading body — panels stacked, active one fades in place */}
                    <div className="ftx-stage">
                        {features.map((f, i) => (
                            <div
                                key={f.id}
                                className={`ftx-panel${i === active ? ' is-active' : ''}`}
                                role="tabpanel"
                                id={`ftx-panel-${f.id}`}
                                aria-labelledby={`ftx-tab-${f.id}`}
                                aria-hidden={i !== active}
                            >
                                <div className="ftx-copy">
                                    <h3 className="ftx-headline">{f.heading}</h3>

                                    <div className="ftx-ctas">
                                        <a
                                            href="#signup"
                                            className="ftx-btn-dark"
                                            tabIndex={i === active ? 0 : -1}
                                        >
                                            Get started for free
                                        </a>
                                        <a
                                            href="#offerings"
                                            className="ftx-btn-outline"
                                            tabIndex={i === active ? 0 : -1}
                                        >
                                            Learn more
                                        </a>
                                    </div>

                                    <ul className="ftx-points">
                                        {f.bullets.map((b, bi) => {
                                            const Icon = b.icon;
                                            return (
                                                <li key={bi} className="ftx-point">
                                                    <Icon size={19} strokeWidth={1.7} className="ftx-point-icon" aria-hidden="true" />
                                                    <span>{b.text}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="ftx-media" style={{ background: f.cardBg }}>
                                    {f.media.type === 'video' ? (
                                        <video
                                            className="ftx-media-shot"
                                            src={f.media.src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            aria-label={`${tabLabel(f)} demo`}
                                        />
                                    ) : (
                                        <img
                                            className="ftx-media-shot"
                                            src={f.media.src}
                                            alt={`${tabLabel(f)} interface`}
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
