import type { ButtonHTMLAttributes, ReactNode } from "react";

type SystemButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "text"
  | "icon"
  | "surface"
  | "dashed"
  | "segment";

type SystemButtonSize = "sm" | "md" | "icon";
type SystemButtonTone = "default" | "danger" | "success";
type SystemButtonAlign = "center" | "start";

type SystemButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: SystemButtonVariant;
  size?: SystemButtonSize;
  tone?: SystemButtonTone;
  align?: SystemButtonAlign;
  fullWidth?: boolean;
  active?: boolean;
  children: ReactNode;
};

export function SystemButton({
  variant = "secondary",
  size = "sm",
  tone = "default",
  align = "center",
  fullWidth = false,
  active = false,
  className,
  children,
  ...props
}: SystemButtonProps) {
  const classes = [
    "builder-system-button",
    `builder-system-button--${variant}`,
    `builder-system-button--${size}`,
    align === "start" ? "is-align-start" : "",
    fullWidth ? "is-full-width" : "",
    active ? "is-active" : "",
    tone === "danger" ? "is-tone-danger" : "",
    tone === "success" ? "is-tone-success" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
