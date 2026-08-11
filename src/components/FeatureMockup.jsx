import React from 'react';
import { motion } from 'framer-motion';

const FeatureMockup = ({ inView, type = 'static', altText }) => {
    return (
        <div style={styles.container}>
            {/* Background Texture */}
            <div style={styles.gridOverlay} />

            <motion.div
                style={styles.placeholderBox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
            >
                <div style={styles.header}>
                    <div style={styles.dots}>
                        <div style={{ ...styles.dot, backgroundColor: '#eee' }} />
                        <div style={{ ...styles.dot, backgroundColor: '#eee' }} />
                        <div style={{ ...styles.dot, backgroundColor: '#eee' }} />
                    </div>
                </div>

                <div style={styles.content}>
                    <div style={styles.visualGroup}>
                        <motion.div
                            style={styles.circle}
                            animate={inView ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div style={styles.lines}>
                            <div style={{ ...styles.line, width: '80%' }} />
                            <div style={{ ...styles.line, width: '60%' }} />
                            <div style={{ ...styles.line, width: '90%' }} />
                        </div>
                    </div>

                    <div style={styles.label}>{altText} Animation</div>
                </div>

                {/* Scanning effect */}
                <motion.div
                    style={styles.scanLine}
                    animate={inView ? { top: ['0%', '100%', '0%'] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5,
    },
    placeholderBox: {
        width: '80%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        border: '1px solid #eee',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        height: '32px',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
    },
    dots: {
        display: 'flex',
        gap: '6px',
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        gap: '20px',
    },
    visualGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
    },
    circle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#1a73e8',
        opacity: 0.1,
    },
    lines: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    line: {
        height: '6px',
        backgroundColor: '#f0f0f0',
        borderRadius: '3px',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#333',
        marginTop: '10px',
    },
    subLabel: {
        fontSize: '0.75rem',
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    scanLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to bottom, transparent, rgba(26, 115, 232, 0.05), transparent)',
        pointerEvents: 'none',
        zIndex: 5,
    }
};

export default FeatureMockup;
