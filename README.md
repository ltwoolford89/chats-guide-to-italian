# Chat's Guide to Italian — Version 1.0

An installable, offline-first Italian learning web app, built with plain HTML, CSS and JavaScript. No dependencies, user accounts, paid API or build tools required.

## Try it locally

Open a terminal inside this folder and run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Opening `index.html` directly with `file://` is not recommended: service workers and PWA installation require HTTP localhost or HTTPS.

## Host free using GitHub Pages

1. In your GitHub account `ltwoolford89`, create a new **public** repository named `chats-guide-to-italian` and check **Add a README file** (this establishes the `main` branch).
2. Upload **all site files** (`index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `assets/` and `.nojekyll`) to the repository root, not a nested folder. If using the ChatGPT GitHub connector, ask ChatGPT to upload the files once the repository exists.
3. Under **Settings → Pages**, select **Deploy from a branch** and choose **main / (root)**, then click **Save**. This part must be enabled in the GitHub interface; the connected app currently does not expose Pages settings.
4. Once GitHub publishes the site, open `https://ltwoolford89.github.io/chats-guide-to-italian/` in Safari on your iPhone.
5. In Safari, use **Share → Add to Home Screen → Add**. (The exact menu wording may vary by iOS version.)

GitHub Pages must be served over HTTPS for the service worker. The site works under a subdirectory because every asset URL is relative.

## Included in Version 1.0

- Modern responsive layout, five main sections, light/dark/automatic themes
- 12 structured beginner Italian lessons with topic vocabulary, mini-grammar and interactive checkpoints
- Unlockable learning path, daily lesson recommendation
- Audio with browser Italian text-to-speech, adjustable speed
- Pronunciation feedback via browser speech recognition *where supported*, including clear unsupported-browser messaging
- Offline guided café, introductions and travel dialogues (not AI-generated)
- Flashcards with simple spaced repetition, matching, fill-in questions and writing practice
- XP, learner levels, consecutive-day streaks, achievements, daily/weekly goal settings, statistics
- Dictionary, travel phrasebook, cultural notes, daily word
- Customisable home shortcuts, saved local progress, export/import, optional in-app reminders
- PWA install support and cached lessons for offline use after the first successful visit

## Important limits

- **AI chat is not connected yet.** The guided conversations are branching offline scenarios; real AI chat requires an external API/backend and safeguards. Do not embed paid secret API keys in client-side code.
- **Pronunciation checking varies by browser.** Web Speech API speech recognition may be unavailable, especially on some iOS browser versions. Speech similarity is only an approximate text match, not accent analysis. Voice synthesis can depend on installed language voices or internet access.
- **Reminders are in-app only.** The app displays a prompt when opened after a missed day. Automatic daily push notifications require a push server and applicable iOS support.
- **Progress is stored locally in this browser/device.** Clearing site data can erase progress. Export a backup from Settings. Synchronising across devices requires backend accounts.
- Offline availability starts after the first successful HTTPS or localhost load, once the service worker has installed. Audio recognition / some voices can need internet access.

## Project files

- `index.html` — app shell
- `styles.css` — responsive UI and dark theme
- `app.js` — lessons, interactions, local storage
- `manifest.webmanifest` — PWA metadata
- `sw.js` — service worker for offline caching
- `assets/` — app icons

## Suggested next stages

1. Expand from A1 starter content to a full A1 course with larger listening and grammar libraries.
2. Add robust pronunciation feedback and AI conversations via a secure online backend.
3. Add optional login/sync, true push notifications, progress portability and expanded A2–C2 content.