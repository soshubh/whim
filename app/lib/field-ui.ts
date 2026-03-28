import type { FormButtonType } from "../components/form/button/types";
import type { FieldType, WidthOption } from "../components/form/types";

export const FIELD_TYPE_OPTIONS: Array<{ value: FieldType; label: string }> = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "select", label: "Select" },
  { value: "textarea", label: "Textarea" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
];

export const BUTTON_TYPE_OPTIONS: Array<{ value: FormButtonType; label: string }> = [
  { value: "submit", label: "Submit" },
  { value: "back", label: "Back" },
  { value: "otp", label: "OTP" },
];

export function getFieldTypeLabel(type: FieldType) {
  switch (type) {
    case "text":
      return "text";
    case "email":
      return "email";
    case "phone":
      return "phone";
    case "select":
      return "select";
    case "textarea":
      return "textarea";
    case "radio":
      return "radio";
    case "checkbox":
      return "checkbox";
  }
}

export function getButtonTypeLabel(type: FormButtonType) {
  switch (type) {
    case "submit":
      return "submit";
    case "back":
      return "back";
    case "otp":
      return "otp";
  }
}

export function getWidthLabel(width: WidthOption) {
  switch (width) {
    case "third":
      return "third";
    case "half":
      return "half";
    default:
      return "full";
  }
}
