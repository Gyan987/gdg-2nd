import { Card, CardBody, CardHeader } from '../../components/ui/Card.jsx'

const clients = [
  { name: 'Lumière Atelier', city: 'Paris', tier: 'Premium', status: 'Active' },
  { name: 'Kinetic Retail', city: 'Berlin', tier: 'Standard', status: 'Active' },
  { name: 'Orchid Studio', city: 'London', tier: 'Standard', status: 'Onboarding' },
  { name: 'Northwind Media', city: 'Austin', tier: 'Premium', status: 'Paused' },
]

function Status({ value }) {
  const map = {
    Active: 'bg-emerald-50 text-emerald-700',
    Onboarding: 'bg-blue-50 text-blue-700',
    Paused: 'bg-slate-100 text-slate-700',
  }
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[value] || map.Active}`}>
      {value}
    </span>
  )
}

export default function Clients() {
  return (
    <Card>
      <CardHeader>
        <div>
          <div className="text-sm font-semibold text-slate-900">Clients</div>
          <div className="text-xs text-slate-600">Relationship and status snapshot.</div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid gap-3 sm:grid-cols-2">
          {clients.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                  <div className="mt-1 text-xs text-slate-600">
                    {c.city} · {c.tier}
                  </div>
                </div>
                <Status value={c.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="rounded-lg bg-white px-3 py-2">Last touch: 2 days</div>
                <div className="rounded-lg bg-white px-3 py-2">Open items: 3</div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
