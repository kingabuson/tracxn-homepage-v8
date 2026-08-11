import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Closing-CTA graphic — v7e.
 *
 * v7d put four solid arches here in full-strength brand blue. The shapes were
 * the right idea, but at 100% fill they were the heaviest thing on a page whose
 * every other section is white cards and light tints, so they read as a sticker
 * dropped onto the band rather than as part of it.
 *
 * Same arch-and-circle language, rebuilt to belong: tinted fills and stroked
 * outlines over a soft radial wash, with concentric arcs converging on the
 * bottom-right corner. It is the segment card's glyph at section scale — one
 * graphic idea running through both blocks.
 *
 * v7e sizing note: the composition is anchored to the bottom-right and sized by
 * width only, so it sits low in the band and bleeds off the right and bottom
 * edges — but its tallest arch keeps a clear margin below the section's top edge
 * rather than running off it. The two circles that used to be cropped at the top
 * are removed. Decorative only, hence aria-hidden.
 */

const STYLES = `
.cshp {
    position: absolute;
    /* Anchored to the bottom-right only. The height is the SVG's own aspect
       ratio (width-driven), NOT the full band height — so the composition sits
       low in the section and its tallest arch stays clear of the top edge
       instead of bleeding off it. */
    right: 0;
    bottom: 0;
    width: clamp(280px, 40%, 520px);
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.9s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.cshp.is-in { opacity: 1; transform: none; }
.cshp svg { width: 100%; height: auto; display: block; }

@media (max-width: 900px) {
    /* The copy spans the full width here, so the shapes cannot stay behind it —
       a decorative shape must never compete with type. They drop into the
       band's bottom padding, below the form, still bleeding off the right and
       bottom edges. */
    .cshp { width: 68%; }
}
@media (prefers-reduced-motion: reduce) {
    .cshp { transition: none; opacity: 1; transform: none; }
}
`;

const CtaShapes = () => {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <div ref={ref} className={`cshp${inView ? ' is-in' : ''}`} aria-hidden="true">
            <style>{STYLES}</style>
            {/* The whole viewBox is shown (default meet) and the box sits at the
                section's bottom-right, so the arches bleed off the right and
                bottom edges but their rounded tops keep a clear margin below the
                viewBox top — nothing runs off the section's upper edge, and the
                two circles that used to be cropped there are gone. */}
            <svg viewBox="0 0 420 300" focusable="false">
                <defs>
                    <radialGradient id="ctaWash" cx="78%" cy="72%" r="70%">
                        <stop offset="0%" stopColor="#1a73e8" stopOpacity=".28" />
                        <stop offset="100%" stopColor="#1a73e8" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="ctaArch" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#1a73e8" stopOpacity=".5" />
                        <stop offset="100%" stopColor="#66ccff" stopOpacity=".22" />
                    </linearGradient>
                </defs>

                {/* soft wash so the tints have something to sit on */}
                <rect width="420" height="300" fill="url(#ctaWash)" />

                {/* concentric arcs converging on the bottom-right corner */}
                <g fill="none" stroke="#1a73e8" strokeOpacity=".4">
                    <circle cx="420" cy="300" r="120" />
                    <circle cx="420" cy="300" r="184" strokeOpacity=".3" />
                    <circle cx="420" cy="300" r="248" strokeOpacity=".2" />
                </g>

                {/* tall arch, filled — top of the cap sits at y≈60, well clear of
                    the viewBox top */}
                <path d="M118 300 L118 130 A70 70 0 0 1 258 130 L258 300 Z" fill="url(#ctaArch)" />
                {/* short arch, overlapping and bleeding off the right, outlined so
                    the overlap reads as depth without a second solid mass */}
                <path
                    d="M288 300 L288 178 A66 66 0 0 1 420 178 L420 300 Z"
                    fill="#0596d2"
                    fillOpacity=".2"
                    stroke="#0596d2"
                    strokeOpacity=".5"
                />

                <circle cx="118" cy="232" r="40" fill="#337ab7" fillOpacity=".3" />
                <circle cx="70" cy="176" r="8" fill="#1a73e8" fillOpacity=".5" />
            </svg>
        </div>
    );
};

export default CtaShapes;
