import { Shell } from "./Shell";
import { CustomTextControl } from "../custom-field-control";
import type { FormFieldComponentProps } from "../types";

export function Email({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <CustomTextControl type="email" placeholder={field.placeholder} />
    </Shell>
  );
}
