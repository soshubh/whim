"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import type { WidthOption } from "../form/types";
import { SystemButton } from "../system-button";

const WIDTH_OPTIONS: Array<{ value: WidthOption; label: string }> = [
  { value: "third", label: "1/3" },
  { value: "half", label: "1/2" },
  { value: "full", label: "Full" },
];

function normalizeHexDraft(value: string) {
  const sanitizedValue = value.trim().replace(/[^#\da-fA-F]/g, "");
  const hexDigits = sanitizedValue.replace(/#/g, "").slice(0, 6);

  if (hexDigits.length === 0) {
    return "";
  }

  return `#${hexDigits.toLowerCase()}`;
}

function getResolvedHexColor(value: string) {
  const normalizedValue = normalizeHexDraft(value);
  const hexDigits = normalizedValue.slice(1);

  if (hexDigits.length === 3) {
    return `#${hexDigits
      .split("")
      .map((digit) => `${digit}${digit}`)
      .join("")}`;
  }

  if (hexDigits.length === 6) {
    return normalizedValue;
  }

  return null;
}

function normalizeOpacityDraft(value: string) {
  const sanitizedValue = value.replace(/[^\d.]/g, "");
  const firstDecimalIndex = sanitizedValue.indexOf(".");

  if (firstDecimalIndex === -1) {
    return sanitizedValue;
  }

  return `${sanitizedValue.slice(0, firstDecimalIndex + 1)}${sanitizedValue
    .slice(firstDecimalIndex + 1)
    .replace(/\./g, "")}`;
}

function clampOpacity(value: number) {
  return Math.min(100, Math.max(0, value));
}

function hexToRgb(value: string) {
  const resolvedHexColor = getResolvedHexColor(value);

  if (!resolvedHexColor) {
    return null;
  }

  const hexDigits = resolvedHexColor.slice(1);

  return {
    red: Number.parseInt(hexDigits.slice(0, 2), 16),
    green: Number.parseInt(hexDigits.slice(2, 4), 16),
    blue: Number.parseInt(hexDigits.slice(4, 6), 16),
  };
}

function parseColorValue(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.startsWith("#")) {
    const hexDigits = trimmedValue.slice(1);

    if (hexDigits.length === 4 || hexDigits.length === 8) {
      const isShort = hexDigits.length === 4;
      const rgbHex = isShort
        ? hexDigits
            .slice(0, 3)
            .split("")
            .map((digit) => `${digit}${digit}`)
            .join("")
        : hexDigits.slice(0, 6);
      const alphaHex = isShort
        ? `${hexDigits[3]}${hexDigits[3]}`
        : hexDigits.slice(6, 8);

      return {
        hex: `#${rgbHex.toLowerCase()}`,
        opacity: clampOpacity((Number.parseInt(alphaHex, 16) / 255) * 100),
      };
    }

    const resolvedHexColor = getResolvedHexColor(trimmedValue);

    if (resolvedHexColor) {
      return {
        hex: resolvedHexColor,
        opacity: 100,
      };
    }
  }

  const rgbaMatch = trimmedValue.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i,
  );

  if (rgbaMatch) {
    const [, red, green, blue, alpha] = rgbaMatch;
    const toHex = (channel: string) =>
      Math.max(0, Math.min(255, Number(channel))).toString(16).padStart(2, "0");

    return {
      hex: `#${toHex(red)}${toHex(green)}${toHex(blue)}`,
      opacity: clampOpacity((alpha == null ? 1 : Number(alpha)) * 100),
    };
  }

  return {
    hex: "#000000",
    opacity: 100,
  };
}

function buildColorValue(hexValue: string, opacityValue: number) {
  const rgbColor = hexToRgb(hexValue);

  if (!rgbColor) {
    return null;
  }

  const normalizedOpacity = clampOpacity(opacityValue);

  if (normalizedOpacity >= 100) {
    return getResolvedHexColor(hexValue);
  }

  const alpha = Number((normalizedOpacity / 100).toFixed(3));

  return `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}, ${alpha})`;
}

export function InspectorShell({
  title,
  titleClassName = "builder-app-code-filename",
  badge,
  children,
}: {
  title: ReactNode;
  titleClassName?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="builder-app-code-panel">
      <div className="builder-app-code-header">
        <div className={titleClassName}>{title}</div>
        {badge ? <span className="builder-app-field-config-badge">{badge}</span> : null}
      </div>
      <div className="builder-app-config-scroll">{children}</div>
    </div>
  );
}

export function InspectorCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="builder-app-config-group">
      <div className="builder-app-config-group-title">{title}</div>
      {children}
    </div>
  );
}

export function InspectorCardRow({
  label,
  children,
  stacked = false,
  textarea = false,
}: {
  label: ReactNode;
  children: ReactNode;
  stacked?: boolean;
  textarea?: boolean;
}) {
  const rowClassName = [
    "builder-app-config-row",
    stacked ? "is-stacked" : "",
    textarea ? "is-textarea" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rowClassName}>
      <span className="builder-app-config-row-label">{label}</span>
      {children}
    </div>
  );
}

