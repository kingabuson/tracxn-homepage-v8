import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroBackground = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.div
            style={{
                ...styles.container,
                opacity
            }}
            aria-hidden="true"
        >
            {/* Dark purple base */}
            <div style={styles.base} />

            {/* Spinning Rays */}
            <motion.div
                style={styles.raysContainer}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <div style={styles.rays} />
            </motion.div>

            {/* Vignette / Fade overlay to blend edges */}
            <div style={styles.overlay} />
        </motion.div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    base: {
        position: 'absolute',
        inset: 0,
        background: '#003366', // Dark Blue Base
        zIndex: 1,
    },
    raysContainer: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        zIndex: 2,
    },
    rays: {
        width: '100%',
        height: '100%',
        background: `
            repeating-conic-gradient(
                from 0deg at 50% 50%,
                #66CCFF 0deg,
                #003366 10deg,
                #003366 10deg,
                #003366 20deg
            )
        `,
        opacity: 0.8,
        filter: 'blur(40px)',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.6) 100%)
        `,
        zIndex: 3,
        mixBlendMode: 'normal',
    }
};

export default HeroBackground;
