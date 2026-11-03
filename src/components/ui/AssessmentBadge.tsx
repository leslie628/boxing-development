import type { AssessmentStatus } from "../../types/assessmentStatus";


export function AssessmentBadge({status}: {status: AssessmentStatus}) {
  if (!status) {
    return (
      <span className="text-xs text-slate-500">
        Not assessed
      </span>
    );
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        status === "natural"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-amber-500/10 text-amber-400"
      }`}
    >
      {status === "natural" ? "Natural" : "Still needs work"}
    </span>
  );
}