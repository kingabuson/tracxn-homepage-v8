import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Building2, Search, Users, TrendingUp, PieChart, Globe,
    Landmark, FileText, Scale, ShieldCheck, BookOpen, Banknote,
    BarChart3, LineChart, Newspaper, CalendarDays, Target, Layers,
    GitBranch, Filter, Bell, Smartphone, ListChecks, KanbanSquare,
    Database, Braces, Download, Server, Plug, FileSpreadsheet,
    ArrowRight,
} from 'lucide-react';
import './FeaturesTabs.css';

/**
 * Offerings — v8 R2, restyled to the reference layout:
 * a compact h2, a centered row of icon+label tabs (active tab underlined by the
 * auto-advance loading bar), then a two-column body — copy + arrow-row
 * sub-features on the left, an HTML "radar" graphic (concentric rings, center
 * tile, floating icon tiles) on the right. Fits a single fold on desktop.
 * Fonts: PT Serif (headings) + Roboto (body) only.
 */

const features = [
    {
        id: '01',
        title: 'Rich Firmographic Data',
        heading: '8M+ companies. One data layer deep enough to trust.',
        subtext: 'The deepest company data layer in private markets - human-verified, not just scraped.',
        bullets: [
            '8M+ companies across 3,000+ sectors and 100+ countries',
            'Full profiles: funding, cap tables, founders, and growth',
            'Tracxn Score benchmarks every company against 1M+ peers'
        ],
        accent: '#2166b0',
        tint: 'rgba(33, 102, 176, 0.08)',
        center: Building2,
        orbit: [Search, Users, TrendingUp, PieChart, Globe, Layers],
    },
    {
        id: '02',
        title: 'Deep Regulatory Data',
        heading: 'Every filing. Every registry. One searchable format.',
        subtext: 'Regulatory filings, decoded and made searchable - built for due diligence at scale.',
        bullets: [
            'Sourced from official registries - MCA, Companies House, SEC',
            'Structured filings: financials, directors, and shareholding',
            'Standardized across jurisdictions for like-for-like comparison'
        ],
        accent: '#0e7490',
        tint: 'rgba(14, 116, 144, 0.08)',
        center: Landmark,
        orbit: [FileText, Scale, ShieldCheck, BookOpen, Banknote, Search],
    },
    {
        id: '03',
        title: 'Sector Market & Reports',
        heading: 'Markets move quarterly. So do our reports.',
        subtext: '1,000+ sector reports, updated every quarter.',
        bullets: [
            'Analyst intelligence on funding, market sizing, and exits',
            'Covers 2,500+ sectors and 30+ geographies, refreshed quarterly',
            'Custom reports on niche or emerging themes, on request'
        ],
        accent: '#15803d',
        tint: 'rgba(21, 128, 61, 0.08)',
        center: BarChart3,
        orbit: [LineChart, Newspaper, CalendarDays, Target, PieChart, Globe],
    },
    {
        id: '04',
        title: 'Workflow Solutions',
        heading: 'Stop juggling five tools to run one deal.',
        subtext: 'From sourcing to tracking to closing - one workspace for the whole deal lifecycle.',
        bullets: [
            'Source proactively - screen 7.7M+ companies across 100+ filters',
            'Track automatically - funding, M&A, and news roll in on their own',
            'Manage the full pipeline in one shared view, on web or mobile'
        ],
        accent: '#b45309',
        tint: 'rgba(180, 83, 9, 0.08)',
        center: GitBranch,
        orbit: [Filter, Bell, KanbanSquare, Smartphone, ListChecks, Users],
    },
    {
        id: '05',
        title: 'Data Solutions',
        heading: 'However you need it - API, export, or custom build.',
        subtext: 'Your data, delivered your way.',
        bullets: [
            'Full API access and bulk exports for your internal systems',
            'Custom data slices built around your exact filters',
            'Pre-built datasets and PoC packs to validate fit fast'
        ],
        accent: '#6D28D9',
        tint: 'rgba(109, 40, 217, 0.08)',
        center: Database,
        orbit: [Braces, Download, Server, Plug, FileSpreadsheet, Layers],
    }
];

