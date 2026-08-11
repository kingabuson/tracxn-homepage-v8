import React, { useEffect, useRef, useState } from 'react';

/**
 * Live card art for the Tracxn AI Suite section.
 *
 * These replace the static ai-suite-light-{1,3}.svg / ai-suite-mcp.webp images.
 * Same visual language as the SVGs they retire — white cards on a pale blue
 * wash, Roboto, the brand blue — but the contents actually run: the chat types
 * and answers, the MCP call streams a response, the filter query resolves into
 * chips.
 *
 * Every card takes an `active` prop. The section drives it from its own
 * IntersectionObserver so nothing animates until the section is on screen, and
 * each card is offset so the three don't tick in lockstep.
 */

/* ------------------------------------------------------------------ *
 * shared
 * ------------------------------------------------------------------ */

export const CARD_VISUAL_STYLES = `
/* The artwork is laid out at a fixed 320px square and scaled to whatever width
   the card gives it — the same trick the SVGs it replaces got for free from
   viewBox="0 0 320 320". The scale factor comes from a ResizeObserver, because
   CSS cannot turn a container-query length into the unitless number
   transform: scale() requires. */
.aiv-host { position: absolute; inset: 0; }

.aiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 320px;
    height: 320px;
    transform-origin: top left;
    padding: 22px;
    display: flex;
    flex-direction: column;
    font-family: "Roboto", system-ui, sans-serif;
    text-align: left;
}
/* Nothing in here should be squeezed by the flex container — a shrunk row
   would collide with the one below it rather than simply sitting lower. */
.aiv > * { flex: none; }
.aiv-head { display: flex; align-items: center; gap: 10px; }
.aiv-badge {
    width: 30px; height: 30px; border-radius: 9px;
    background: #e8f1fe; color: #1a73e8;
    display: flex; align-items: center; justify-content: center;
    flex: none;
}
.aiv-badge svg { width: 16px; height: 16px; }
.aiv-h { font-size: 13.5px; font-weight: 600; color: #0a2540; line-height: 1.2; }
.aiv-sub { font-size: 10.5px; color: #8a94a6; margin-top: 1px; }
.aiv-rule { height: 1px; background: #e8edf5; margin: 14px 0 0; flex: none; }

.aiv-panel {
    background: #fff;
    border: 1px solid #eaeef4;
    border-radius: 14px;
    box-shadow: 0 6px 16px -10px rgba(10, 37, 64, 0.28);
}

/* caret shared by every typing field */
.aiv-caret {
    display: inline-block; width: 1.5px; height: 1em;
    background: #1a73e8; vertical-align: -2px; margin-left: 1px;
    animation: aiv-blink 1s step-end infinite;
}
@keyframes aiv-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }

/* a row/chip settling into place */
@keyframes aiv-rise {
    from { opacity: 0; transform: translateY(7px); }
    to   { opacity: 1; transform: none; }
}
.aiv-in { animation: aiv-rise 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) both; }

/* the three-dot "thinking" state */
.aiv-think { display: inline-flex; gap: 3px; align-items: center; height: 12px; }
.aiv-think i {
    width: 4px; height: 4px; border-radius: 50%; background: #b9c6d8;
    animation: aiv-bounce 1.1s ease-in-out infinite;
}
.aiv-think i:nth-child(2) { animation-delay: 0.16s }
.aiv-think i:nth-child(3) { animation-delay: 0.32s }
@keyframes aiv-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.55 }
    30%           { transform: translateY(-3px); opacity: 1 }
}

/* ---- card 1: chat ---- */
.aiv-bubble {
    align-self: flex-end;
    max-width: 78%;
    background: linear-gradient(135deg, #2b8bff, #1a73e8);
    color: #fff;
    font-size: 11.5px; font-weight: 500; line-height: 1.35;
    padding: 9px 12px;
    border-radius: 13px 13px 4px 13px;
    box-shadow: 0 6px 14px -8px rgba(26, 115, 232, 0.7);
    margin-top: 14px;
    min-height: 20px;
}
.aiv-answer { margin-top: 12px; padding: 12px; }
.aiv-answer-meta { font-size: 9.5px; color: #5f6b7c; }
.aiv-row { display: flex; align-items: center; gap: 9px; margin-top: 10px; }
.aiv-logo {
    width: 22px; height: 22px; border-radius: 50%;
    background: #eef3fb; color: #1a73e8;
    font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex: none;
}
.aiv-co { font-size: 11.5px; font-weight: 600; color: #0a2540; line-height: 1.2; }
.aiv-co-meta { font-size: 9.5px; color: #8a94a6; }
.aiv-score {
    margin-left: auto; flex: none;
    font-size: 9.5px; font-weight: 600; color: #0a7d4d;
    background: #e7f7ee; border-radius: 999px; padding: 3px 8px;
}
.aiv-ask {
    margin-top: auto;
    display: flex; align-items: center; gap: 8px;
    height: 26px; padding: 0 4px 0 12px;
    border: 1px solid #e3e9f2; border-radius: 999px; background: #fff;
    font-size: 10.5px; color: #9aa4b2;
}
.aiv-send {
    margin-left: auto; flex: none;
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, #2b8bff, #1a73e8);
    display: flex; align-items: center; justify-content: center;
}
.aiv-send svg { width: 10px; height: 10px; color: #fff; }

/* ---- card 2: MCP ---- */
.aiv-mcp-wrap { margin-top: 14px; display: flex; flex-direction: column; gap: 9px; }
.aiv-client {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 11px;
}
.aiv-client-dot {
    width: 20px; height: 20px; border-radius: 6px; flex: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 9.5px; font-weight: 700; color: #fff;
}
.aiv-client-name { font-size: 11px; font-weight: 600; color: #0a2540; }
.aiv-pill {
    margin-left: auto; flex: none;
    font-size: 8.5px; font-weight: 700; letter-spacing: 0.05em;
    padding: 3px 7px; border-radius: 999px;
    background: #eef4fd; color: #1a73e8;
    transition: background 0.3s ease, color 0.3s ease;
}
.aiv-pill.is-live { background: #e7f7ee; color: #0a7d4d; }

.aiv-wire {
    position: relative; height: 22px; margin: -2px 0;
    display: flex; align-items: center; justify-content: center;
}
.aiv-wire span {
    position: absolute; left: 50%; top: 0; bottom: 0;
    width: 2px; margin-left: -1px; background: #e2eaf6; border-radius: 2px;
}
.aiv-wire i {
    position: absolute; left: 50%; margin-left: -2.5px;
    width: 5px; height: 5px; border-radius: 50%; background: #2b8bff;
    box-shadow: 0 0 0 3px rgba(43, 139, 255, 0.16);
    animation: aiv-travel 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
@keyframes aiv-travel {
    0%   { top: -2px; opacity: 0 }
    18%  { opacity: 1 }
    82%  { opacity: 1 }
    100% { top: calc(100% - 3px); opacity: 0 }
}

.aiv-json {
    margin-top: 2px; padding: 11px 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 9.5px; line-height: 1.62; color: #3c4858;
    white-space: pre; overflow: hidden;
}
.aiv-json .k { color: #7d3aff }
.aiv-json .s { color: #0a7d4d }
.aiv-json .n { color: #b04b00 }

/* ---- card 3: filter ---- */
.aiv-search {
    display: flex; align-items: center; gap: 8px;
    height: 36px; padding: 0 5px 0 12px;
    margin-top: 14px;
}
.aiv-search > svg { width: 13px; height: 13px; color: #9aa4b2; flex: none }
/* Behaves like a real text input: once the query outgrows the field it scrolls
   so the caret end stays visible, instead of clipping the tail. The rtl parent
   anchors the overflow to the right; the ltr child keeps the text itself in
   reading order, and min-width:100% keeps short strings left-aligned. */
.aiv-q {
    flex: 1; min-width: 0;
    font-size: 10.5px; color: #3c4858;
    overflow: hidden;
    direction: rtl;
}
.aiv-q > span {
    direction: ltr;
    display: inline-block;
    min-width: 100%;
    text-align: left;
    white-space: nowrap;
}
.aiv-ai {
    flex: none;
    display: inline-flex; align-items: center; justify-content: center; gap: 4px;
    height: 22px; padding: 0 9px; border-radius: 999px;
    background: linear-gradient(135deg, #2b8bff, #1a73e8);
    color: #fff; font-size: 9.5px; font-weight: 700; letter-spacing: 0.03em;
    /* Centred as flex items — the retired SVG set the star by coordinate and
       the label by baseline, which left them ~3px out of line. */
    line-height: 1;
}
.aiv-ai svg { width: 10px; height: 10px; color: #fff; display: block }

.aiv-arrow { display: flex; justify-content: center; padding: 7px 0 3px; color: #c3d4ec }
.aiv-arrow svg { width: 13px; height: 13px }

.aiv-filters { flex: 1; margin-top: 2px; padding: 12px; display: flex; flex-direction: column }
.aiv-filters-h {
    font-size: 9px; font-weight: 600; letter-spacing: 0.06em;
    color: #5f6b7c; text-transform: uppercase;
}
.aiv-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px }
.aiv-chip {
    display: inline-flex; align-items: center; gap: 5px;
    background: #eef4fd; border: 1px solid #d8e6fb; border-radius: 8px;
    padding: 5px 9px; font-size: 10px; color: #0a2540; font-weight: 600;
}
.aiv-chip b { font-weight: 400; color: #5f6b7c }
.aiv-chip .tick { width: 11px; height: 11px; color: #0a7d4d; flex: none }
.aiv-foot {
    margin-top: auto; padding-top: 11px;
    border-top: 1px solid #eef2f8;
    display: flex; align-items: center; gap: 10px;
}
.aiv-count { font-size: 10.5px; font-weight: 600; color: #1a73e8 }
.aiv-view {
    margin-left: auto; flex: none;
    font-size: 9.5px; font-weight: 600; color: #fff;
    background: linear-gradient(135deg, #2b8bff, #1a73e8);
    border-radius: 999px; padding: 4px 11px;
}

@media (prefers-reduced-motion: reduce) {
    .aiv-caret, .aiv-think i, .aiv-wire i { animation: none }
    .aiv-in { animation: none; opacity: 1; transform: none }
}
`;

