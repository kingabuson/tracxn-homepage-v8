import React from 'react';

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
    { name: 'IQT', url: iqtLogo },
];

const MARQUEE_KEYFRAMES = `
@keyframes logo-marquee-track {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
`;

const LogoMarquee = () => {
    return (
        <section style={styles.section} aria-label="Trusted by leading firms">
            <style>{MARQUEE_KEYFRAMES}</style>
            <div className="container" style={styles.container}>
                <p style={styles.label}>Trusted by 1,000+ teams worldwide</p>
                <div style={styles.viewport}>
                    <div style={styles.track}>
                        {[...logos, ...logos].map((logo, index) => (
                            <div
                                key={`${logo.name}-${index}`}
                                style={styles.item}
                                aria-hidden={index >= logos.length ? true : undefined}
                            >
                                <img
                                    src={logo.url}
                                    alt={index >= logos.length ? '' : logo.name}
                                    title={logo.name}
                                    style={styles.img}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '56px 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(4,34,58,0.08)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        textAlign: 'center',
    },
    label: {
        fontSize: '0.82rem',
        color: '#6b7280',
        marginBottom: '28px',
        fontFamily: 'var(--font-family-sans)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1.4px',
    },
    viewport: {
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        WebkitMaskImage:
            'linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)',
        maskImage:
            'linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)',
    },
    track: {
        display: 'flex',
        gap: '64px',
        width: 'max-content',
        alignItems: 'center',
        animation: 'logo-marquee-track 40s linear infinite',
        willChange: 'transform',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60px',
        flex: '0 0 auto',
    },
    img: {
        maxHeight: '52px',
        maxWidth: '160px',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        filter: 'saturate(0.9)',
        opacity: 0.85,
    },
};

export default LogoMarquee;
