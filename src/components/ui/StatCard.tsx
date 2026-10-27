import type { ReactNode } from "react";
interface StatCardProps {
  label: string;
  value: ReactNode;
  note: string;
}

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-4 flex h-9 items-center">
        {typeof value === "string" ? (
          <p className="text-3xl font-bold">{value}</p>
        ) : (
          <div className="flex w-full justify-center">{value}</div>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  );
}
