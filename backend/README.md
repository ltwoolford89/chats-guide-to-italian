# Optional Stage 3 backend (Cloudflare Workers)

The Italian website works fully for offline lessons, grammar, listening and guided conversation **without any backend**. Deploy this companion Worker only if you want online AI conversations, encrypted cloud progress or scheduled phone push notifications. Cloudflare and the AI provider may apply usage limits or charges; review those before enabling AI.

**Never put any paid API key, VAPID private key or access code in the public GitHub repository or browser JavaScript.** These are server-side secrets only. Do not paste them into chat.

## Create a Cloudflare Worker

1. Create a Cloudflare account and install Node.js. In a terminal, run `npm install -g wrangler`, followed by `wrangler login`.
2. From this `backend/` folder, run `wrangler kv namespace create ITALIAN_DATA` and replace `YOUR_KV_NAMESPACE_ID` in `wrangler.toml` with the returned namespace ID.
3. Confirm `ALLOWED_ORIGIN` is exactly `https://ltwoolford89.github.io` (no trailing slash). It restricts browser access to your GitHub Pages origin.
4. Run `wrangler deploy` from `backend/`. Copy the resulting `https://...workers.dev` URL.
5. Open the Italian app → Settings → **Advanced learning services** → paste that **worker URL** and save it. Test the health endpoint from the app origin or with an `Origin` header: `GET /api/health`.

The Worker KV namespace stores encrypted progress and push subscriptions. It does **not** store your AI chat messages. Cloud progress contains encrypted data only and is protected by a random recovery code generated locally on your device. Anyone with that code can decrypt the backup, so keep it private. The code is **not** sent to the server.

## Enable online AI tutoring (optional; API usage may cost money)

1. Obtain your own API account and secret key with the provider you are authorised to use. The Worker example supports the OpenAI Responses API.
2. In a trusted local terminal, configure backend secrets using `wrangler secret put OPENAI_API_KEY` and `wrangler secret put AI_ACCESS_CODE`. Choose a strong random AI access code of **at least 12 characters**; this is *not* the API key.
3. Set `AI_MODEL` in `wrangler.toml` to a model available to your provider account (example default `gpt-4.1-mini`). Run `wrangler deploy` again.
4. In the app's Settings, enter the **AI access code** (not the provider key). This is saved only in the current tab's session storage. Open **Speak → Conversation studio** for AI-generated Italian dialogue and brief corrections.

The Worker allows only 20 AI messages per day per IP address, as a basic abuse control. KV rate limits are best effort, **not** a billing limit. Review your provider's own spending/budget caps before enabling the API. The access code is a personal-site protection mechanism rather than a multiuser account system. It must remain private.

If AI isn't configured, conversations switch to a structured offline coach rather than pretending to be AI.

## Enable encrypted cloud sync (optional)

1. Deploy the Worker and save its URL in the app.
2. Under **Encrypted cloud progress sync**, tap **Generate sync code** and **Copy code**. Save it privately in a reliable place.
3. Tap **Sync now**. On another device, enter the same code and press **Restore/merge cloud progress**.
4. You can upload a merged copy from that device with **Sync now**. The app does **not** silently sync in the background. This avoids surprising overwrites if you use both devices without updating the other one.

Data is encrypted using browser WebCrypto AES-GCM with a fresh random nonce for every upload. The key is generated locally and never sent to Cloudflare. Only encrypted ciphertext and a one-way identifier are stored on the server. Device localStorage keeps the recovery code; manual exported backups also include it. **Losing the code means permanent loss of access to the cloud copy.** Clearing browser storage can erase local learning progress if you haven't backed it up.

The sync merge keeps all completed lessons, uses the higher XP totals and daily activity values, and merges flashcard reviews by their last-review time. It does not combine every individual learning event. Always make an export before merging important progress.

## Enable scheduled push reminders (optional)

Web Push requires a VAPID key pair and a supported browser. On iPhone, install the app through Safari's **Add to Home Screen** before requesting notifications. Notifications must be explicitly granted by the user.

Generate your own P-256 VAPID key pair using a trusted web-push or cryptographic key generator. The public key is a Base64URL-encoded, uncompressed 65-byte P-256 public point; the private key is a corresponding P-256 JWK with `kty`, `crv`, `x`, `y`, `d` fields. Do not commit the private key.

- In `wrangler.toml` add `VAPID_PUBLIC_KEY = "<your-public-key>"` and `VAPID_SUBJECT = "mailto:you@example.com"` under `[vars]`.
- Run `wrangler secret put VAPID_PRIVATE_JWK` and paste the corresponding private JWK **as a secret**, not a repository file.
- Run `wrangler deploy`. The scheduled trigger `0 * * * *` checks hourly for subscribed devices' chosen local reminder hours.
- In the app, choose a reminder hour and tap **Enable phone notifications**. Turn them off in the same screen.

Reminders are one-per-local-day, subject to device permissions, platform/background-delivery rules and Web Push delivery. They are not guaranteed alarms. The Worker sends no personal progress details in a notification.

### Operational notes

- Workers KV writes are eventually consistent. Concurrent syncs and lightweight rate limits can race; this implementation is intended for a small personal app, not a large production deployment.
- Anyone who acquires the private AI access code might consume your API usage. Rotate it if exposed. CORS protects browser origins; it is **not** authentication.
- Push subscription endpoints are restricted to recognised browser push providers to reduce server-side request abuse.
- You control Cloudflare storage and can delete its KV namespace to erase remote encrypted backups and push subscriptions.
- Do not disclose personally identifying information in practice messages. AI exchanges travel to your configured AI service even though they're not retained by the example Worker.