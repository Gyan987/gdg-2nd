export default function Input({ label, className = '', error, ...props }) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>
      ) : null}
      <input
        className={`h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
        {...props}
      />
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </label>
  )
}
