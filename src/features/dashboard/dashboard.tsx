import { StatCard } from "../../components/ui/StatCard";
import { quickActions } from "../../data/quickActions";
import type { DashboardStat } from "../../types/DashboardStat";

const dasboard = ({dashboardStats}: { dashboardStats: DashboardStat[] }) => {
  return (
     <main className="mx-auto max-w-screen-2xl space-y-8 p-6 lg:p-10">
          <section>
            <p className="text-sm font-medium text-orange-400">
              YOUR DEVELOPMENT
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Build a more complete fighter.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Track what you practise, recognise what has become natural, and
              plan what to develop next.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} note={stat.note} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Development path</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Your next steps will be based on your training history.
                  </p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  Not started
                </span>
              </div>
              <div className="mt-8 rounded-lg border border-dashed border-slate-700 p-8 text-center">
                <p className="font-medium">Your development plan starts here</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Once you record practice, we can identify areas to explore and
                  suggest logical progressions.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">Quick actions</h3>
              <p className="mt-1 text-sm text-slate-400">
                Keep your training moving.
              </p>

              <div className="mt-6 space-y-3">
                {quickActions.map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg border border-slate-800 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-orange-500/50 hover:bg-slate-800"
                  >
                    <span className="text-orange-400">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
  )
}
export default dasboard;