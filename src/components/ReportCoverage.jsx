import React, { useState } from 'react';
import { motion } from 'framer-motion';

const geoData = {
    'Global': { reports: '1,000+', sectors: '3,000+', categories: '15+', geos: '30+' },
    'USA': { reports: '300+', sectors: '800+', categories: '10+', geos: '1' },
    'India': { reports: '250+', sectors: '600+', categories: '8+', geos: '1' },
    'UK': { reports: '150+', sectors: '400+', categories: '6+', geos: '1' },
    'Europe': { reports: '400+', sectors: '1,200+', categories: '12+', geos: '20+' }
};

const ReportCoverage = () => {
    return (
        <section style={styles.section}>
            <div className="container" style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.heading}>Our Reports</h2>

                    <p style={styles.subheading}>
                        Gain a competitive advantage with <strong>expert-verified reports</strong> delivered every quarter.<br />
                        Our research covers <strong>3,000+ sectors</strong> across the global private market ecosystem.
                    </p>
                </div>

                <div style={styles.grid}>
                    {/* Card 1: Sector Reports */}
                    <Card
                        image="/report_gaming.png"
                        title="Sector Reports"
                        description="Gaming Tech - Sector Report"
                        linkText="Get the Report"
                    />

                    {/* Card 2: Investment Landscape Reports */}
                    <Card
                        image="/report_india_tech.png"
                        title="Investment Landscape Reports"
                        description="India Tech - Q1 2025"
                        linkText="Get the Report"
                    />

                    {/* Card 3: Custom Reports */}
                    <Card
                        image="/report_india_ai.jpg"
                        title="Custom Reports"
                        description="India-AI - 2025"
                        linkText="Get the Report"
                    />
                </div>

                <div style={styles.linkWrapper}>
                    <a
                        href="https://w.tracxn.com/report-releases?utm_source=customers&utm_medium=journalists-publications&utm_campaign=report-releases&utm_content=url-bottompage"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.viewAllLink}
                    >
                        View all recent reports <ArrowIcon />
                    </a>
                </div>
            </div>
        </section>
    );
};

const Card = ({ image, title, description, linkText }) => {
    return (
        <div style={styles.cardWrapper}>
            <motion.div
                style={styles.imageContainer}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <img src={image} alt={title} style={styles.cardImage} />
            </motion.div>
            <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{title}</h3>
                <p style={styles.cardDescription}>{description}</p>
                <button style={styles.cardButton}>
                    {linkText} <ArrowIconSmall />
                </button>
            </div>
        </div>
    );
};

// Icons


const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowIconSmall = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const styles = {
    section: {
        padding: '100px 0',
        backgroundColor: 'var(--color-background)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    heading: {
        fontFamily: '"PT Serif", serif',
        fontSize: '3.5rem',
        fontWeight: 400,
        color: '#1a1a1a',
        marginBottom: '24px',
    },
    geoSelector: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px',
    },
    geoLabel: {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#5f6368',
        fontFamily: 'var(--font-family-sans)',
    },
    select: {
        padding: '8px 16px',
        fontSize: '1rem',
        borderRadius: '24px',
        border: '1px solid #dadce0',
        backgroundColor: '#fff',
        color: '#1a73e8',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'var(--font-family-sans)',
        outline: 'none',
        transition: 'all 0.2s',
        appearance: 'none', /* Custom arrow would be better but keeping it simple */
        minWidth: '150px',
        textAlign: 'center',
    },
    subheading: {
        fontSize: '1.25rem',
        color: '#4a4a4a',
        maxWidth: '900px',
        margin: '0 auto',
        lineHeight: 1.6,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        marginBottom: '60px',
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
    },
    imageContainer: {
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        aspectRatio: '16/9', // Ensure consistent aspect ratio for cover images
        cursor: 'pointer',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 500,
        color: '#1a1a1a',
        margin: 0,
        lineHeight: 1.3,
    },
    cardDescription: {
        fontSize: '1.125rem',
        color: '#555',
        margin: 0,
        lineHeight: 1.5,
    },
    cardButton: {
        display: 'inline-flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        padding: 0,
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1a1a1a',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        transition: 'border-color 0.2s',
        marginTop: '8px',
    },
    linkWrapper: {
        textAlign: 'center',
    },
    viewAllLink: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#000',
        textDecoration: 'none',
        borderBottom: '2px solid #000',
        paddingBottom: '4px',
        transition: 'opacity 0.2s',
    },
};

export default ReportCoverage;
