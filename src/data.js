// Coverage data - lifted verbatim from homepage-v5-a/src/components/Stats.jsx
// ("Coverage You Can Count On"). Each region carries the same 4 metrics.
// The "Global" row is rendered as the outside strip/column; the five regional
// rows are pinned to a representative hub city on the map.

export const GLOBAL_STATS = [
  { value: '8M+',    label: 'Companies',      sub: 'The deepest private-company coverage anywhere.' },
  { value: '2M+',    label: 'Funding Rounds', sub: 'Every round from seed to IPO, worldwide.' },
  { value: '28.3M+', label: 'Financials',     sub: 'Statements and filings at global scale.' },
  { value: '3.8M+',  label: 'Cap Tables',     sub: 'Ownership and dilution, round by round.' },
];

// Each region pinned to a recognisable hub city.
// lat/lng drive the map projection; `share` is a rough % of global coverage
// used purely for the legend bars / status dots (illustrative).
export const REGIONS = [
  {
    id: 'us-canada',
    region: 'US & Canada',
    city: 'San Francisco',
    country: 'United States',
    lat: 37.77,
    lng: -122.42,
    share: 100,
    accent: '#1a73e8',
    accentSoft: '#e8f0fe',
    stats: [
      { value: '2M+',    label: 'Companies',      sub: 'Full coverage from the Valley and beyond.' },
      { value: '1.38M+', label: 'Funding Rounds', sub: 'Deep history across every major hub.' },
      { value: '112K+',  label: 'Financials',     sub: 'Financial detail where disclosed.' },
      { value: '8.29K+', label: 'Cap Tables',     sub: 'Cap-table insight for North American deals.' },
    ],
  },
  {
    id: 'europe',
    region: 'Europe',
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5,
    lng: -0.12,
    share: 92,
    accent: '#1a73e8',
    accentSoft: '#e6eefb',
    stats: [
      { value: '2.7M+', label: 'Companies',      sub: 'Broad reach across the UK and the continent.' },
      { value: '319K+', label: 'Funding Rounds', sub: 'From London to the regional ecosystems.' },
      { value: '1.62M+', label: 'Financials',    sub: 'Rich filings across European registries.' },
      { value: '105K+', label: 'Cap Tables',     sub: 'Ownership data for European companies.' },
    ],
  },
  {
    id: 'india',
    region: 'India',
    city: 'Bengaluru',
    country: 'India',
    lat: 12.97,
    lng: 77.59,
    share: 86,
    accent: '#1a73e8',
    accentSoft: '#e9f1fd',
    stats: [
      { value: '683K+', label: 'Companies',      sub: 'Granular coverage of a fast-growing market.' },
      { value: '50.5K+', label: 'Funding Rounds', sub: 'From fintech and SaaS to D2C.' },
      { value: '1M+',   label: 'Financials',     sub: 'MCA-grade financials, at depth.' },
      { value: '357K+', label: 'Cap Tables',     sub: 'Detailed shareholding for Indian entities.' },
    ],
  },
  {
    id: 'sea',
    region: 'SEA',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.35,
    lng: 103.8,
    share: 74,
    accent: '#1a73e8',
    accentSoft: '#e6effb',
    stats: [
      { value: '166K+', label: 'Companies',      sub: 'Rising startups across Southeast Asia.' },
      { value: '13.5K+', label: 'Funding Rounds', sub: 'Capital flows across the region.' },
      { value: '49K+',  label: 'Financials',     sub: 'Financial detail for SEA companies.' },
      { value: '11K+',  label: 'Cap Tables',     sub: 'Ownership data across the region.' },
    ],
  },
  {
    id: 'africa',
    region: 'Africa',
    city: 'Lagos',
    country: 'Nigeria',
    lat: 6.52,
    lng: 3.38,
    share: 61,
    accent: '#1a73e8',
    accentSoft: '#e4ebf3',
    stats: [
      { value: '144K+', label: 'Companies',      sub: 'Emerging ecosystems across the continent.' },
      { value: '13.3K+', label: 'Funding Rounds', sub: 'Funding momentum across Africa.' },
      { value: '5.37K+', label: 'Financials',    sub: 'Financial detail where disclosed.' },
      { value: '396+',  label: 'Cap Tables',     sub: 'Early but growing cap-table coverage.' },
    ],
  },
];

// v7d: fourteen country-level pins join the five regional ones — same design,
// same hover/popover behaviour, one pin per hub city. Figures are the real
// per-country numbers from tracxn.com's geoCompaniesData payload (captured
// 2026-07-26): Companies=total, Funding Rounds, Financials, Cap Tables.
// `share` is derived from company count on a log scale (legend bars only).
const countryStats = (companies, rounds, financials, capTables, companiesSub) => ([
  { value: companies,  label: 'Companies',      sub: companiesSub },
  { value: rounds,     label: 'Funding Rounds', sub: 'Every disclosed round, seed to IPO.' },
  { value: financials, label: 'Financials',     sub: 'Registry-grade filings where disclosed.' },
  { value: capTables,  label: 'Cap Tables',     sub: 'Ownership and dilution detail.' },
]);

