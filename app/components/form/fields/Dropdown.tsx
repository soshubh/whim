import { Shell } from "./Shell";
import { CustomSelectControl } from "../custom-field-control";
import type { FormFieldComponentProps } from "../types";

export function Dropdown({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <CustomSelectControl
        placeholder={field.placeholder ?? "Select an option"}
        options={field.options}
      />
    </Shell>
  );
}
