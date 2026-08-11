import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero-bg-final-v2.png';

import permiraLogo from '../assets/logo-permira.png';
import investcorpLogo from '../assets/logo-investcorp.png';
import kaizenvestLogo from '../assets/logo-kaizenvest.png';
import steadviewLogo from '../assets/logo-steadview.png';
import fortinoLogo from '../assets/logo-fortino.png';
import iterativeLogo from '../assets/logo-iterative.png';
import almiLogo from '../assets/logo-almi.png';
import ivycapLogo from '../assets/logo-ivycap.png';
import entreeLogo from '../assets/logo-entreecapital.png';
import iqtLogo from '../assets/logo-iqt.png';

const logos = [
    { name: 'Permira', url: permiraLogo },
    { name: 'Investcorp', url: investcorpLogo },
    { name: 'Kaizenvest', url: kaizenvestLogo },
    { name: 'Steadview Capital', url: steadviewLogo },
    { name: 'Fortino Capital', url: fortinoLogo },
    { name: 'Iterative', url: iterativeLogo },
    { name: 'Almi', url: almiLogo },
    { name: 'IvyCap Ventures', url: ivycapLogo },
    { name: 'Entrée Capital', url: entreeLogo },
    { name: 'IQT', url: iqtLogo }
];

// CSS keyframes injected once for the marquee track
const MARQUEE_KEYFRAMES = `
@keyframes hero-logo-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
`;

const HeroV3 = () => {
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
            <div style={styles.bgLayer}>
                <img
                    src={heroBg}
                    alt="Hero Background"
                    style={styles.bgImage}
                />
            </div>
            <div className="container" style={styles.container}>
                <div style={styles.topSection}>
                    <div style={styles.headerContent}>
                        <h1 style={styles.headline}>
                            Find, analyze, and win <br />
                            <motion.span
                                style={{ ...styles.highlight, backgroundImage: highlightGradient }}
                            >
                                private market deals
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={styles.subhead}
                        >
                            Scale your sourcing with AI-driven insights and expert-vetted data, unified in a
                            single platform for investors, banks, and policy-makers.
                        </motion.p>
                    </div>

                    <div style={styles.ctaGroup}>
                        <button className="btn-donate">Request for demo</button>
                        <a href="#features" style={styles.secondaryCta}>
                            See what's inside &rarr;
                        </a>
                    </div>

                    <div style={styles.logosSection}>
                        <style>{MARQUEE_KEYFRAMES}</style>
                        <p style={styles.trustedBy}>Trusted by 1,000+ teams worldwide</p>
                        <div style={styles.marqueeViewport}>
                            <div style={styles.marqueeTrack}>
                                {[...logos, ...logos].map((logo, index) => (
                                    <div
                                        key={`${logo.name}-${index}`}
                                        style={styles.logoItem}
                                        aria-hidden={index >= logos.length ? true : undefined}
                                    >
                                        <img
                                            src={logo.url}
                                            alt={index >= logos.length ? '' : logo.name}
                                            style={styles.logoImg}
                                            title={logo.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        style={styles.videoContainer}
                    >
                        <div style={styles.videoWrapper}>
                            <video
                                src="https://cdn.tracxn.com/marketing-campaigns/AI_Search_Video_for_homepage_wireframe_qWXUFy_7YCbu6GFAeCCwL.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={styles.videoStyle}
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
        padding: '120px 0 60px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
        padding: '40px 24px 60px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    topSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
    },
    eyebrow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '999px',
        backgroundColor: 'rgba(26, 115, 232, 0.08)',
        color: '#0b3d91',
        fontFamily: 'var(--font-family-sans)',
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        marginBottom: '24px',
        border: '1px solid rgba(26,115,232,0.14)',
        position: 'relative',
        zIndex: 2,
    },
    eyebrowDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#1a73e8,#66CCFF)',
        boxShadow: '0 0 0 3px rgba(26,115,232,0.15)',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    videoContainer: {
        width: '100%',
        margin: '0 auto',
        maxWidth: '1000px',
    },
    headline: {
        fontSize: '4.75rem',
        fontFamily: '"PT Serif", serif',
        fontWeight: 400,
        color: '#1a1a1a',
        marginBottom: '20px',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
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
        fontStyle: 'italic',
    },
    subhead: {
        fontSize: '1.18rem',
        color: '#4a4f55',
        marginBottom: '24px',
        fontFamily: 'var(--font-family-sans)',
        lineHeight: 1.6,
        maxWidth: '780px',
        margin: '0 auto 30px',
        position: 'relative',
        zIndex: 2,
    },
    logosSection: {
        textAlign: 'center',
        marginTop: '48px',
        marginBottom: '48px',
        width: '100%',
    },
    trustedBy: {
        fontSize: '0.82rem',
        color: '#6b7280',
        marginBottom: '24px',
        fontFamily: 'var(--font-family-sans)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
    },
    marqueeViewport: {
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
        WebkitMaskImage:
            'linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)',
        maskImage:
            'linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)',
    },
    marqueeTrack: {
        display: 'flex',
        gap: '64px',
        width: 'max-content',
        alignItems: 'center',
        animation: 'hero-logo-marquee 40s linear infinite',
        willChange: 'transform',
    },
    logoItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '64px',
        flex: '0 0 auto',
    },
    logoImg: {
        maxHeight: '56px',
        maxWidth: '160px',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        filter: 'saturate(0.9)',
        opacity: 0.88,
        transition: 'all 0.25s ease',
    },
    ctaGroup: {
        marginTop: '4px',
        marginBottom: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    secondaryCta: {
        color: '#0b3d91',
        fontFamily: 'var(--font-family-sans)',
        fontWeight: 600,
        fontSize: '0.95rem',
        textDecoration: 'none',
        padding: '10px 14px',
        borderRadius: '8px',
        transition: 'background 0.2s',
    },
    videoWrapper: {
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        backgroundColor: '#000',
    },
    videoStyle: {
        width: '100%',
        height: 'auto',
        display: 'block',
    }
};

export default HeroV3;
