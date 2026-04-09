# Watch List

**A Private JustWatch Alternative PWA Powered by TMDB**

Watch List is a fast, privacy-focused Progressive Web App for tracking movies and TV shows you want to watch. No ads, no tracking, no dark patterns — just clean movie discovery powered by The Movie Database (TMDB) API.

## Features

- 🎬 **Watchlist Management** — Track movies and TV shows you want to watch
- 🔍 **TMDB Search** — Search for any movie or TV show with real-time results
- 📺 **Streaming Info** — See which services are streaming each title
- 📱 **PWA Support** — Install on any device as a native app
- 🌙 **Dark Theme** — Easy on the eyes with a modern dark interface
- 💾 **Local Storage** — Your watchlist is stored locally in your browser
- 🎲 **Random Pick** — Can't decide? Get a random suggestion from your watchlist
- 📋 **Multiple Views** — Grid and list view options for browsing

## Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → root
   - Save

2. **Visit your site** at `https://username.github.io/watch-list/`

3. **Configure API** (optional):
   - The app works with a default API key
   - For unlimited use, add your own TMDB API key in settings

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/josefresco/watch-list.git
cd watch-list

# Start a local server (Python 3)
python -m http.server 8000

# Or use Node.js
npx serve .
```

Open `http://localhost:8000` in your browser.

### Option 3: Direct Deployment

Simply upload the files to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Your own web server

## Configuration

### TMDB API (Optional)

The app includes a default API key for basic use. For unlimited access:

1. Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Open the app settings
3. Enter your API key
4. Your key is saved locally and never shared

### Streaming Services

The app filters streaming providers based on your subscriptions. Edit the `userServices` array in `index.html` to match your services:

```javascript
const userServices = [
  "netflix",
  "hulu",
  "amazon prime",
  "disney",
  "hbo",
  "youtube tv",
  // Add your services here
];
```

## Usage

### Adding to Watchlist

1. Search for a movie or TV show
2. Click the **+** button to add to your watchlist
3. View your watchlist in the "Watchlist" tab

### Marking as Watched

1. Go to your Watchlist
2. Click the ✓ button on any item
3. The item is removed from your watchlist

### Random Selection

Click the 🎲 button to get a random movie from your watchlist — perfect for when you can't decide what to watch!

### Install as PWA

**On iOS:**
1. Open in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

**On Android:**
1. Open in Chrome
2. Tap the menu (⋮)
3. Select "Install app" or "Add to Home Screen"

## Project Structure

```
watch-list/
├── index.html          # Main application (single-file PWA)
├── favicon.svg         # App icon (SVG)
├── apple-touch-icon.png # iOS home screen icon
└── README.md           # This file
```

## Technical Details

- **Single File App** — All HTML, CSS, and JavaScript in one file
- **No Build Step** — Pure vanilla JavaScript, no dependencies
- **TMDB API** — Uses The Movie Database API for movie/TV data
- **LocalStorage** — Watchlist persisted in browser storage
- **Responsive Design** — Works on phones, tablets, and desktops
- **Offline Capable** — Basic functionality works without internet

## Privacy

Watch List is designed with privacy in mind:

- ✅ No tracking or analytics
- ✅ No ads
- ✅ No user accounts
- ✅ Data stored locally in your browser
- ✅ No server-side processing
- ✅ Open source and transparent

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+
- iOS Safari 14+
- Android Chrome 88+

## API Credits

- Movie and TV data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB

## License

MIT License — Feel free to use, modify, and distribute.

## Acknowledgments

Inspired by JustWatch, but built for privacy and simplicity.

---

**Enjoy your movies! 🎬🍿**
