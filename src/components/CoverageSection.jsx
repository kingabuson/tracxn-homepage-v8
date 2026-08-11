import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { WORLD_VIEWBOX, WORLD_PATHS } from '../data/coverage/worldMap.js';
import { COVERAGE_AS_ON, COVERAGE_METRICS, COVERAGE_REGIONS } from '../data/coverage/coverageData.js';
import { COUNTRY_COVERAGE } from '../data/coverage/countryCoverage.js';
import { DESCRIPTION } from '../data.js';
import './CoverageSection.css';

/* ------------------------------------------------------------------ *
 * "Coverage You Can Count On" — v7e.
 *
 * The dotted-map / globe pair from v6b is gone; this is the map-led
 * section from the coverage-map-variants prototype, ported to React.
 * The map is the whole control: hover a country to read its own twelve
 * figures, click to pin it, click the sea to release. Nothing hovered
 * shows worldwide totals. A search box sits above the figures because
 * hunting for Estonia on a 175-country map is not a real interaction.
 *
 * Every number here is real — per-country figures come from the same
 * payload that feeds the live tracxn.com tabs, and the geometry is the
 * production SVG.
 * ------------------------------------------------------------------ */

const WORLD = COVERAGE_REGIONS.find((r) => r.id === 'all');

// Metric keys in COUNTRY_COVERAGE differ from COVERAGE_METRICS for two entries.
const COUNTRY_KEY = {
    companies: 'total', funded: 'funded', seriesA: 'seriesA', seriesC: 'seriesC',
    unfunded: 'unfunded', unicorns: 'unicorn', fundingRounds: 'fundingRounds',
    acquisitions: 'acquisitions', investors: 'investors', reports: 'reports',
    financials: 'financials', capTables: 'captables',
};

