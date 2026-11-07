# Chat's Guide to Italian · Version 3.0 🇮🇹

A mobile-first, installable Italian learning PWA with offline lessons and games, an expanded course, listening and grammar practice, and optional secure online AI and cloud services.

**Live site (once Pages is enabled):** https://ltwoolford89.github.io/chats-guide-to-italian/  
**Source:** https://github.com/ltwoolford89/chats-guide-to-italian

## What's new

### Stage 2 — Expanded learning (works offline after installation)

- **51 lessons**, including 32 A1 beginner lessons and 19 higher-level previews (A2–C2). **The advanced previews are not full certification-level courses.**
- **15 units** and automatic lesson unlocking, including time, shopping, weather, routines, regular verbs, past tense, future tense, comparisons and advanced language concepts.
- **Listening comprehension:** Italian audio followed by meaning questions. It draws from your unlocked lesson examples and includes slower playback.
- **Grammar drills:** Scored quiz sessions drawn from the grammar in unlocked lessons, with explanations.
- **Verb trainer:** 10 common verbs, six persons, present and future forms, scored feedback.
- **Improved spaced repetition:** Flashcards use a scheduling algorithm that considers correct recall, interval length, easiness, and previous lapses. Your old reviews remain readable.
- **Statistics:** Skill-focused counts for listening, grammar, verb forms and reviewed vocabulary.

### Stage 3 — Conversation and optional online services

- **Six conversation scenarios** (greetings, restaurant, station, shopping, school, travel).
- **Offline conversation coach:** free keyword-guided exchanges with Italian replies and English hints. This is not generative AI.
- **Real AI tutor integration:** ready to connect to a separately deployed secure Cloudflare Worker with a server-side AI API key, user-set access code and basic rate limiting. Not active until you configure the Worker and API service.
- **Pronunciation practice:** retains microphone transcription and approximate word matching on browsers that support Web Speech; **not a phoneme-by-phoneme or accent assessment**. Dictation can fill conversation replies.
- **Encrypted cloud sync:** optional, manual, browser-based AES-GCM encryption with a private recovery code and a Workers KV backend. Nothing is automatically uploaded before you enable it.
- **Background push reminders:** optional opt-in browser Web Push support via a separately configured Worker, VAPID key pair and scheduled trigger. iPhone support requires installing the PWA and allowing notifications. In-app reminders still work without any backend.
- **Privacy:** local saves stay local. No private API keys are embedded in this GitHub Pages app. The offline app works without signing up, paid accounts or the optional Worker.

## Deploy the website (free)

1. Make sure **all site files** are in the repository root: `index.html`, `styles.css`, `app.js`, `advanced-data.js`, `advanced-ui.js`, `sw.js`, `manifest.webmanifest`, `assets/`, and `.nojekyll`.
2. In GitHub → repository **Settings → Pages** choose **Deploy from a branch → main → /(root) → Save**. Existing Pages settings can stay unchanged after future commits.
3. Open the live URL above; if your phone shows the old version, refresh once online to update its offline cache.
4. In iPhone Safari use **Share → Add to Home Screen**.

The website uses relative file paths and can be hosted as a GitHub Pages subdirectory. Offline caching starts after the first successful visit on HTTPS.

## Use locally

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000 . Opening `index.html` directly using `file://` does not enable PWA service workers.

## Set up the optional Stage 3 backend

See **[backend/README.md](backend/README.md)** for step-by-step deployment of Cloudflare Workers, AI access, encrypted sync and optional scheduled notifications. This is a separate service; GitHub Pages does not execute server-side code. The core app runs without it.

## File structure

- `index.html` — HTML shell and script references
- `app.js` — original lessons and existing practice, state, menus, settings
- `advanced-data.js` — expanded lesson curriculum, verbs, conversation scenarios
- `advanced-ui.js` — listening, grammar, verb trainer, tutor, encryption and optional push settings
- `styles.css` — responsive light/dark UI
- `sw.js` — offline cache, push notification receiver and notification click handling
- `manifest.webmanifest`, `assets/` — PWA metadata and app icons
- `backend/` — separately deployed, optional Worker (not executed by GitHub Pages)

## Keeping your previous progress

Version 3 intentionally keeps the original localStorage key `chats-guide-italian-v1` and reads Version 1 backups. It retains your finished lessons, XP and review history. You can export a local JSON backup from Settings before updating or switching browsers. Existing progress is **not** copied automatically between devices without cloud sync.

## Limitations and responsibility

Italian speech recognition/voice synthesis varies by browser, device voices and network availability. In-app reminders are not the same as push reminders. Hosting GitHub Pages is free for public repositories; Workers and AI providers may have limits or charges. Backend secrets must never be committed to the public repository. The higher-level language modules are instructional previews and should not be treated as proof of formal proficiency.