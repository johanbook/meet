# mobile-app

Mobile app for **meet** — an Expo (SDK 56) application that mirrors the
feature set of the web app in [`services/web-ui`](../web-ui). React Native
0.85, expo-router navigation, TanStack Query for data fetching.

## Setup

Requires Node 20+ and npm.

```sh
npm install
```

### Configuration

The web app talks to the API on the same origin it is served from. A mobile
app has no origin, so the backend base URLs are configured with environment
variables (`EXPO_PUBLIC_*` values are inlined at build/start time):

| Variable | Default | Meaning |
|---|---|---|
| `EXPO_PUBLIC_API_BASE_URL` | `http://localhost` | Meet API origin (generated client paths already include `/api`) |
| `EXPO_PUBLIC_AUTH_BASE_URL` | `http://localhost/auth/api` | Supertokens recipe endpoints (path prefix `/auth/api`) |

Expo reads `EXPO_PUBLIC_*` values from a `.env` file in the project root (see
`.env.example`). The simplest setup against the production system:

```sh
cp .env.example .env     # points at https://app.meetly.site
npm start
```

Alternatively, pass the variables inline. On a physical device `localhost`
refers to the phone; point the variables at the server host, e.g.:

```sh
EXPO_PUBLIC_API_BASE_URL=https://app.meetly.site \
EXPO_PUBLIC_AUTH_BASE_URL=https://app.meetly.site/auth/api \
npm run ios
```

The server must be reachable from the phone: either run the stack on a
reachable host, or run a tunnel. Note that the API base URL must NOT include
a path (`/api`) — the generated clients already prefix their requests with
it.

## Running

```sh
npm start        # Expo dev server (scan QR with Expo Go)
npm run ios      # iOS emulator
npm run android  # Android emulator
npm run web      # web preview (react-native-web)
npm run export   # static web export
npm run typecheck
```

## Authentication

The backend authenticates with Supertokens session cookies verified at the
Traefik gateway (`/api` requests are forwarded to `auth-api/authenticate`).
The mobile app implements the same session flow directly:

- `src/core/authentication/session.ts` — cookie jar, persisted to the
  platform cache directory (`expo-file-system`). iOS never surfaces
  `Set-Cookie` to JS, so the jar reads sessions from the `x-session-cookie`
  response header (set by the auth-api mirroring Supertokens' Set-Cookie
  headers) with a `set-cookie` fallback where available.
- `src/core/authentication/authApi.ts` — Supertokens recipe calls
  (`/auth/api/signin`, `/auth/api/signout`); the `anti-csrf` header is
  replayed from the `sAntiCsrfToken` cookie when present.
- `src/apis.ts` — attaches the session cookie to every API request through a
  custom `fetchApi` on the generated client `Configuration`.

Sign-in is `src/app/login.tsx` (`POST {authBase}/signin` with email/password).
New accounts and email verification happen on the web auth UI; the app's
login screen surfaces the "verify email" state and can resend the
verification email.

On native, an empty app session skips the API probe entirely and opens the
login screen directly (there is no browser cookie jar to probe); a stored
session that the server rejects (401) falls back to the same login screen.
On web the session lives in the browser and the probe is the only way to
detect it, so the server's 401 drives the redirect instead.

## Architecture

Mirrors the web app structure: OpenAPI-generated API client in `src/api`
(copied from web-ui — see **Regenerating the client**), hand-written wiring in
`src/apis.ts`, TanStack Query cache keys in `src/core/query`. Routes live in
`src/app/**` (expo-router file-based routing) rendering inside the app shell
`src/app/_layout.tsx` (Theme → Snackbar → Dialog → AuthenticationGuard →
NotificationProvider → ProfileGuard → BottomNav).

| web-ui | mobile-app |
|---|---|
| Routes (react-router) | `src/app/**` files |
| MUI components | `src/components/ui/**` (RN equivalents, themed) |
| Notistack snackbars | `src/core/snackbar` (bottom toasts) |
| Socket.io notifications | `src/core/notifications` (same event handler semantics, per-type handlers) |
| `@mui/x-charts` LineChart | `src/features/time-series/components/TimeSeriesChart/LineChart.tsx` (dependency-free RN Views) |
| localStorage | `src/core/storage` (memory + file / localStorage backends) |
| i18next | hard-coded English copy (web defaults to `en`) |

## Regenerating the API client

The generated client under `src/api` is a copy of the web-ui client
(`services/web-ui/src/api`). Regenerate there
(`cd services/web-ui && ./scripts/generate-swagger`) and copy the `api`
folder into this project.

## Photo uploads

Picked images are returned as `{ uri, name, type }` file descriptors
(`src/utils/photo.ts`) and passed to the multipart API operations; React
Native's `FormData` accepts these parts directly, so the generated client
needs no changes.

## Notes / deviations from web-ui

- Bookings **create** is wired in the mobile app (the web UI only renders the
  form). The server contract (`POST /api/bookings` with `CreateBookingCommand`)
  is unchanged.
- Real-time notifications use `socket.io-client`; if the platform lacks a
  WebSocket implementation the connection fails closed and the app keeps
  working (snackbar notifications degrade, queries still refresh on mutation).
- Push notifications (web push / service worker) are not applicable on
  native; the Settings screen documents this.