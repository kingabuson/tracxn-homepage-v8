import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero-bg-final-v2.png';

const logos = [
    { name: 'Accel', url: 'https://cdn.tracxn.com/images/static/homepage/clients/accel_90x90_1x.png' },
    { name: 'Partech', url: 'https://cdn.tracxn.com/images/static/homepage/clients/partech-wbg_90x90_1x.png' },
    { name: 'IQT', url: 'https://cdn.tracxn.com/images/static/homepage/clients/iqt_90x90_1x.png' },
    { name: 'Palo Alto Networks', url: 'https://cdn.tracxn.com/images/static/homepage/clients/paloalto_90x90_1x.png' },
    { name: 'Maersk', url: 'https://cdn.tracxn.com/images/static/homepage/clients/maersk_90x90_1x.png' }
];

const Hero = () => {
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
        <section style={styles.section}>
            {/* Background Image Layer */}
            <div style={styles.bgLayer}>
                <img
                    src={heroBg}
                    alt="Hero Background"
                    style={styles.bgImage}
                />
            </div>
            <div className="container text-center" style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.headline}>
                        Everything You Need on <br />
                        <motion.span
                            style={{ ...styles.highlight, backgroundImage: highlightGradient }}
                        >
                            Private Market Data
                        </motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={styles.subhead}
                    >
                        AI-powered technology and human intelligence for global deal discovery. <br />
                        A unified data platform for investors, M&A teams, and government agencies.
                    </motion.p>

                    {/* Static Logo Strip - Actual Images */}
                    <div style={styles.logoStrip}>
                        {logos.map((logo, index) => (
                            <motion.div
                                key={index}
                                style={styles.logoItem}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                            >
                                <img
                                    src={logo.url}
                                    alt={logo.name}
                                    style={styles.logoImg}
                                    title={logo.name}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <div style={styles.ctaGroup}>
                        <button className="btn-donate">Request for demo</button>
                    </div>

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
                                src="/dashboard-v2.png"
                                alt="Tracxn Dashboard Preview"
                                style={styles.dashboardImage}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '120px 0 100px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
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
        objectPosition: 'bottom',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
    },
    content: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    headline: {
        fontSize: '4.5rem',
        fontFamily: '"PT Serif", serif',
        fontWeight: 400,
        color: '#1a1a1a',
        marginBottom: '24px',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        position: 'relative',
        zIndex: 2,
    },
    highlight: {
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
    },
    subhead: {
        fontSize: '1.25rem',
        color: '#5f6368',
        marginBottom: '30px',
        fontFamily: 'var(--font-family-sans)',
        lineHeight: 1.6,
        maxWidth: '800px',
        margin: '0 auto 30px',
        position: 'relative',
        zIndex: 2,
    },
    logoStrip: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 2,
    },
    logoItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        height: '80px',
        width: 'auto',
        transition: 'all 0.3s ease',
    },
    ctaGroup: {
        marginTop: '10px',
        marginBottom: '40px',
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

export default Hero;
