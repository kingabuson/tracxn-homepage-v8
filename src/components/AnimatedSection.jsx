import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Reveals its children once they scroll into view.
 *
 * `threshold` must stay at 0: a percentage threshold can never be met by a
 * section taller than `viewport / threshold`, which left the offerings section
 * (~4000px) permanently at opacity 0 on a phone held in landscape. The bottom
 * `rootMargin` delays the reveal until the section is genuinely on screen.
 */
const AnimatedSection = ({ children, delay = 0, style }) => {
    const reduce = useReducedMotion();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0,
        rootMargin: '0px 0px -60px 0px',
    });

    const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 50 };
    const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

    return (
        <motion.div
            ref={ref}
            initial={hidden}
            animate={inView ? shown : hidden}
            transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: 'easeOut' }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
