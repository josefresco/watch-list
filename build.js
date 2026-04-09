const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const apiKey    = process.env.TMDB_API_KEY    || '';
const sessionId = process.env.TMDB_SESSION_ID || '';
const adultPin  = process.env.ADULT_PIN       || '';

if (!apiKey)    console.warn('Warning: TMDB_API_KEY is not set');
if (!sessionId) console.warn('Warning: TMDB_SESSION_ID is not set');

html = html.replace('%%TMDB_API_KEY%%',    apiKey);
html = html.replace('%%TMDB_SESSION_ID%%', sessionId);
html = html.replace('%%ADULT_PIN%%',       adultPin);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

console.log('Build complete.');
