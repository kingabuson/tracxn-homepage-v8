import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Building2, Users, TrendingUp, Landmark, Scale, ShieldCheck,
    LineChart, BarChart3, CalendarDays, Filter, Bell, Smartphone,
    Braces, Download, Server,
} from 'lucide-react';
import './FeaturesTabs.css';

/**
 * Offerings — v8 R5: Apollo's pinned scroll-driven tab section.
 *
 * Like the live apollo.io reference: the h2 scrolls away normally, then the
 * section PINS (sticky viewport inside a tall runway) and further scrolling
 * steps horizontally through the five offerings — the track translates with a
 * ~450ms ease, the active pill follows, and once the last offering has been
 * seen the section releases and the page continues. Clicking a pill scrolls
 * the window to that offering's step. Colours sampled from the recording;
 * fonts ours (PT Serif headline, Roboto elsewhere).
 */

const features = [
    {
        id: '01',
        title: 'Rich Firmographic Data',
        heading: '8M+ companies. One data layer deep enough to trust.',
        pill: '#F7FD26',
        cardBg: '#3F3935',
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
        pill: '#A8A0E6',
        cardBg: '#363048',
        bullets: [
            { icon: Landmark, text: 'Sourced from official registries - MCA, Companies House, SEC' },
            { icon: Scale, text: 'Structured filings: financials, directors, and shareholding' },
            { icon: ShieldCheck, text: 'Standardized across jurisdictions for like-for-like comparison' },
        ],
        media: { type: 'image', src: '/images/feature-1.png' },
    },
    {
        id: '03',
        title: 'Sector Market & Reports',
        heading: 'Markets move quarterly. So do our reports.',
        pill: '#FFB3F3',
        cardBg: '#4C2827',
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
        pill: '#C6DCFB',
        cardBg: '#202929',
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
        pill: '#BFE8C5',
        cardBg: '#26332B',
        bullets: [
            { icon: Braces, text: 'Full API access and bulk exports for your internal systems' },
            { icon: Download, text: 'Custom data slices built around your exact filters' },
            { icon: Server, text: 'Pre-built datasets and PoC packs to validate fit fast' },
        ],
        media: { type: 'image', src: '/images/feature-4.png' },
    },
];

const Features = () => {
    const [active, setActive] = useState(0);
    const runwayRef = useRef(null);
    const stickyRef = useRef(null);
    const count = features.length;

    // Scroll progress through the runway → active step.
    const onScroll = useCallback(() => {
        const runway = runwayRef.current;
        const sticky = stickyRef.current;
        if (!runway || !sticky) return;
        const rect = runway.getBoundingClientRect();
        const travel = rect.height - sticky.getBoundingClientRect().height;
        if (travel <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        setActive(Math.min(count - 1, Math.floor(progress * count)));
    }, [count]);

    useEffect(() => {
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [onScroll]);

    // Pill click → jump the window to that offering's step (mid-step so the
    // floor() lands squarely on it).
    const jumpTo = (i) => {
        const runway = runwayRef.current;
        const sticky = stickyRef.current;
        if (!runway || !sticky) return;
        const travel = runway.offsetHeight - sticky.offsetHeight;
        const top = window.scrollY + runway.getBoundingClientRect().top;
        window.scrollTo({
            top: top + ((i + 0.5) / count) * travel,
            behavior: 'smooth',
        });
    };

    return (
        <section id="features" className="ftx">
            {/* Normal-flow heading — scrolls away before the section pins. */}
            <div className="container">
                <div className="ftx-head">
                    <h2 className="ftx-h2">
                        Identify, analyze, and track <br />
                        the world's private markets
                    </h2>
                </div>
            </div>

            {/* Tall runway; the sticky viewport pins while it passes and the
                track steps horizontally through the offerings. */}
            <div
                ref={runwayRef}
                className="ftx-runway"
                style={{ height: `${count * 85}vh` }}
            >
                <div ref={stickyRef} className="ftx-sticky">
                    <div className="container ftx-frame">
                        {/* Pill row */}
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
                                        onClick={() => jumpTo(i)}
                                    >
                                        <span className="ftx-tab-title">{f.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Horizontal track — slides one viewport per step */}
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
                                                    aria-label={`${f.title} demo`}
                                                />
                                            ) : (
                                                <img
                                                    className="ftx-media-shot"
                                                    src={f.media.src}
                                                    alt={`${f.title} interface`}
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
