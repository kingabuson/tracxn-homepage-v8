import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How accurate is Tracxn data?",
        answer: "Tracxn combines AI-powered data aggregation with a rigorous 'Human-in-the-loop' verification process. Our domain experts verify critical data points, ensuring you get the most reliable private market intelligence available."
    },
    {
        question: "How does Tracxn compare to other data platforms?",
        answer: "While others focus on raw data volume or community contributions, Tracxn prioritizes verified accuracy and predictive intelligence. We track 6M+ entities with a focus on emerging startups and 'Soonicorns' that others often miss."
    },
    {
        question: "What sectors does Tracxn cover?",
        answer: "We cover over 3000+ sectors globally, ranging from deep tech (AI, Quantum Computing) to consumer brands (D2C, Fintech). If a sector is emerging anywhere in the world, we are tracking it."
    },
    {
        question: "Can I export data for my investment memos?",
        answer: "Yes. Tracxn allows you to export detailed financial data, cap tables, and market reports directly into your preferred formats, streamlining your due diligence process."
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section style={styles.section}>
            <div className="container" style={styles.container}>
                <h2 style={styles.heading}>Expert Verified Market Intelligence</h2>
                <div style={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={styles.item}>
                            <button
                                style={styles.questionButton}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span style={styles.questionText}>{faq.question}</span>
                                <span style={{
                                    ...styles.icon,
                                    transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}>
                                    ▼
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <p style={styles.answer}>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '100px 0',
        backgroundColor: 'var(--color-surface)',
    },
    container: {
        maxWidth: '1000px', // Increased width for 2 columns
        margin: '0 auto',
        padding: '0 24px',
    },
    heading: {
        fontSize: '3.5rem',
        marginBottom: '60px',
        textAlign: 'center',
        color: 'var(--color-text-main)',
        fontWeight: 400,
    },
    accordion: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // 2 columns
        gap: '24px',
        alignItems: 'start', // Align items to the top
    },
    item: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    questionButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
    },
    questionText: {
        fontSize: '1.2rem',
        fontWeight: 400,
        color: 'var(--color-text-main)',
    },
    icon: {
        fontSize: '0.8rem',
        color: 'var(--color-text-light)',
        transition: 'transform 0.3s ease',
    },
    answer: {
        padding: '0 24px 24px 24px',
        fontSize: '1rem',
        lineHeight: 1.6,
        color: 'var(--color-text-light)',
        margin: 0,
    }
};

export default FAQSection;
