import { Link } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Button from '../components/ui/Button.jsx'
import { Card, CardBody } from '../components/ui/Card.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-semibold tracking-wide text-slate-900">PRECISION</div>
            <nav className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wide text-slate-600">
              <Link to="/services" className="transition hover:text-slate-900">
                Services
              </Link>
              <Link to="/case-studies" className="transition hover:text-slate-900">
                Case Studies
              </Link>
              <Link to="/contact" className="transition hover:text-slate-900">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <SignedOut>
              <Button as={Link} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={Link} to="/signup">
                Sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button as={Link} to="/dashboard">
                Go to Dashboard
              </Button>
            </SignedIn>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="text-xs font-semibold tracking-widest text-slate-500">
              DIGITAL CURATORS
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              A clean dashboard experience with email OTP onboarding.
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Create an account, verify your email with a one-time code, then manage projects,
              clients, and metrics in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <SignedOut>
                <Button as={Link} to="/signup" size="lg">
                  Get started
                </Button>
                <Button as={Link} to="/login" size="lg" variant="ghost">
                  I already have an account
                </Button>
              </SignedOut>
              <SignedIn>
                <Button as={Link} to="/dashboard" size="lg">
                  Open Dashboard
                </Button>
              </SignedIn>
            </div>
          </div>

          <Card>
            <CardBody className="grid gap-3">
              <div className="text-sm font-semibold text-slate-900">What’s included</div>
              <ul className="grid gap-2 text-sm text-slate-700">
                <li className="rounded-lg bg-slate-50 px-3 py-2">Login / Sign up / Logout</li>
                <li className="rounded-lg bg-slate-50 px-3 py-2">Email OTP verification</li>
                <li className="rounded-lg bg-slate-50 px-3 py-2">Dashboard tabs: Projects, Metrics, Clients, Profile</li>
                <li className="rounded-lg bg-slate-50 px-3 py-2">Responsive Tailwind UI</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
