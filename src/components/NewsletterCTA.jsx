import React from 'react';
import EmailCTA from './EmailCTA';

/**
 * Newsletter band — v7e, "tempered warm parchment".
 *
 * The "Kickstart Your Week" India startup round-up capture, rebuilt to this
 * page's own tokens. Copy is the exact locked wording from the reference.
 *
 * Three decisions worth knowing before editing:
 *
 * 1. It sits BETWEEN CoverageSection and TracxnAI (App.jsx): "here is
 *    everything we track" → "get a free weekly slice of it," then the AI
 *    Suite continues the product story. A low-commitment ask placed mid-page
 *    rather than stacked against the closing demo CTA.
 *
 * 2. It is CENTRED and inset, where .cta7 (the closing CTA) is left-aligned
 *    and full-bleed. That difference is load-bearing, not inherited from the
 *    screenshot: two conversion moments that share a silhouette still feel
 *    like one repeated ask no matter how far apart they sit.
 *
 * 3. The form is the SHARED EmailCTA — same 48px height, 9px radius, #f7fafe
 *    fill, paper-grain hatch and 468px measure as the hero's and the closing
 *    CTA's. Only the button colour differs. Do not add a local input here;
 *    that fork is exactly what produced the drift this replaced.
 */

const NewsletterCTA = () => (
    <section className="nl7" aria-label="Newsletter signup">
        <style>{NL_STYLES}</style>

        <div className="nl7-band">
            {/* Decorative dashed flight-paths — see NL_STYLES for why the
                filled paper planes were dropped and the trails kept. */}
            <TrailLeft />
            <TrailRight />

            <div className="nl7-content">
                {/* <p>, not <h2> — see .nl7-title in NL_STYLES. */}
                <p className="nl7-title">
                    Kickstart Your Week with our 5-Minute India Startup Round-up
                </p>
                <p className="nl7-sub">
                    The must-know fundings, M&amp;As, people shifts and all important startup
                    news from India - straight to your inbox
                </p>

                {/*
                  placeholder is NOT passed: EmailCTA's default is already the
                  locked string "Business Email Address".
                  id is REQUIRED — the default 'demo' would collide with the
                  hero's and the closing CTA's label / aria-describedby targets.
                  accent="blue" is delivered as inline custom properties on the
                  <form>, never interpolated into the shared stylesheet.
                */}
                <EmailCTA
                    id="newsletter"
                    accent="blue"
                    align="center"
                    buttonLabel="Subscribe"
                    reserveMessageSpace
                    successMessage={(email) => `Thanks — the round-up is on its way to ${email}.`}
                />
            </div>
        </div>
    </section>
);

/* ---- decorative trails ---------------------------------------------- *
 * Same geometry as the reference's dashed paths, with the filled paper planes
 * removed. Paint comes from --nl7-ink / --nl7-ink-dot on .nl7-band, NOT from
 * fill=/stroke= attributes — attribute colour cannot respond to breakpoints or
 * to forced-colors mode. */

const TrailLeft = () => (
    <svg
        className="nl7-doodle nl7-doodle--left"
        viewBox="0 0 220 240"
        fill="none"
        aria-hidden="true"
        focusable="false"
    >
        <path
            className="nl7-trail"
            d="M18 40 C 70 20, 110 60, 74 96 C 46 124, 6 108, 30 78 C 48 56, 96 66, 120 96 C 150 132, 120 190, 70 200"
        />
        <circle className="nl7-dot" cx="70" cy="200" r="3.5" />
    </svg>
);

const TrailRight = () => (
    <svg
        className="nl7-doodle nl7-doodle--right"
        viewBox="0 0 260 220"
        fill="none"
        aria-hidden="true"
        focusable="false"
    >
        <path
            className="nl7-trail"
            d="M20 150 C 70 168, 120 150, 150 110 C 176 76, 150 30, 110 44 C 82 54, 88 96, 128 100"
        />
        <circle className="nl7-dot" cx="128" cy="100" r="3.5" />
    </svg>
);

