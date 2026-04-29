# Precision2 (React + Tailwind + Clerk)

## Setup

1. Install deps
   - `npm install`

2. Configure environment variables
   - Copy `.env.example` to `.env`
   - Set `VITE_CLERK_PUBLISHABLE_KEY` (from the Clerk dashboard)

3. Run locally
   - `npm run dev`

## Auth requirements covered

- Login / Sign up / Logout via Clerk
- Sign up collects: Full Name, Email, Phone Number, City, State, Country
- Email verification uses OTP code (`email_code`)

## App routes

- `/` landing page
- `/login` login
- `/signup` sign up + OTP verification
- `/dashboard` overview
- `/dashboard/projects`
- `/dashboard/metrics`
- `/dashboard/clients`
- `/dashboard/profile`
