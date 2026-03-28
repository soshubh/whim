import type { DragEventHandler, ReactNode } from "react";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DragIndicatorRounded from "@mui/icons-material/DragIndicatorRounded";

import { SystemButton } from "./system-button";

type BuilderRailItemCardProps = {
  icon: ReactNode;
  label: string;
  badgeLabel?: string;
  badgeTone?: "default" | "required";
  metaLabel?: string;
  selected?: boolean;
  dropTarget?: boolean;
  removeLabel: string;
  onSelect: () => void;
  onRemove: () => void;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDragEnd: DragEventHandler<HTMLDivElement>;
  onDragOver: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
};

export function BuilderRailItemCard({
  icon,
  label,
  badgeLabel,
  badgeTone = "default",
  metaLabel,
  selected = false,
  dropTarget = false,
  removeLabel,
  onSelect,
  onRemove,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: BuilderRailItemCardProps) {
  return (
    <div
      className={`builder-app-field-card ${selected ? "is-selected" : ""} ${
        dropTarget ? "is-drop-target" : ""
      }`}
      draggable
      onClick={onSelect}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="builder-app-field-drag" aria-hidden="true">
        <DragIndicatorRounded fontSize="inherit" />
      </div>
      <div className="builder-app-field-icon" aria-hidden="true">
        <span>{icon}</span>
      </div>
      <div className="builder-app-field-info">
        <div className="builder-app-field-name">{label}</div>
        {badgeLabel || metaLabel ? (
          <div className="builder-app-field-meta">
            {badgeLabel ? (
              <span
                className={`builder-app-field-badge ${
                  badgeTone === "required" ? "is-required" : ""
                }`}
              >
                {badgeLabel}
              </span>
            ) : null}
            {metaLabel ? <span>{metaLabel}</span> : null}
          </div>
        ) : null}
      </div>
      <div className="builder-app-field-actions">
        <SystemButton
          variant="icon"
          size="icon"
          tone="danger"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <CloseRounded fontSize="inherit" />
        </SystemButton>
      </div>
    </div>
  );
}