const regionOfKey = (key) =>
    COVERAGE_REGIONS.find((r) => r.id !== 'all' && r.regions.includes(key)) || null;

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const CoverageSection = () => {
    // `view` is what the panel and the lit countries are derived from.
    //   { kind: 'world' } | { kind: 'region', id } | { kind: 'country', name, regionKey }
    const [view, setView] = useState({ kind: 'world' });
    const [pinned, setPinned] = useState(null); // country name, or null
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const searchRef = useRef(null);

    /* ---------- what the panel shows ---------- */

    const panel = useMemo(() => {
        if (view.kind === 'country') {
            const cc = COUNTRY_COVERAGE[view.name];
            if (cc) {
                return {
                    title: view.name,
                    lede: `Startups operating in ${view.name}.`,
                    get: (m) => cc[COUNTRY_KEY[m.key]],
                };
            }
            // ~12 territories publish no figures of their own. Fall back to the
            // region and say so rather than invent numbers.
            const region = regionOfKey(view.regionKey);
            const r = region || WORLD;
            return {
                title: view.name,
                lede: region
                    ? <>No separate figures — showing <em>{region.label}</em></>
                    : 'No separate figures — showing worldwide totals',
                get: (m) => r.stats[m.key],
            };
        }
        if (view.kind === 'region') {
            const r = COVERAGE_REGIONS.find((x) => x.id === view.id);
            return { title: r.label, lede: `Startups operating in ${r.label}.`, get: (m) => r.stats[m.key] };
        }
        return {
            title: 'Worldwide',
            lede: 'Startups operating across every geography we track.',
            get: (m) => WORLD.stats[m.key],
        };
    }, [view]);

    /* ---------- which countries light up ---------- */

    // A country with its own figures lights alone; anything else lights its
    // whole region group.
    const lit = useMemo(() => {
        if (view.kind === 'country' && COUNTRY_COVERAGE[view.name]) {
            return { countries: new Set([view.name]), regions: null };
        }
        const keys = view.kind === 'country'
            ? (regionOfKey(view.regionKey) || WORLD).regions
            : view.kind === 'region'
                ? COVERAGE_REGIONS.find((x) => x.id === view.id).regions
                : WORLD.regions;
        return { countries: null, regions: new Set(keys) };
    }, [view]);

    const isLit = (c) =>
        lit.countries ? lit.countries.has(c.title) : lit.regions.has(c.region);

    /* ---------- map interaction ---------- */

    const showCountry = (name, regionKey) => setView({ kind: 'country', name, regionKey });
    const showWorld = () => setView({ kind: 'world' });

    const restorePinned = () => {
        if (!pinned) return showWorld();
        const p = WORLD_PATHS.find((c) => c.title === pinned);
        showCountry(pinned, p?.region);
    };

    /* ---------- search ---------- */

    const index = useMemo(() => {
        const onMap = new Set(WORLD_PATHS.map((c) => c.title).filter(Boolean));
        const countryNames = Object.keys(COUNTRY_COVERAGE).filter((c) => onMap.has(c));
        return [
            // India is both a published tab and a country; the country entry wins
            // (same geography, fresher figures, lights India alone).
            ...COVERAGE_REGIONS
                .filter((r) => r.id !== 'all' && !countryNames.includes(r.label))
                .map((r) => ({ name: r.label, kind: 'Region', regionId: r.id })),
            ...countryNames.map((c) => ({ name: c, kind: 'Country' })),
        ];
    }, []);

    const matches = useMemo(() => {
        const n = norm(query);
        if (!n) return [];
        const starts = [];
        const contains = [];
        index.forEach((e) => {
            const en = norm(e.name);
            if (en.startsWith(n)) starts.push(e);
            else if (en.includes(n)) contains.push(e);
        });
        // Prefix first, so "ind" reaches India before Indonesia.
        return [...starts, ...contains].slice(0, 8);
    }, [query, index]);

    const choose = (i) => {
        const m = matches[i];
        if (!m) return;
        if (m.regionId) {
            setPinned(null);
            setView({ kind: 'region', id: m.regionId });
        } else {
            setPinned(m.name);
            showCountry(m.name, WORLD_PATHS.find((c) => c.title === m.name)?.region);
        }
        setQuery(m.name);
        setOpen(false);
        setCursor(-1);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') return setOpen(false);
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (!matches.length) return;
            e.preventDefault();
            setOpen(true);
            setCursor((c) => (c + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length);
        } else if (e.key === 'Enter' && open && cursor >= 0) {
            e.preventDefault();
            choose(cursor);
        }
    };

    // Click anywhere outside the combobox closes the suggestion list.
    useEffect(() => {
        const onDocClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const clear = () => {
        setQuery('');
        setPinned(null);
        setOpen(false);
        showWorld();
    };

    /* ---------- render ---------- */

    // Countries are grouped per region so a whole region lights in one pass,
    // mirroring the production markup.
    const groups = useMemo(() => {
        const out = {};
        WORLD_PATHS.forEach((c) => (out[c.region] ||= []).push(c));
        return out;
    }, []);

    return (
        <section className="cov7">
            <div className="cov7-inner">
                {/* One grid owns the whole section: the heading and the map stack
                    in the left column while the figures panel spans both rows on
                    the right, so the panel's top edge starts level with the H2
                    instead of below the copy. That reclaimed height is what lets
                    the map run bigger. */}
                <div className="cov7-grid">
                    <div className="cov7-headcol">
                        <h2 className="cov7-h2">
                            Coverage You Can <span className="text-gradient-theme">Count On</span>
                        </h2>
                        <p className="cov7-desc">{DESCRIPTION}</p>
                    </div>

                    <div className="cov7-mapcol">
                            <div
                                className="cov7-map"
                                onMouseLeave={restorePinned}
                                onClick={() => { setPinned(null); showWorld(); }}
                            >
                                <svg
                                    viewBox={WORLD_VIEWBOX}
                                    className="cov7-svg"
                                    role="img"
                                    aria-label="World map of Tracxn coverage"
                                >
                                    {Object.entries(groups).map(([region, countries]) => (
                                        <g key={region} data-region={region}>
                                            {countries.map((c, i) => (
                                                <path
                                                    key={`${region}-${c.id || i}`}
                                                    d={c.d}
                                                    className={isLit(c) ? 'is-lit' : undefined}
                                                    onMouseEnter={() => showCountry(c.title, c.region)}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const next = pinned === c.title ? null : c.title;
                                                        setPinned(next);
                                                        if (next) showCountry(c.title, c.region);
                                                        else showWorld();
                                                    }}
                                                >
                                                    {c.title && <title>{c.title}</title>}
                                                </path>
                                            ))}
                                        </g>
                                    ))}
                                </svg>
                            </div>
                            <p className="cov7-hint">Hover any country for its coverage · click to pin</p>
                        </div>

                        <aside className="cov7-panel">
                            <div className="cov7-search" ref={searchRef}>
                                <label className="cov7-sr" htmlFor="cov7-q">Search a country or region</label>
                                <div className="cov7-field">
                                    <Search size={15} aria-hidden="true" />
                                    <input
                                        id="cov7-q"
                                        type="text"
                                        placeholder="Search a country or region"
                                        autoComplete="off"
                                        spellCheck="false"
                                        role="combobox"
                                        aria-expanded={open}
                                        aria-controls="cov7-results"
                                        aria-autocomplete="list"
                                        aria-activedescendant={cursor >= 0 ? `cov7-opt-${cursor}` : undefined}
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            setOpen(Boolean(e.target.value.trim()));
                                            setCursor(0);
                                        }}
                                        onKeyDown={onKeyDown}
                                    />
                                    {query && (
                                        <button type="button" className="cov7-clear" aria-label="Clear search" onClick={clear}>
                                            <X size={15} />
                                        </button>
                                    )}
                                </div>

                                {open && (
                                    <ul className="cov7-results" id="cov7-results" role="listbox" aria-label="Matching geographies">
                                        {matches.length ? matches.map((m, i) => (
                                            <li
                                                key={m.name}
                                                id={`cov7-opt-${i}`}
                                                role="option"
                                                aria-selected={i === cursor}
                                                onMouseDown={(e) => { e.preventDefault(); choose(i); }}
                                            >
                                                <b>{m.name}</b>
                                                <span className="cov7-kind">{m.kind}</span>
                                            </li>
                                        )) : (
                                            <li className="cov7-empty" role="presentation">
                                                No match. Coverage is published by country and region — there are no
                                                city or state figures.
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className="cov7-head" aria-live="polite">
                                <div className="cov7-name">{panel.title}</div>
                                <div className="cov7-lede">{panel.lede}</div>
                            </div>

                            <div className="cov7-rows">
                                {COVERAGE_METRICS.map((m) => {
                                    const v = panel.get(m);
                                    return (
                                        <div key={m.key} className={`cov7-row${v == null ? ' is-empty' : ''}`}>
                                            <span>{m.label}</span>
                                            <b>{v == null ? '—' : v}</b>
                                        </div>
                                    );
                                })}
                            </div>

                            <span className="cov7-ason">Data as on {COVERAGE_AS_ON}</span>
                        </aside>
                </div>
            </div>
        </section>
    );
};

export default CoverageSection;