REGIONS.push(
  { id: 'canada', region: 'Canada', city: 'Toronto', country: 'Canada', lat: 43.65, lng: -79.38, share: 60, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('209K+', '34.9K+', '1.2K+', '888+', 'Coverage from Toronto to Vancouver.') },
  { id: 'brazil', region: 'Brazil', city: 'São Paulo', country: 'Brazil', lat: -23.55, lng: -46.63, share: 45, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('56.6K+', '4.5K+', '85+', '257+', "Latin America's largest startup base.") },
  { id: 'mexico', region: 'Mexico', city: 'Mexico City', country: 'Mexico', lat: 19.43, lng: -99.13, share: 35, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('22K+', '2.1K+', '59+', '72+', 'A fast-rising LatAm ecosystem.') },
  { id: 'germany', region: 'Germany', city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.4, share: 72, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('648K+', '37.4K+', '7.8K+', '6K+', 'From Berlin startups to the Mittelstand.') },
  { id: 'france', region: 'France', city: 'Paris', country: 'France', lat: 48.85, lng: 2.35, share: 51, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('92.4K+', '29K+', '938+', '614+', 'La French Tech, tracked in depth.') },
  { id: 'spain', region: 'Spain', city: 'Madrid', country: 'Spain', lat: 40.42, lng: -3.7, share: 46, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('61.3K+', '21.6K+', '304+', '327+', 'Madrid, Barcelona and beyond.') },
  { id: 'israel', region: 'Israel', city: 'Tel Aviv', country: 'Israel', lat: 32.08, lng: 34.78, share: 35, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('23.5K+', '8.6K+', '229+', '166+', 'Startup-nation coverage, end to end.') },
  { id: 'uae', region: 'UAE', city: 'Dubai', country: 'United Arab Emirates', lat: 25.2, lng: 55.27, share: 45, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('56.1K+', '2.2K+', '299+', '159+', "The Gulf's busiest startup hub.") },
  { id: 'south-africa', region: 'South Africa', city: 'Johannesburg', country: 'South Africa', lat: -26.2, lng: 28.05, share: 43, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('45.7K+', '2.7K+', '169+', '94+', "The continent's most mature market.") },
  { id: 'china', region: 'China', city: 'Shanghai', country: 'China', lat: 31.23, lng: 121.47, share: 54, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('127K+', '31K+', '811+', '210+', 'Tech giants to emerging ventures.') },
  { id: 'japan', region: 'Japan', city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, share: 43, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('48.6K+', '6.3K+', '618+', '132+', 'Tokyo-centred, nationwide reach.') },
  { id: 'south-korea', region: 'South Korea', city: 'Seoul', country: 'South Korea', lat: 37.57, lng: 126.98, share: 38, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('29.3K+', '4.4K+', '381+', '148+', "Seoul's deep-tech and consumer scene.") },
  { id: 'indonesia', region: 'Indonesia', city: 'Jakarta', country: 'Indonesia', lat: -6.2, lng: 106.8, share: 39, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('33.7K+', '2.4K+', '63+', '67+', "SEA's largest single market.") },
  { id: 'australia', region: 'Australia', city: 'Sydney', country: 'Australia', lat: -33.86, lng: 151.2, share: 55, accent: '#1a73e8', accentSoft: '#e8f0fe',
    stats: countryStats('142K+', '9.3K+', '807+', '842+', 'Sydney and Melbourne, fully mapped.') },
);

export const HEADING = 'Coverage You Can Count On';
export const DESCRIPTION =
  "Explore Tracxn's coverage by geography. From companies and funding rounds to financials and cap tables, we pair AI-scale discovery with analyst-verified accuracy - so the numbers you brief, lend, or invest on are ones you can trust.";

// A few extra non-interactive city dots scattered for visual richness on the
// map. Berlin, Paris, Jakarta, Tokyo, São Paulo, Dubai and Sydney graduated to
// real pins in v7d, so only cities without a pin remain decorative.
export const DECOR_CITIES = [
  { lat: 40.71, lng: -74.0 },   // New York
  { lat: 19.07, lng: 72.87 },   // Mumbai
  { lat: 1.29, lng: 36.82 },    // Nairobi
  { lat: 59.33, lng: 18.07 },   // Stockholm
  { lat: -34.6, lng: -58.38 },  // Buenos Aires
];