const DESIGN = 320;

/**
 * Holds the fixed-size artwork and scales it to the card's square well.
 * Everything inside can then be written in plain pixels at one known size.
 */
const FitBox = ({ children }) => {
    const host = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = host.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width;
            if (w) setScale(w / DESIGN);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div className="aiv-host" ref={host}>
            <div className="aiv" style={{ transform: `scale(${scale})` }}>{children}</div>
        </div>
    );
};

/* small helper: run a stepped script while `active`, looping */
const useCycle = (active, steps, delayMs = 0) => {
    const [step, setStep] = useState(0);
    const timers = useRef([]);

    useEffect(() => {
        const clear = () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
        if (!active) {
            clear();
            return undefined;
        }
        const run = () => {
            setStep(0);
            let t = 0;
            steps.forEach((ms, i) => {
                t += ms;
                timers.current.push(setTimeout(() => setStep(i + 1), t));
            });
            timers.current.push(setTimeout(run, t + 900));
        };
        timers.current.push(setTimeout(run, delayMs));
        return clear;
        // steps is a module-level constant per card, so identity is stable
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, delayMs]);

    return step;
};

/* typewriter that fills `text` over `ms`, gated on `on` */
const useTyped = (on, text, ms = 1100) => {
    const [n, setN] = useState(0);
    const timers = useRef([]);
    useEffect(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        if (!on) { setN(0); return undefined; }
        const per = ms / text.length;
        for (let i = 1; i <= text.length; i++) {
            timers.current.push(setTimeout(() => setN(i), i * per));
        }
        return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    }, [on, text, ms]);
    return text.slice(0, n);
};

const SparkIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.1 5.6L19.7 9.7 14.1 11.8 12 17.4 9.9 11.8 4.3 9.7 9.9 7.6z" />
    </svg>
);

/* ------------------------------------------------------------------ *
 * Card 1 — AI Assistant
 * ------------------------------------------------------------------ */

const CHAT_Q = 'Profitable fintech startups in India, Series B+';
const CHAT_STEPS = [1500, 900, 700, 700, 1600]; // type → think → row1 → row2 → hold

const RESULTS = [
    { initial: 'R', name: 'Razorpay', meta: 'Payments · $7.5B', score: 'Score 96' },
    { initial: 'G', name: 'Groww', meta: 'Investing · $3.0B', score: 'Score 94' },
];

export const ChatCardVisual = ({ active }) => {
    const step = useCycle(active, CHAT_STEPS, 0);
    const typed = useTyped(active && step >= 0, CHAT_Q, 1350);

    return (
        <FitBox>
            <div className="aiv-head">
                <span className="aiv-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3a3.2 3.2 0 0 0-3.1 2.4A3 3 0 0 0 6.5 11a2.9 2.9 0 0 0 .4 4.2A3 3 0 0 0 9.4 19 2.9 2.9 0 0 0 12 20.6Z" />
                        <path d="M12 3a3.2 3.2 0 0 1 3.1 2.4A3 3 0 0 1 17.5 11a2.9 2.9 0 0 1-.4 4.2A3 3 0 0 1 14.6 19 2.9 2.9 0 0 1 12 20.6Z" />
                        <line x1="12" y1="3" x2="12" y2="20.6" />
                    </svg>
                </span>
                <div>
                    <div className="aiv-h">AI Assistant</div>
                    <div className="aiv-sub">Ask. Analyze. Discover.</div>
                </div>
            </div>
            <div className="aiv-rule" />

            <div className="aiv-bubble">
                {typed}
                {step < 1 && <span className="aiv-caret" />}
            </div>

            {step >= 1 && (
                <div className="aiv-panel aiv-answer aiv-in">
                    <div className="aiv-answer-meta">
                        {step === 1
                            ? <span className="aiv-think"><i /><i /><i /></span>
                            : '128 matches · ranked by Tracxn Score'}
                    </div>
                    {RESULTS.map((r, i) => (
                        step >= i + 2 && (
                            <div className="aiv-row aiv-in" key={r.name}>
                                <span className="aiv-logo">{r.initial}</span>
                                <div>
                                    <div className="aiv-co">{r.name}</div>
                                    <div className="aiv-co-meta">{r.meta}</div>
                                </div>
                                <span className="aiv-score">{r.score}</span>
                            </div>
                        )
                    ))}
                </div>
            )}

            <div className="aiv-ask">
                Ask a follow-up…
                <span className="aiv-send">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="6,11 12,5 18,11" />
                    </svg>
                </span>
            </div>
        </FitBox>
    );
};

