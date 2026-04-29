export function Card({ className = '', ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-100/80 bg-white/80 shadow-sm backdrop-blur ${className}`}
      {...props}
    />
  )
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`border-b border-slate-100/80 px-5 py-4 ${className}`} {...props} />
}

export function CardBody({ className = '', ...props }) {
  return <div className={`px-5 py-4 ${className}`} {...props} />
}
