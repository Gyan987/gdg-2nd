import { useMemo, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardBody, CardHeader } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'

export default function Profile() {
  const { user, isLoaded } = useUser()
  const meta = useMemo(() => (user?.unsafeMetadata || {}), [user])

  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phoneNumber: meta.phoneNumber || '',
    city: meta.city || '',
    state: meta.state || '',
    country: meta.country || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isLoaded) {
    return <div className="text-sm text-slate-600">Loading…</div>
  }

  const email = user?.primaryEmailAddress?.emailAddress || ''

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }))
  }

  const onSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await user.update({
        firstName: form.fullName?.split(' ')?.[0] || '',
        lastName: form.fullName?.split(' ')?.slice(1).join(' ') || '',
        unsafeMetadata: {
          ...meta,
          phoneNumber: form.phoneNumber,
          city: form.city,
          state: form.state,
          country: form.country,
        },
      })
      setSuccess('Profile updated.')
    } catch (e) {
      setError(e?.errors?.[0]?.longMessage || e?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div>
            <div className="text-sm font-semibold text-slate-900">Profile</div>
            <div className="text-xs text-slate-600">Manage your personal details.</div>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Full name" value={form.fullName} onChange={onChange('fullName')} />
            <Input label="Email" value={email} disabled />
            <Input
              label="Phone number"
              value={form.phoneNumber}
              onChange={onChange('phoneNumber')}
              placeholder="+1 555 555 5555"
            />
            <Input label="City" value={form.city} onChange={onChange('city')} />
            <Input label="State" value={form.state} onChange={onChange('state')} />
            <Input label="Country" value={form.country} onChange={onChange('country')} />
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          {success ? <div className="text-sm text-emerald-700">{success}</div> : null}

          <div className="flex flex-wrap gap-2">
            <Button onClick={onSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Account status</div>
        </CardHeader>
        <CardBody className="grid gap-2 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Email verified</span>
            <span className="font-medium">
              {user?.primaryEmailAddress?.verification?.status === 'verified' ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>User ID</span>
            <span className="font-mono text-xs text-slate-600">{user?.id}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
