import { useState } from "react";
import type {
  AICombinations,
  AICombinationSuggestion,
} from "../../types/aiCombinations";
import { getAISuggestions } from "../../services/combinationService";
import { Loader2, Sparkles } from "lucide-react";

type AISuggestionsProps = {
  onSelectSuggestions: (suggestions: AICombinationSuggestion[]) => void;
};
const AISuggestions = ({ onSelectSuggestions }: AISuggestionsProps) => {
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState<AICombinations | null>(null);
  const [selectedSuggestions, setSelectedSuggestions] = useState<
    AICombinationSuggestion[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      if (!scenario.trim()) {
        setError("Please describe a boxing situation first.");
        return;
      }

      setLoading(true);
      setError("");
      setResult(null);
      const data = await getAISuggestions({ scenario: scenario.trim() });
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: AICombinationSuggestion) => {
    setSelectedSuggestions((prev) =>
      prev.some((item) => item.name === suggestion.name)
        ? prev.filter((item) => item.name !== suggestion.name)
        : [...prev, suggestion],
    );
  };

  const saveSuggestions = () => {
    onSelectSuggestions(selectedSuggestions);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">
          AI Combination Suggestions
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Describe a boxing situation, opponent's behaviour or training goal.
          Get combination suggestions tailored to your needs.
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="boxing-scenario"
          className="block text-sm font-medium text-slate-300"
        >
          Describe your boxing situation
        </label>

        <textarea
          id="boxing-scenario"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Example: My opponent constantly attacks with a jab followed by a cross. What combinations should I practise to defend and counter?"
          rows={4}
          className="w-full resize-y rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Be specific about your opponent or what you want to improve.
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !scenario.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating suggestions...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Suggestions
              </>
            )}
          </button>
          <button
            type="button"
            onClick={saveSuggestions}
            disabled={selectedSuggestions.length === 0}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
           Save Selected Suggestions ({selectedSuggestions.length})
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
        {result && (
          <div className="max-h-[45vh] space-y-4 overflow-y-auto thin-scrollbar pr-2">
            <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>

            <p className="text-sm text-slate-300">{result.opponentSituation}</p>

            {result.recommendedSkills.map((skill) => (
              <div key={skill.skillId} className="rounded-lg bg-slate-800 p-3">
                <p className="font-medium text-white">{skill.skillId}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {skill.explanation}
                </p>
              </div>
            ))}

            {result.suggestions.map((suggestion, index) => {
              const isSelected = selectedSuggestions.some(
                (selected) => selected.name === suggestion.name,
              );

              return (
                <button
                  key={`${suggestion.name}-${index}`}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    isSelected
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 bg-slate-800/70 hover:border-slate-500"
                  }`}
                >
                  <div
                    key={`${suggestion.name}-${index}`}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-white">
                        {suggestion.name}
                      </h4>

                      <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-300">
                        {suggestion.difficulty}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      {suggestion.explanation}
                    </p>

                    <div className="mt-4 space-y-3">
                      {suggestion.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs text-white">
                            {stepIndex + 1}
                          </span>

                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                step.actor === "opponent"
                                  ? "text-orange-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {step.actor === "opponent" ? "Opponent" : "You"}
                            </p>

                            <p className="text-sm text-slate-300">
                              {step.action}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-sm font-medium text-purple-400">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default AISuggestions;
