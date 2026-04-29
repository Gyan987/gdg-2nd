# Precision2

Precision2 is a Vite + React dashboard with Clerk authentication, Tailwind styling, and marketing pages (Services, Case Studies, Contact). It includes a dashboard area behind auth and a marketing preview system that renders the original HTML pages inside the app.

## Features

- Auth flows with Clerk (login, signup, email OTP verification, logout)
- Protected dashboard with nested routes
- Marketing pages served as SPA routes
- Tailwind CSS styling
- Vite build optimized for Vercel

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Clerk Auth

## Requirements

- Node.js 18+ (recommended)
- npm 9+

## Local Setup

1. Install dependencies
   - `npm install`

2. Create environment variables
   - Create a `.env` file in the project root
   - Add the following variable:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

3. Start the dev server
   - `npm run dev`

The app runs at http://localhost:5173 by default.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates the production build in `dist`
- `npm run preview` serves the production build locally
- `npm run vercel-build` is used by Vercel during deployment

## Routes

### Public

- `/` landing page
- `/services`
- `/case-studies`
- `/contact`

### Auth

- `/login`
- `/signup`

### Dashboard (protected)

- `/dashboard`
- `/dashboard/projects`
- `/dashboard/metrics`
- `/dashboard/clients`
- `/dashboard/profile`
###Wakatime Dashboard
<img width="1632" height="905" alt="image" src="https://github.com/user-attachments/assets/61719573-f6e6-4533-a66d-f5164430c770" />


## Deployment (Vercel)

1. Push the project to a Git repository.
2. Create a new Vercel project and import the repository.
3. Set the environment variable `VITE_CLERK_PUBLISHABLE_KEY` in Vercel.
4. Deploy. Vercel will run `npm run build` and serve the output from `dist`.

The Vercel config includes SPA rewrites so client-side routing works on refresh.

## Troubleshooting

- If the app fails to start, ensure `VITE_CLERK_PUBLISHABLE_KEY` is defined.
- If auth pages redirect unexpectedly, confirm the Clerk publishable key is for the correct instance.