export function ConfigInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  if (props.type === "number") {
    const {
      onChange,
      onKeyDown,
      onBlur,
      onFocus,
      type: _type,
      inputMode,
      pattern,
      min,
      max,
      step,
      ...rest
    } = props;
    const allowDecimal =
      step === "any" ||
      (typeof step === "number" && !Number.isInteger(step)) ||
      (typeof step === "string" && step.includes("."));
    const [draftValue, setDraftValue] = useState(String(rest.value ?? ""));
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      if (!isEditing) {
        setDraftValue(String(rest.value ?? ""));
      }
    }, [isEditing, rest.value]);

    const emitChange = (
      event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
      nextValue: string,
    ) => {
      onChange?.({
        ...event,
        target: {
          ...event.currentTarget,
          value: nextValue,
        },
        currentTarget: {
          ...event.currentTarget,
          value: nextValue,
        },
      } as ChangeEvent<HTMLInputElement>);
    };

    const normalizeValue = (rawValue: string) => {
      if (allowDecimal) {
        const sanitizedValue = rawValue.replace(/[^\d.]/g, "");
        const firstDecimalIndex = sanitizedValue.indexOf(".");
        const normalizedRawValue =
          firstDecimalIndex === -1
            ? sanitizedValue
            : `${sanitizedValue.slice(0, firstDecimalIndex + 1)}${sanitizedValue
                .slice(firstDecimalIndex + 1)
                .replace(/\./g, "")}`;

        if (normalizedRawValue === "") {
          return "";
        }

        if (normalizedRawValue.startsWith(".")) {
          return `0${normalizedRawValue}`;
        }

        const [integerPart = "", decimalPart] = normalizedRawValue.split(".");
        const normalizedIntegerPart =
          integerPart === "" ? "0" : integerPart.replace(/^0+(?=\d)/, "");

        return decimalPart != null
          ? `${normalizedIntegerPart}.${decimalPart}`
          : normalizedIntegerPart;
      }

      const digitsOnly = rawValue.replace(/[^\d]/g, "");

      return digitsOnly === "" ? "" : digitsOnly.replace(/^0+(?=\d)/, "");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const normalizedValue = normalizeValue(event.target.value);

      setDraftValue(normalizedValue);

      if (normalizedValue === "") {
        emitChange(event, "");
        return;
      }

      if (allowDecimal && normalizedValue.endsWith(".")) {
        return;
      }

      emitChange(event, normalizedValue);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) {
        return;
      }

      event.preventDefault();

      const stepValue = step == null ? 1 : Number(step);
      const minValue = min == null ? undefined : Number(min);
      const maxValue = max == null ? undefined : Number(max);
      const currentText = normalizeValue(draftValue);
      const currentValue =
        currentText === ""
          ? minValue ?? 0
          : Number(currentText);

      let nextValue =
        event.key === "ArrowUp" ? currentValue + stepValue : currentValue - stepValue;

      if (minValue != null) {
        nextValue = Math.max(nextValue, minValue);
      }

      if (maxValue != null) {
        nextValue = Math.min(nextValue, maxValue);
      }

      const nextText = allowDecimal ? String(Number(nextValue.toFixed(4))) : String(nextValue);

      setDraftValue(nextText);
      emitChange(event, nextText);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsEditing(false);
      onBlur?.(event);

      const normalizedValue = normalizeValue(draftValue);

      if (normalizedValue === "") {
        setDraftValue("");
        emitChange(event as unknown as ChangeEvent<HTMLInputElement>, "");
        return;
      }

      const resolvedValue =
        allowDecimal && normalizedValue.endsWith(".")
          ? normalizedValue.slice(0, -1)
          : normalizedValue;

      setDraftValue(resolvedValue);
      emitChange(event as unknown as ChangeEvent<HTMLInputElement>, resolvedValue);
    };

    return (
      <input
        className={["builder-app-config-input", className].filter(Boolean).join(" ")}
        type="text"
        inputMode={inputMode ?? (allowDecimal ? "decimal" : "numeric")}
        pattern={pattern ?? (allowDecimal ? "[0-9.]*" : "[0-9]*")}
        min={min}
        max={max}
        step={step}
        {...rest}
        value={draftValue}
        onFocus={(event) => {
          setIsEditing(true);
          onFocus?.(event);
        }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <input
      className={["builder-app-config-input", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function ConfigSelect({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      className={["builder-app-config-select", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </select>
  );
}

export function ConfigTextarea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={["builder-app-config-textarea", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function TextInputRow({
  label,
  ...props
}: { label: ReactNode } & ComponentPropsWithoutRef<"input">) {
  return (
    <InspectorCardRow label={label}>
      <ConfigInput {...props} />
    </InspectorCardRow>
  );
}

export function SelectRow({
  label,
  children,
  ...props
}: { label: ReactNode } & ComponentPropsWithoutRef<"select">) {
  return (
    <InspectorCardRow label={label}>
      <ConfigSelect {...props}>{children}</ConfigSelect>
    </InspectorCardRow>
  );
}

export function TextareaRow({
  label,
  ...props
}: { label: ReactNode } & ComponentPropsWithoutRef<"textarea">) {
  return (
    <InspectorCardRow label={label} textarea>
      <ConfigTextarea {...props} />
    </InspectorCardRow>
  );
}

export function WidthSelectorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: WidthOption;
  onChange: (value: WidthOption) => void;
}) {
  return (
    <InspectorCardRow label={label} stacked>
      <div className="builder-app-width-selector">
        {WIDTH_OPTIONS.map((option) => (
          <SystemButton
            key={option.value}
            variant="segment"
            size="sm"
            active={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </SystemButton>
        ))}
      </div>
    </InspectorCardRow>
  );
}

export function ColorInputRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const parsedColor = parseColorValue(value);
  const [draftValue, setDraftValue] = useState(parsedColor.hex);
  const [opacityDraft, setOpacityDraft] = useState(String(Math.round(parsedColor.opacity)));

  useEffect(() => {
    const nextParsedColor = parseColorValue(value);

    setDraftValue(nextParsedColor.hex);
    setOpacityDraft(String(Math.round(nextParsedColor.opacity)));
  }, [value]);

  const handleOpenPicker = () => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    if ("showPicker" in input && typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  const handleDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDraftValue = normalizeHexDraft(event.target.value);
    const resolvedValue = getResolvedHexColor(nextDraftValue);
    const opacityValue = Number(opacityDraft || 100);

    setDraftValue(nextDraftValue);

    if (resolvedValue) {
      const nextColorValue = buildColorValue(resolvedValue, opacityValue);

      if (nextColorValue) {
        onChange(nextColorValue);
      }
    }
  };

  const handleDraftBlur = () => {
    const resolvedValue = getResolvedHexColor(draftValue);

    if (resolvedValue) {
      setDraftValue(resolvedValue);
      const nextColorValue = buildColorValue(resolvedValue, Number(opacityDraft || 100));

      if (nextColorValue && nextColorValue !== value) {
        onChange(nextColorValue);
      }
      return;
    }

    setDraftValue(parsedColor.hex);
  };

  const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextOpacityDraft = normalizeOpacityDraft(event.target.value);

    setOpacityDraft(nextOpacityDraft);

    if (nextOpacityDraft === "" || nextOpacityDraft.endsWith(".")) {
      return;
    }

    const nextColorValue = buildColorValue(draftValue, Number(nextOpacityDraft));

    if (nextColorValue) {
      onChange(nextColorValue);
    }
  };

  const handleOpacityBlur = () => {
    const resolvedOpacity = opacityDraft === "" ? parsedColor.opacity : clampOpacity(Number(opacityDraft));
    const normalizedOpacity = Number.isFinite(resolvedOpacity) ? resolvedOpacity : parsedColor.opacity;
    const nextColorValue = buildColorValue(draftValue, normalizedOpacity);

    setOpacityDraft(String(Math.round(normalizedOpacity)));

    if (nextColorValue && nextColorValue !== value) {
      onChange(nextColorValue);
    }
  };

  return (
    <InspectorCardRow label={label}>
      <div className="builder-app-config-color-control">
        <ConfigInput
          className="builder-app-config-color-code"
          type="text"
          value={draftValue}
          placeholder="#000000"
          inputMode="text"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          onChange={handleDraftChange}
          onBlur={handleDraftBlur}
        />
        <ConfigInput
          className="builder-app-config-color-opacity"
          type="number"
          min={0}
          max={100}
          step={1}
          value={opacityDraft}
          aria-label={`${label} opacity`}
          onChange={handleOpacityChange}
          onBlur={handleOpacityBlur}
        />
        <button
          type="button"
          className="builder-app-config-color-swatch"
          aria-label="Open color picker"
          onClick={handleOpenPicker}
        >
          <span
            className="builder-app-config-color-swatch-fill"
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
        </button>
        <input
          ref={inputRef}
          className="builder-app-config-input builder-app-config-input--color"
          type="color"
          value={parsedColor.hex}
          onChange={(event) => {
            const nextColorValue = buildColorValue(
              event.target.value,
              Number(opacityDraft || parsedColor.opacity),
            );

            setDraftValue(event.target.value);

            if (nextColorValue) {
              onChange(nextColorValue);
            }
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </InspectorCardRow>
  );
}

export function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <InspectorCardRow label={label}>
      <button
        type="button"
        className={`builder-app-toggle ${checked ? "is-on" : ""}`}
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
      />
    </InspectorCardRow>
  );
}

export function DualControlRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <InspectorCardRow label={label}>
      <div className="builder-app-config-control-pair">{children}</div>
    </InspectorCardRow>
  );
}
