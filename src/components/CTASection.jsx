import React from 'react';
import EmailCTA from './EmailCTA';
import CtaShapes from './CtaShapes';

/**
 * Closing CTA — v7d.
 *
 * Left-aligned copy and the same email control the hero uses, with an abstract
 * arch-and-circle composition anchored bottom-right. The graphic is background,
 * not a boxed panel sitting beside the copy. (It replaced a rising bar field,
 * which read as a chart the section had no data for.)
 */
const CTASection = ({
    headline = 'Turn Global Data into Decisive Action',
    subhead = 'Join thousands of top investors and corporates running their workflows on Tracxn.',
}) => {
    return (
        <section className="cta7" style={styles.section}>
            <style>{CTA_LAYOUT}</style>
            <CtaShapes />
            <div className="cta7-inner">
                <div className="cta7-copy">
                    <h2 style={styles.headline}>{headline}</h2>
                    <p style={styles.subhead}>{subhead}</p>
                    <EmailCTA id="closing-demo" />
                </div>
            </div>
        </section>
    );
};

const CTA_LAYOUT = `
/* Padding lives here rather than inline so the mobile band can grow to make
   room for the shape strip. */
.cta7 { padding: clamp(64px, 7vw, 92px) 0 clamp(92px, 9.5vw, 132px); }
@media (max-width: 900px) { .cta7 { padding-bottom: 215px; } }

.cta7-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: left;
}
/* The copy cap and the shape width are two halves of one decision: the shapes
   claim the right 44% of the viewport, so the copy has to stop short of that at
   EVERY width, not just at 1440. Measured clearances with these values:
     1024  copy ends 473, shapes start 573  → 100px
     1180  copy ends 584, shapes start 662  →  78px
     1440  copy ends 704, shapes start 806  → 102px
     1920  copy ends 944, shapes start 1220 → 276px */
.cta7-copy { max-width: 560px; }

@media (max-width: 1180px) {
    /* Below this the fixed cap would run into the shapes, so the copy scales
       with the container instead. */
    .cta7-copy { max-width: 46%; }
}
@media (max-width: 900px) {
    /* Shapes move to a strip in the bottom padding, clear of the form, so the
       copy takes the full measure back. */
    .cta7-copy { max-width: none; }
}
`;

const styles = {
    section: {
        position: 'relative',
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
    },
    headline: {
        fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
        fontFamily: '"PT Serif", serif',
        fontWeight: 400,
        color: '#1a1a1a',
        marginBottom: '18px',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        textAlign: 'left',
        // index.css gives every h2 `max-width: 900px; margin: 0 auto`, which
        // centres the heading's BOX inside the container — so text-align alone
        // still left it indented ~150px past the subhead. Undo the box centring.
        maxWidth: 'none',
        marginLeft: 0,
        marginRight: 0,
    },
    subhead: {
        fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
        color: '#5f6368',
        marginBottom: '32px',
        fontFamily: 'var(--font-family-sans)',
        maxWidth: '52ch',
        lineHeight: 1.55,
        textAlign: 'left',
    },
};

export default CTASection;
