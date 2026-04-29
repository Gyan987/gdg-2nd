import { Card, CardBody, CardHeader } from '../../components/ui/Card.jsx'

const kpis = [
  { label: 'Conversion', value: '4.8%', hint: '+0.6% WoW' },
  { label: 'Avg. session', value: '3m 12s', hint: '+18s WoW' },
  { label: 'Bounce rate', value: '38%', hint: '-3% WoW' },
]

const channels = [
  { name: 'Organic', value: 52 },
  { name: 'Direct', value: 21 },
  { name: 'Referral', value: 15 },
  { name: 'Paid', value: 12 },
]

export default function Metrics() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardBody>
              <div className="text-xs font-medium text-slate-500">{k.label}</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{k.value}</div>
              <div className="mt-1 text-xs text-slate-600">{k.hint}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-slate-900">Traffic mix</div>
        </CardHeader>
        <CardBody className="grid gap-3">
          {channels.map((c) => (
            <div key={c.name} className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-slate-900">{c.name}</div>
                <div className="text-slate-600">{c.value}%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${c.value}%` }} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
