import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useMemo, useState } from 'react'
import Button from '../components/ui/Button.jsx'

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    end: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeWidth="1.5" d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
      </svg>
    ),
  },
  {
    to: '/dashboard/projects',
    label: 'Projects',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeWidth="1.5" d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path strokeWidth="1.5" d="M3 7V5a2 2 0 0 1 2-2h4l2 2" />
      </svg>
    ),
  },
  {
    to: '/dashboard/metrics',
    label: 'Metrics',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeWidth="1.5" d="M4 19V5M10 19V9M16 19V12M22 19V7" />
      </svg>
    ),
  },
  {
    to: '/dashboard/clients',
    label: 'Clients',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeWidth="1.5" d="M16 11a4 4 0 1 0-8 0" />
        <path strokeWidth="1.5" d="M4 20a6 6 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    to: '/dashboard/profile',
    label: 'Profile',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeWidth="1.5" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
        <path strokeWidth="1.5" d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
]

function Sidebar({ onNavigate, onSignOut }) {
  return (
    <div className="flex h-full flex-col gap-6 px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeWidth="1.6" d="M7 6h10M7 12h6M7 18h10" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">PrecisionOS</div>
          <div className="text-xs text-slate-500">Digital Curator Mode</div>
        </div>
      </div>

      <Button className="gap-2" size="sm">
        <span className="text-lg leading-none">+</span>
        New Project
      </Button>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto grid gap-2 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 text-slate-500 transition hover:text-slate-900"
          onClick={onNavigate}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-slate-500 shadow-sm">
            ?
          </span>
          Support
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-slate-500 transition hover:text-slate-900"
          onClick={onSignOut}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-slate-500 shadow-sm">
            >
          </span>
          Sign Out
        </button>
        <div className="text-xs text-slate-400">© {new Date().getFullYear()} Precision</div>
      </div>
    </div>
  )
}

function MobileShell({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
        {children}
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const location = useLocation()
  const { signOut } = useClerk()
  const { user } = useUser()
  const [mobileOpen, setMobileOpen] = useState(false)

  const pageTitle = useMemo(() => {
    const item = navItems.find((n) => location.pathname === n.to)
    if (item) return item.label
    if (location.pathname.startsWith('/dashboard/projects')) return 'Projects'
    if (location.pathname.startsWith('/dashboard/metrics')) return 'Metrics'
    if (location.pathname.startsWith('/dashboard/clients')) return 'Clients'
    if (location.pathname.startsWith('/dashboard/profile')) return 'Profile'
    return 'Dashboard'
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#f3f4ff]">
      <MobileShell open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Sidebar
          onNavigate={() => setMobileOpen(false)}
          onSignOut={() => signOut({ redirectUrl: '/' })}
        />
      </MobileShell>

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="sticky top-0 hidden h-screen border-r border-slate-200/70 bg-[#eef0ff] md:block">
          <Sidebar onSignOut={() => signOut({ redirectUrl: '/' })} />
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  variant="ghost"
                  className="md:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  Menu
                </Button>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{pageTitle}</div>
                  <div className="truncate text-xs text-slate-600">
                    {user?.fullName ? `Hi, ${user.fullName}` : 'Signed in'}
                  </div>
                </div>
              </div>

              <Button variant="ghost" onClick={() => signOut({ redirectUrl: '/' })}>
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
