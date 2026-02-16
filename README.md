# SleepFactor marketing website

Static marketing site for the SleepFactor mobile app. Matches the app’s design and brand.

## Contents

- **Home** – Value proposition and “how it works” (log habits → sync sleep data → see habit insights).
- **About** – Mission, what we do, who we are, contact.
- **Privacy** – Privacy policy and cookie information.

The site uses a single cookie to remember your cookie consent (no tracking).

## Hosting on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `sleepfactor-website` or `SleepfactorWebsite`). Do not add a README, .gitignore, or license if you’re pushing this folder so the repo stays empty.

2. **Push this folder** to the new repo:
   - In this folder, run:
     - `git init`
     - `git add .`
     - `git commit -m "Initial SleepFactor marketing site"`
     - `git branch -M main`
     - `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
     - `git push -u origin main`
   - Use your actual GitHub username and repo name.

3. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)**.
   - Save.

4. **Wait a minute or two.** The site will be at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - If the repo is named `sleepfactor-website`, the URL is `https://YOUR_USERNAME.github.io/sleepfactor-website/`.

**Note:** If the repo name is exactly `YOUR_USERNAME.github.io`, the site is served at `https://YOUR_USERNAME.github.io/` (no repo path). For a custom domain like sleepfactor.app, you’ll set that up later (e.g. in Vercel or in GitHub Pages custom domain settings).

## Hosting on Vercel (later, with sleepfactor.app)

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New Project** → Import the same GitHub repo.
3. Leave build settings as default (Vercel will serve the static files).
4. After deploy, go to **Project → Settings → Domains** and add **sleepfactor.app**.
5. At your domain registrar, set the DNS records Vercel shows (usually an A record or CNAME). Once DNS has updated, the site will be live at sleepfactor.app.

## Local preview

Open the folder in a browser or use a simple local server, for example:

- **Python 3:** `python3 -m http.server 8000` then visit `http://localhost:8000`
- **Node:** `npx serve .` then visit the URL it prints

Use relative links and the same folder structure so the site works the same on GitHub Pages and Vercel.
