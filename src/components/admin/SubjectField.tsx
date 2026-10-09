import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjectsForYear } from "@/data/academics";

const OTHER = "__other__";

/**
 * Subject picker: offers the known subjects for the chosen year and falls back
 * to free text ("Other") for anything not in the catalogue.
 */
const SubjectField = ({ year, value, onChange, id }: { year: string; value: string; onChange: (v: string) => void; id?: string }) => {
  const known = subjectsForYear(year);
  const [forceCustom, setForceCustom] = useState(false);
  const isCustom = known.length === 0 || forceCustom || (value !== "" && !known.includes(value));

  if (isCustom) {
    return (
      <div className="flex gap-2">
        <Input id={id} value={value} maxLength={150} placeholder="Type the subject name" onChange={(e) => onChange(e.target.value)} />
        {known.length > 0 && (
          <button
            type="button"
            className="shrink-0 text-xs text-primary hover:underline"
            onClick={() => {
              setForceCustom(false);
              onChange("");
            }}
          >
            Pick from list
          </button>
        )}
      </div>
    );
  }

  return (
    <Select
      value={value || undefined}
      onValueChange={(v) => {
        if (v === OTHER) {
          setForceCustom(true);
          onChange("");
        } else {
          onChange(v);
        }
      }}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        {known.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
        <SelectItem value={OTHER}>Other (type manually)…</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SubjectField;
