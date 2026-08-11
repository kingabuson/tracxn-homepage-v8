import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero-bg-final-v2.png';

const words = ["Private Market Data", "Startups", "Scaleups", "Unicorns", "Exits"];

const TestSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { scrollY } = useScroll();
    const highlightGradient = useTransform(
        scrollY,
        [0, 300],
        [
            'linear-gradient(90deg, #003366 0%, #003366 20%, #003366 30%, #66CCFF 40%, #003366 50%, #66CCFF 60%, #003366 70%, #003366 80%, #003366 100%)',
            'linear-gradient(90deg, #003366 0%, #003366 20%, #003366 30%, #66CCFF 40%, #003366 50%, #66CCFF 60%, #003366 70%, #003366 80%, #003366 100%)'
        ]
    );

    return (
        <section style={styles.hero}>
            {/* Background Image Layer */}
            <div style={styles.bgLayer}>
                <img
                    src={heroBg}
                    alt="Hero Background"
                    style={styles.bgImage}
                />
            </div>

            {/* Content Layer */}
            <div className="container text-center" style={styles.contentContainer}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 style={styles.headline}>
                        The Definitive Source for <br />
                        <span style={styles.wordWrapper}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[index]}
                                    initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                                    animate={{
                                        opacity: 1,
                                        clipPath: 'inset(0 0% 0 0)',
                                        backgroundPosition: ['100% 0', '0% 0']
                                    }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{
                                        opacity: { duration: 0.1 },
                                        clipPath: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }, // Custom ease for sharper reveal
                                        backgroundPosition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                                    }}
                                    style={{
                                        ...styles.highlight,
                                        backgroundImage: highlightGradient,
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                            {/* Invisible spacer to ensure no clipping and correct width */}
                            <span style={{ opacity: 0 }}>Private Market Data</span>
                        </span>
                    </h1>
                    <p style={styles.subhead}>
                        Track 4.9M+ companies. Verified by analysts. Trusted by the best.
                    </p>
                    <div style={styles.ctaGroup}>
                        <a href="#search" className="btn btn-primary" style={styles.ctaButton}>Search for a Company</a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    style={styles.dashboardWrapper}
                >
                    <div style={styles.browserFrame}>
                        <div style={styles.browserHeader}>
                            <div style={styles.dots}>
                                <span style={{ ...styles.dot, background: '#ff5f57' }}></span>
                                <span style={{ ...styles.dot, background: '#ffbd2e' }}></span>
                                <span style={{ ...styles.dot, background: '#28c940' }}></span>
                            </div>
                            <div style={styles.addressBar}>tracxn.com/dashboard</div>
                        </div>
                        <img
                            src="/dashboard-mockup.png"
                            alt="Tracxn Dashboard Preview"
                            style={styles.dashboardImage}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        position: 'relative',
        width: '100%',
        minHeight: '800px',
        overflow: 'hidden',
        padding: '120px 0 60px',
    },
    bgLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'bottom', // Ensure the colored bottom part is visible
    },
    contentContainer: {
        position: 'relative',
        zIndex: 1,
    },
    headline: {
        fontSize: '5rem',
        fontWeight: '500', // Reduced from 600
        marginBottom: '24px',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-main)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wordWrapper: {
        position: 'relative',
        display: 'inline-block',
        height: '1.4em', // Increased to prevent clipping of descenders
        overflow: 'hidden',
        minWidth: 'auto',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle', // Changed from bottom to middle
        marginBottom: '0', // Removed negative margin
        marginTop: '-0.1em', // Slight adjustment for visual centering
        textAlign: 'center', // Ensure text is centered within the wrapper
        width: '100%', // Take full width of the container
        paddingRight: 0, // Remove padding to ensure strict centering
    },
    highlight: {
        // backgroundImage is now set dynamically in the component
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        paddingRight: '5px', // Adjust padding for italic/slant if needed
    },
    subhead: {
        fontSize: '1.5rem',
        color: 'var(--color-text-light)',
        marginBottom: '40px',
        maxWidth: '1000px', // Increased to allow single line
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ctaGroup: {
        marginBottom: '80px',
    },
    ctaButton: {
        padding: '16px 32px',
        fontSize: '1.125rem',
        borderRadius: 'var(--radius-sm)',
    },
    dashboardWrapper: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        perspective: '1000px',
    },
    browserFrame: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    browserHeader: {
        height: '40px',
        backgroundColor: '#f1f3f4',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid #e0e0e0',
    },
    dots: {
        display: 'flex',
        gap: '8px',
        marginRight: '16px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
    },
    addressBar: {
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '4px 12px',
        fontSize: '12px',
        color: '#5f6368',
        flexGrow: 1,
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    dashboardImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
    }
};

export default TestSection;
