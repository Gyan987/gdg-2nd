import { Card, CardBody } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'

const activity = [
  {
    title: 'Elena R. uploaded new assets for Lumiere',
    meta: '2 hours ago',
    active: true,
  },
  {
    title: 'Client feedback received on Phase 2',
    meta: 'Yesterday, 14:30',
  },
  {
    title: 'Milestone Vertex Launch completed',
    meta: 'Oct 12',
  },
]

export default function Overview() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Overview
          </div>
          <div className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Curated Insights
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm"
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeWidth="1.6" d="M11 19a8 8 0 1 0-8-8 8 8 0 0 0 8 8z" />
              <path strokeWidth="1.6" d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            AR
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="grid gap-5">
          <Card>
            <CardBody className="grid gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                IN PROGRESS
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">Lumiere Atelier</div>
                <div className="mt-1 text-sm text-slate-600">
                  Brand identity refinement and high-fidelity prototype curation for luxury
                  fashion house.
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                  <div className="absolute inset-x-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    65% Complete
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="grid gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                COMPLETED
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">Vertex Capital</div>
                <div className="mt-1 text-sm text-slate-600">
                  Full-stack digital presence overhaul for boutique investment firm.
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
                <div>
                  <div className="text-sm font-semibold text-blue-700">4.2x</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Engagement lift</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Q3</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Delivery</div>
                </div>
                <Button variant="ghost" className="justify-self-start text-blue-700 hover:bg-blue-50">
                  View Case
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid gap-5">
          <Card>
            <CardBody className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Growth Velocity</div>
                <button type="button" className="flex items-center gap-2 text-xs text-slate-500">
                  This Month
                  <span className="text-base">v</span>
                </button>
              </div>
              <div className="grid gap-1">
                <div className="text-3xl font-semibold text-slate-900">124k</div>
                <div className="text-xs text-emerald-600">+14% this month</div>
                <div className="text-xs text-slate-500">Unique impressions across active campaigns.</div>
              </div>
              <div className="grid grid-cols-6 items-end gap-2">
                {[32, 22, 40, 28, 52, 30].map((value, index) => (
                  <div
                    key={`bar-${index}`}
                    className={`rounded-lg ${index === 4 ? 'bg-blue-600' : 'bg-slate-200'}`}
                    style={{ height: `${value}px` }}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="grid gap-4">
              <div className="text-sm font-semibold text-slate-900">Recent Activity</div>
              <div className="grid gap-4 text-sm">
                {activity.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full border ${
                        item.active
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 bg-white'
                      }`}
                    />
                    <div>
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
