
interface StatCardProps {
  label: string
  value: string
  note: string
}

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  )
}
