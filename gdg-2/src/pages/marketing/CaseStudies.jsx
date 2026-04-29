import HtmlDocumentFrame from '../../components/HtmlDocumentFrame.jsx'
import caseStudiesHtml from '../case-studies.html?raw'

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HtmlDocumentFrame
        html={caseStudiesHtml}
        title="Case studies"
        className="min-h-screen w-full"
      />
    </div>
  )
}
