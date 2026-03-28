"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import {
  getLayoutForPreview,
  type BuilderConfig,
  type LayoutMode,
  type PreviewMode,
} from "../../lib/builder-config";
import {
  ColorInputRow,
  ConfigInput,
  ConfigSelect,
  DualControlRow,
  InspectorCard,
  InspectorShell,
  SelectRow,
  TextareaRow,
  TextInputRow,
  ToggleRow,
} from "./inspector-primitives";
import { SystemButton } from "../system-button";
import type { RightPanelTab } from "./types";

const FONT_WEIGHT_OPTIONS = [
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
  { value: 600, label: "600" },
  { value: 700, label: "700" },
];

function PaddingAllIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2.25"
        y="2.25"
        width="11.5"
        height="11.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PaddingSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 2.75H3.75C3.198 2.75 2.75 3.198 2.75 3.75V5M11 2.75H12.25C12.802 2.75 13.25 3.198 13.25 3.75V5M13.25 11V12.25C13.25 12.802 12.802 13.25 12.25 13.25H11M5 13.25H3.75C3.198 13.25 2.75 12.802 2.75 12.25V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="6.25"
        y="6.25"
        width="3.5"
        height="3.5"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

function PaddingRow({
  label,
  mode,
  allValue,
  max,
  mainAriaLabel,
  topValue,
  rightValue,
  bottomValue,
  leftValue,
  topAriaLabel,
  rightAriaLabel,
  bottomAriaLabel,
  leftAriaLabel,
  onAllChange,
  onUseAll,
  onUseIndividual,
  onTopChange,
  onRightChange,
  onBottomChange,
  onLeftChange,
}: {
  label: string;
  mode: "all" | "individual";
  allValue: number;
  max: number;
  mainAriaLabel: string;
  topValue: number;
  rightValue: number;
  bottomValue: number;
  leftValue: number;
  topAriaLabel: string;
  rightAriaLabel: string;
  bottomAriaLabel: string;
  leftAriaLabel: string;
  onAllChange: (value: number) => void;
  onUseAll: () => void;
  onUseIndividual: () => void;
  onTopChange: (value: number) => void;
  onRightChange: (value: number) => void;
  onBottomChange: (value: number) => void;
  onLeftChange: (value: number) => void;
}) {
  const isIndividual = mode === "individual";

  return (
    <>
      <div className="builder-app-config-row">
        <span className="builder-app-config-row-label">{label}</span>
        <div className="builder-app-config-padding-inline">
          <ConfigInput
            className="builder-app-config-padding-main-input"
            type="number"
            min={0}
            max={max}
            value={isIndividual ? "" : allValue}
            aria-label={mainAriaLabel}
            onChange={(event) => onAllChange(Number(event.target.value || 0))}
          />
          <div className="builder-app-config-padding-toggle">
            <SystemButton
              variant="segment"
              size="sm"
              active={!isIndividual}
              className="builder-app-config-padding-toggle-button"
              aria-label="Use one padding value for all sides"
              title="Use one padding value for all sides"
              onClick={onUseAll}
            >
              <PaddingAllIcon />
            </SystemButton>
            <SystemButton
              variant="segment"
              size="sm"
              active={isIndividual}
              className="builder-app-config-padding-toggle-button"
              aria-label="Use four padding values"
              title="Use four padding values"
              onClick={onUseIndividual}
            >
              <PaddingSplitIcon />
            </SystemButton>
          </div>
        </div>
      </div>

      {isIndividual ? (
        <div className="builder-app-config-row builder-app-config-row--padding-sides">
          <span className="builder-app-config-row-label" aria-hidden="true">
            &nbsp;
          </span>
          <div className="builder-app-config-padding-sides">
            <div className="builder-app-config-padding-sides-inputs">
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={topValue}
                aria-label={topAriaLabel}
                onChange={(event) => onTopChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={rightValue}
                aria-label={rightAriaLabel}
                onChange={(event) => onRightChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={bottomValue}
                aria-label={bottomAriaLabel}
                onChange={(event) => onBottomChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={leftValue}
                aria-label={leftAriaLabel}
                onChange={(event) => onLeftChange(Number(event.target.value || 0))}
              />
            </div>
            <div className="builder-app-config-padding-sides-labels" aria-hidden="true">
              <span>T</span>
              <span>R</span>
              <span>B</span>
              <span>L</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FormPaddingRow({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = config.styling;

  return (
    <PaddingRow
      label="Form padding"
      mode={styling.formPaddingMode}
      allValue={styling.formPadding}
      max={64}
      mainAriaLabel="Form padding all sides"
      topValue={styling.formPaddingTop}
      rightValue={styling.formPaddingRight}
      bottomValue={styling.formPaddingBottom}
      leftValue={styling.formPaddingLeft}
      topAriaLabel="Form padding top"
      rightAriaLabel="Form padding right"
      bottomAriaLabel="Form padding bottom"
      leftAriaLabel="Form padding left"
      onAllChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPadding: value,
          },
        }))
      }
      onUseAll={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingMode: "all",
          },
        }))
      }
      onUseIndividual={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingMode: "individual",
            formPaddingTop: current.styling.formPadding,
            formPaddingRight: current.styling.formPadding,
            formPaddingBottom: current.styling.formPadding,
            formPaddingLeft: current.styling.formPadding,
          },
        }))
      }
      onTopChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingTop: value,
          },
        }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingRight: value,
          },
        }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingBottom: value,
          },
        }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            formPaddingLeft: value,
          },
        }))
      }
    />
  );
}