/* ------------------------------------------------------------------ *
 * Card 2 — Tracxn MCP
 * ------------------------------------------------------------------ */

const MCP_STEPS = [900, 900, 1000, 1900]; // connect → call → response → hold

const JSON_LINES = [
    <>{'{'}</>,
    <>{'  '}<span className="k">"company"</span>: <span className="s">"Razorpay"</span>,</>,
    <>{'  '}<span className="k">"valuation"</span>: <span className="n">7500000000</span>,</>,
    <>{'  '}<span className="k">"verified"</span>: <span className="n">true</span></>,
    <>{'}'}</>,
];

export const McpCardVisual = ({ active }) => {
    const step = useCycle(active, MCP_STEPS, 380);

    return (
        <FitBox>
            <div className="aiv-head">
                <span className="aiv-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1.6" />
                        <rect x="14" y="14" width="7" height="7" rx="1.6" />
                        <path d="M10 6.5h4a2.5 2.5 0 0 1 2.5 2.5v5" />
                    </svg>
                </span>
                <div>
                    <div className="aiv-h">Tracxn MCP</div>
                    <div className="aiv-sub">Live data inside your AI tools</div>
                </div>
            </div>
            <div className="aiv-rule" />

            <div className="aiv-mcp-wrap">
                <div className="aiv-panel aiv-client">
                    <span className="aiv-client-dot" style={{ background: '#D97757' }}>C</span>
                    <span className="aiv-client-name">Claude</span>
                    <span className={`aiv-pill${step >= 1 ? ' is-live' : ''}`}>
                        {step >= 1 ? 'CONNECTED' : 'LINKING…'}
                    </span>
                </div>

                <div className="aiv-wire">
                    <span />
                    {step >= 1 && <i />}
                </div>

                <div className="aiv-panel aiv-client">
                    <span className="aiv-client-dot" style={{ background: '#1a73e8' }}>T</span>
                    <span className="aiv-client-name">Tracxn MCP</span>
                    <span className={`aiv-pill${step >= 2 ? ' is-live' : ''}`}>
                        {step >= 2 ? 'QUERYING' : 'IDLE'}
                    </span>
                </div>

                {step >= 3 && (
                    <div className="aiv-panel aiv-json aiv-in">
                        {JSON_LINES.map((line, i) => (
                            <div key={i} className="aiv-in" style={{ animationDelay: `${i * 70}ms` }}>{line}</div>
                        ))}
                    </div>
                )}
            </div>
        </FitBox>
    );
};

