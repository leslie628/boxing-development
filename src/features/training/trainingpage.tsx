import { useState } from "react";
import type { TrainingFormData } from "./TrainingFormData";
const skills = [
  "Jab",
  "Cross",
  "Hook",
  "Uppercut",
  "Slip",
  "Weave",
  "Footwork",
];
const combinations = [
  "Jab-Cross",
  "Jab-Cross-Lead Hook",
  "Slip-Cross-Hook",
  "Jab-Body Hook",
];
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
  return (
    <main className="min-w-0 w-full space-y-8 p-6 lg:p-10">
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <label
                key={skill}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={formData.skillsPractised.includes(skill)}
                  onChange={(event) =>
                    toggleSelection(
                      "skillsPractised",
                      skill,
                      event.target.checked,
                    )
                  }
                  className="accent-orange-500"
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 block text-sm text-slate-300">
            Combinations practised
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            {combinations.map((combination) => (
              <label
                key={combination}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={formData.combinationsPractised.includes(combination)}
                  onChange={(event) =>
                    toggleSelection(
                      "combinationsPractised",
                      combination,
                      event.target.checked,
                    )
                  }
                  className="accent-orange-500"
                />
                {combination}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="notes" className="mb-2 block text-sm text-slate-300">
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
      </section>
    </main>
  );
};
export default TrainingPage;
