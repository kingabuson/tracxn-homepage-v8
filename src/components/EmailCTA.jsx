import React, { useState } from 'react';

/**
 * The single email-capture control for the whole page.
 *
 * One email field + one accented button. It is used three times — the hero,
 * the newsletter band and the closing CTA — and every instance shares the same
 * geometry (48px height, 9px radius, #f7fafe fill with the paper-grain hatch,
 * 468px measure) so the field looks identical everywhere. Only the BUTTON
 * colour changes, via `accent`.
 *
 * ── Why the accent is a CSS custom property and not string interpolation ──
 * This component renders <style>{CTA_STYLES}</style> INSIDE each form, and the
 * class names are global. CTA_STYLES is a module-level constant, so all three
 * instances emit a byte-identical stylesheet and "which one wins" has no
 * consequences. The moment an accent colour is interpolated into that literal,
 * three different stylesheets declare the SAME selectors (.ecta-btn,
 * .ecta-input--light:focus) at equal specificity — CSS then breaks the tie by
 * document order, so the LAST instance on the page would repaint every other
 * instance's button and focus ring. (That bug is invisible in preview.jsx,
 * which renders one section at a time.)
 *
 * So: CTA_STYLES never sees an accent. Every accented value is
 * var(--ecta-*, <orange fallback>), and the custom properties are set in the
 * `style` attribute of each <form>. Custom properties inherit, so the form's
 * own input and button resolve them and nothing outside that form can see
 * them. Instances that pass no accent render byte-identically to before, by
 * construction rather than by inspection.
 */

const NAVY = '#0a1f44';

const ACCENTS = {
    orange: {
        '--ecta-accent': '#FF7400',
        '--ecta-accent-hover': '#E66700',
        '--ecta-glow': 'rgba(255, 116, 0, 0.85)',
        '--ecta-glow-hover': 'rgba(255, 116, 0, 0.95)',
        '--ecta-focus-border': 'rgba(255, 116, 0, 0.55)',
        '--ecta-focus-ring': 'rgba(255, 116, 0, 0.16)',
    },
    blue: {
        '--ecta-accent': 'var(--color-primary)',
        '--ecta-accent-hover': 'var(--color-primary-hover)',
        '--ecta-glow': 'rgba(26, 115, 232, 0.85)',
        '--ecta-glow-hover': 'rgba(26, 115, 232, 0.95)',
        '--ecta-focus-border': 'rgba(26, 115, 232, 0.55)',
        '--ecta-focus-ring': 'rgba(26, 115, 232, 0.16)',
    },
};

const CTA_STYLES = `
.ecta-form {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 468px;
}
.ecta-field { flex: 1 1 240px; min-width: 200px; }

.ecta-input {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border-radius: 9px;
    font-family: "Roboto", -apple-system, sans-serif;
    font-size: 15px;
    line-height: 48px;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}
/* Faint diagonal hatch — the texture in the approved CTA mock. Sits under the
   flat fill colour so it reads as paper grain, not as a pattern. */
.ecta-input--light {
    color: ${NAVY};
    /* 0.52 alpha composites to ~#7c889d: 3.40:1 on #FAF9F8, 3.23:1 on #F4F3F1
       and 3.02:1 on the newsletter band — the LOWEST value that clears the
       WCAG 1.4.11 non-text 3:1 minimum against all three backgrounds it sits
       on. At the old 0.12 the field's only boundary measured ~1.26:1 and the
       control was effectively invisible. */
    border: 1px solid rgba(10, 31, 68, 0.52);
    background-color: #f7fafe;
    background-image: repeating-linear-gradient(
        -45deg,
        rgba(10, 31, 68, 0.045) 0px,
        rgba(10, 31, 68, 0.045) 1px,
        transparent 1px,
        transparent 7px
    );
}
/* 0.62 → 4.62:1 on the #f7fafe fill (0.5 measured 3.24:1 and failed AA). */
.ecta-input--light::placeholder { color: rgba(10, 31, 68, 0.62); }
.ecta-input--light:focus {
    border-color: var(--ecta-focus-border, rgba(255, 116, 0, 0.55));
    box-shadow: 0 0 0 3px var(--ecta-focus-ring, rgba(255, 116, 0, 0.16));
    background-color: #ffffff;
}
.ecta-input--dark {
    color: #f4f7fc;
    border: 1px solid rgba(255, 255, 255, 0.42);
    background-color: rgba(255, 255, 255, 0.07);
    background-image: repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.05) 0px,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 1px,
        transparent 7px
    );
}
.ecta-input--dark::placeholder { color: rgba(244, 247, 252, 0.7); }
.ecta-input--dark:focus {
    border-color: var(--ecta-focus-border, rgba(255, 116, 0, 0.7));
    box-shadow: 0 0 0 3px var(--ecta-focus-ring, rgba(255, 116, 0, 0.2));
}
/* KEEP LAST among the input rules. This is (0,2,0), the same specificity as
   .ecta-input--light:focus, so it only wins the red ring on a focused invalid
   field by being declared later. Moving it up silently breaks that. */
.ecta-input.is-invalid {
    border-color: #b3261e;
    box-shadow: 0 0 0 3px rgba(179, 38, 30, 0.15);
}

.ecta-btn {
    height: 48px;
    padding: 0 22px;
    border: none;
    border-radius: 9px;
    background: var(--ecta-accent, #FF7400);
    color: #ffffff;
    font-family: "Roboto", -apple-system, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0 10px 22px -12px var(--ecta-glow, rgba(255, 116, 0, 0.85));
    transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}
.ecta-btn:hover {
    background: var(--ecta-accent-hover, #E66700);
    transform: translateY(-1px);
    box-shadow: 0 14px 26px -12px var(--ecta-glow-hover, rgba(255, 116, 0, 0.95));
}
.ecta-btn:active { transform: translateY(0); }
/* The button had no focus ring at all before — keyboard users got nothing. */
.ecta-btn:focus-visible { outline: 2px solid ${NAVY}; outline-offset: 3px; }

.ecta-msg {
    width: 100%;
    margin-top: 8px;
    font-family: "Roboto", -apple-system, sans-serif;
    font-size: 13.5px;
    line-height: 1.4;
}
/* Only applied when the caller reserves the slot, so the band cannot grow by
   a line when a message appears. Instances that don't reserve are unchanged. */
.ecta-msg--reserved { min-height: 19px; }
/* #d93025 measured 4.02:1 on the warm newsletter fill and failed AA. */
.ecta-msg--error { color: #b3261e; }
.ecta-msg--error-dark { color: #ff8a80; }
.ecta-msg--ok { color: #137333; }
.ecta-msg--ok-dark { color: #7ee2a8; }

@media (max-width: 520px) {
    .ecta-form { max-width: none; }
    .ecta-field { flex: 1 1 100%; }
    .ecta-btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
    .ecta-input, .ecta-btn { transition: none; }
    .ecta-btn:hover { transform: none; }
}
`;

