import React from 'react';
import Header from './components/Header';
import HeroEditorial from './components/HeroEditorial';
import LogoMarquee from './components/LogoMarquee';

import Features from './components/Features';
import CoverageSection from './components/CoverageSection';
import CustomerSegments from './components/CustomerSegments';
import CTASection from './components/CTASection';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import ArrowBackground from './components/ArrowBackground';

import VideoTestimonials from './components/VideoTestimonials';
import TracxnAI from './components/TracxnAI';

function App() {
  return (
    <div className="App">
      <ArrowBackground />
      <Header />
      <main>
        <HeroEditorial />
        <LogoMarquee />

        {/* NOT wrapped in AnimatedSection: both sections use position:sticky
            scroll-driven interactions, and AnimatedSection's framer-motion
            transform would become their containing block and break the pin. */}
        <CustomerSegments />

        <Features />

        <AnimatedSection>
          <CoverageSection />
        </AnimatedSection>

        {/* Sits right above the AI Suite: "here is everything we track" →
            "get a free weekly slice of it," then the AI Suite continues the
            product story. Low-commitment ask placed mid-page rather than
            racked up against the closing demo CTA. */}
        <AnimatedSection>
          <NewsletterCTA />
        </AnimatedSection>

        <AnimatedSection>
          <TracxnAI />
        </AnimatedSection>

        <AnimatedSection>
          <VideoTestimonials />
        </AnimatedSection>

        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}

export default App;