function InputPaddingRow({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = config.styling;

  return (
    <PaddingRow
      label="Input padding"
      mode={styling.inputPaddingMode}
      allValue={styling.inputPadding}
      max={32}
      mainAriaLabel="Input padding all sides"
      topValue={styling.inputPaddingTop}
      rightValue={styling.inputPaddingRight}
      bottomValue={styling.inputPaddingBottom}
      leftValue={styling.inputPaddingLeft}
      topAriaLabel="Input padding top"
      rightAriaLabel="Input padding right"
      bottomAriaLabel="Input padding bottom"
      leftAriaLabel="Input padding left"
      onAllChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPadding: value,
          },
        }))
      }
      onUseAll={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingMode: "all",
          },
        }))
      }
      onUseIndividual={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingMode: "individual",
            inputPaddingTop: current.styling.inputPadding,
            inputPaddingRight: current.styling.inputPadding,
            inputPaddingBottom: current.styling.inputPadding,
            inputPaddingLeft: current.styling.inputPadding,
          },
        }))
      }
      onTopChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingTop: value,
          },
        }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingRight: value,
          },
        }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingBottom: value,
          },
        }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            inputPaddingLeft: value,
          },
        }))
      }
    />
  );
}

function ButtonPaddingRow({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = config.styling;

  return (
    <PaddingRow
      label="Button padding"
      mode={styling.buttonPaddingMode}
      allValue={styling.buttonPadding}
      max={40}
      mainAriaLabel="Button padding all sides"
      topValue={styling.buttonPaddingTop}
      rightValue={styling.buttonPaddingRight}
      bottomValue={styling.buttonPaddingBottom}
      leftValue={styling.buttonPaddingLeft}
      topAriaLabel="Button padding top"
      rightAriaLabel="Button padding right"
      bottomAriaLabel="Button padding bottom"
      leftAriaLabel="Button padding left"
      onAllChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPadding: value,
          },
        }))
      }
      onUseAll={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingMode: "all",
          },
        }))
      }
      onUseIndividual={() =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingMode: "individual",
            buttonPaddingTop: current.styling.buttonPadding,
            buttonPaddingRight: current.styling.buttonPadding,
            buttonPaddingBottom: current.styling.buttonPadding,
            buttonPaddingLeft: current.styling.buttonPadding,
          },
        }))
      }
      onTopChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingTop: value,
          },
        }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingRight: value,
          },
        }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingBottom: value,
          },
        }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => ({
          ...current,
          styling: {
            ...current.styling,
            buttonPaddingLeft: value,
          },
        }))
      }
    />
  );
}

