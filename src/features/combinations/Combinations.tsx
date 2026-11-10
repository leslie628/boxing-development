import { useEffect, useState } from "react";
import { useCombinations } from "../../hooks/useCombinations";
import { useSkills } from "../../hooks/useSkills";
import { Sparkles, X } from "lucide-react";
import AISuggestions from "./AISuggestions";
import type { AICombinationSuggestion } from "../../types/aiCombinations";
const Combinations = () => {
  const [name, setName] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [combinationToDelete, setCombinationToDelete] = useState<string | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const {
    combinations: combinationData,
    createCombination,
    deleteCombinationById,
    loading: combinationLoading,
  } = useCombinations();
  const { skills } = useSkills();

  const addSkill = (skillId: string) => {
    setSelectedSkillIds((current) => [...current, skillId]);
  };
  const removeSkill = (index: number) => {
    setSelectedSkillIds((current) => current.filter((_, i) => i !== index));
  };
  const handleDeleteCombination = async (id: string) => {
    try {
      await deleteCombinationById(id);
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };
  const saveCombination = async () => {
    if (!name.trim() || selectedSkillIds.length === 0) {
      return;
    }
    try {
      await createCombination({
        name: name.trim(),
        skillIds: [...selectedSkillIds],
      });
      setName("");
      setSelectedSkillIds([]);
      setShowAISuggestions(false);
    } catch (error) {
      console.error("Error saving combination:", error);
    }
  };
  const saveAISuggestion = async (
    selectedSuggestions: AICombinationSuggestion[],
  ) => {
    try {
      for (const suggestion of selectedSuggestions) {
        await createCombination({
          name: suggestion.name,
          skillIds: suggestion.skillIds,
        });
      }

      setShowAISuggestions(false);
    } catch (error) {
      console.error("Error saving AI suggestion:", error);
    }
  };
  const handleSelectedSuggestions = async (
    selectedSuggestions: AICombinationSuggestion[],
  ) => {
    saveAISuggestion(selectedSuggestions);
  };

  return (
    <main className="mx-auto max-w-screen-2xl space-y-8 p-6 lg:p-10">
      <section className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Combination Builder</h1>
          <p className="mt-2 text-slate-400">
            Build boxing combinations using skills from your library.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAISuggestions(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/10 px-4 py-2.5 text-sm font-medium text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/20"
        >
          <Sparkles size={18} />
          AI Suggestions
        </button>
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">
                    {combination.name}
                  </h3>
                  {combination.status && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        combination.status === "natural"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-orange-500/15 text-orange-400"
                      }`}
                    >
                      {combination.status === "natural"
                        ? "Natural"
                        : "Needs work"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setCombinationToDelete(combination.id)}
                    className="ml-auto rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
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
      {showAISuggestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setShowAISuggestions(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close AI suggestions"
            >
              <X size={20} />
            </button>
            <AISuggestions onSelectSuggestions={handleSelectedSuggestions} />
          </div>
        </div>
      )}

      {combinationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">
              Delete combination?
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to delete this combination? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCombinationToDelete(null)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={async () => {
                  await handleDeleteCombination(combinationToDelete);
                  setCombinationToDelete(null);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-red-500/30 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                !
              </div>

              <h2 className="text-lg font-semibold text-white">
                Unable to delete combination
              </h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {deleteError}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteError(null)}
                className="rounded-lg bg-slate-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-green-500/30 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                ✓
              </div>

              <h2 className="text-lg font-semibold text-white">
                Combination deleted
              </h2>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              The combination has been successfully deleted.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteSuccess(false)}
                className="rounded-lg bg-slate-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Combinations;
