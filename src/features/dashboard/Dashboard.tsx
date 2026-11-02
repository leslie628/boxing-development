import { useMemo } from "react";
import { StatCard } from "../../components/ui/StatCard";
import { TrainingActivityChart } from "./TrainingActivityChart";
import { useCombinations } from "../../hooks/useCombinations";
import { useSkills } from "../../hooks/useSkills";
import { useTraining } from "../../hooks/useTraining";
import { LoaderCircle } from "lucide-react";
import { useDevelopmentOverview } from "../../hooks/useDevelopment";
const Dashboard = () => {
  const { skills, loading: skillsLoading } = useSkills();

  const { combinations, loading: combinationsLoading } = useCombinations();

  const { overview } = useDevelopmentOverview(skills, combinations);

  const { trainingSessions, loading: trainingLoading } = useTraining();

  const stats = useMemo(() => {
    const totalMinutes = trainingSessions.reduce(
      (total, session) => total + session.duration,
      0,
    );

    return {
      practiceMinutes: totalMinutes,
      totalSkills: skills.length,
      totalCombinations: combinations.length,
      totalSessions: trainingSessions.length,
    };
  }, [skills, combinations, trainingSessions]);

  const formatPracticeTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;

    return `${hours} hr ${remainingMinutes} min`;
  };
  const loading = skillsLoading || combinationsLoading || trainingLoading;
  //const recentSessions = trainingSessions.slice(0, 3);
  return (
    <main className="mx-auto max-w-screen-2xl space-y-8 p-6 lg:p-10">
      <section>
        <p className="text-sm font-medium text-orange-400">YOUR DEVELOPMENT</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Build a more complete fighter.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
          Track what you practise, recognise what has become natural, and plan
          what to develop next.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Practice time"
          value={
            loading ? (
              <LoaderCircle className="h-5 w-5 animate-spin text-red-400" />
            ) : (
              formatPracticeTime(stats.practiceMinutes)
            )
          }
          note="Minutes logged"
        />

        <StatCard
          label="Available skills"
          value={
            loading ? (
              <LoaderCircle className="h-5 w-5 animate-spin text-red-400" />
            ) : (
              String(stats.totalSkills)
            )
          }
          note="Available skills"
        />

        <StatCard
          label="Available combinations"
          value={
            loading ? (
              <LoaderCircle className="h-5 w-5 animate-spin text-red-400" />
            ) : (
              String(stats.totalCombinations)
            )
          }
          note="Created combinations"
        />

        <StatCard
          label="Recent sessions"
          value={
            loading ? (
              <LoaderCircle className="h-5 w-5 animate-spin text-red-400" />
            ) : (
              String(stats.totalSessions)
            )
          }
          note="Sessions recorded"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Development Overview</h3>
              <p className="mt-1 text-sm text-slate-400">
                Track your natural skills and areas that need improvement.
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Getting started
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-800/60 p-4">
              <p className="text-2xl font-bold text-green-400">{overview.naturalSkills}</p>
              <p className="mt-1 text-sm text-slate-300">Natural skills</p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-4">
              <p className="text-2xl font-bold text-amber-400">{overview.skillsToImprove}</p>
              <p className="mt-1 text-sm text-slate-300">Skills to improve</p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-4">
              <p className="text-2xl font-bold text-green-400">{overview.naturalCombinations}</p>
              <p className="mt-1 text-sm text-slate-300">
                Natural combinations
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-4">
              <p className="text-2xl font-bold text-amber-400">{overview.combinationsToImprove}</p>
              <p className="mt-1 text-sm text-slate-300">
                Combinations to improve
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-5">
            <h4 className="font-semibold">Development Plan</h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your recommended next steps will appear here as you record
              training sessions and assess your skills and combinations.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <TrainingActivityChart trainingData={trainingSessions} />
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