function TypographyRow({
  label,
  sizeValue,
  sizeMin,
  sizeMax,
  weightValue,
  onSizeChange,
  onWeightChange,
}: {
  label: ReactNode;
  sizeValue: number;
  sizeMin: number;
  sizeMax: number;
  weightValue: number;
  onSizeChange: (value: number) => void;
  onWeightChange: (value: number) => void;
}) {
  return (
    <DualControlRow label={label}>
      <ConfigInput
        type="number"
        min={sizeMin}
        max={sizeMax}
        value={sizeValue}
        aria-label={`${typeof label === "string" ? label : "Typography"} size`}
        onChange={(event) => onSizeChange(Number(event.target.value || 0))}
      />
      <ConfigSelect
        value={String(weightValue)}
        aria-label={`${typeof label === "string" ? label : "Typography"} weight`}
        onChange={(event) => onWeightChange(Number(event.target.value))}
      >
        {FONT_WEIGHT_OPTIONS.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </ConfigSelect>
    </DualControlRow>
  );
}

function StylePanel({
  config,
  previewMode,
  onConfigChange,
}: {
  config: BuilderConfig;
  previewMode: PreviewMode;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const effectiveLayout = getLayoutForPreview(config.styling, previewMode);
  const tinyControlTextMessage =
    "Native input and button controls may still render larger in some browsers below 10px.";

  const getControlTextLabel = (label: string, shouldWarn: boolean) => (
    <span className="builder-app-config-label-with-hint">
      <span>{label}</span>
      {shouldWarn ? (
        <button
          type="button"
          className="builder-app-config-hint"
          aria-label={tinyControlTextMessage}
          title={tinyControlTextMessage}
        >
          <VisibilityOutlined fontSize="inherit" />
        </button>
      ) : null}
    </span>
  );

  return (
    <InspectorShell title="Styling Controls" badge="preview + export">
      <InspectorCard title="Layout">
        <SelectRow
          label={
            previewMode === "desktop"
              ? "Desktop layout"
              : previewMode === "tablet"
                ? "Tablet layout"
                : "Mobile layout"
          }
          value={effectiveLayout}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling:
                previewMode === "tablet"
                  ? {
                      ...current.styling,
                      tabletLayout: event.target.value as LayoutMode,
                    }
                  : previewMode === "mobile"
                    ? {
                        ...current.styling,
                        mobileLayout: event.target.value as LayoutMode,
                      }
                    : {
                        ...current.styling,
                        layout: event.target.value as LayoutMode,
                      },
            }))
          }
        >
          <option value="1-col">1 column</option>
          <option value="2-col">2 column</option>
        </SelectRow>
      </InspectorCard>

      <InspectorCard title="Section">
        <FormPaddingRow config={config} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Section gap"
          type="number"
          min={0}
          max={48}
          value={config.styling.sectionGap}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                sectionGap: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TextInputRow
          label="Section radius"
          type="number"
          min={0}
          max={48}
          value={config.styling.sectionRadius}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                sectionRadius: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={config.styling.sectionBorderWidth}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                sectionBorderWidth: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TypographyRow
          label="Heading"
          sizeValue={config.styling.titleSize}
          sizeMin={10}
          sizeMax={40}
          weightValue={config.styling.titleWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                titleSize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                titleWeight: value,
              },
            }))
          }
        />
        <TypographyRow
          label="Subtext"
          sizeValue={config.styling.bodySize}
          sizeMin={8}
          sizeMax={24}
          weightValue={config.styling.bodyWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                bodySize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                bodyWeight: value,
              },
            }))
          }
        />
        <ColorInputRow
          label="Surface"
          value={config.styling.sectionSurfaceColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, sectionSurfaceColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Border"
          value={config.styling.sectionBorderColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, sectionBorderColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Heading color"
          value={config.styling.sectionTitleColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, sectionTitleColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Subtext color"
          value={config.styling.sectionBodyColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, sectionBodyColor: value },
            }))
          }
        />
      </InspectorCard>

      <InspectorCard title="Fields">
        <TextInputRow
          label="Field gap"
          type="number"
          min={0}
          max={40}
          value={config.styling.fieldGap}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                fieldGap: Number(event.target.value || 0),
              },
            }))
          }
        />
        <InputPaddingRow config={config} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Field radius"
          type="number"
          min={0}
          max={32}
          value={config.styling.fieldRadius}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                fieldRadius: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={config.styling.fieldBorderWidth}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                fieldBorderWidth: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TextInputRow
          label="Focus width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={config.styling.fieldFocusWidth}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                fieldFocusWidth: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TypographyRow
          label="Label"
          sizeValue={config.styling.labelSize}
          sizeMin={8}
          sizeMax={20}
          weightValue={config.styling.labelWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                labelSize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                labelWeight: value,
              },
            }))
          }
        />
        <TypographyRow
          label="Helper text"
          sizeValue={config.styling.helperSize}
          sizeMin={8}
          sizeMax={20}
          weightValue={config.styling.helperWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                helperSize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                helperWeight: value,
              },
            }))
          }
        />
        <TypographyRow
          label={getControlTextLabel("Input text", config.styling.inputTextSize < 10)}
          sizeValue={config.styling.inputTextSize}
          sizeMin={8}
          sizeMax={24}
          weightValue={config.styling.inputTextWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                inputTextSize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                inputTextWeight: value,
              },
            }))
          }
        />
        <ColorInputRow
          label="Surface"
          value={config.styling.fieldSurfaceColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldSurfaceColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Border"
          value={config.styling.fieldBorderColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldBorderColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Text"
          value={config.styling.fieldTextColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldTextColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Label color"
          value={config.styling.fieldLabelColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldLabelColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Helper color"
          value={config.styling.fieldHelperColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldHelperColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Placeholder"
          value={config.styling.fieldPlaceholderColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldPlaceholderColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Focus"
          value={config.styling.fieldFocusColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, fieldFocusColor: value },
            }))
          }
        />
      </InspectorCard>

      <InspectorCard title="Buttons">
        <SelectRow
          label="Button style"
          value={config.styling.buttonStyle}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                buttonStyle: event.target.value as BuilderConfig["styling"]["buttonStyle"],
              },
            }))
          }
        >
          <option value="solid">Solid</option>
          <option value="outline">Outline</option>
        </SelectRow>
        <ButtonPaddingRow config={config} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Button radius"
          type="number"
          min={0}
          max={32}
          value={config.styling.buttonRadius}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                buttonRadius: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={config.styling.buttonBorderWidth}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                buttonBorderWidth: Number(event.target.value || 0),
              },
            }))
          }
        />
        <TypographyRow
          label={getControlTextLabel("Button text", config.styling.buttonTextSize < 10)}
          sizeValue={config.styling.buttonTextSize}
          sizeMin={8}
          sizeMax={24}
          weightValue={config.styling.buttonTextWeight}
          onSizeChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                buttonTextSize: value,
              },
            }))
          }
          onWeightChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: {
                ...current.styling,
                buttonTextWeight: value,
              },
            }))
          }
        />
        <ColorInputRow
          label="Button color"
          value={config.styling.primaryColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, primaryColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Border"
          value={config.styling.buttonBorderColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, buttonBorderColor: value },
            }))
          }
        />
        <ColorInputRow
          label="Text color"
          value={config.styling.buttonTextColor}
          onChange={(value) =>
            onConfigChange((current) => ({
              ...current,
              styling: { ...current.styling, buttonTextColor: value },
            }))
          }
        />
      </InspectorCard>
    </InspectorShell>
  );
}

