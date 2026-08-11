import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { label: 'Customers', hasDropdown: true },
    { label: 'Offerings', hasDropdown: true },
    { label: 'Company', hasDropdown: true },
    { label: 'Pricing', hasDropdown: false }
];

/**
 * Top navigation — v7e.
 *
 * The floating-pill / dark-toggle header from v7a–d is replaced by the solid,
 * full-width bar that matches the current tracxn.com site: white background, a
 * hairline bottom border, logo on the left with the nav links beside it, and the
 * Login + orange "Sign Up for Free" pair on the right. It is sticky, so it stays
 * pinned to the top of the viewport as the page scrolls.
 */
const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header style={styles.header}>
            <div style={styles.bar}>
                {/* Left: logo + primary nav */}
                <div style={styles.left}>
                    <a href="#top" style={styles.logo} aria-label="Tracxn home">
                        <img src="/tracxn-logo-black.png" alt="Tracxn" style={styles.logoImg} />
                    </a>

                    <nav className="hdr-desktop-nav">
                        <ul style={styles.navList}>
                            {navItems.map((item) => (
                                <li key={item.label} style={styles.navItem}>
                                    <a href={`#${item.label.toLowerCase()}`} style={styles.navLink}>
                                        {item.label}
                                        {item.hasDropdown && (
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '6px' }}>
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Right: auth actions */}
                <div className="hdr-desktop-nav" style={styles.authGroup}>
                    <a href="#login" style={styles.loginLink}>Login</a>
                    <a href="#signup" style={styles.signupBtn}>Sign Up for Free</a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="hdr-burger"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    style={styles.burger}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile dropdown panel */}
            {open && (
                <div className="hdr-mobile-panel" style={styles.mobilePanel}>
                    <ul style={styles.mobileList}>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={`#${item.label.toLowerCase()}`}
                                    style={styles.mobileLink}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="#login" style={styles.mobileLink} onClick={() => setOpen(false)}>Login</a>
                        </li>
                    </ul>
                    <a href="#signup" style={styles.mobileSignup} onClick={() => setOpen(false)}>
                        Sign Up for Free
                    </a>
                </div>
            )}
        </header>
    );
};

const styles = {
    header: {
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#ffffff',
        borderBottom: '1px solid rgba(10, 31, 68, 0.08)',
        boxShadow: '0 1px 2px rgba(10, 31, 68, 0.04)',
    },
    bar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 4vw, 56px)',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(24px, 3vw, 48px)',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 0,
    },
    logoImg: {
        height: '30px',
        display: 'block',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    navItem: {
        margin: '0 clamp(10px, 1.1vw, 18px)',
    },
    navLink: {
        color: '#1f2a3d',
        fontWeight: 500,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.98rem',
    },
    authGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px, 1.8vw, 26px)',
    },
    loginLink: {
        textDecoration: 'none',
        color: '#1f2a3d',
        fontWeight: 500,
        fontSize: '0.98rem',
    },
    signupBtn: {
        backgroundColor: '#ff6b00',
        color: 'white',
        padding: '11px 22px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.98rem',
        transition: 'transform 0.2s ease, background-color 0.2s',
        whiteSpace: 'nowrap',
    },
    burger: {
        display: 'none',
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-main)',
        padding: '4px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobilePanel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px 20px 20px',
        borderTop: '1px solid rgba(10, 31, 68, 0.08)',
        backgroundColor: '#ffffff',
        boxShadow: '0 12px 34px -16px rgba(10, 31, 68, 0.22)',
    },
    mobileList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    mobileLink: {
        display: 'block',
        padding: '14px 4px',
        color: 'var(--color-text-main)',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '1.05rem',
        borderBottom: '1px solid #f0f0f0',
    },
    mobileSignup: {
        marginTop: '12px',
        textAlign: 'center',
        backgroundColor: '#ff6b00',
        color: 'white',
        padding: '14px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1.05rem',
    },
};

export default Header;
