import type { Training } from "../../types/Training";
interface TrainingActivityChartProps {
  trainingData: Training[];
}
export function TrainingActivityChart({
  trainingData,
}: TrainingActivityChartProps) {
  const today = new Date();
  const weeks: { label: string; dateRange: string; minutes: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() - i * 7);

    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const minutes = trainingData.reduce((total, session) => {
      const sessionDate = new Date(`${session.date}T00:00:00`);

      if (sessionDate >= weekStart && sessionDate <= weekEnd) {
        return total + session.duration;
      }

      return total;
    }, 0);

    weeks.push({
      label: `Week ${6 - i}`,
      dateRange: `${weekStart.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })} – ${weekEnd.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`,
      minutes,
    });
  }

  const maxMinutes = Math.max(...weeks.map((week) => week.minutes), 1);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Training Activity</h2>
        <p className="mt-1 text-sm text-slate-400">
          Training time over the last six weeks
        </p>
      </div>

      <div className="flex h-48 items-end justify-between gap-3">
        {weeks.map((week) => (
          <div
            key={week.label} title={`${week.dateRange}`}
            className="flex h-full flex-1 flex-col items-center cursor-pointer justify-end gap-2"
          >
            <span className="text-xs text-slate-400">{week.minutes}m</span>

            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-md bg-blue-500 transition-all"
                style={{
                  height: `${(week.minutes / maxMinutes) * 100}%`,
                  minHeight: week.minutes > 0 ? "4px" : "0",
                }}
              />
            </div>
            <span className="text-center text-xs font-medium text-slate-500">
              {week.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
