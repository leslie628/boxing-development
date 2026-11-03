import { useCombinations } from "../../hooks/useCombinations";
import { useSkills } from "../../hooks/useSkills";
import { useTraining } from "../../hooks/useTraining";

const TrainingHistory = () => {
  const { trainingSessions, loading: trainingLoading } = useTraining();
  const { combinations } = useCombinations();

  const { skills } = useSkills();
  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">Training History</h2>
      {trainingLoading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        </div>
      ) : trainingSessions.length === 0 ? (
        <p className="text-slate-400">No training sessions recorded yet.</p>
      ) : (
        Object.entries(
          trainingSessions.reduce<Record<string, typeof trainingSessions>>(
            (groups, session) => {
              const date = session.date;
              groups[date] ??= [];
              groups[date].push(session);
              return groups;
            },
            {},
          ),
        ).map(([date, sessions]) => (
          <section key={date} className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400">
              {new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>

            {/* <div className="h-[calc(100vh-250px)] min-h-0 space-y-3 overflow-y-auto pr-2"> */}
            {sessions.map((session) => (
              <article
                key={session.id}
                className="mb-4 rounded-xl border border-slate-700 bg-slate-900/70 p-5"
              >
                <h3 className="font-semibold text-white">{session.date}</h3>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                  {session.duration} min
                </span>

                <p className="mt-3 text-sm text-slate-300">
                  Skills: {session.skills.join(", ") || "None"}
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  Combinations:{" "}
                  {session.combinations
                    .map(
                      (id) =>
                        combinations.find(
                          (combination) => combination.id === id,
                        )?.name ?? id,
                    )
                    .join(", ") || "None"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Sequence:{" "}
                  {session.combinations.map(
                    (id) =>
                      combinations
                        .find((combination) => combination.id === id)
                        ?.skillIds.map(
                          (skillId) =>
                            skills.find((skill) => skill.id === skillId)
                              ?.name ?? skillId,
                        )
                        .join(" -> ") ?? id,
                  )}
                </p>
                {session.notes && (
                  <p className="mt-3 text-sm text-slate-400">{session.notes}</p>
                )}
              </article>
            ))}
            {/* </div> */}
          </section>
        ))
      )}
    </section>
  );
};
export default TrainingHistory;
