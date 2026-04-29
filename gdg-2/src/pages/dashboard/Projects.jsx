import { useMemo, useState } from 'react'
import { Card, CardBody } from '../../components/ui/Card.jsx'
import HtmlDocumentFrame from '../../components/HtmlDocumentFrame.jsx'
import indexHtml from '../../index.html?raw'
import caseStudiesHtml from '../case-studies.html?raw'
import contactHtml from '../contact-us.html?raw'
import servicesHtml from '../services-overview.html?raw'

const files = [
  { id: 'index', label: 'index.html', content: indexHtml },
  { id: 'case-studies', label: 'case-studies.html', content: caseStudiesHtml },
  { id: 'contact-us', label: 'contact-us.html', content: contactHtml },
  { id: 'services-overview', label: 'services-overview.html', content: servicesHtml },
]

export default function Projects() {
  const [activeId, setActiveId] = useState(files[0].id)

  const activeContent = useMemo(() => {
    const file = files.find((item) => item.id === activeId) || files[0]
    return file.content
  }, [activeId])

  return (
    <div className="grid gap-5">
      <div>
        <div className="text-sm font-semibold text-slate-900">Projects</div>
        <div className="text-xs text-slate-500">Preview the HTML pages inside the app.</div>
      </div>

      <Card>
        <CardBody className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {files.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeId === item.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white">
            <HtmlDocumentFrame
              html={activeContent}
              title="Project preview"
              className="h-[70vh] w-full rounded-2xl"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
