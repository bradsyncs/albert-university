# AU Clan Roster Website

A first working starter for the roster selector homepage.

## What is included
- Minimal homepage with no navigation bar and no social links/footer.
- Three roster cards: Albert University (orange), Synchronized (blue), Nerotopia (purple).
- Each card opens its own roster URL.
- Responsive layout for mobile and desktop.
- Express server for deployment on Render.
- A visual background asset based on the approved roster concept.

## Run locally
1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.

## Deploy on Render
1. Push these files to a GitHub repository.
2. In Render, create **New → Web Service** and connect that repository.
3. Build command: `npm install`
4. Start command: `npm start`
5. Choose the Free plan for initial testing, if available.

Render will run `server.js` and serve the `public` folder. GitHub stores the project code; Render publishes the running website.

## Next steps
- Add real roster members and rank groups.
- Add separate AU site pages without putting those links on the homepage.
- Later add tryout application handling and Discord webhook integration using a Render environment variable. Never put Discord webhook secrets in browser JavaScript.