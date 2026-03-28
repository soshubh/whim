"use client";

import { useState } from "react";
import AddRounded from "@mui/icons-material/AddRounded";

import { ButtonTypeIcon, FieldTypeIcon } from "./builder-item-icon";
import { BuilderRailItemCard } from "./builder-rail-item-card";
import { BuilderRailSectionHeader } from "./builder-rail-section-header";
import type { FormActionButton } from "./form/button/types";
import type { Field } from "./form/types";
import {
  getButtonWidthForPreview,
  getFieldWidthForPreview,
  type PreviewMode,
} from "../lib/builder-config";
import {
  getButtonTypeLabel,
  getFieldTypeLabel,
  getWidthLabel,
} from "../lib/field-ui";
import { SystemButton } from "./system-button";

type BuilderLeftPanelProps = {
  fields: Field[];
  buttons: FormActionButton[];
  previewMode: PreviewMode;
  selectedFieldId: string;
  selectedButtonId: string;
  onFieldSelect: (fieldId: string) => void;
  onFieldRemove: (fieldId: string) => void;
  onMoveField: (sourceId: string, targetId: string) => void;
  onAddField: () => void;
  onButtonSelect: (buttonId: string) => void;
  onButtonRemove: (buttonId: string) => void;
  onMoveButton: (sourceId: string, targetId: string) => void;
  onAddButton: () => void;
};

export function BuilderLeftPanel({
  fields,
  buttons,
  previewMode,
  selectedFieldId,
  selectedButtonId,
  onFieldSelect,
  onFieldRemove,
  onMoveField,
  onAddField,
  onButtonSelect,
  onButtonRemove,
  onMoveButton,
  onAddButton,
}: BuilderLeftPanelProps) {
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [dragTargetFieldId, setDragTargetFieldId] = useState<string | null>(null);
  const [draggingButtonId, setDraggingButtonId] = useState<string | null>(null);
  const [dragTargetButtonId, setDragTargetButtonId] = useState<string | null>(null);

  return (
    <aside className="builder-app-left-panel">
      <div className="builder-app-panel-header">
        <span className="builder-app-panel-title">Fields & Buttons</span>
      </div>

      <div className="builder-app-panel-scroll">
        <div className="builder-app-panel-section">
          <BuilderRailSectionHeader
            title="Fields"
            addLabel="Add field"
            onAdd={onAddField}
          />

          {fields.map((field) => {
            const effectiveWidth = getFieldWidthForPreview(field, previewMode);

            return (
              <BuilderRailItemCard
                key={field.id}
                icon={<FieldTypeIcon type={field.type} />}
                label={field.label}
                badgeLabel={field.required ? "Required" : "Optional"}
                badgeTone={field.required ? "required" : "default"}
                metaLabel={`${getFieldTypeLabel(field.type)} · ${getWidthLabel(effectiveWidth)}`}
                selected={field.id === selectedFieldId}
                dropTarget={dragTargetFieldId === field.id && draggingFieldId !== field.id}
                removeLabel={`Remove ${field.label}`}
                onSelect={() => onFieldSelect(field.id)}
                onRemove={() => onFieldRemove(field.id)}
                onDragStart={() => setDraggingFieldId(field.id)}
                onDragEnd={() => {
                  setDraggingFieldId(null);
                  setDragTargetFieldId(null);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (draggingFieldId && draggingFieldId !== field.id) {
                    setDragTargetFieldId(field.id);
                  }
                }}
                onDrop={() => {
                  if (draggingFieldId && draggingFieldId !== field.id) {
                    onMoveField(draggingFieldId, field.id);
                  }

                  setDraggingFieldId(null);
                  setDragTargetFieldId(null);
                }}
              />
            );
          })}

          <SystemButton
            variant="dashed"
            size="md"
            fullWidth
            align="start"
            onClick={onAddField}
          >
            <AddRounded fontSize="inherit" />
            Add field
          </SystemButton>
        </div>

        <div className="builder-app-panel-section">
          <BuilderRailSectionHeader
            title="Buttons"
            addLabel="Add button"
            onAdd={onAddButton}
          />

          {buttons.map((button) => {
            const effectiveWidth = getButtonWidthForPreview(button, previewMode);

            return (
              <BuilderRailItemCard
                key={button.id}
                icon={<ButtonTypeIcon type={button.type} />}
                label={button.label}
                badgeLabel={getButtonTypeLabel(button.type)}
                metaLabel={getWidthLabel(effectiveWidth)}
                selected={button.id === selectedButtonId}
                dropTarget={dragTargetButtonId === button.id && draggingButtonId !== button.id}
                removeLabel={`Remove ${button.label}`}
                onSelect={() => onButtonSelect(button.id)}
                onRemove={() => onButtonRemove(button.id)}
                onDragStart={() => setDraggingButtonId(button.id)}
                onDragEnd={() => {
                  setDraggingButtonId(null);
                  setDragTargetButtonId(null);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (draggingButtonId && draggingButtonId !== button.id) {
                    setDragTargetButtonId(button.id);
                  }
                }}
                onDrop={() => {
                  if (draggingButtonId && draggingButtonId !== button.id) {
                    onMoveButton(draggingButtonId, button.id);
                  }

                  setDraggingButtonId(null);
                  setDragTargetButtonId(null);
                }}
              />
            );
          })}

          <SystemButton
            variant="dashed"
            size="md"
            fullWidth
            align="start"
            onClick={onAddButton}
          >
            <AddRounded fontSize="inherit" />
            Add button
          </SystemButton>
        </div>
      </div>
    </aside>
  );
}
