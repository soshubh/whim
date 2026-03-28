import { Shell } from "./Shell";
import { CustomTextareaControl } from "../custom-field-control";
import type { FormFieldComponentProps } from "../types";

export function Textarea({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <CustomTextareaControl placeholder={field.placeholder} />
    </Shell>
  );
}
