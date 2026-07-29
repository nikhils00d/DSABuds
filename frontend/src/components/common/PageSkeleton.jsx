export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0b1120] px-4 pt-28 sm:px-6 lg:px-8" aria-live="polite" aria-busy="true">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-12 w-2/3 rounded-xl bg-white/[0.06]" />
        <div className="h-6 w-1/2 rounded-lg bg-white/[0.05]" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-48 rounded-2xl bg-white/[0.04]" />
          <div className="h-48 rounded-2xl bg-white/[0.04]" />
          <div className="h-48 rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}
