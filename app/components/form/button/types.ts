import type { WidthOption } from "../types";

export type FormButtonState = "idle" | "loading" | "success" | "error";
export type FormButtonStyle = "solid" | "outline";
export type FormButtonType = "submit" | "back" | "otp";
export type FormButtonIcon =
  | "send"
  | "arrowBack"
  | "arrowForward"
  | "call"
  | "sms"
  | "lock"
  | "check";

export type FormActionButton = {
  id: string;
  type: FormButtonType;
  label: string;
  width: WidthOption;
  tabletWidth?: WidthOption;
  mobileWidth?: WidthOption;
  isLabelVisible?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  leftIcon?: FormButtonIcon;
  rightIcon?: FormButtonIcon;
};

export type FormButtonProps = {
  label: string;
  state: FormButtonState;
  actionType?: FormButtonType;
  isLabelVisible?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  leftIcon?: FormButtonIcon;
  rightIcon?: FormButtonIcon;
};
