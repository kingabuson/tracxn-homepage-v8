import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import './CustomerSegments.css';

/**
 * "Built for the entire Private Market Ecosystem" — v8.
 *
 * Reverts to the older "offerings" layout: the eight audiences are a vertical
 * list on the left (a sticky rail), and what Tracxn offers each audience sits
 * in a small card on the right. The page scrolls vertically through the cards
 * and the rail highlights whichever card is in view — the same scroll-rail
 * mechanic the Features section used before v8 moved it to horizontal tabs.
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
        id: 'media',
        title: 'Media & Academia',
        link: 'https://w.tracxn.com/customers/solutions-for-journalists-publications',
        line: 'Report and research the innovation economy on data that holds up.',
        offerings: [
            'Sourced, human-verified company data',
            'Funding, M&A and IPO datasets to cite',
            'Sector reports and trends for context',
        ],
    },
];

const SegmentCard = ({ segment, onActive }) => {
    const { ref, inView } = useInView({ threshold: 0.55, rootMargin: '-15% 0px -20% 0px' });

    useEffect(() => {
        if (inView) onActive(segment.id);
    }, [inView, segment.id, onActive]);

    return (
        <a
            id={`seg-card-${segment.id}`}
            ref={ref}
            className="segx-card"
            href={segment.link}
            target="_blank"
            rel="noreferrer"
        >
            <div className="segx-card-head">
                <span className="segx-card-title">{segment.title}</span>
                <ArrowUpRight className="segx-card-arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <p className="segx-card-line">{segment.line}</p>
            <ul className="segx-card-list">
                {segment.offerings.map((o, i) => (
                    <li key={i} className="segx-card-item">
                        <span className="segx-dot" aria-hidden="true" />
                        <span>{o}</span>
                    </li>
                ))}
            </ul>
            <span className="segx-sr"> (opens in new tab)</span>
        </a>
    );
};

const CustomerSegments = () => {
    const [active, setActive] = useState(segments[0].id);

    const scrollTo = (id) => {
        const el = document.getElementById(`seg-card-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <section className="segx">
            <div className="segx-inner">
                <div className="segx-head">
                    <h2 className="segx-h2">
                        Built for the entire <br />
                        <span className="text-gradient-testimonial">Private Market Ecosystem</span>
                    </h2>
                    <p className="segx-sub">
                        Investors, corporates, banks, NBFCs, and governments run their
                        private-market work on Tracxn.
                    </p>
                </div>

                <div className="segx-grid">
                    {/* Left: sticky vertical list of audiences */}
                    <nav className="segx-rail" aria-label="Audiences">
                        <ul className="segx-rail-list">
                            {segments.map((s) => (
                                <li key={s.id}>
                                    <button
                                        type="button"
                                        className={`segx-rail-item${active === s.id ? ' is-active' : ''}`}
                                        onClick={() => scrollTo(s.id)}
                                        aria-current={active === s.id}
                                    >
                                        {s.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: one small offering card per audience, scrolled vertically */}
                    <div className="segx-cards">
                        {segments.map((s) => (
                            <SegmentCard key={s.id} segment={s} onActive={setActive} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerSegments;
