import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Overview from './pages/dashboard/Overview.jsx'
import Projects from './pages/dashboard/Projects.jsx'
import Metrics from './pages/dashboard/Metrics.jsx'
import Clients from './pages/dashboard/Clients.jsx'
import Profile from './pages/dashboard/Profile.jsx'
import Services from './pages/marketing/Services.jsx'
import CaseStudies from './pages/marketing/CaseStudies.jsx'
import Contact from './pages/marketing/Contact.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services-overview.html" element={<Services />} />
      <Route path="/case-studies.html" element={<CaseStudies />} />
      <Route path="/contact-us.html" element={<Contact />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Overview />} />
        <Route path="projects" element={<Projects />} />
        <Route path="metrics" element={<Metrics />} />
        <Route path="clients" element={<Clients />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
