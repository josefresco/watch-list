/**
 * get-session-id.mjs
 * Two-step TMDB auth flow.
 *
 * Step 1 — get approval URL:
 *   TMDB_API_KEY=your_key node get-session-id.mjs
 *
 * Step 2 — exchange approved token for session ID:
 *   TMDB_API_KEY=your_key node get-session-id.mjs <request_token>
 */

const API_KEY = process.env.TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
const requestToken = process.argv[2];

if (!API_KEY) {
  console.error("Missing required env var: TMDB_API_KEY");
  process.exit(1);
}

async function tmdb(path, options = {}) {
  const url = `${BASE}${path}?api_key=${API_KEY}`;
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  try {
    if (!requestToken) {
      // Step 1: Get a request token
      const { request_token } = await tmdb("/authentication/token/new");
      console.log("\nApprove this URL in your browser:\n");
      console.log(`  https://www.themoviedb.org/authenticate/${request_token}\n`);
      console.log("Then run Step 2:\n");
      console.log(`  TMDB_API_KEY=${API_KEY} node get-session-id.mjs ${request_token}\n`);
    } else {
      // Step 2: Exchange approved token for session ID
      const { session_id } = await tmdb("/authentication/session/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_token: requestToken }),
      });
      console.log("\nSuccess! Run the wipe script:\n");
      console.log(`  TMDB_API_KEY=${API_KEY} TMDB_SESSION_ID=${session_id} node clear-tmdb-watchlist.mjs\n`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