const DWELL_MS = 6500;

// Fixed orbit slots (percent coordinates inside the square graphic), roughly
// matching the reference's scatter: two tiles high, two mid, two low.
const ORBIT_SLOTS = [
    { left: '24%', top: '14%' },
    { left: '76%', top: '16%' },
    { left: '90%', top: '46%' },
    { left: '10%', top: '52%' },
    { left: '30%', top: '84%' },
    { left: '72%', top: '82%' },
];

const RadarGraphic = ({ feature, active }) => {
    const Center = feature.center;
    return (
        <div className="ftx-radar" aria-hidden="true">
            {/* Concentric rings */}
            <div className="ftx-ring ftx-ring-outer" />
            <div className="ftx-ring ftx-ring-mid" style={{ background: feature.tint }} />
            <div className="ftx-ring ftx-ring-inner" style={{ borderColor: feature.tint.replace('0.08', '0.4') }} />

            {/* Center brand tile */}
            <div className="ftx-center-tile" style={{ background: feature.accent }}>
                <Center size={34} color="#ffffff" strokeWidth={1.9} />
            </div>

            {/* Floating icon tiles */}
            {feature.orbit.map((Icon, i) => (
                <div
                    key={i}
                    className={`ftx-orbit-tile${active ? ' float' : ''}`}
                    style={{
                        ...ORBIT_SLOTS[i],
                        animationDelay: `${i * 0.55}s`,
                    }}
                >
                    <Icon size={22} color={feature.accent} strokeWidth={1.8} />
                </div>
            ))}
        </div>
    );
};

const Features = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = features.length;

    const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

    // Reduced-motion fallback: the loading-bar animation can't fire
    // animationend, so cycle on a plain timer instead.
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
                <h2 className="ftx-h2">
                    Identify, analyze, and track the world's private markets
                </h2>

                <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Icon + label tabs, underline = the auto-advance loading bar */}
                    <div className="ftx-tabs" role="tablist" aria-label="Tracxn offerings">
                        {features.map((f, i) => {
                            const isActive = i === active;
                            const TabIcon = f.center;
                            return (
                                <button
                                    key={f.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`ftx-panel-${f.id}`}
                                    id={`ftx-tab-${f.id}`}
                                    className={`ftx-tab${isActive ? ' is-active' : ''}`}
                                    onClick={() => go(i)}
                                    onFocus={() => setPaused(true)}
                                    onBlur={() => setPaused(false)}
                                >
                                    <TabIcon
                                        size={16}
                                        strokeWidth={2}
                                        className="ftx-tab-icon"
                                        style={{ color: isActive ? f.accent : undefined }}
                                        aria-hidden="true"
                                    />
                                    <span className="ftx-tab-title">{f.title}</span>
                                    {isActive && (
                                        <span
                                            key={active}
                                            className="ftx-tab-bar run"
                                            style={{
                                                background: f.accent,
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

                    {/* Sliding body */}
                    <div className="ftx-viewport">
                        <div
                            className="ftx-track"
                            style={{ transform: `translateX(-${active * 100}%)` }}
                        >
                            {features.map((f, i) => (
                                <div
                                    key={f.id}
                                    className="ftx-slide"
                                    role="tabpanel"
                                    id={`ftx-panel-${f.id}`}
                                    aria-labelledby={`ftx-tab-${f.id}`}
                                    aria-hidden={i !== active}
                                >
                                    <div className="ftx-body">
                                        <div className="ftx-copy">
                                            <h3 className="ftx-title">{f.heading}</h3>
                                            <p className="ftx-desc">{f.subtext}</p>

                                            <ul className="ftx-rows">
                                                {f.bullets.map((b, bi) => (
                                                    <li key={bi} className="ftx-row">
                                                        <ArrowRight
                                                            size={17}
                                                            strokeWidth={2.2}
                                                            className="ftx-row-arrow"
                                                            style={{ color: f.accent }}
                                                            aria-hidden="true"
                                                        />
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <RadarGraphic feature={f} active={i === active} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
