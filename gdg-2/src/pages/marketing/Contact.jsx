import HtmlDocumentFrame from '../../components/HtmlDocumentFrame.jsx'
import contactHtml from '../contact-us.html?raw'

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HtmlDocumentFrame
        html={contactHtml}
        title="Contact"
        className="min-h-screen w-full"
      />
    </div>
  )
}
