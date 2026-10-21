import { useState } from "react";
import type { Combination } from "../../types/combination";
import { skills } from "../../data/skills";
import { useCombinations } from "../../hooks/useCombinations";
const Combinations = () => {
  const [name, setName] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const {
    combinations: combinationData,
    createCombination,
    loading: combinationLoading,
  } = useCombinations();

  const addSkill = (skillId: string) => {
    setSelectedSkillIds((current) => [...current, skillId]);
  };
  const removeSkill = (index: number) => {
    setSelectedSkillIds((current) => current.filter((_, i) => i !== index));
  };
  const saveCombination = async () => {
    if (!name.trim() || selectedSkillIds.length === 0) {
      return;
    }
    try {
      await createCombination({ name: name.trim(), skillIds: [...selectedSkillIds] });
      setName("");
      setSelectedSkillIds([]);
    } catch (error) {
      console.error("Error saving combination:", error);
    }
  };
  return (
    <main className="mx-auto max-w-screen-2xl space-y-8 p-6 lg:p-10">
      <section>
        <h1 className="text-3xl font-bold text-white">Combination Builder</h1>
        <p className="mt-2 text-slate-400">
          Build boxing combinations using skills from your library.
        </p>
      </section>

      <section className="max-w-3xl space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-2">
          <label
            htmlFor="combination-name"
            className="block text-sm font-medium text-slate-300"
          >
            Combination name
          </label>
          <input
            id="combination-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Jab–Cross–Hook"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-white">Available skills</h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => addSkill(skill.id)}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
              >
                + {skill.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-white">
            Your sequence ({selectedSkillIds.length})
          </h2>

          {selectedSkillIds.length === 0 ? (
            <p className="text-sm text-slate-400">
              Select skills above to build your sequence.
            </p>
          ) : (
            <ol className="space-y-2">
              {selectedSkillIds.map((skillId, index) => {
                const skill = skills.find((item) => item.id === skillId);

                if (!skill) return null;

                return (
                  <li
                    key={`${skillId}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <span className="text-sm text-white">
                      {index + 1}. {skill.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      aria-label={`Remove ${skill.name} from position ${index + 1}`}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <button
          type="button"
          onClick={saveCombination}
          disabled={!name.trim() || selectedSkillIds.length === 0}
          className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Combination
        </button>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Saved Combinations</h2>
        {combinationLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          </div>
        ) : combinationData.length === 0 ? (
          <p className="text-slate-400">No combinations saved yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {combinationData.map((combination) => (
              <article
                key={combination.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-white">{combination.name}</h3>

                <p className="mt-2 text-sm text-slate-400">
                  {combination.skillIds
                    .map(
                      (skillId) =>
                        skills.find((skill) => skill.id === skillId)?.name,
                    )
                    .filter(Boolean)
                    .join(" → ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Combinations;
