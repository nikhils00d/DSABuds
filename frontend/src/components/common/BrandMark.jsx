const logoImage = '/chatgpt_logo.png'

export default function BrandMark({ variant = 'horizontal', className = '' }) {
  const imageClassName =
    variant === 'icon'
      ? `h-10 w-10 object-cover object-center ${className}`
      : variant === 'stacked'
      ? `w-[220px] max-w-full object-contain ${className}`
      : `w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover object-center ${className}`

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoImage}
        alt="DSABuds Logo"
        className={imageClassName}
        draggable="false"
        loading="eager"
        decoding="async"
      />
      {variant !== 'icon' && (
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          DSABuds
        </span>
      )}
    </div>
  )
}