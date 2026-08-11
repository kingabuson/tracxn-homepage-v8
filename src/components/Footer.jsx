import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div className="footer-cols" style={styles.topSection}>
                    {/* Column 1: Company & Connect */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Company</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>About us</a></li>
                            <li><a href="#" style={styles.link}>Our Investors</a></li>
                            <li><a href="#" style={styles.link}>News and Press Resources</a></li>
                            <li><a href="#" style={styles.link}>Terms of Use</a></li>
                            <li><a href="#" style={styles.link}>Privacy</a></li>
                            <li><a href="#" style={styles.link}>GDPR</a></li>
                            <li><a href="#" style={styles.link}>List Your Startup</a></li>
                            <li><a href="#" style={styles.link}>Pricing</a></li>
                            <li><a href="#" style={styles.link}>FAQ</a></li>
                            <li><a href="#" style={styles.link}>Investor Relations</a></li>
                            <li><a href="#" style={styles.link}>ODR Portal</a></li>
                            <li><a href="#" style={styles.link}>Careers</a></li>
                        </ul>

                        <h4 style={{ ...styles.heading, marginTop: '32px' }}>Connect</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Contact Us</a></li>
                            <li><a href="#" style={styles.link}>Schedule Demo</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Sector Research & Customers */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Sector Research</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Tech Sectors</a></li>
                            <li><a href="#" style={styles.link}>Geographies</a></li>
                            <li><a href="#" style={styles.link}>Waves Disrupting Sectors</a></li>
                        </ul>

                        <h4 style={{ ...styles.heading, marginTop: '32px' }}>Customers</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Venture Capital Funds</a></li>
                            <li><a href="#" style={styles.link}>Private Equity Funds</a></li>
                            <li><a href="#" style={styles.link}>Accelerators and Incubators</a></li>
                            <li><a href="#" style={styles.link}>Investment Banks</a></li>
                            <li><a href="#" style={styles.link}>Corporate Innovation</a></li>
                            <li><a href="#" style={styles.link}>Corporate Development and M&A Teams</a></li>
                            <li><a href="#" style={styles.link}>Startup Founders</a></li>
                            <li><a href="#" style={styles.link}>Journalists and Publications</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Discover */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Discover</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Exciting Company Lists</a></li>
                            <li><a href="#" style={styles.link}>Unicorn Club</a></li>
                            <li><a href="#" style={styles.link}>Startups in Sectors</a></li>
                            <li><a href="#" style={styles.link}>Trending Business Models</a></li>
                            <li><a href="#" style={styles.link}>Startups in Geographies</a></li>
                            <li><a href="#" style={styles.link}>Startups by Alma Mater</a></li>
                            <li><a href="#" style={styles.link}>Acquisitions by Corporates</a></li>
                            <li><a href="#" style={styles.link}>Investments by Corporates</a></li>
                            <li><a href="#" style={styles.link}>Investor Lists</a></li>
                        </ul>
                    </div>

                    {/* Column 4: More Lists (No Header) */}
                    <div style={{ ...styles.column, paddingTop: '36px' }}> {/* Align with first item of Discover */}
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Venture Capitalists</a></li>
                            <li><a href="#" style={styles.link}>Private Equity firms</a></li>
                            <li><a href="#" style={styles.link}>Accelerators & Incubators</a></li>
                            <li><a href="#" style={styles.link}>People</a></li>
                            <li><a href="#" style={styles.link}>Investment Banks</a></li>
                            <li><a href="#" style={styles.link}>Angel Networks</a></li>
                            <li><a href="#" style={styles.link}>Single Family Offices</a></li>
                            <li><a href="#" style={styles.link}>Private Debt Funds</a></li>
                            <li><a href="#" style={styles.link}>Social Impact Funds</a></li>
                            <li><a href="#" style={styles.link}>Our Collaborations</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Customer Testimonials */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Customer Testimonials</h4>
                        <ul style={styles.list}>
                            <li><a href="#" style={styles.link}>Venture Capital</a></li>
                            <li><a href="#" style={styles.link}>Private Equity</a></li>
                            <li><a href="#" style={styles.link}>Investment Banks</a></li>
                            <li><a href="#" style={styles.link}>Accelerators & Incubators</a></li>
                            <li><a href="#" style={styles.link}>Corporate Innovation & M&A</a></li>
                            <li><a href="#" style={styles.link}>Other Customers</a></li>
                        </ul>
                    </div>
                </div>

                <div style={styles.bottomSection}>
                    <div className="footer-social" style={styles.socialIcons}>
                        <a href="#" style={styles.icon}>
                            {/* Android Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.0527-.5676.416.416 0 00-.568.0527l-2.0385 3.5308C15.6518 8.1648 13.8863 7.732 12 7.732c-1.8863 0-3.6518.4328-5.219 1.1461L4.7425 5.3473a.416.416 0 00-.568-.0527.416.416 0 00-.0527.5676l1.9973 3.4592C2.6823 11.2647 0 14.984 0 19.268h24c0-4.284-2.6823-8.0033-6.1185-9.9466" /></svg>
                        </a>
                        <a href="#" style={styles.icon}>
                            {/* Apple Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.72-3.03 1.64-.65.84-1.23 2.21-1.05 3.04 1.19.09 2.42-.71 3.01-1.57" /></svg>
                        </a>
                        <a href="#" style={styles.icon}>
                            {/* Chrome Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4.91c2.25 0 4.25.99 5.61 2.55L12 17.09 4.39 7.46c1.36-1.56 3.36-2.55 5.61-2.55zm0 14.18c-2.25 0-4.25-.99-5.61-2.55L12 6.91l7.61 9.63c-1.36 1.56-3.36 2.55-5.61 2.55z" /></svg>
                        </a>
                        <a href="#" style={styles.icon}>
                            {/* LinkedIn Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                        <a href="#" style={styles.icon}>
                            {/* X (Twitter) Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                    </div>
                    <p style={styles.copyright}>
                        © 2025 Tracxn Technologies Limited. All rights reserved. Registered Office: L-248, 2nd Floor, 17th Cross, Sector 6, HSR Layout, Bengaluru, Karnataka 560102. CIN: L72200KA2012PLC065294.
                        <br />
                        Investor Grievances & Compliance: Megha Tibrewal, Company Secretary & Compliance Officer | Email: compliance-officer@tracxn.com | Phone: +91-9036090116.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#001a3d',
        color: '#e0e0e0',
        padding: '40px 0 24px',
        fontSize: '0.82rem',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    topSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        marginBottom: '36px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    heading: {
        color: 'white',
        fontSize: '0.95rem',
        fontWeight: 500,
        marginBottom: '12px',
        fontFamily: 'Inter, sans-serif',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    link: {
        color: '#b0b8c4',
        textDecoration: 'none',
        fontSize: '0.82rem',
        transition: 'color 0.2s',
    },
    bottomSection: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    socialIcons: {
        display: 'flex',
        gap: '20px',
        marginBottom: '16px',
    },
    icon: {
        color: '#b0b8c4',
        transition: 'color 0.2s',
    },
    copyright: {
        color: '#7a869a',
        fontSize: '0.75rem', /* 12px — the floor for legible body text */
        lineHeight: 1.55,
        maxWidth: '900px',
    }
};

export default Footer;
