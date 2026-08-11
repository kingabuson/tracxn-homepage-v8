// Real coverage figures, read off the live "Our Coverage" component on
// tracxn.com on 2026-07-24 by stepping through each geography tab.
// The site stamps the panel "Data as on Apr 01, 2026".
//
// Africa exposes only 10 of the 12 metrics on the live site — Financials and
// Cap Tables are simply absent there, so they are null rather than zero.

export const COVERAGE_AS_ON = 'Apr 01, 2026';

// Metric order and the tint each card carries on tracxn.com, taken from the
// live `.key-figure-*` rules.
export const COVERAGE_METRICS = [
  { key: 'companies',     label: 'Companies',      accent: '#337ab7', tint: 0.2  },
  { key: 'funded',        label: 'Funded',         accent: '#1daa7b', tint: 0.2  },
  { key: 'seriesA',       label: 'Series A+',      accent: '#1daa7b', tint: 0.1  },
  { key: 'seriesC',       label: 'Series C+',      accent: '#1daa7b', tint: 0.1  },
  { key: 'unfunded',      label: 'Unfunded',       accent: '#f9a11f', tint: 0.2  },
  { key: 'unicorns',      label: 'Unicorns',       accent: '#cad716', tint: 0.2  },
  { key: 'fundingRounds', label: 'Funding Rounds', accent: '#78c37b', tint: 0.2  },
  { key: 'acquisitions',  label: 'Acquisitions',   accent: '#46b0e4', tint: 0.2  },
  { key: 'investors',     label: 'Investors',      accent: '#78c37b', tint: 0.1  },
  { key: 'reports',       label: 'Reports',        accent: '#f7ca18', tint: 0.2  },
  { key: 'financials',    label: 'Financials',     accent: '#0596d2', tint: 0.1  },
  { key: 'capTables',     label: 'Cap Tables',     accent: '#8bc24a', tint: 0.12 },
];

// `regions` are the SVG region keys in world-map.js that light up for this tab.
export const COVERAGE_REGIONS = [
  {
    id: 'all',
    label: 'All Geographies',
    short: 'Worldwide',
    regions: ['us-canada', 'latam', 'europe', 'africa', 'mena', 'sea', 'oceania', 'india', 'other'],
    stats: {
      companies: '7.7M+', funded: '723K+', seriesA: '54.2K+', seriesC: '17.6K+',
      unfunded: '7M+', unicorns: '2K+', fundingRounds: '1.8M+', acquisitions: '226K+',
      investors: '290K+', reports: '11.4K+', financials: '392K+', capTables: '133K+',
    },
  },
  {
    id: 'us-canada',
    label: 'US & Canada',
    short: 'US & Canada',
    regions: ['us-canada'],
    stats: {
      companies: '1.8M+', funded: '302K+', seriesA: '25.1K+', seriesC: '8.2K+',
      unfunded: '1.5M+', unicorns: '1.2K+', fundingRounds: '1.3M+', acquisitions: '116K+',
      investors: '55.6K+', reports: '2.3K+', financials: '15.7K+', capTables: '7.1K+',
    },
  },
  {
    id: 'europe',
    label: 'Europe',
    short: 'Europe',
    regions: ['europe'],
    stats: {
      companies: '2.6M+', funded: '201K+', seriesA: '12K+', seriesC: '4.1K+',
      unfunded: '2.5M+', unicorns: '285+', fundingRounds: '317K+', acquisitions: '75.3K+',
      investors: '50.3K+', reports: '925+', financials: '241K+', capTables: '65.3K+',
    },
  },
  {
    id: 'india',
    label: 'India',
    short: 'India',
    regions: ['india'],
    stats: {
      companies: '663K+', funded: '33.6K+', seriesA: '3K+', seriesC: '870+',
      unfunded: '629K+', unicorns: '125+', fundingRounds: '49.6K+', acquisitions: '5.5K+',
      investors: '71.3K+', reports: '420+', financials: '109K+', capTables: '35.6K+',
    },
  },
  {
    id: 'sea',
    label: 'SEA',
    short: 'Southeast Asia',
    regions: ['sea'],
    stats: {
      companies: '159K+', funded: '15.1K+', seriesA: '1.3K+', seriesC: '410+',
      unfunded: '144K+', unicorns: '60+', fundingRounds: '13.3K+', acquisitions: '2.9K+',
      investors: '9K+', reports: '185+', financials: '9.2K+', capTables: '6.8K+',
    },
  },
  {
    id: 'africa',
    label: 'Africa',
    short: 'Africa',
    regions: ['africa'],
    stats: {
      companies: '131K+', funded: '12.3K+', seriesA: '610+', seriesC: '335+',
      unfunded: '119K+', unicorns: '10+', fundingRounds: '12.8K+', acquisitions: '2K+',
      investors: '2.2K+', reports: '10+', financials: null, capTables: null,
    },
  },
];

// "1.8M+" -> 1800000, so share-of-global bars can be drawn. Approximate by
// design: the site only publishes rounded figures.
export const coverageToNumber = function (v) {
  if (!v) return 0;
  const m = /^([\d.]+)\s*([KMB])?/.exec(v);
  if (!m) return 0;
  const mult = { K: 1e3, M: 1e6, B: 1e9 }[m[2]] || 1;
  return parseFloat(m[1]) * mult;
};
