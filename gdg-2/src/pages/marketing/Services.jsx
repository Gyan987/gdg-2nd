import HtmlDocumentFrame from '../../components/HtmlDocumentFrame.jsx'
import servicesHtml from '../services-overview.html?raw'

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HtmlDocumentFrame
        html={servicesHtml}
        title="Services overview"
        className="min-h-screen w-full"
      />
    </div>
  )
}
