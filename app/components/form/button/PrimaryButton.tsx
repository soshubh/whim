import type { FormButtonProps } from "./types";
import { CustomActionButton } from "./custom-action-button";

export function PrimaryButton({
  label,
  state,
  actionType = "submit",
  isLabelVisible,
  isLeftIconVisible,
  isRightIconVisible,
  leftIcon,
  rightIcon,
}: FormButtonProps) {
  return (
    <CustomActionButton
      variant="solid"
      label={label}
      state={state}
      actionType={actionType}
      isLabelVisible={isLabelVisible}
      isLeftIconVisible={isLeftIconVisible}
      isRightIconVisible={isRightIconVisible}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
}
