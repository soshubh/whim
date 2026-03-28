import type {
  FormButtonIcon,
  FormButtonType,
} from "../components/form/button/types";

export const BUTTON_ICON_OPTIONS: Array<{ value: FormButtonIcon; label: string }> = [
  { value: "send", label: "Send" },
  { value: "arrowBack", label: "Arrow Back" },
  { value: "arrowForward", label: "Arrow Forward" },
  { value: "call", label: "Call" },
  { value: "sms", label: "SMS" },
  { value: "lock", label: "Lock" },
  { value: "check", label: "Check" },
];

const BUTTON_DEFAULT_ICONS: Record<
  FormButtonType,
  { left: FormButtonIcon; right: FormButtonIcon }
> = {
  submit: {
    left: "send",
    right: "arrowForward",
  },
  back: {
    left: "arrowBack",
    right: "arrowForward",
  },
  otp: {
    left: "lock",
    right: "arrowForward",
  },
};

export function getDefaultButtonIcons(type: FormButtonType) {
  return BUTTON_DEFAULT_ICONS[type];
}