// Deliberately permissive: this only stops obvious typos before the handoff.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EmailCTA = ({
    tone = 'light',
    placeholder = 'Business Email Address',
    buttonLabel = 'Schedule a Demo',
    align = 'flex-start',
    id = 'demo',
    accent = 'orange',
    successMessage,
    reserveMessageSpace = false,
}) => {
    const [email, setEmail] = useState('');
    const [state, setState] = useState('idle'); // 'idle' | 'error' | 'sent'
    const dark = tone === 'dark';

    const submit = (e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) {
            setState('error');
            return;
        }
        // No backend in this prototype — confirm receipt and hold the address so
        // the field doesn't look like it silently dropped the input.
        setState('sent');
    };

    const sentText = typeof successMessage === 'function'
        ? successMessage(email.trim())
        : successMessage || `Thanks — we'll reach out to ${email.trim()} to book your demo.`;

    return (
        <form
            id={id}
            className="ecta-form"
            style={{
                ...(ACCENTS[accent] || ACCENTS.orange),
                justifyContent: align,
                margin: align === 'center' ? '0 auto' : undefined,
            }}
            onSubmit={submit}
            noValidate
        >
            <style>{CTA_STYLES}</style>

            <div className="ecta-field">
                <label htmlFor={`${id}-email`} style={srOnly}>Business email address</label>
                <input
                    id={`${id}-email`}
                    className={`ecta-input ecta-input--${dark ? 'dark' : 'light'}${state === 'error' ? ' is-invalid' : ''}`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={placeholder}
                    value={email}
                    aria-invalid={state === 'error'}
                    aria-describedby={state === 'idle' && !reserveMessageSpace ? undefined : `${id}-msg`}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (state !== 'idle') setState('idle');
                    }}
                />
            </div>

            <button type="submit" className="ecta-btn">{buttonLabel}</button>

            {(reserveMessageSpace || state !== 'idle') && (
                <div
                    id={`${id}-msg`}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className={[
                        'ecta-msg',
                        `ecta-msg--${state === 'error' ? 'error' : 'ok'}${dark ? '-dark' : ''}`,
                        reserveMessageSpace ? 'ecta-msg--reserved' : '',
                    ].filter(Boolean).join(' ')}
                    style={{ textAlign: align === 'center' ? 'center' : 'left' }}
                >
                    {state === 'error'
                        ? 'Enter a valid business email address.'
                        : state === 'sent'
                            ? sentText
                            : ''}
                </div>
            )}
        </form>
    );
};

const srOnly = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0,
};

export default EmailCTA;
