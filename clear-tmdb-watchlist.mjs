/**
 * clear-tmdb-watchlist.mjs
 * Wipes all movies from your TMDB watchlist.
 *
 * Usage:
 *   TMDB_API_KEY=your_key TMDB_SESSION_ID=your_session node clear-tmdb-watchlist.mjs
 *
 * To find your API key:  https://www.themoviedb.org/settings/api
 * To get a session ID:   See README below or run the auth helper script.
 */

const API_KEY = process.env.TMDB_API_KEY;
const SESSION_ID = process.env.TMDB_SESSION_ID;
const BASE = "https://api.themoviedb.org/3";

if (!API_KEY || !SESSION_ID) {
  console.error("Missing required env vars: TMDB_API_KEY and TMDB_SESSION_ID");
  process.exit(1);
}

async function tmdb(path, options = {}) {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${sep}api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${await res.text()}`);
  return res.json();
}

async function getAccountId() {
  const account = await tmdb("/account");
  return account.id;
}

async function getWatchlistPage(accountId, page) {
  return tmdb(`/account/${accountId}/watchlist/movies?page=${page}`);
}

async function getAllWatchlistMovies(accountId) {
  const first = await getWatchlistPage(accountId, 1);
  const movies = [...first.results];
  for (let page = 2; page <= first.total_pages; page++) {
    const data = await getWatchlistPage(accountId, page);
    movies.push(...data.results);
  }
  return movies;
}

async function removeFromWatchlist(accountId, movieId) {
  return tmdb(`/account/${accountId}/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ media_type: "movie", media_id: movieId, watchlist: false }),
  });
}

async function main() {
  try {
    console.log("Fetching account info...");
    const accountId = await getAccountId();
    console.log(`Account ID: ${accountId}`);

    console.log("Fetching watchlist...");
    const movies = await getAllWatchlistMovies(accountId);
    console.log(`Found ${movies.length} movies in watchlist.`);

    if (movies.length === 0) {
      console.log("Watchlist is already empty.");
      return;
    }

    console.log("Removing all movies...");
    for (const movie of movies) {
      await removeFromWatchlist(accountId, movie.id);
      console.log(`  Removed: ${movie.title} (${movie.id})`);
    }

    console.log(`\nDone. Removed ${movies.length} movies.`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
