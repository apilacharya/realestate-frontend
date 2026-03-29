# Real Estate Listings - Frontend

React SPA for browsing property listings with authentication, filtering, and pagination.

**Live:** https://realestate-frontend-phi.vercel.app -- Note: Demo Site might feel slower since backend is deployed on free tier service

## Prerequisites

- Node.js 18+
- pnpm
- Backend API running (see [backend README](../backend/README.md))

## Setup

```bash
pnpm install
```

No `.env` file is needed for local development. Vite proxies `/api` requests to `http://localhost:4000` automatically via `vite.config.ts`.

For production, Vercel rewrites in `vercel.json` proxy `/api/*` to the backend on Render.

## Running

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm preview
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Zustand** for auth state management
- **React Query** for server state and caching
- **React Hook Form** + **Zod** for form validation
- **React Router v7** for routing
- **Axios** for HTTP requests
- **Sonner** for toast notifications

## Pages and Routes

| Route | Access | Description |
|---|---|---|
| `/login` | Guest only | Login form |
| `/register` | Guest only | Registration form |
| `/` | Auth required | Property search with filters |
| `/listings/:id` | Auth required | Property detail page |

Guest routes redirect to `/` if already logged in. Protected routes redirect to `/login` if not authenticated.

## Features

- Cookie-based authentication (httpOnly JWT) with auto-rehydration on page load
- Property search by keyword across title, description, suburb, state, and address
- Filters: suburb, price range, bedrooms, bathrooms, property type, status
- Sort by price (ascending/descending) or newest
- Paginated results (12 per page)
- Filter state synced to URL query params (shareable/bookmarkable)
- Admin users see internal notes on listings; regular users do not
- Skeleton loaders during data fetches
- Rate limit and server error toast notifications

## Project Structure

```
frontend/
  vercel.json             # Vercel rewrites (API proxy + SPA fallback)
  vite.config.ts          # Vite config with dev proxy
  src/
    App.tsx               # Routes, auth rehydration
    main.tsx              # Entry point
    lib/
      api.ts              # Axios instance, auth/listings API functions
      schemas.ts          # Zod schemas for runtime validation
    types/
      auth.ts             # Auth type definitions
      listing.ts          # Listing/filter type definitions
    store/
      useAuthStore.ts     # Zustand auth state (user, loading)
      useFilterStore.ts   # Zustand filter state (search params)
    hooks/
      useAuth.ts          # Login/register/logout mutations
      useListings.ts      # Listings query hook
      useFilterSync.ts    # URL <-> filter store sync
    pages/
      LoginPage.tsx
      RegisterPage.tsx
      SearchPage.tsx       # Main listing grid with filters
      DetailPage.tsx       # Single property detail
    components/
      ProtectedRoute.tsx   # Redirects to /login if not authed
      GuestRoute.tsx       # Redirects to / if already authed
      Layout.tsx           # Page layout wrapper
      SearchHeader.tsx     # Search bar
      ListingFilters.tsx   # Desktop filter sidebar
      FilterDrawer.tsx     # Mobile filter drawer
      ListingCard.tsx      # Property card component
      Pagination.tsx       # Page navigation
      ListingSkeleton.tsx  # Loading skeleton for listing grid
      DetailSkeleton.tsx   # Loading skeleton for detail page
```

## Deployment

Deployed on Vercel. The `vercel.json` config handles two things:

1. `/api/*` requests are rewritten to the backend on Render
2. All other routes fall through to `index.html` for client-side routing

This keeps cookies same-site (no cross-domain issues on mobile browsers).
