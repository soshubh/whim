import { FieldShell } from "./FieldShell";
import type { FormFieldComponentProps } from "./types";

export function DropdownField({ field }: FormFieldComponentProps) {
  return (
    <FieldShell label={field.label} required={field.required} validationMessage={field.validationMessage}>
      <select className="form-element-control" defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        {(field.options ?? []).map((option, index) => (
          <option key={`${field.id}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
