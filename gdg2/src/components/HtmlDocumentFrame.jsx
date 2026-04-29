import { useMemo } from 'react'
import outputCss from '../output.css?raw'

const fontStylesheet =
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&display=swap'

const pageLinkRules = [
  {
    pattern: /href="(?:\.\/)?(?:pages\/)?services-overview\.html"/g,
    replacement: 'href="/services"',
  },
  {
    pattern: /href="(?:\.\/)?(?:pages\/)?case-studies\.html"/g,
    replacement: 'href="/case-studies"',
  },
  {
    pattern: /href="(?:\.\/)?(?:pages\/)?contact-us\.html"/g,
    replacement: 'href="/contact"',
  },
]

export function buildHtmlDocument(rawHtml, cssText = outputCss) {
  let html = rawHtml
    .replace(/<link[^>]*href="[^"]*output\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="https:\/\/fonts\.google\.com\/share[^"]*"[^>]*>/g, '')
    .replace(/(src|href)="\.\.\/images\//g, '$1="/images/')
    .replace(/(src|href)="images\//g, '$1="/images/')
    .replace(/url\((['"]?)\.\.\/images\//g, 'url($1/images/')
    .replace(/url\((['"]?)images\//g, 'url($1/images/')

  for (const rule of pageLinkRules) {
    html = html.replace(rule.pattern, rule.replacement)
  }

  if (html.includes('<head')) {
    html = html.replace(
      /<head([^>]*)>/,
      `<head$1><base href="/" target="_parent" /><link rel="stylesheet" href="${fontStylesheet}" /><style>${cssText}</style>`,
    )
  } else {
    html = `<!DOCTYPE html><html><head><base href="/" target="_parent" /><link rel="stylesheet" href="${fontStylesheet}" /><style>${cssText}</style></head><body>${html}</body></html>`
  }

  return html
}

export default function HtmlDocumentFrame({
  html,
  title = 'Preview',
  className = 'h-[70vh] w-full rounded-2xl',
}) {
  const document = useMemo(() => buildHtmlDocument(html), [html])

  return <iframe title={title} srcDoc={document} className={className} />
}
