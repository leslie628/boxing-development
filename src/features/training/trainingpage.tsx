import {  useState } from "react";
import type { TrainingFormData } from "./TrainingFormData";
import type {
  CreateTrainingSessionRequest
} from "../../types/Training";
import { useSkills } from "../../hooks/useSkills";
import { useCombinations } from "../../hooks/useCombinations";
import { useTraining } from "../../hooks/useTraining";
//import {skills} from "../../data/skills";

const initialFormData: TrainingFormData = {
  date: new Date().toISOString().slice(0, 10),
  durationMinutes: "30",
  skillsPractised: [],
  combinationsPractised: [],
  notes: "",
};
const TrainingPage = () => {
  const [formData, setFormData] = useState<TrainingFormData>({
    ...initialFormData,
  });
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();
  const {
    combinations,
    loading: combinationsLoading,
    error: combinationsError,
  } = useCombinations();
  const {
    createTrainingSession,
    trainingSessions,
    loading: trainingLoading,
  } = useTraining();
  
  const error = skillsError || combinationsError;
  const toggleSelection = (
    field: "skillsPractised" | "combinationsPractised",
    value: string,
    checked: boolean,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: checked
        ? [...previous[field], value]
        : previous[field].filter((item) => item !== value),
    }));
  };
  const saveSession = () => {
    const newSession: CreateTrainingSessionRequest = {
      date: formData.date,
      durationMinutes: Number(formData.durationMinutes),
      skillIds: [...formData.skillsPractised],
      combinationIds: [...formData.combinationsPractised],
      notes: formData.notes.trim(),
    };
    createTrainingSession(newSession);
    clearForm();
  };
  const clearForm = () => {
    setFormData({ ...initialFormData });
  };

  if (error) {
    return (
      <main className="mx-auto max-w-screen-2xl p-6 lg:p-10">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }
  return (
    <main className="min-w-0 w-full space-y-8 p-6 lg:p-10">
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        <section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="training-date"
                className="mb-2 block text-sm text-slate-300"
              >
                Training date
              </label>
              <input
                id="training-date"
                type="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    date: event.target.value,
                  }))
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="mb-2 block text-sm text-slate-300"
              >
                Duration (minutes)
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                max="1440"
                value={formData.durationMinutes}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    durationMinutes: event.target.value,
                  }))
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 block text-sm text-slate-300">
              Skills practised
            </legend>

            <div className="grid max-h-40 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {skillsLoading ? (
                <div className="col-span-full flex min-h-24 items-center justify-center">
                  <div
                    role="status"
                    aria-label="Loading skills"
                    className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-orange-500"
                  />
                </div>
              ) : (
                skills.map((skill) => (
                  <label
                    key={skill.id}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skillsPractised.includes(skill.id)}
                      onChange={(event) =>
                        toggleSelection(
                          "skillsPractised",
                          skill.id,
                          event.target.checked,
                        )
                      }
                      className="accent-orange-500"
                    />
                    {skill.name}
                  </label>
                ))
              )}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 block text-sm text-slate-300">
              Combinations practised
            </legend>

            <div className="grid max-h-40 gap-3 overflow-y-auto sm:grid-cols-2">
              {combinationsLoading ? (
                <div className="col-span-full flex min-h-24 items-center justify-center">
                  <div
                    role="status"
                    aria-label="Loading combinations"
                    className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-orange-500"
                  />
                </div>
              ) : (
                combinations.map((combination) => (
                  <label
                    key={combination.id}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.combinationsPractised.includes(
                        combination.id,
                      )}
                      onChange={(event) =>
                        toggleSelection(
                          "combinationsPractised",
                          combination.id,
                          event.target.checked,
                        )
                      }
                      className="accent-orange-500"
                    />
                    <div>
                      <span className="font-medium">{combination.name}</span>

                      <p className="mt-1 text-xs text-slate-400">
                        {combination.skillIds
                          .map(
                            (skillId) =>
                              skills.find((skill) => skill.id === skillId)
                                ?.name ?? skillId,
                          )
                          .join(" -> ")}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm text-slate-300"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  notes: event.target.value,
                }))
              }
              rows={3}
              placeholder="How did the session feel? What needs more practice?"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white placeholder:text-slate-500"
            />
          </div>
          <button
            type="button"
            onClick={saveSession}
            disabled={!formData.date || !formData.durationMinutes}
            className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Session
          </button>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Training History</h2>
          {trainingLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            </div>
          ) : trainingSessions.length === 0 ? (
            <p className="text-slate-400">No training sessions recorded yet.</p>
          ) : (
            <div className="h-[calc(100vh-250px)] min-h-0 space-y-3 overflow-y-auto pr-2">
              {trainingSessions.map((session) => (
                <article
                  key={session.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <h3 className="font-semibold text-white">{session.date}</h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Duration: {session.duration} minutes
                  </p>

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
                    <p className="mt-3 text-sm text-slate-400">
                      {session.notes}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default TrainingPage;
