import { Link, useNavigate } from 'react-router-dom'
import { useSignUp } from '@clerk/clerk-react'
import { useMemo, useState } from 'react'
import AuthShell from './AuthShell.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const { isLoaded, signUp, setActive } = useSignUp()

  const [step, setStep] = useState('form') // 'form' | 'verify'
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    city: '',
    state: '',
    country: '',
  })
  const [code, setCode] = useState('')

  const missing = useMemo(() => {
    const required = ['fullName', 'email', 'password', 'phoneNumber', 'city', 'state', 'country']
    return required.some((k) => !String(form[k] || '').trim())
  }, [form])

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }))
  }

  const onCreate = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setSubmitting(true)
    setError('')

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        firstName: form.fullName.split(' ')[0] || '',
        lastName: form.fullName.split(' ').slice(1).join(' ') || '',
        unsafeMetadata: {
          phoneNumber: form.phoneNumber,
          city: form.city,
          state: form.state,
          country: form.country,
        },
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep('verify')
    } catch (e2) {
      setError(e2?.errors?.[0]?.longMessage || e2?.message || 'Sign up failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onVerify = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setSubmitting(true)
    setError('')

    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status !== 'complete') {
        setError('Verification not complete. Please try again.')
        return
      }

      await setActive({ session: result.createdSessionId })
      navigate('/dashboard', { replace: true })
    } catch (e2) {
      setError(e2?.errors?.[0]?.longMessage || e2?.message || 'Verification failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onResend = async () => {
    if (!isLoaded) return
    setSubmitting(true)
    setError('')
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (e2) {
      setError(e2?.errors?.[0]?.longMessage || e2?.message || 'Failed to resend code')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'verify') {
    return (
      <AuthShell
        title="Verify your email"
        subtitle="Enter the one-time code sent to your email."
      >
        <form className="grid gap-3" onSubmit={onVerify}>
          <Input
            label="Verification code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            required
          />

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <Button type="submit" disabled={!isLoaded || submitting}>
            {submitting ? 'Verifying…' : 'Verify'}
          </Button>

          <Button type="button" variant="ghost" onClick={onResend} disabled={submitting}>
            Resend code
          </Button>

          <div className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-700 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Create account" subtitle="Sign up and verify your email with OTP.">
      <form className="grid gap-3" onSubmit={onCreate}>
        <Input label="Full name" value={form.fullName} onChange={onChange('fullName')} required />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onChange('email')}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={onChange('password')}
          required
        />

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Phone number"
            value={form.phoneNumber}
            onChange={onChange('phoneNumber')}
            placeholder="+1 555 555 5555"
            required
          />
          <Input label="City" value={form.city} onChange={onChange('city')} required />
          <Input label="State" value={form.state} onChange={onChange('state')} required />
          <Input label="Country" value={form.country} onChange={onChange('country')} required />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <Button type="submit" disabled={!isLoaded || submitting || missing}>
          {submitting ? 'Creating…' : 'Create account'}
        </Button>

        <div className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}
