import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    Rocket, TrendingUp, Briefcase, Landmark, GitMerge, Lightbulb,
    Building2, Newspaper, ArrowRight, Check,
} from 'lucide-react';
import './CustomerSegments.css';

/**
 * "Built for the entire Private Market Ecosystem" — v8 R6.
 *
 * HubSpot's "Growing a business is hard" layout: a sticky heading block on the
 * left (title + lead + CTA) that stays put, and a two-column grid of small
 * cards on the right that scrolls past it. Each card = a 24px icon inline with
 * the audience name, a dashed rule, two ticked offering points and a "Learn
 * more" link. Icons and links are all one brand blue (ACCENT) rather than a
 * colour per card. Cards fade-and-rise into view as they scroll in.
 *
 * Media & Academia is a single clubbed audience (journalists, publications and
 * universities together).
 */

// One accent for every card — the icons and links are all brand blue.
const ACCENT = '#2563EB';

const segments = [
    {
        id: 'vc',
        title: 'Venture Capital',
        points: [
            'Source startups before the round is announced.',
            'Track portfolio and competitor moves automatically.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-venture-capital-funds',
        icon: Rocket,
    },
    {
        id: 'pe',
        title: 'Private Equity & Growth',
        points: [
            'Screen buyout and growth targets by traction.',
            'Diligence with verified financials and cap tables.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-private-equity-funds',
        icon: TrendingUp,
    },
    {
        id: 'ib',
        title: 'Investment Banks',
        points: [
            'Build buyer and target lists in minutes.',
            'Benchmark valuations against comparable deals.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-investment-banks',
        icon: Briefcase,
    },
    {
        id: 'banks',
        title: 'Banks & NBFCs',
        points: [
            'Source SME and corporate borrowers at scale.',
            'Underwrite on verified regulatory filings.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-banks-and-nbfcs',
        icon: Landmark,
    },
    {
        id: 'corpdev',
        title: 'Corporate M&A & Strategy',
        points: [
            'Map acquisition targets across 2,500+ sectors.',
            'Track competitor M&A and funding activity.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-dev-and-ma-team',
        icon: GitMerge,
    },
    {
        id: 'innovation',
        title: 'Corporate Innovation',
        points: [
            'Scout startups across 3,000+ emerging sectors.',
            'Monitor technology themes as they take off.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-innovation',
        icon: Lightbulb,
    },
    {
        id: 'government',
        title: 'Government & Public Sector',
        points: [
            'Benchmark your ecosystem against peer regions.',
            'Track capital flowing into your region.',
        ],
        link: 'https://w.tracxn.com/customers/tracxn-for-government',
        icon: Building2,
    },
    {
        id: 'media',
        title: 'Media & Academia',
        points: [
            'Cite funding, M&A and IPO datasets.',
            'Research sectors on human-verified profiles.',
        ],
        link: 'https://w.tracxn.com/customers/solutions-for-journalists-publications',
        icon: Newspaper,
    },
];

const SegmentCard = ({ segment, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    const Icon = segment.icon;

    return (
        <a
            ref={ref}
            className={`seg8-card${inView ? ' is-in' : ''}`}
            href={segment.link}
            target="_blank"
            rel="noreferrer"
            style={{ transitionDelay: `${(index % 2) * 80 + Math.floor(index / 2) * 40}ms` }}
        >
            {/* HubSpot card anatomy: icon + title on one row, dashed divider,
                description, then the CTA pinned to the bottom. */}
            <span className="seg8-head">
                <Icon size={24} strokeWidth={1.9} className="seg8-ico" style={{ color: ACCENT }} aria-hidden="true" />
                <span className="seg8-card-title">{segment.title}</span>
            </span>
            <span className="seg8-divider" aria-hidden="true" />
            {/* Two tick points, as HubSpot's cards do. */}
            <span className="seg8-points">
                {segment.points.map((p, pi) => (
                    <span key={pi} className="seg8-point">
                        <Check size={18} strokeWidth={2} className="seg8-tick" aria-hidden="true" />
                        <span>{p}</span>
                    </span>
                ))}
            </span>
            <span className="seg8-card-link" style={{ color: ACCENT }}>
                Learn more
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                <span className="seg8-sr"> about Tracxn for {segment.title} (opens in new tab)</span>
            </span>
        </a>
    );
};

const CustomerSegments = () => {
    return (
        <section className="seg8">
            <div className="seg8-inner">
                {/* Left: sticky heading block */}
                <aside className="seg8-aside">
                    {/* Explicit breaks keep the heading on exactly three lines. */}
                    <h2 className="seg8-h2">
                        Built for the entire
                        <br />
                        <span className="text-gradient-testimonial">
                            Private Market
                            <br />
                            Ecosystem
                        </span>
                    </h2>
                    <p className="seg8-lead">
                        Investors, corporates, banks, NBFCs, and governments run their
                        private-market work on Tracxn.
                    </p>
                    <a className="seg8-cta" href="#hero-demo">
                        Schedule a demo
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                    </a>
                </aside>

                {/* Right: scrolling grid of audience cards */}
                <div className="seg8-cards">
                    {segments.map((s, i) => (
                        <SegmentCard key={s.id} segment={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerSegments;
