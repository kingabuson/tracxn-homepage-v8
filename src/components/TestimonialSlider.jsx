import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        text: "Tracxn has been instrumental in our deal sourcing efforts, providing us with competitor analysis and valuable insights into early-stage startups.",
        author: "Naganand Doraswamy",
        role: "Managing Partner, Ideaspring Capital",
        avatar: "https://ui-avatars.com/api/?name=Naganand+Doraswamy&background=random&color=fff",
        logo: "Ideaspring"
    },
    {
        text: "Tracxn is my go-to tool because of the ease of using the platform and looking at various cuts of the data. Shout out to the customer support team as well.",
        author: "Sankalpana Agarwal",
        role: "Innovation, Nuveen",
        avatar: "https://ui-avatars.com/api/?name=Sankalpana+Agarwal&background=random&color=fff",
        logo: "Nuveen"
    },
    {
        text: "We use Tracxn for tracking emerging and upcoming sectors. Sourcing, Tracking and Reports as been instrumental for us to achieve our goals.",
        author: "Mohil Chaturvedi",
        role: "VP, Client Associates",
        avatar: "https://ui-avatars.com/api/?name=Mohil+Chaturvedi&background=random&color=fff",
        logo: "Client Associates"
    },
    {
        text: "Comprehensive information and easy navigation around key data set are two major factors that have helped us while we are looking for companies to Invest.",
        author: "Sudhir Rao",
        role: "Managing Partner, Celesta Capital",
        avatar: "https://ui-avatars.com/api/?name=Sudhir+Rao&background=random&color=fff",
        logo: "Celesta"
    }
];

const TestimonialSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 6000); // Slightly longer for reading
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={styles.section}>
            <div className="container" style={styles.container}>
                <div style={styles.contentGrid}>
                    {/* Left Side: Quote & Text */}
                    <div style={styles.textColumn}>
                        {/* Animated Quote Mark */}
                        <div style={styles.quoteWrapper}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        backgroundPosition: ['100% 0', '0% 0']
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.4, ease: "easeOut" },
                                        backgroundPosition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                                    }}
                                    style={styles.quoteMark}
                                    className="text-gradient-testimonial"
                                >
                                    “
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Animated Testimonial Text */}
                        <div style={styles.textWrapper}>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                                    animate={{
                                        opacity: 1,
                                        clipPath: 'inset(0 0% 0 0)',
                                        backgroundPosition: ['100% 0', '0% 0']
                                    }}
                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                    transition={{
                                        opacity: { duration: 0.1 },
                                        clipPath: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                                        backgroundPosition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                                    }}
                                    style={styles.testimonialText}
                                    className="text-gradient-testimonial"
                                >
                                    {testimonials[index].text}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side: Author Info */}
                    <div style={styles.authorColumn}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                style={styles.authorBlock}
                            >
                                <div style={styles.logo}>{testimonials[index].logo}</div>
                                <div style={styles.profile}>
                                    <img
                                        src={testimonials[index].avatar}
                                        alt={testimonials[index].author}
                                        style={styles.avatar}
                                    />
                                    <div style={styles.meta}>
                                        <div style={styles.name}>{testimonials[index].author}</div>
                                        <div style={styles.role}>{testimonials[index].role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '120px 0',
        backgroundColor: 'var(--color-background)',
        overflow: 'hidden',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '60px',
        alignItems: 'center',
    },
    textColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    quoteWrapper: {
        height: '80px', // Fixed height to prevent layout shift
        display: 'flex',
        alignItems: 'center',
    },
    quoteMark: {
        fontSize: '8rem',
        lineHeight: 1,
        fontFamily: 'serif', // Or a specific quote font
        fontWeight: 'bold',
        display: 'inline-block',
    },
    textWrapper: {
        minHeight: '200px', // Reserve space
    },
    testimonialText: {
        fontSize: '2.5rem',
        lineHeight: 1.3,
        fontWeight: '400', // Lighter weight as requested generally
        fontFamily: 'var(--font-family-sans)', // Roboto/Inter
        margin: 0,
    },
    authorColumn: {
        display: 'flex',
        justifyContent: 'flex-start', // Align left within the column
        paddingLeft: '40px',
        borderLeft: '1px solid #eee',
    },
    authorBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'serif',
        color: '#000000', // Changed to black
        marginBottom: '8px',
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    avatar: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    meta: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#000000', // Changed to black
    },
    role: {
        fontSize: '0.9rem',
        color: '#666',
    }
};

export default TestimonialSlider;
