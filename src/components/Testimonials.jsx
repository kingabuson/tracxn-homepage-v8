import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const videos = [
    {
        id: 1,
        company: 'Palo Alto Networks',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Palo_Alto_Networks_logo.png/640px-Palo_Alto_Networks_logo.png', // Placeholder
        headline: 'How Tracxn Supported Palo Alto in Tackling Evolving Cyber Threats',
        person: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Placeholder
        color: '#343a40'
    },
    {
        id: 2,
        company: 'Tenity',
        logo: 'Tenity', // Text logo for now
        headline: 'Accelerating Innovation with Global Startup Scouting',
        person: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: '#6c757d'
    },
    {
        id: 3,
        company: 'Siemens',
        logo: 'Siemens',
        headline: 'Digital Transformation: Finding the Right Partners',
        person: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: '#495057'
    },
    {
        id: 4,
        company: 'IQT',
        logo: 'IQT',
        headline: 'Strategic Investments in Emerging Technologies',
        person: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: '#adb5bd'
    }
];

const Testimonials = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <section style={styles.section}>
            <div className="container">
                <div className="text-center mb-xl">
                    <h2>See how innovative companies use Tracxn</h2>
                </div>

                <div style={styles.container}>
                    {videos.map((video) => (
                        <motion.div
                            key={video.id}
                            layout
                            onClick={() => setActiveId(video.id)}
                            style={{
                                ...styles.card,
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${video.person})`,
                                flex: activeId === video.id ? 3 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <motion.div layout="position" style={styles.content}>
                                {activeId === video.id ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={styles.expandedContent}
                                    >
                                        <div style={styles.logoExpanded}>{video.company}</div>
                                        <h3 style={styles.headline}>{video.headline}</h3>
                                        <div style={styles.playButton}>▶</div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={styles.collapsedContent}
                                    >
                                        <div style={styles.logoCollapsed}>{video.company}</div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '100px 0',
        backgroundColor: 'white',
    },
    container: {
        display: 'flex',
        gap: '20px',
        height: '500px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    card: {
        borderRadius: '24px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    content: {
        padding: '32px',
        width: '100%',
        color: 'white',
    },
    expandedContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    collapsedContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    logoExpanded: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    logoCollapsed: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        transform: 'rotate(-90deg)',
        whiteSpace: 'nowrap',
    },
    headline: {
        fontSize: '2rem',
        fontWeight: 'bold',
        lineHeight: 1.2,
        maxWidth: '80%',
        color: 'white',
    },
    playButton: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: 'white',
        marginTop: '16px',
        border: '2px solid white',
    }
};

export default Testimonials;
