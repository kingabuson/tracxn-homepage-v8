import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const logos = [
    { name: 'Accel', url: 'https://cdn.tracxn.com/images/static/homepage/clients/accel_90x90_1x.png' },
    { name: 'Partech', url: 'https://cdn.tracxn.com/images/static/homepage/clients/partech-wbg_90x90_1x.png' },
    { name: 'IQT', url: 'https://cdn.tracxn.com/images/static/homepage/clients/iqt_90x90_1x.png' },
    { name: 'Palo Alto Networks', url: 'https://cdn.tracxn.com/images/static/homepage/clients/paloalto_90x90_1x.png' },
    { name: 'Maersk', url: 'https://cdn.tracxn.com/images/static/homepage/clients/maersk_90x90_1x.png' }
];

const HeroV2 = () => {
    return (
        <section style={styles.section}>
            {/* Split Screen Layout */}
            <div style={styles.splitContainer}>
                {/* Left Side: Content */}
                <div style={styles.leftPanel}>
                    <div style={styles.textContent}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={styles.headline}
                        >
                            Technology + <br />
                            Human-in-the-Loop <br />
                            for Deal Discovery
                        </motion.h1>

                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={styles.checkList}
                        >
                            <li style={styles.checkItem}>
                                <CheckCircle2 size={20} color="#666" style={styles.checkIcon} />
                                <span>For Investors - VC, PE, IB, Incubators, Angels, Family Offices</span>
                            </li>
                            <li style={styles.checkItem}>
                                <CheckCircle2 size={20} color="#666" style={styles.checkIcon} />
                                <span>For Corporates - M&A, Innovation, Digital Transformation</span>
                            </li>
                            <li style={styles.checkItem}>
                                <CheckCircle2 size={20} color="#666" style={styles.checkIcon} />
                                <span>For Government Agencies, Industry Bodies, Universities</span>
                            </li>
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            style={styles.buttonGroup}
                        >
                            <button style={styles.primaryBtn}>Get started</button>
                            <button style={styles.secondaryBtn}>Schedule Demo</button>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Visual/Video placeholder */}
                <div style={styles.rightPanel}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={styles.visualWrapper}
                    >
                        {/* Placeholder for the video/dashboard preview */}
                        <div style={styles.dashboardMock}>
                            <h3 style={styles.mockText}>Search among <strong>3K+</strong> feeds & <br /><strong>55.3K+</strong> taxonomies</h3>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Logo Ticker Section */}
            <div style={styles.logoSection}>
                <p style={styles.logoLabel}>Partners section</p>
                <div style={styles.logoStrip}>
                    {logos.map((logo, index) => (
                        <motion.img
                            key={index}
                            src={logo.url}
                            alt={logo.name}
                            style={styles.logoImg}
                            title={logo.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    splitContainer: {
        display: 'flex',
        width: '100%',
        minHeight: '85vh',
    },
    leftPanel: {
        flex: '0 0 60%', // 60% width
        backgroundColor: '#f4f5f9',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8%',
    },
    rightPanel: {
        flex: '0 0 40%', // 40% width
        backgroundColor: '#021a2c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
    },
    textContent: {
        maxWidth: '650px',
        paddingTop: '120px',
        paddingBottom: '80px',
    },
    headline: {
        fontSize: '54px',
        fontFamily: '"PT Serif", serif',
        fontWeight: 400,
        color: '#000000',
        lineHeight: 1.15,
        marginBottom: '40px',
        marginTop: 0,
    },
    checkList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 50px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    checkItem: {
        display: 'flex',
        alignItems: 'flex-start',
        fontSize: '1.25rem',
        color: '#333333',
        fontFamily: 'var(--font-family-sans)',
        lineHeight: 1.6,
    },
    checkIcon: {
        marginRight: '12px',
        flexShrink: 0,
        marginTop: '2px', // visually align with text
        strokeWidth: 1.5,
    },
    buttonGroup: {
        display: 'flex',
        gap: '16px',
    },
    primaryBtn: {
        backgroundColor: '#FF6B3A',
        color: '#FFFFFF',
        padding: '16px 36px',
        fontSize: '1rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: '48px',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-sans)',
        transition: 'background-color 0.2s',
    },
    secondaryBtn: {
        backgroundColor: '#FFFFFF',
        color: '#211F54',
        padding: '16px 36px',
        fontSize: '1rem',
        fontWeight: 600,
        border: '1px solid #EFF0F6',
        borderRadius: '48px',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-sans)',
        transition: 'all 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    visualWrapper: {
        width: '100%',
        maxWidth: '500px',
        aspectRatio: '4/3', // approximate shape of the video box in ref
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
    mockText: {
        color: '#FFFFFF',
        fontFamily: 'var(--font-family-sans)',
        fontSize: '1.5rem',
        textAlign: 'center',
        lineHeight: 1.4,
        fontWeight: 300,
    },
    logoSection: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: '60px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
    },
    logoLabel: {
        fontSize: '0.85rem',
        color: '#888',
        textTransform: 'none',
        marginBottom: '24px',
        fontFamily: 'var(--font-family-sans)',
        fontWeight: 400,
    },
    logoStrip: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '60px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        padding: '0 24px',
    },
    logoImg: {
        height: '120px', // requested size increase
        objectFit: 'contain',
        filter: 'grayscale(100%) opacity(0.6)',
        transition: 'all 0.3s ease',
    }
};

export default HeroV2;
