import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    Rocket, TrendingUp, Briefcase, Landmark, GitMerge, Lightbulb,
    Building2, Newspaper, ArrowRight,
} from 'lucide-react';
import './CustomerSegments.css';

/**
 * "Built for the entire Private Market Ecosystem" — v8 R6.
 *
 * HubSpot's "Growing a business is hard" layout: a sticky heading block on the
 * left (title + lead + CTA) that stays put, and a two-column grid of small
 * cards on the right that scrolls past it. Each card = a coloured icon tile,
 * the audience name, a one-line proposition and a "Learn more" link. Cards
 * fade-and-rise into view as they scroll in (HubSpot's reveal), staggered.
 *
 * Media & Academia is a single clubbed audience (journalists, publications and
 * universities together).
 */

const segments = [
    {
        id: 'vc',
        title: 'Venture Capital',
        line: 'Find high-potential startups early — and move before the round is announced.',
        link: 'https://w.tracxn.com/customers/solutions-for-venture-capital-funds',
        icon: Rocket,
        color: '#2563EB',
    },
    {
        id: 'pe',
        title: 'Private Equity & Growth',
        line: 'Find buyout and growth targets, then diligence them properly.',
        link: 'https://w.tracxn.com/customers/solutions-for-private-equity-funds',
        icon: TrendingUp,
        color: '#7C3AED',
    },
    {
        id: 'ib',
        title: 'Investment Banks',
        line: 'Win mandates and execute them on private-market evidence.',
        link: 'https://w.tracxn.com/customers/solutions-for-investment-banks',
        icon: Briefcase,
        color: '#0EA5E9',
    },
    {
        id: 'banks',
        title: 'Banks & NBFCs',
        line: 'Acquire borrowers and underwrite them on verified filings.',
        link: 'https://w.tracxn.com/customers/solutions-for-banks-and-nbfcs',
        icon: Landmark,
        color: '#059669',
    },
    {
        id: 'corpdev',
        title: 'Corporate M&A & Strategy',
        line: 'Screen targets and track consolidation across your industry.',
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-dev-and-ma-team',
        icon: GitMerge,
        color: '#DB2777',
    },
    {
        id: 'innovation',
        title: 'Corporate Innovation',
        line: 'Track emerging technology and the startups worth partnering with.',
        link: 'https://w.tracxn.com/customers/solutions-for-corporate-innovation',
        icon: Lightbulb,
        color: '#EA580C',
    },
    {
        id: 'government',
        title: 'Government & Public Sector',
        line: 'Map, benchmark and grow your regional startup ecosystem.',
        link: 'https://w.tracxn.com/customers/tracxn-for-government',
        icon: Building2,
        color: '#0891B2',
    },
    {
        id: 'media',
        title: 'Media & Academia',
        line: 'Report and research the innovation economy on data that holds up.',
        link: 'https://w.tracxn.com/customers/solutions-for-journalists-publications',
        icon: Newspaper,
        color: '#CA8A04',
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
                <Icon size={24} strokeWidth={1.9} className="seg8-ico" style={{ color: segment.color }} aria-hidden="true" />
                <span className="seg8-card-title">{segment.title}</span>
            </span>
            <span className="seg8-divider" aria-hidden="true" />
            <span className="seg8-card-line">{segment.line}</span>
            <span className="seg8-card-link" style={{ color: segment.color }}>
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
                        Get a demo
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
