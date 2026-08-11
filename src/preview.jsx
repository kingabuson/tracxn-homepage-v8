// Dev-only harness: renders a single section at scroll 0 so it can be inspected
// without scrolling the full page. Not part of the production bundle.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './responsive.css';

import VideoTestimonials from './components/VideoTestimonials';
import CTASection from './components/CTASection';
import CoverageSection from './components/CoverageSection';
import CustomerSegments from './components/CustomerSegments';
import Features from './components/Features';
import TracxnAI from './components/TracxnAI';
import NewsletterCTA from './components/NewsletterCTA';

const SECTIONS = {
    testimonials: VideoTestimonials,
    cta: CTASection,
    coverage: CoverageSection,
    segments: CustomerSegments,
    features: Features,
    ai: TracxnAI,
    newsletter: NewsletterCTA,
    // Newsletter's real neighbours in page order (Coverage -> Newsletter ->
    // AI Suite) — used to check shell-background adjacency and that the band
    // reads as a distinct object between two same-toned sections.
    tail: () => (<><CoverageSection /><NewsletterCTA /><TracxnAI /></>),
};

const which = new URLSearchParams(window.location.search).get('s') || 'testimonials';
const Section = SECTIONS[which] || VideoTestimonials;

// main.jsx loads index.css + responsive.css only — App.css is not on the real
// page, so the harness must not import it either (its `#root { text-align:
// center }` would centre copy production leaves left-aligned). The `.App`
// wrapper is kept because some sections are styled through it.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="App">
            <Section />
        </div>
    </React.StrictMode>
);