/* ------------------------------------------------------------------ *
 * Card 3 — AI Filter
 * ------------------------------------------------------------------ */

// A sentence, not a keyword string — the whole point of the card is that plain
// English becomes structured filters.
const FILTER_Q = 'Show me profitable military tech companies in India with EBITDA over $1M';
const FILTER_STEPS = [2000, 700, 420, 420, 420, 1700];

const CHIPS = [
    { label: 'Sector:', value: 'Military Tech' },
    { label: 'Country:', value: 'India' },
    { label: 'EBITDA:', value: '> $1M' },
    { label: '', value: 'Profitable', tick: true },
];

export const FilterCardVisual = ({ active }) => {
    const step = useCycle(active, FILTER_STEPS, 760);
    const typed = useTyped(active, FILTER_Q, 1850);

    return (
        <FitBox>
            <div className="aiv-head">
                <span className="aiv-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 5h18l-7 8v6l-4 2v-8z" />
                    </svg>
                </span>
                <div>
                    <div className="aiv-h">AI Filter</div>
                    <div className="aiv-sub">Plain English → structured filters</div>
                </div>
            </div>
            <div className="aiv-rule" />

            <div className="aiv-panel aiv-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                <span className="aiv-q">
                    <span>
                        {typed}
                        {step < 1 && <span className="aiv-caret" />}
                    </span>
                </span>
                <span className="aiv-ai"><SparkIcon />AI</span>
            </div>

            <div className="aiv-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="4" x2="12" y2="18" />
                    <polyline points="6,13 12,19 18,13" />
                </svg>
            </div>

            <div className="aiv-panel aiv-filters">
                <div className="aiv-filters-h">Filters applied</div>
                <div className="aiv-chips">
                    {CHIPS.map((c, i) => (
                        step >= i + 2 && (
                            <span className="aiv-chip aiv-in" key={c.value}>
                                {c.label && <b>{c.label}</b>}
                                {c.value}
                                {c.tick && (
                                    <svg className="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                )}
                            </span>
                        )
                    ))}
                </div>
                <div className="aiv-foot">
                    <span className="aiv-count">
                        {step >= 5 ? '42 companies match' : <span className="aiv-think"><i /><i /><i /></span>}
                    </span>
                    {step >= 5 && <span className="aiv-view aiv-in">View all</span>}
                </div>
            </div>
        </FitBox>
    );
};
