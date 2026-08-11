import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * Floating "Request for demo" pill anchored to the bottom-center of the viewport.
 * Reveals after the user scrolls past the hero section, mirroring harmonic.ai.
 *
 * Centering is handled by a fixed wrapper using flex (not transform), so the
 * inner motion element can own its own transform stack for the entrance/exit
 * animation without fighting `translateX(-50%)`.
 */
const FloatingCTA = ({ href = '#demo', label = 'Request for demo' }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hero =
            document.querySelector('.hero-editorial') ||
            document.querySelector('section');

        if (!hero || typeof IntersectionObserver === 'undefined') {
            // Fallback: simple scroll threshold of ~one viewport height.
            const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Visible when the hero is no longer intersecting the viewport top
                setVisible(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '0px 0px -85% 0px' }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    return (
        <div style={styles.anchor} aria-hidden={!visible}>
            <AnimatePresence>
                {visible && (
                    <motion.a
                        href={href}
                        aria-label={label}
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -2 }}
                        style={styles.pill}
                    >
                        <span style={styles.label}>{label}</span>
                        <span style={styles.iconWrap} aria-hidden="true">
                            <ArrowUpRight size={16} strokeWidth={2.2} />
                        </span>
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    anchor: {
        position: 'fixed',
        left: 0,
        right: 0,
        // Clears the iOS home indicator / Android gesture bar, which otherwise
        // sits on top of the pill.
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1000,
    },
    pill: {
        pointerEvents: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        padding: '10px 12px 10px 22px',
        background: '#0b0b0c',
        color: '#ffffff',
        borderRadius: '999px',
        textDecoration: 'none',
        boxShadow:
            '0 16px 40px -12px rgba(0,0,0,0.45), 0 2px 8px -2px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-family-sans)',
        fontWeight: 600,
        fontSize: '0.95rem',
        letterSpacing: '0.01em',
        willChange: 'transform, opacity',
    },
    label: {
        color: '#ffffff',
        whiteSpace: 'nowrap',
    },
    iconWrap: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.16)',
        color: '#ffffff',
    },
};

export default FloatingCTA;