const NL_STYLES = `
/* ================================================================== *
 * WHY THESE COLOURS. Converted to HSL, this page's neutrals are ALREADY
 * warm: --color-background #FAF9F8 is hsl(30, 17%, 97.6%) and
 * --color-surface #F4F3F1 is hsl(40, 12%, 95.1%) — hue 30-40, the amber
 * family. The reference cream #fdf4d6 is hsl(46, 91%, 92%): almost the
 * same HUE at five to seven times the SATURATION. Saturation was the only
 * variable out of range, so it is the only one this band changes. Hue
 * stays inside the page's native 30-41 window; saturation drops 91% to
 * ~46%. Still ~3x the page neutrals — the band is meant to read as a
 * distinct offer — but demonstrably a darker member of the same family
 * rather than a stranger. Parchment, not highlighter.
 *
 * There is NO form CSS here. The control is <EmailCTA accent="blue" />.
 * ================================================================== */

.nl7 {
    /* Both neighbours here (CoverageSection, TracxnAI's outer shell) are
       already #FAF9F8, and Features sits one section further up at the same
       tone — a pre-existing run that the page tolerates because the sections
       inside it (the boxed .cov7-panel, TracxnAI's dark inner panel) carry
       their own visual separation rather than the shell colour. The band
       below does the same job here: its parchment fill + shadow read as a
       distinct object regardless of the shell tone, so there is no reason to
       reach for a bespoke value the way the tail-of-page placement needed. */
    background-color: var(--color-background);
    padding: clamp(44px, 5vw, 72px) 24px;
}

.nl7-band {
    position: relative;
    /* Every container on this page is max-width:1200px + padding:0 24px = a
       1152px content measure (.container, .seg7-inner, .cov7-inner,
       .cta7-inner). Matching 1152 lands the band's edges on the same optical
       line as the CTA headline directly below it. */
    max-width: 1152px;
    margin: 0 auto;
    overflow: hidden;
    /* 24px is the testimonial card radius directly above, so band and cards
       read as siblings. */
    border-radius: clamp(16px, 2vw, 24px);
    /* hsl(39, 47%, 94%) -> hsl(41, 46%, 91%): a faint vertical settle, the
       reference's gradient structure without its intensity. */
    background-image: linear-gradient(180deg, #F7F2E9 0%, #F2EBDC 100%);
    /* NOT a new hue: the fill's own hue and saturation, three lightness steps
       down — hsl(39, 42%, 85%). Replaces the foreign gold. */
    border: 1px solid #E9DEC9;
    /* Lifted verbatim from .cov7-panel — the page's existing "boxed panel on
       off-white" treatment. It keeps the now low-saturation fill reading as an
       object rather than a stain. */
    box-shadow: 0 1px 3px rgba(10, 31, 68, 0.05),
                0 20px 44px -32px rgba(10, 31, 68, 0.35);
    /* Bottom is 27px lighter than top ON PURPOSE. The shared control reserves
       a message row under the form (8px margin + 19px min-height) so the band
       cannot jump when a validation or success line appears — but that row is
       empty at rest, which makes a symmetric 56/56 read as bottom-heavy by
       exactly its 27px. Subtracting it balances the band optically at rest
       while keeping the no-layout-shift guarantee. */
    padding: clamp(36px, 4.5vw, 56px) clamp(24px, 5vw, 72px)
             calc(clamp(36px, 4.5vw, 56px) - 27px);

    /* Decorative ink, declared once and inherited by the SVGs. Living in CSS
       rather than in fill=/stroke= attributes is what lets the doodles respond
       to breakpoints and to forced-colors at all. Composites to ~#c4b7a0 —
       the band's own hue at low saturation, so the marks read as shading
       pressed into the parchment, not objects lying on top of it. */
    --nl7-ink: rgba(120, 98, 58, 0.38);
    --nl7-ink-dot: rgba(96, 78, 46, 0.55);
    --nl7-doodle-opacity: 1;
}

.nl7-content {
    position: relative;
    z-index: 1;
    text-align: center;
}

/* ---------- type ---------- *
 * Widths form a narrowing funnel that pulls the eye to the input:
 * title 620px -> subtitle 560px -> the shared control's own 468px. */

.nl7-title {
    /* Rendered as <p>, NOT <h2>. index.css gives every h2 font-size 3.5rem,
       max-width 900px, margin auto and text-align center; responsive.css then
       adds \`h2 { font-size: clamp(...) !important }\`. A class with !important
       does beat that, so an h2 is survivable — but only by carrying two
       !important overrides forever. A <p> escapes all four declarations with
       zero !important, and it corrects the document outline: an email-capture
       band should not claim the same heading rank as the page's real section
       heads. The <section> carries aria-label instead. */
    font-family: var(--font-family-serif);
    font-weight: 400;
    /* Capped at 2.15rem, under CTASection's clamp(2rem, 3.6vw, 3.1rem)
       headline, so the low-commitment ask stays visibly SUBORDINATE to the
       demo ask below it. */
    font-size: clamp(1.5rem, 2.4vw, 2.15rem);
    line-height: 1.22;
    letter-spacing: -0.01em;
    color: #1a1a1a;              /* 14.66:1 on the band's darkest fill */
    max-width: 620px;
    /* index.css gives every <p> margin-bottom 16px and the muted colour —
       both overridden here. */
    margin: 0 auto 14px;
}

.nl7-sub {
    font-family: var(--font-family-sans);
    font-size: clamp(0.95rem, 1.15vw, 1.05rem);
    line-height: 1.55;
    color: var(--color-text-light);   /* #5f6368, same as .seg7-sub. 5.10:1 */
    max-width: 560px;
    margin: 0 auto clamp(22px, 3vw, 30px);
}

/* ---------- decorative trails ---------- *
 * The reference's paper planes are gone; the dashed flight-path they were
 * drawn on stays. The planes were the problem: their golds were the only
 * non-brand hues anywhere on this page, and a filled paper plane is stock
 * email-marketing clip-art in ANY colour — recolouring it would fix the hue
 * and leave the register. A dashed curve is abstract, apt for a weekly
 * dispatch, and belongs to no vendor. Each trail ends in a small solid dot:
 * an arrival mark, not an illustration.
 *
 * Deliberately NOT the CtaShapes arch-and-circle language: CTASection sits
 * directly below and owns that vocabulary. Quoting it 200px above its home
 * would read as a duplicate, not a family resemblance. */

.nl7-doodle {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    opacity: var(--nl7-doodle-opacity);
}
.nl7-trail {
    fill: none;
    stroke: var(--nl7-ink);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 2 8;
}
.nl7-dot { fill: var(--nl7-ink-dot); }

.nl7-doodle--left {
    left: clamp(-30px, -1vw, 10px);
    top: 8px;
    width: clamp(120px, 14vw, 200px);
    height: auto;
}
.nl7-doodle--right {
    right: clamp(-20px, 0vw, 20px);
    top: 50%;
    transform: translateY(-50%);
    width: clamp(140px, 16vw, 240px);
    height: auto;
}

/* ---------- responsive ---------- *
 * The form needs no rules here: the shared control stacks itself at 520px,
 * now the single stacking breakpoint for every email field on the page. */

@media (max-width: 900px) {
    .nl7-band { --nl7-doodle-opacity: 0.75; }
}
@media (max-width: 720px) {
    .nl7-band { --nl7-doodle-opacity: 0.55; }
    .nl7-doodle--left  { width: 100px; }
    .nl7-doodle--right { width: 120px; }
}
@media (max-width: 560px) {
    /* Nothing may sit behind the input. */
    .nl7-doodle--right { display: none; }
}

/* Purely decorative and unreadable once the UA repaints; drop it. */
@media (forced-colors: active) {
    .nl7-doodle { display: none; }
}
`;

export default NewsletterCTA;
