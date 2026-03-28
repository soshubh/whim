import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import { getDefaultButtonIcons } from "../../../lib/button-icons";
import type { FormButtonIcon, FormButtonType } from "./types";

type ButtonContentProps = {
  label: string;
  actionType?: FormButtonType;
  isLabelVisible?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  leftIcon?: FormButtonIcon;
  rightIcon?: FormButtonIcon;
};

function renderButtonIcon(icon: FormButtonIcon) {
  switch (icon) {
    case "arrowBack":
      return <ArrowBackRounded fontSize="inherit" />;
    case "arrowForward":
      return <ArrowForwardRounded fontSize="inherit" />;
    case "call":
      return <CallRounded fontSize="inherit" />;
    case "sms":
      return <SmsRounded fontSize="inherit" />;
    case "lock":
      return <LockRounded fontSize="inherit" />;
    case "check":
      return <CheckRounded fontSize="inherit" />;
    case "send":
    default:
      return <SendRounded fontSize="inherit" />;
  }
}

export function ButtonContent({
  label,
  actionType = "submit",
  isLabelVisible = true,
  isLeftIconVisible = false,
  isRightIconVisible = false,
  leftIcon,
  rightIcon,
}: ButtonContentProps) {
  const defaultIcons = getDefaultButtonIcons(actionType);
  const resolvedLeftIcon = leftIcon ?? defaultIcons.left;
  const resolvedRightIcon = rightIcon ?? defaultIcons.right;

  return (
    <span className="builder-submit-content">
      {isLeftIconVisible ? (
        <span className="builder-submit-icon" aria-hidden="true">
          {renderButtonIcon(resolvedLeftIcon)}
        </span>
      ) : null}
      {isLabelVisible ? <span className="builder-submit-label">{label}</span> : null}
      {isRightIconVisible ? (
        <span className="builder-submit-icon" aria-hidden="true">
          {renderButtonIcon(resolvedRightIcon)}
        </span>
      ) : null}
    </span>
  );
}
