export default function Button({
  as: As,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  const Component = As || 'button'

  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    soft: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  }

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
