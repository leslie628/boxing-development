import { AssessmentBadge } from "../../components/ui/AssessmentBadge";
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
                <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white">{session.date}</h3>

                <span className="text-xs text-slate-400">
                  {session.duration} min
                </span>
                </div>

                <p className="mt-3 text-sm text-slate-300">
                  Skills: {session.skills.join(", ") || "None"}
                </p>

                <div className="mt-3">
                  {session.combinations.length > 0 ? (
                    session.combinations.map((combination) => {
                      const item = combinations.find(
                        (item) => Number(item.id) === combination.id,
                      );

                      return (
                        <div
                          key={combination.id}
                          className="grid grid-cols-1 sm:grid-cols-[180px_140px_1fr] items-start gap-3 border-b border-slate-800 py-3"
                        >
                          <div>
                            <p className="text-sm text-slate-300">
                              {item?.name ?? combination.id}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {item?.skillIds
                                .map(
                                  (skillId) =>
                                    skills.find((skill) => skill.id === skillId)
                                      ?.name ?? skillId,
                                )
                                .join(" -> ") ?? ""}
                            </p>
                          </div>

                          <AssessmentBadge status={combination.status} />
                        </div>
                      );
                    })
                  ) : (
                    <p className="py-3 text-sm text-slate-400">None</p>
                  )}
                </div>

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
