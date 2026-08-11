import React from 'react';

// Amplitude-style customer story cards.
// Resting: company name (top-left), the customer's name (bottom-left).
// On hover: a blue gradient overlay rises to reveal the quote, name, and
// designation.
//
// Every quote, name, title and photo below is real — taken from the "Proven
// across venture teams" section of
// w.tracxn.com/customers/solutions-for-venture-capital-funds. The play button
// that used to sit bottom-right is gone: none of these are videos.
// `title` is the resting story headline. The source page has no story titles,
// so each one is an editorial paraphrase of that customer's own quote — never a
// claim the quote doesn't already make. Everything else is verbatim.
const testimonials = [
    {
        // Susan's headshot originally carried a red Stanford GSB badge top-left
        // that fought the other two portraits. The source file is cropped in
        // from x=292 so the badge is gone and only the plain grey studio
        // backdrop remains — her quote is the strongest of the set, so the
        // image was the thing worth fixing.
        id: 1,
        company: 'Candou Ventures',
        title: 'How we optimize our investment strategy',
        person: 'Susan Akbarpour',
        role: 'Managing Partner, Candou Ventures',
        quote: 'I highly recommend their services to any VC aiming to optimize investment strategies.',
        image: '/testimonials/susan-akbarpour.webp',
    },
    {
        id: 2,
        company: 'Beenext',
        title: 'How we compare competitors effectively',
        person: 'Yukano Nishijima',
        role: 'Investment Manager, Beenext',
        quote: 'The platform helps me identify competitors of specific companies and compare them effectively.',
        image: '/testimonials/yukano-nishijima.webp',
    },
    {
        id: 3,
        company: 'GrowX Ventures',
        title: 'How we identify high-value sectors',
        person: 'Manan Anand',
        role: 'Investment Associate, GrowX Ventures',
        quote: 'Tracxn has enabled GrowX to identify high-value sectors and enhance our investment thesis.',
        image: '/testimonials/manan-anand.jpeg',
    },
];

const VT_STYLES = `
.vt3-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
.vt3-card {
    position: relative;
    aspect-ratio: 4 / 5;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    background: #0a2540;
    box-shadow: 0 12px 32px -18px rgba(10, 37, 64, 0.55);
    isolation: isolate;
}
.vt3-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* The real headshots are square; in a 4:5 card that crops the sides, so
       bias the frame upward to keep faces off the bottom edge. */
    object-position: center 22%;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vt3-card:hover .vt3-img { transform: scale(1.06); }

/* Resting layer: company top-left, title + play bottom */
.vt3-base {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* Pinned explicitly: #root carries text-align:center from the Vite starter
       sheet, which otherwise centres the company label while the flex-laid
       title stays left. */
    text-align: left;
    padding: 26px;
    background: linear-gradient(to bottom, rgba(10, 37, 64, 0.55) 0%, rgba(10, 37, 64, 0) 26%, rgba(10, 37, 64, 0) 52%, rgba(10, 37, 64, 0.82) 100%);
    transition: opacity 0.4s ease;
}
.vt3-card:hover .vt3-base { opacity: 0; }
.vt3-company {
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
}
.vt3-base-foot {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
}
.vt3-base-title {
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    max-width: 78%;
    margin: 0;
}
/* Blue gradient hover overlay */
.vt3-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: left;
    padding: 32px;
    background: linear-gradient(150deg, rgba(43, 139, 255, 0.94) 0%, rgba(26, 115, 232, 0.95) 45%, rgba(0, 51, 102, 0.96) 100%);
    opacity: 0;
    transition: opacity 0.45s ease;
}
.vt3-card:hover .vt3-overlay { opacity: 1; }

.vt3-mark {
    font-family: Georgia, "PT Serif", serif;
    font-size: 4rem;
    line-height: 0.7;
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 12px;
    transform: translateY(12px);
    opacity: 0;
    transition: transform 0.45s ease 0.05s, opacity 0.45s ease 0.05s;
}
.vt3-quote {
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 1.12rem;
    line-height: 1.5;
    font-weight: 500;
    margin: 0 0 auto;
    transform: translateY(14px);
    opacity: 0;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s, opacity 0.5s ease 0.1s;
}
.vt3-person {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.28);
    transform: translateY(14px);
    opacity: 0;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.16s, opacity 0.5s ease 0.16s;
}
.vt3-name {
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
}
.vt3-role {
    color: rgba(255, 255, 255, 0.85);
    font-family: "Roboto", sans-serif;
    font-size: 0.9rem;
    margin-top: 3px;
}
.vt3-card:hover .vt3-mark,
.vt3-card:hover .vt3-quote,
.vt3-card:hover .vt3-person {
    transform: translateY(0);
    opacity: 1;
}

@media (max-width: 900px) {
    .vt3-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
}
/* Touch devices can't hover — reveal the quote by default */
@media (hover: none) {
    .vt3-base { opacity: 0; }
    .vt3-overlay { opacity: 1; }
    .vt3-mark, .vt3-quote, .vt3-person { transform: none; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
    .vt3-img, .vt3-base, .vt3-overlay, .vt3-mark, .vt3-quote, .vt3-person { transition: none; }
}
`;

const VideoTestimonials = () => {
    return (
        <section style={styles.section}>
            <style>{VT_STYLES}</style>
            <div className="container" style={styles.container}>
                <h2 style={styles.heading}>Trusted by the world's most innovative companies</h2>

                <div className="vt3-grid">
                    {testimonials.map((item) => (
                        <article key={item.id} className="vt3-card">
                            <img className="vt3-img" src={item.image} alt={item.company} loading="lazy" />

                            <div className="vt3-base">
                                <span className="vt3-company">{item.company}</span>
                                <div className="vt3-base-foot">
                                    <h3 className="vt3-base-title">{item.title}</h3>
                                </div>
                            </div>

                            <div className="vt3-overlay">
                                <span className="vt3-mark" aria-hidden="true">&ldquo;</span>
                                <p className="vt3-quote">{item.quote}</p>
                                <div className="vt3-person">
                                    <div className="vt3-name">{item.person}</div>
                                    <div className="vt3-role">{item.role}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '100px 0',
        backgroundColor: 'var(--color-background)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
    },
    heading: {
        fontSize: '3.5rem',
        marginBottom: '60px',
        textAlign: 'center',
        fontFamily: '"PT Serif", serif',
        fontWeight: 400,
    },
};

export default VideoTestimonials;
