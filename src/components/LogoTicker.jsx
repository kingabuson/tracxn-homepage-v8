import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    'Google', 'Samsung', 'Facebook', 'Sequoia', 'Accel', 'Andreessen Horowitz',
    'SoftBank', 'Tiger Global', 'Lightspeed', 'Benchmark', 'Index Ventures'
];

const LogoTicker = () => {
    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <p style={styles.label}>Trusted by leading companies worldwide</p>
                <div style={styles.tickerWrapper}>
                    <motion.div
                        style={styles.ticker}
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: "linear"
                        }}
                    >
                        {[...logos, ...logos, ...logos].map((logo, index) => (
                            <div key={index} style={styles.logoItem}>
                                <span style={styles.logoText}>{logo}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '40px 0',
        backgroundColor: 'var(--color-background)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)',
    },
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
    },
    label: {
        fontSize: '0.9rem',
        color: 'var(--color-text-light)',
        marginBottom: '24px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600,
    },
    tickerWrapper: {
        display: 'flex',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    },
    ticker: {
        display: 'flex',
        gap: '60px',
        paddingLeft: '60px',
    },
    logoItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#9aa0a6', // Muted logo color
        fontFamily: 'var(--font-family-sans)',
    }
};

export default LogoTicker;