function FormSettingsPanel({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  return (
    <InspectorShell title="Form Settings" badge="content">
      <InspectorCard title="Copy">
        <TextInputRow
          label="Page name"
          value={config.formSettings.pageName}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              formSettings: {
                ...current.formSettings,
                pageName: event.target.value,
              },
            }))
          }
        />
        <TextareaRow
          label="Success message"
          rows={4}
          value={config.formSettings.successMessage}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              formSettings: {
                ...current.formSettings,
                successMessage: event.target.value,
              },
            }))
          }
        />
      </InspectorCard>
    </InspectorShell>
  );
}

function IntegrationsPanel({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  return (
    <InspectorShell title="Integrations" badge="delivery">
      <InspectorCard title="Destinations">
        <ToggleRow
          label="Enable OTP verification"
          checked={config.integrations.otpEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, otpEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable Google Sheets"
          checked={config.integrations.sheetsEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, sheetsEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable data webhook"
          checked={config.integrations.webhookEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, webhookEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable redirect on submit"
          checked={config.integrations.redirectEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, redirectEnabled: checked },
            }))
          }
        />
      </InspectorCard>
    </InspectorShell>
  );
}

type SettingsModePanelProps = {
  activeTab: RightPanelTab;
  config: BuilderConfig;
  previewMode: PreviewMode;
  onTabChange: (tab: RightPanelTab) => void;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
};

export function SettingsModePanel({
  activeTab,
  config,
  previewMode,
  onTabChange,
  onConfigChange,
}: SettingsModePanelProps) {
  return (
    <>
      <div className="builder-app-code-tabs">
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "style" ? "is-active" : ""}`}
          onClick={() => onTabChange("style")}
        >
          Style
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "form" ? "is-active" : ""}`}
          onClick={() => onTabChange("form")}
        >
          Form
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "integrations" ? "is-active" : ""}`}
          onClick={() => onTabChange("integrations")}
        >
          Integrations
        </button>
      </div>

      {activeTab === "style" ? (
        <StylePanel
          config={config}
          previewMode={previewMode}
          onConfigChange={onConfigChange}
        />
      ) : null}

      {activeTab === "form" ? (
        <FormSettingsPanel
          config={config}
          onConfigChange={onConfigChange}
        />
      ) : null}

      {activeTab === "integrations" ? (
        <IntegrationsPanel config={config} onConfigChange={onConfigChange} />
      ) : null}
    </>
  );
}
