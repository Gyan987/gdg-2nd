import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'
import { useState } from 'react'
import AuthShell from './AuthShell.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { isLoaded, signIn, setActive } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setSubmitting(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard', { replace: true })
        return
      }

      setError('Additional verification is required for this account.')
    } catch (e2) {
      setError(e2?.errors?.[0]?.longMessage || e2?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Login" subtitle="Access your dashboard.">
      <form className="grid gap-3" onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <Button type="submit" disabled={!isLoaded || submitting}>
          {submitting ? 'Logging in…' : 'Login'}
        </Button>

        <div className="text-sm text-slate-600">
          New here?{' '}
          <Link to="/signup" className="font-medium text-blue-700 hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}
