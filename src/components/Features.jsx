import React, { useState, useEffect, useRef, useCallback } from 'react';
import FeatureMockup from './FeatureMockup';
import './FeaturesTabs.css';

// Offerings content - sourced from the "Tracxn Homepage - Offerings Section"
// doc (Tab 1 descriptors + bullets; headings picked from the Tab 2 options).
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
        color: '#202124',
        bg: '#f2f0e6',
        animationType: 'scroll'
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
        color: '#202124',
        bg: '#dff3ff',
        animationType: 'float'
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
        color: '#202124',
        bg: '#ECFAE5',
        animationType: 'scroll'
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
        color: '#202124',
        bg: '#F5DAD2',
        animationType: 'float'
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
        color: '#202124',
        bg: '#EDE7F6',
        animationType: 'float'
    }
];

// Dwell per tab before it auto-advances. The loading bar fills over exactly
// this window and its `animationend` is what triggers the advance, so the bar
// and the advance can never drift apart (and pausing the bar pauses both).
const DWELL_MS = 6500;

const Features = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = features.length;

    const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

    // Auto-advance is driven by the active tab's loading bar finishing (see
    // onAnimationEnd below). This effect only exists so that, if the bar can't
    // animate (reduced motion), the section still cycles on a plain timer.
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
                    {/* Horizontal tab bar */}
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
                                    onClick={() => go(i)}
                                    onFocus={() => setPaused(true)}
                                    onBlur={() => setPaused(false)}
                                >
                                    <span className="ftx-tab-num">{f.id}</span>
                                    <span className="ftx-tab-title">{f.title}</span>
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

                    {/* One stretched panel; the track slides sideways between offerings. */}
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
                                    <div className="ftx-card" style={{ background: f.bg, color: f.color }}>
                                        <div className="ftx-card-copy">
                                            <h3 className="ftx-card-title" style={{ color: f.color }}>
                                                {f.heading}
                                            </h3>
                                            <p className="ftx-card-desc" style={{ color: f.color }}>
                                                {f.subtext}
                                            </p>
                                            <ul className="ftx-bullets">
                                                {f.bullets.map((b, bi) => (
                                                    <li key={bi} className="ftx-bullet">
                                                        <span className="ftx-bullet-check" aria-hidden="true">
                                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                                                                <path d="M5 12l4 4L19 7" stroke="#0b3d91" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                className="ftx-btn"
                                                style={{ color: f.bg, backgroundColor: f.color }}
                                            >
                                                Learn more
                                            </button>
                                        </div>

                                        <div className="ftx-card-media">
                                            <div className="ftx-media-inner">
                                                <FeatureMockup
                                                    inView={i === active}
                                                    type={f.animationType}
                                                    altText={f.title}
                                                />
                                            </div>
                                        </div>
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
