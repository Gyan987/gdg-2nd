import { Link } from 'react-router-dom'
import { Card, CardBody } from '../../components/ui/Card.jsx'

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
        <Link to="/" className="text-sm font-semibold tracking-wide text-slate-900">
          PRECISION
        </Link>
        <Card>
          <CardBody className="grid gap-4">
            <div>
              <div className="text-lg font-semibold text-slate-900">{title}</div>
              {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
            </div>
            {children}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
