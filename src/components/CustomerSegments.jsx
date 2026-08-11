import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './CustomerSegments.css';

/**
 * "Built for the entire Private Market Ecosystem" — v8 R3.
 *
 * Scroll-driven, box-free. A sticky viewport holds two columns: the nine
 * audiences as a vertical list on the left, and ONE audience's text on the
 * right — serif heading, one-line proposition, three arrow rows, a quiet
 * "Learn more" link. No cards, borders or fills.
 *
 * The section is tall (one scroll "step" per audience); as the user scrolls,
 * the active audience advances and the text crossfades — outgoing drifts up
 * and fades, incoming rises in — while the rail highlight follows. Clicking a
 * rail item scrolls the window to that audience's step.
 */

const segments = [
    {
        id: 'vc',
        title: 'Venture Capital',
        link: 'https://w.tracxn.com/customers/solutions-for-venture-capital-funds',
        line: 'Find high-potential startups early — and move before the round is announced.',
        offerings: [
            'Proprietary sourcing across 8M+ companies and 100+ filters',
            'Real-time funding, founder and hiring signals',
            'Portfolio and competitor tracking on autopilot',
        ],
    },
    {
        id: 'pe',
        title: 'Private Equity & Growth',
        link: 'https://w.tracxn.com/customers/solutions-for-private-equity-funds',
        line: 'Find buyout and growth targets, then diligence them properly.',
        offerings: [
            'Screen growth-stage targets by sector, geography and traction',
            'Verified financials and cap tables for diligence',
            'Track sector consolidation and comparable deals',
        ],
    },
    {
        id: 'ib',
        title: 'Investment Banks',
        link: 'https://w.tracxn.com/customers/solutions-for-investment-banks',
        line: 'Win mandates and execute them on private-market evidence.',
        offerings: [
            'Build buyer and target lists in minutes',
            'Comparable deals and valuation benchmarks',
            'Live coverage of every sector you pitch',
        ],
    },
    {
        id: 'banks',
        title: 'Banks & NBFCs',
        link: 'https://w.tracxn.com/customers/solutions-for-banks-and-nbfcs',
        line: 'Acquire borrowers and underwrite them on verified filings.',
        offerings: [
            'Source SME and corporate borrowers at scale',
            'Regulatory filings and financial-health checks',
            'Portfolio monitoring with early-warning signals',
        ],
    },
    {
        id: 'corpdev',
        title: 'Corporate M&A & Strategy',
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-dev-and-ma-team',
        line: 'Screen targets and track consolidation across your industry.',
        offerings: [
            'Map targets across 2,500+ sectors and 30+ geographies',
            'Track competitor M&A, funding and launches',
            'Diligence-ready profiles for every shortlist',
        ],
    },
    {
        id: 'innovation',
        title: 'Corporate Innovation',
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-innovation',
        line: 'Track emerging technology and the startups worth partnering with.',
        offerings: [
            'Scout startups across 3,000+ emerging sectors',
            'Monitor technology themes as they take off',
            'Build and manage a partnership pipeline',
        ],
    },
    {
        id: 'government',
        title: 'Government & Public Sector',
        link: 'https://w.tracxn.com/customers/tracxn-for-government',
        line: 'Map, benchmark and grow your regional startup ecosystem.',
        offerings: [
            'Benchmark your ecosystem against peer geographies',
            'Track capital flowing into the region',
            'Identify companies worth supporting and funding',
        ],
    },
    {
        id: 'universities',
        title: 'Universities',
        link: 'https://w.tracxn.com/customers',
        line: 'Research and teach the innovation economy on data that holds up.',
        offerings: [
            'Verified datasets for academic research',
            'Sector taxonomies covering 3,000+ emerging markets',
            'Funding and exit data ready to cite',
        ],
    },
    {
        id: 'journalists',
        title: 'Journalists & Publications',
        link: 'https://w.tracxn.com/customers/solutions-for-journalists-publications',
        line: 'Report on startups and funding with data that holds up.',
        offerings: [
            'Funding, M&A and IPO datasets to cite',
            'Human-verified company profiles for fact-checking',
            'Sector reports and trend data for context',
        ],
    },
];

// Scroll distance per audience. Enough that each one gets a real dwell,
// small enough that nine steps don't feel like a canyon.
const STEP_VH = 52;

const CustomerSegments = () => {
    const [active, setActive] = useState(0);
    const scrollRef = useRef(null);
    const stickyRef = useRef(null);
    const count = segments.length;

    // Map scroll progress through the tall wrapper → active index.
    const onScroll = useCallback(() => {
        const wrap = scrollRef.current;
        const sticky = stickyRef.current;
        if (!wrap || !sticky) return;
        const rect = wrap.getBoundingClientRect();
        const travel = rect.height - sticky.getBoundingClientRect().height;
        if (travel <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        const idx = Math.min(count - 1, Math.floor(progress * count));
        setActive(idx);
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

    // Rail click → scroll the window to that audience's step (mid-step so the
    // floor() lands squarely on it).
    const jumpTo = (i) => {
        const wrap = scrollRef.current;
        const sticky = stickyRef.current;
        if (!wrap || !sticky) return;
        const travel = wrap.offsetHeight - sticky.offsetHeight;
        const top = window.scrollY + wrap.getBoundingClientRect().top;
        window.scrollTo({
            top: top + ((i + 0.5) / count) * travel,
            behavior: 'smooth',
        });
    };

    return (
        <section className="segf">
            <div className="segf-head">
                <h2 className="segf-h2">
                    Built for the entire{' '}
                    <span className="text-gradient-testimonial">Private Market Ecosystem</span>
                </h2>
                <p className="segf-sub">
                    Investors, corporates, banks, NBFCs, and governments run their
                    private-market work on Tracxn.
                </p>
            </div>

            {/* Tall scroll runway; the grid inside stays stuck while it passes. */}
            <div
                ref={scrollRef}
                className="segf-runway"
                style={{ height: `calc(${count * STEP_VH}vh)` }}
            >
                <div ref={stickyRef} className="segf-sticky">
                    <div className="segf-grid">
                        {/* Left: vertical list of audiences */}
                        <nav className="segf-rail" aria-label="Audiences">
                            <ul className="segf-rail-list">
                                {segments.map((s, i) => (
                                    <li key={s.id}>
                                        <button
                                            type="button"
                                            className={`segf-rail-item${active === i ? ' is-active' : ''}`}
                                            onClick={() => jumpTo(i)}
                                            aria-current={active === i}
                                        >
                                            {s.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Right: one audience's text at a time, crossfading */}
                        <div className="segf-panel" aria-live="polite">
                            {segments.map((s, i) => {
                                const state =
                                    i === active ? 'is-active' : i < active ? 'is-before' : 'is-after';
                                return (
                                    <div key={s.id} className={`segf-text ${state}`} aria-hidden={i !== active}>
                                        <h3 className="segf-title">{s.title}</h3>
                                        <p className="segf-line">{s.line}</p>
                                        <ul className="segf-rows">
                                            {s.offerings.map((o, oi) => (
                                                <li key={oi} className="segf-row">
                                                    <ArrowRight
                                                        size={17}
                                                        strokeWidth={2.2}
                                                        className="segf-row-arrow"
                                                        aria-hidden="true"
                                                    />
                                                    <span>{o}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            className="segf-link"
                                            href={s.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            tabIndex={i === active ? 0 : -1}
                                        >
                                            Learn more
                                            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                                            <span className="segf-sr"> about Tracxn for {s.title} (opens in new tab)</span>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerSegments;
