interface AssessmentRadioProps {
  name: string;
  value: "natural" | "needs-work" | null;
  onChange: (value: "natural" | "needs-work" | null) => void;
}

export default function AssessmentRadio({
  name,
  value,
  onChange,
}: AssessmentRadioProps) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-slate-200">
        Assessment (optional)
      </p>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="radio"
            name={name}
            checked={value === "natural"}
            onChange={() => onChange("natural")}
          />
          Natural
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="radio"
            name={name}
            checked={value === "needs-work"}
            onChange={() => onChange("needs-work")}
          />
          Still needs work
        </label>
      </div>
    </div>
  );
}
