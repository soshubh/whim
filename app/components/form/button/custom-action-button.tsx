import type { FormButtonProps, FormButtonStyle } from "./types";
import { ButtonContent } from "./ButtonContent";

type CustomActionButtonProps = FormButtonProps & {
  variant: FormButtonStyle;
};

export function CustomActionButton({
  label,
  state,
  actionType = "submit",
  variant,
  isLabelVisible,
  isLeftIconVisible,
  isRightIconVisible,
  leftIcon,
  rightIcon,
}: CustomActionButtonProps) {
  const stateLabel =
    actionType === "submit"
      ? state === "loading"
        ? "Submitting..."
        : state === "success"
          ? "Submitted"
          : state === "error"
            ? "Retry Submit"
            : label
      : label;

  return (
    <button
      type="button"
      className={`builder-submit builder-submit--${variant} builder-submit-state--${state}`}
      aria-busy={state === "loading"}
    >
      <span className="builder-submit-surface">
        <ButtonContent
          label={stateLabel}
          actionType={actionType}
          isLabelVisible={isLabelVisible}
          isLeftIconVisible={isLeftIconVisible}
          isRightIconVisible={isRightIconVisible}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      </span>
    </button>
  );
}
