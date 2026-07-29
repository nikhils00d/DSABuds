const logoImage = '/ChatGPT%20Image%20Jul%2027%2C%202026%2C%2002_37_49%20PM.png'

export default function BrandMark({ variant = 'horizontal', className = '' }) {
  const imageClassName =
    variant === 'icon'
      ? `h-10 w-10 object-cover object-center ${className}`
      : variant === 'stacked'
      ? `w-[220px] max-w-full object-contain ${className}`
      : `w-[170px] max-w-none object-contain ${className}`

  return (
    <img
      src={logoImage}
      alt="DSABuds"
      className={imageClassName}
      draggable="false"
      loading="eager"
      decoding="async"
    />
  )
}